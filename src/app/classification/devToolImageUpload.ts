import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { slugify } from "./slugify";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Map<string, string>([
    ["image/png", "png"],
    ["image/jpeg", "jpg"],
    ["image/webp", "webp"],
]);
const SAFE_IMAGE_FILE_NAME = /^[a-z0-9-]+\.[a-z0-9]+$/;

export function validateStoredImageFileName(fileName: unknown) {
    if (typeof fileName !== "string") {
        return null;
    }

    const trimmedFileName = fileName.trim().toLowerCase();

    if (!trimmedFileName) {
        return null;
    }

    if (!SAFE_IMAGE_FILE_NAME.test(trimmedFileName)) {
        throw new Error("Invalid stored image filename.");
    }

    return trimmedFileName;
}

export async function ensureStoredImageExists(fileName: string) {
    const { data, error } = await supabaseAdmin
        .storage
        .from("media")
        .list("", {
            search: fileName,
        });

    if (error) {
        throw new Error(`Could not verify uploaded image: ${error.message}`);
    }

    const exists = (data ?? []).some((item) => item.name === fileName);

    if (!exists) {
        throw new Error("Uploaded image could not be found in storage.");
    }
}

export async function uploadDevToolImage(url: string, file: File | null) {
    if (!file || file.size === 0) {
        return null;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
        throw new Error("Image must be 5 MB or smaller.");
    }

    const extension = ALLOWED_IMAGE_TYPES.get(file.type);

    if (!extension) {
        throw new Error("Only PNG, JPG, JPEG, and WebP images are allowed.");
    }

    let hostname = "tool";

    try {
        hostname = new URL(url).hostname.replace(/^www\./, "");
    } catch {
        // URL validation runs in the workflow; this fallback only protects filename creation.
    }

    const safeBaseName = slugify(hostname) || "tool";
    const shortId = crypto.randomUUID().replace(/-/g, "").slice(0, 6);
    const storedFileName = `${safeBaseName}-${shortId}.${extension}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabaseAdmin
        .storage
        .from("media")
        .upload(storedFileName, fileBuffer, {
            contentType: file.type,
            upsert: false,
        });

    if (error) {
        throw new Error(`Image upload failed: ${error.message}`);
    }

    return storedFileName;
}
