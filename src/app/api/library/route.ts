import { NextResponse } from "next/server";
import { getToolsPage, LIBRARY_PAGE_SIZE } from "@/lib/getTools";

function parsePositiveInt(value: string | null, fallback: number) {
    const parsed = Number.parseInt(value ?? "", 10);

    if (!Number.isFinite(parsed) || parsed < 0) {
        return fallback;
    }

    return parsed;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = parsePositiveInt(searchParams.get("limit"), LIBRARY_PAGE_SIZE);
    const offset = parsePositiveInt(searchParams.get("offset"), 0);
    const searchQuery = searchParams.get("q")?.trim() ?? "";
    const category = searchParams.get("category")?.trim() ?? "";
    const subcategory = searchParams.get("subcategory")?.trim() ?? "";
    const tag = searchParams.get("tag")?.trim() ?? "";

    try {
        const result = await getToolsPage({
            limit,
            offset,
            includeCount: false,
            searchQuery,
            category,
            subcategory,
            tag,
        });
        return NextResponse.json(result);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to fetch tools.";

        return NextResponse.json({ message }, { status: 500 });
    }
}
