import LibraryEmptyState from "@/app/components/library/LibraryEmptyState";
import LibraryHero from "@/app/components/library/LibraryHero";
import LibraryGrid from "@/app/components/library/LibraryGrid";
import LibrarySidebar from "@/app/components/library/LibrarySidebar";
import type { LibraryTool } from "@/app/components/library/types";
import { getTools } from "@/lib/getTools";

export default async function LibraryPage({
}: {}) {
    const tools = (await getTools()) as LibraryTool[];

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(186,224,218,0.16),transparent_24%),radial-gradient(circle_at_top_left,rgba(239,200,200,0.18),transparent_28%),linear-gradient(180deg,#fdf8f4_0%,#fffdfb_42%,#ffffff_100%)]">
            <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
                <LibraryHero />
                {tools.length === 0 ? (
                    <LibraryEmptyState />
                ) : (
                    <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1.9fr)_320px] xl:items-start">
                        <LibraryGrid tools={tools} totalTools={tools.length} />
                        <div className="xl:sticky xl:top-28">
                            <LibrarySidebar />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
