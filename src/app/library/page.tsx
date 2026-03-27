import LibraryEmptyState from "@/app/components/library/LibraryEmptyState";
import LibraryHero from "@/app/components/library/LibraryHero";
import PaginatedLibrarySection from "@/app/components/library/PaginatedLibrarySection";
import type { LibraryTool } from "@/app/components/library/types";
import { getTools } from "@/lib/getTools";

const TOOLS_PER_PAGE = 9;

export default async function LibraryPage({
    searchParams,
}: {
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
    const tools = (await getTools()) as LibraryTool[];
    const resolvedSearchParams = await searchParams;
    const rawPage = resolvedSearchParams?.page;
    const pageParam = Array.isArray(rawPage) ? rawPage[0] : rawPage;
    const currentPage = Math.max(1, Number(pageParam) || 1);
    const pageCount = Math.max(1, Math.ceil(tools.length / TOOLS_PER_PAGE));
    const safePage = Math.min(currentPage, pageCount);
    const start = (safePage - 1) * TOOLS_PER_PAGE;
    const paginatedTools = tools.slice(start, start + TOOLS_PER_PAGE);
    const startIndex = tools.length === 0 ? 0 : start + 1;
    const endIndex = Math.min(start + TOOLS_PER_PAGE, tools.length);

    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#fff9f4_0%,#fffdf9_42%,#ffffff_100%)]">
            <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
                <LibraryHero />
                {tools.length === 0 ? (
                    <LibraryEmptyState />
                ) : (
                    <PaginatedLibrarySection
                        tools={paginatedTools}
                        totalTools={tools.length}
                        currentPage={safePage}
                        pageCount={pageCount}
                        startIndex={startIndex}
                        endIndex={endIndex}
                    />
                )}
            </div>
        </main>
    );
}
