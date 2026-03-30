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
            className="relative isolate min-h-screen overflow-hidden bg-[#0b0714]"
        >
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 h-screen overflow-hidden">
                <div className="absolute inset-0 bg-[#0b0714]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(197,168,235,0.18),transparent_14%),radial-gradient(circle_at_82%_16%,rgba(112,89,228,0.24),transparent_16%),radial-gradient(circle_at_72%_38%,rgba(197,168,235,0.14),transparent_12%),radial-gradient(circle_at_22%_60%,rgba(112,89,228,0.16),transparent_14%),radial-gradient(circle_at_84%_72%,rgba(197,168,235,0.16),transparent_14%),radial-gradient(circle_at_36%_84%,rgba(112,89,228,0.2),transparent_16%)]" />
                <div className="absolute -left-16 top-12 h-64 w-64 rounded-full bg-[#d8bbff]/28 blur-[110px]" />
                <div className="absolute left-[22%] top-[8%] h-40 w-40 rounded-full bg-[#9b7bff]/22 blur-[90px]" />
                <div className="absolute right-[8%] top-[10%] h-72 w-72 rounded-full bg-[#7f63ff]/30 blur-[130px]" />
                <div className="absolute right-[22%] top-[34%] h-52 w-52 rounded-full bg-[#d6b5ff]/24 blur-[110px]" />
                <div className="absolute left-[6%] top-[42%] h-80 w-80 rounded-full bg-[#6f54f3]/22 blur-[140px]" />
                <div className="absolute left-[30%] bottom-[14%] h-56 w-56 rounded-full bg-[#c5a8eb]/18 blur-[110px]" />
                <div className="absolute right-[10%] bottom-[10%] h-72 w-72 rounded-full bg-[#7059e4]/24 blur-[130px]" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(11,7,20,0.44)_70%,rgba(11,7,20,0.78)_100%)]" />
            </div>
            <div className="relative z-10 mx-auto">
                <LibraryHero filters={filters} />
                {totalTools === 0 ? (
                    <LibraryEmptyState />
                ) : (
                    <div className="mt-2 px-6 pb-8 sm:px-8 lg:px-12">
                        <div className="mx-auto max-w-[1560px]">
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
