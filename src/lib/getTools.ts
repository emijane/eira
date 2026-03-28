import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const LIBRARY_PAGE_SIZE = 12;
const MAX_SEARCH_QUERY_LENGTH = 80;
const MAX_SEARCH_TERMS = 8;

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

type SearchableTool = {
    name: string | null;
    description: string | null;
    tags: string[] | null;
};

function normalizeSearchInput(value: string) {
    return value
        .slice(0, MAX_SEARCH_QUERY_LENGTH)
        .toLowerCase()
        .trim()
        .replace(/[{}()<>[\]\\]/g, " ")
        .replace(/[^a-z0-9+#.\-\s]/gi, " ")
        .replace(/\s+/g, " ");
}

function compactSearchValue(value: string) {
    return value.replace(/[\s.-]+/g, "");
}

function buildSearchTerms(searchQuery: string) {
    const normalizedQuery = normalizeSearchInput(searchQuery);
    const rawTerms = normalizedQuery
        .split(" ")
        .map((term) => term.trim())
        .filter((term) => term.length >= 2)
        .slice(0, MAX_SEARCH_TERMS);

    const searchTerms = new Set<string>(rawTerms);

    if (normalizedQuery) {
        searchTerms.add(normalizedQuery);
        searchTerms.add(normalizedQuery.replace(/\s+/g, "-"));
        searchTerms.add(compactSearchValue(normalizedQuery));
    }

    return [...searchTerms]
        .filter((term) => term.length >= 2)
        .slice(0, MAX_SEARCH_TERMS);
}

function escapeLikeValue(value: string) {
    return value.replace(/[%_,:{}()<>[\]\\]/g, "");
}

function sanitizeOverlapTerm(value: string) {
    return value.replace(/[{},"]/g, "");
}

function scoreToolMatch(tool: SearchableTool, searchQuery: string) {
    const normalizedSearch = normalizeSearchInput(searchQuery);
    const compactSearch = compactSearchValue(normalizedSearch);
    const searchTerms = buildSearchTerms(searchQuery);
    const normalizedName = normalizeSearchInput(tool.name ?? "");
    const normalizedDescription = normalizeSearchInput(tool.description ?? "");
    const normalizedTags = (tool.tags ?? []).map((tag) => normalizeSearchInput(tag));
    const compactName = compactSearchValue(normalizedName);
    const compactDescription = compactSearchValue(normalizedDescription);
    const compactTags = normalizedTags.map((tag) => compactSearchValue(tag));

    let score = 0;

    if (normalizedName === normalizedSearch || compactName === compactSearch) {
        score += 120;
    } else if (
        normalizedName.startsWith(normalizedSearch) ||
        compactName.startsWith(compactSearch)
    ) {
        score += 90;
    } else if (
        normalizedName.includes(normalizedSearch) ||
        compactName.includes(compactSearch)
    ) {
        score += 70;
    }

    for (const tag of normalizedTags) {
        if (tag === normalizedSearch) {
            score += 45;
        } else if (tag.includes(normalizedSearch)) {
            score += 28;
        }
    }

    if (
        normalizedDescription.includes(normalizedSearch) ||
        compactDescription.includes(compactSearch)
    ) {
        score += 18;
    }

    for (const term of searchTerms) {
        const compactTerm = compactSearchValue(term);

        if (normalizedName.includes(term) || compactName.includes(compactTerm)) {
            score += 12;
        }

        if (normalizedDescription.includes(term) || compactDescription.includes(compactTerm)) {
            score += 5;
        }

        if (normalizedTags.some((tag) => tag.includes(term))) {
            score += 8;
        }

        if (compactTags.some((tag) => tag.includes(compactTerm))) {
            score += 8;
        }
    }

    return score;
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
    const normalizedSearch = normalizeSearchInput(searchQuery);

    let toolsQuery = supabaseAdmin
        .from("tools")
        .select("*", includeCount ? { count: "exact" } : undefined)
        .order("name", { ascending: true });

    if (normalizedSearch) {
        const safeSearch = escapeLikeValue(normalizedSearch);
        const searchTerms = buildSearchTerms(searchQuery).map(sanitizeOverlapTerm);
        const searchFilters = [
            `name.ilike.%${safeSearch}%`,
            `description.ilike.%${safeSearch}%`,
        ];

        if (searchTerms.length > 0) {
            searchFilters.push(`tags.ov.{${searchTerms.join(",")}}`);
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

    if (normalizedSearch) {
        const { data, error } = await toolsQuery;

        if (error) {
            throw new Error(`Failed to fetch tools: ${error.message}`);
        }

        const rankedTools = (data ?? [])
            .map((tool) => ({
                tool,
                score: scoreToolMatch(tool, searchQuery),
            }))
            .filter(({ score }) => score > 0)
            .sort((left, right) => {
                if (right.score !== left.score) {
                    return right.score - left.score;
                }

                return (left.tool.name ?? "").localeCompare(right.tool.name ?? "");
            })
            .map(({ tool }) => tool);

        const totalTools = rankedTools.length;
        const tools = rankedTools.slice(safeOffset, safeOffset + safeLimit);

        return {
            tools,
            totalTools,
            hasMore: safeOffset + tools.length < totalTools,
            nextOffset: safeOffset + tools.length,
        };
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
