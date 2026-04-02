import LibraryEmptyState from "@/app/components/library/LibraryEmptyState";
import LibraryHero from "@/app/components/library/LibraryHero";
import InfiniteLibraryGrid from "@/app/components/library/InfiniteLibraryGrid";
import { getToolFilters, getToolsPage, LIBRARY_PAGE_SIZE } from "@/lib/getTools";

export default async function LibraryPage({
    searchParams,
}: {
    searchParams?: Promise<{
        q?: string;
        category?: string;
        subcategory?: string;
        sort?: string;
    }>;
}) {
    const params = await searchParams;
    const query = params?.q?.trim() ?? "";
    const category = params?.category?.trim() ?? "";
    const subcategory = params?.subcategory?.trim() ?? "";
    const sort = params?.sort?.trim() ?? "popular";
    const [filters, { tools, totalTools, hasMore }] = await Promise.all([
        getToolFilters(),
        getToolsPage({
            limit: LIBRARY_PAGE_SIZE,
            offset: 0,
            searchQuery: query,
            category,
            subcategory,
        }),
    ]);

    return (
        <main
            className="min-h-screen bg-white"
        >
            <div className="mx-auto max-w-400">
                <LibraryHero />
                {totalTools === 0 ? (
                    <LibraryEmptyState />
                ) : (
                    <div className="mt-2 px-6 pb-8 sm:px-8 lg:px-12">
                        <div>
                            <InfiniteLibraryGrid
                                initialTools={tools}
                                initialHasMore={hasMore}
                                pageSize={LIBRARY_PAGE_SIZE}
                                filters={filters}
                                searchQuery={query}
                                category={category}
                                subcategory={subcategory}
                                sort={sort}
                            />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
