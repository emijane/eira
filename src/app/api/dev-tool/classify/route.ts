import { buildDevToolDraft } from "@/app/classification/devToolWorkflow";
import { uploadDevToolImage } from "@/app/classification/devToolImageUpload";
import { denyInProduction, jsonResponse, parseMultipartBody, verifySameOrigin } from "../_lib";

export const runtime = "nodejs";

export async function POST(request: Request) {
    // Classification stays server-side so OpenAI credentials never reach the browser.
    const blockedForEnvironment = denyInProduction();

    if (blockedForEnvironment) {
        return blockedForEnvironment;
    }

    const blockedForOrigin = verifySameOrigin(request);

    if (blockedForOrigin) {
        return blockedForOrigin;
    }

    try {
        const formData = await parseMultipartBody(request);
        const url = typeof formData.get("url") === "string" ? String(formData.get("url")) : "";
        const uploadedFile = formData.get("image");
        const imageFileName = uploadedFile instanceof File
            ? await uploadDevToolImage(url, uploadedFile)
            : null;
        const result = await buildDevToolDraft(url, imageFileName);

        return jsonResponse({
            draft: result.draft,
            duplicate: result.duplicate,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Could not classify this tool.";

        return jsonResponse({ error: message }, 400);
    }
}
