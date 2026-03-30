import { classifyTool } from "./classifyTool";
import { findExistingToolByName } from "./findExistingTool";
import { findExistingToolByWebsite } from "./findExistingToolByWebsite";
import { insertTool, type ToolInsertInput } from "./insertTool";
import { slugify } from "./slugify";

const MAX_URL_LENGTH = 2048;

export type DevToolDuplicate = {
    by: "name" | "website";
    existing: {
        id: string | number;
        name: string;
        slug: string;
        website_url: string | null;
    };
};

export function validateDevToolUrl(rawUrl: unknown) {
    // Keep the dev tool restricted to absolute web URLs before it reaches any external systems.
    if (typeof rawUrl !== "string") {
        throw new Error("A website URL is required.");
    }

    const trimmedUrl = rawUrl.trim();

    if (!trimmedUrl) {
        throw new Error("A website URL is required.");
    }

    if (trimmedUrl.length > MAX_URL_LENGTH) {
        throw new Error("The website URL is too long.");
    }

    let parsedUrl: URL;

    try {
        parsedUrl = new URL(trimmedUrl);
    } catch {
        throw new Error("Enter a valid absolute URL.");
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Only http and https URLs are allowed.");
    }

    return trimmedUrl;
}

async function findDuplicate(tool: ToolInsertInput): Promise<DevToolDuplicate | null> {
    // Check both identity signals we currently use in the terminal flow.
    const [existingByName, existingByWebsite] = await Promise.all([
        findExistingToolByName(tool.name),
        findExistingToolByWebsite(tool.website_url),
    ]);

    if (existingByWebsite) {
        return {
            by: "website",
            existing: existingByWebsite,
        };
    }

    if (existingByName) {
        return {
            by: "name",
            existing: existingByName,
        };
    }

    return null;
}

export async function buildDevToolDraft(url: string, imageFileName?: string | null) {
    // Build the exact row shape we preview in the browser and insert into Supabase later.
    const validatedUrl = validateDevToolUrl(url);
    const safeImageFileName = typeof imageFileName === "string" ? imageFileName.trim() : "";
    const classified = await classifyTool({
        url: validatedUrl,
        image_file_name: safeImageFileName,
    });

    const draft: ToolInsertInput = {
        name: classified.name,
        slug: slugify(classified.name),
        website_url: validatedUrl,
        image_file_name: safeImageFileName || null,
        description: classified.description,
        category: classified.category,
        subcategory: classified.subcategory,
        tags: classified.tags,
    };

    return {
        draft,
        duplicate: await findDuplicate(draft),
    };
}

export async function insertDevToolDraft(url: string, imageFileName?: string | null) {
    // Rebuild the draft on the server so inserts do not trust client-side preview data.
    const { draft, duplicate } = await buildDevToolDraft(url, imageFileName);

    if (duplicate) {
        return {
            inserted: null,
            draft,
            duplicate,
        };
    }

    const inserted = await insertTool(draft);

    return {
        inserted: inserted ?? null,
        draft,
        duplicate: null,
    };
}
