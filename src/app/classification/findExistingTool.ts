import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function findExistingToolByName(name: string) {
    const normalizedName = name.trim();

    const { data, error } = await supabaseAdmin
        .from("tools")
        .select("id, name, slug, website_url")
        .eq("name", normalizedName)
        .maybeSingle();

    if (error) {
        throw new Error(`Supabase duplicate check by name failed: ${error.message}`);
    }

    return data;
}