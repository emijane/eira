import { buildDevToolDraft } from "@/app/classification/devToolWorkflow";
import { denyInProduction, jsonResponse, parseJsonBody, verifySameOrigin } from "../_lib";

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
        const body = await parseJsonBody(request);
        const url = typeof body?.url === "string" ? body.url : "";
        const imageFileName = typeof body?.image_file_name === "string" ? body.image_file_name : "";
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
