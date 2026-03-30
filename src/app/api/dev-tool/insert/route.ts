import { insertDevToolDraft } from "@/app/classification/devToolWorkflow";
import { ensureStoredImageExists, validateStoredImageFileName } from "@/app/classification/devToolImageUpload";
import { denyInProduction, jsonResponse, parseJsonBody, verifySameOrigin } from "../_lib";

export const runtime = "nodejs";

export async function POST(request: Request) {
    // Inserts also run on the server and re-check duplicates before writing to Supabase.
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
        const imageFileName = validateStoredImageFileName(body?.image_file_name);

        if (imageFileName) {
            await ensureStoredImageExists(imageFileName);
        }

        const result = await insertDevToolDraft(url, imageFileName);

        if (result.duplicate) {
            return jsonResponse(
                {
                    error: `A tool with the same ${result.duplicate.by} already exists.`,
                    draft: result.draft,
                    duplicate: result.duplicate,
                },
                409
            );
        }

        return jsonResponse({
            inserted: result.inserted,
            draft: result.draft,
            duplicate: null,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Could not insert this tool.";

        return jsonResponse({ error: message }, 400);
    }
}
