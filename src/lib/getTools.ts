import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const LIBRARY_PAGE_SIZE = 12;

export type GetToolsPageOptions = {
    limit?: number;
    offset?: number;
    includeCount?: boolean;
    searchQuery?: string;
    category?: string;
    subcategory?: string;
    tag?: string;
};

export type ToolFilters = {
    categories: string[];
    subcategories: string[];
    subcategoriesByCategory: Record<string, string[]>;
};

function buildTagSearchTerms(searchQuery: string) {
    const rawTerms = searchQuery
        .toLowerCase()
        .split(/[^a-z0-9+#.-]+/i)
        .map((term) => term.trim())
        .filter((term) => term.length >= 2);

    const searchTerms = new Set<string>(rawTerms);

    if (searchQuery.trim()) {
        searchTerms.add(searchQuery.trim().toLowerCase());
        searchTerms.add(searchQuery.trim().toLowerCase().replace(/\s+/g, "-"));
    }

    return [...searchTerms].filter(Boolean);
}

function escapeLikeValue(value: string) {
    return value.replace(/[%_,]/g, "");
}

export async function getToolsPage({
    limit = LIBRARY_PAGE_SIZE,
    offset = 0,
    includeCount = true,
    searchQuery = "",
    category = "",
    subcategory = "",
    tag = "",
}: GetToolsPageOptions = {}) {
    const safeLimit = Math.max(1, Math.min(limit, 24));
    const safeOffset = Math.max(0, offset);

    let toolsQuery = supabaseAdmin
        .from("tools")
        .select("*", includeCount ? { count: "exact" } : undefined)
        .order("name", { ascending: true });

    if (searchQuery) {
        const normalizedSearch = escapeLikeValue(searchQuery.trim());
        const tagSearchTerms = buildTagSearchTerms(searchQuery);
        const searchFilters = [
            `name.ilike.%${normalizedSearch}%`,
            `description.ilike.%${normalizedSearch}%`,
        ];

        if (tagSearchTerms.length > 0) {
            searchFilters.push(`tags.ov.{${tagSearchTerms.join(",")}}`);
        }

        toolsQuery = toolsQuery.or(searchFilters.join(","));
    }

    if (category) {
        toolsQuery = toolsQuery.eq("category", category);
    }

    if (subcategory) {
        toolsQuery = toolsQuery.eq("subcategory", subcategory);
    }

    if (tag) {
        toolsQuery = toolsQuery.contains("tags", [tag]);
    }

    if (includeCount) {
        toolsQuery = toolsQuery.range(safeOffset, safeOffset + safeLimit - 1);
    } else {
        toolsQuery = toolsQuery.range(safeOffset, safeOffset + safeLimit);
    }

    const { data, error, count } = await toolsQuery;

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

export async function getToolFilters(): Promise<ToolFilters> {
    const { data, error } = await supabaseAdmin
        .from("tools")
        .select("category, subcategory");

    if (error) {
        throw new Error(`Failed to fetch tool filters: ${error.message}`);
    }

    const categories = new Set<string>();
    const subcategories = new Set<string>();
    const subcategoriesByCategory = new Map<string, Set<string>>();

    for (const row of data ?? []) {
        const category =
            typeof row.category === "string" && row.category.trim()
                ? row.category.trim()
                : null;
        const subcategory =
            typeof row.subcategory === "string" && row.subcategory.trim()
                ? row.subcategory.trim()
                : null;

        if (category) {
            categories.add(category);
        }

        if (subcategory) {
            subcategories.add(subcategory);
        }

        if (category && subcategory) {
            if (!subcategoriesByCategory.has(category)) {
                subcategoriesByCategory.set(category, new Set<string>());
            }

            subcategoriesByCategory.get(category)?.add(subcategory);
        }
    }

    return {
        categories: [...categories].sort((a, b) => a.localeCompare(b)),
        subcategories: [...subcategories].sort((a, b) => a.localeCompare(b)),
        subcategoriesByCategory: Object.fromEntries(
            [...subcategoriesByCategory.entries()].map(([category, values]) => [
                category,
                [...values].sort((a, b) => a.localeCompare(b)),
            ]),
        ),
    };
}
