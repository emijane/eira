import LibraryEmptyState from "@/app/components/library/LibraryEmptyState";
import LibraryHero from "@/app/components/library/LibraryHero";
import InfiniteLibraryGrid from "@/app/components/library/InfiniteLibraryGrid";
import LibrarySidebar from "@/app/components/library/LibrarySidebar";
import { getToolsPage, LIBRARY_PAGE_SIZE } from "@/lib/getTools";

export default async function LibraryPage({
}: object) {
    const { tools, totalTools, hasMore } = await getToolsPage({
        limit: LIBRARY_PAGE_SIZE,
        offset: 0,
    });

    return (
        <main
            className="min-h-screen bg-white"
        >
            <div className="mx-auto">
                <LibraryHero />
                {totalTools === 0 ? (
                    <LibraryEmptyState />
                ) : (
                    <div className="mt-10 p-7 lg:p-0 mx-auto max-w-7xl grid gap-8 xl:grid-cols-[minmax(0,1.9fr)_320px] xl:items-start">
                        <InfiniteLibraryGrid
                            initialTools={tools}
                            initialHasMore={hasMore}
                            pageSize={LIBRARY_PAGE_SIZE}
                        />
                        <div className="xl:sticky xl:top-28">
                            <LibrarySidebar />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
