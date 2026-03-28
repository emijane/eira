import LibraryEmptyState from "@/app/components/library/LibraryEmptyState";
import LibraryHero from "@/app/components/library/LibraryHero";
import LibraryGrid from "@/app/components/library/LibraryGrid";
import LibrarySidebar from "@/app/components/library/LibrarySidebar";
import type { LibraryTool } from "@/app/components/library/types";
import { getTools } from "@/lib/getTools";

export default async function LibraryPage({
}: object) {
    const tools = (await getTools()) as LibraryTool[];

    return (
        <main
            className="min-h-screen bg-white"
        >
            <div className="mx-auto">
                <LibraryHero />
                {tools.length === 0 ? (
                    <LibraryEmptyState />
                ) : (
                    <div className="mt-10 mx-auto max-w-7xl grid gap-8 xl:grid-cols-[minmax(0,1.9fr)_320px] xl:items-start">
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
