import LibraryEmptyState from "@/app/components/library/LibraryEmptyState";
import LibraryHero from "@/app/components/library/LibraryHero";
import InfiniteLibraryGrid from "@/app/components/library/InfiniteLibraryGrid";
import LibrarySidebar from "@/app/components/library/LibrarySidebar";
import { getToolsPage, LIBRARY_PAGE_SIZE } from "@/lib/getTools";

// This is the main page for the library, which displays a list of tools with 
// infinite scrolling and a sidebar for filtering and searching.

export default async function LibraryPage({
    // The searchParams prop is an object that contains the query parameters 
    // from the URL, which can be used for filtering the tools displayed on 
    // the page.
    searchParams,
    }: {
    // parameters are optional and may include a search query (q), 
    // a category, and a tag for filtering the tools.
    searchParams?: Promise<{
        q?: string;
        category?: string;
        tag?: string;
    }>;
}) {
    // Await the searchParams to extract the query, category, and tag for 
    // filtering the tools.
    const params = await searchParams;

    // Trim the query, category, and tag parameters to remove any leading or
    // trailing whitespace, and provide default empty strings if they are not 
    // provided.
    const query = params?.q?.trim() ?? "";
    const category = params?.category?.trim() ?? "";
    const tag = params?.tag?.trim() ?? "";

    // Fetch the first page of tools from the database using the getToolsPage
    // function, passing in the query, category, and tag for filtering, as well 
    // as the limit and offset for pagination.
    const { tools, totalTools, hasMore } = await getToolsPage({
    limit: LIBRARY_PAGE_SIZE,
    offset: 0,
    searchQuery: query,
    category,
    tag,
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
