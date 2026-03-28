import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const LIBRARY_PAGE_SIZE = 12;

export type GetToolsPageOptions = {
    limit?: number;
    offset?: number;
};

export async function getToolsPage({
    limit = LIBRARY_PAGE_SIZE,
    offset = 0,
}: GetToolsPageOptions = {}) {
    const safeLimit = Math.max(1, Math.min(limit, 24));
    const safeOffset = Math.max(0, offset);

    const { data, error, count } = await supabaseAdmin
        .from("tools")
        .select("*", { count: "exact" })
        .order("name", { ascending: true })
        .range(safeOffset, safeOffset + safeLimit - 1);

    if (error) {
        throw new Error(`Failed to fetch tools: ${error.message}`);
    }

    const tools = data ?? [];
    const totalTools = count ?? tools.length;

    return {
        tools,
        totalTools,
        hasMore: safeOffset + tools.length < totalTools,
        nextOffset: safeOffset + tools.length,
    };
}

export async function getTools() {
    const { tools } = await getToolsPage({
        limit: 24,
        offset: 0,
    });

    return tools;
}
