import { supabaseAdmin } from "@/lib/supabaseAdmin";

export type ToolInsertInput = {
    name: string;
    slug: string;
    website_url: string;
    image_file_name?: string | null;
    image_url?: string | null;
    description: string;
    category: string;
    subcategory: string;
    tags: string[];
};

export async function insertTool(tool: ToolInsertInput) {
    const { data, error } = await supabaseAdmin
        .from("tools")
        .insert([tool])
        .select()
        .single();

    if (error) {
        throw new Error(`Supabase insert failed: ${error.message}`);
    }

    return data;
}