import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function findExistingToolByWebsite(websiteUrl: string) {
    // Match on the normalized website URL to prevent duplicate inserts from the dev tool UI.
    const normalizedWebsiteUrl = websiteUrl.trim();

    const { data, error } = await supabaseAdmin
        .from("tools")
        .select("id, name, slug, website_url")
        .eq("website_url", normalizedWebsiteUrl)
        .maybeSingle();

    if (error) {
        throw new Error(`Supabase duplicate check by website failed: ${error.message}`);
    }

    return data;
}
