import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const LIBRARY_PAGE_SIZE = 12;

export type GetToolsPageOptions = {
    limit?: number;
    offset?: number;
    includeCount?: boolean;
};

export async function getToolsPage({
    limit = LIBRARY_PAGE_SIZE,
    offset = 0,
    includeCount = true,
}: GetToolsPageOptions = {}) {
    const safeLimit = Math.max(1, Math.min(limit, 24));
    const safeOffset = Math.max(0, offset);

    let query = supabaseAdmin
        .from("tools")
        .select("*", includeCount ? { count: "exact" } : undefined)
        .order("name", { ascending: true });

    if (includeCount) {
        query = query.range(safeOffset, safeOffset + safeLimit - 1);
    } else {
        query = query.range(safeOffset, safeOffset + safeLimit);
    }

    const { data, error, count } = await query;

    if (error) {
        throw new Error(`Failed to fetch tools: ${error.message}`);
    }

    const rawTools = data ?? [];
    const hasMore = includeCount
        ? safeOffset + rawTools.length < (count ?? rawTools.length)
        : rawTools.length > safeLimit;
    const tools = includeCount ? rawTools : rawTools.slice(0, safeLimit);
    const totalTools = count ?? safeOffset + tools.length + (hasMore ? 1 : 0);

    return {
        tools,
        totalTools,
        hasMore,
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
