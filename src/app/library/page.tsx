import LibraryEmptyState from "@/app/components/library/LibraryEmptyState";
import LibraryGrid from "@/app/components/library/LibraryGrid";
import LibraryHero from "@/app/components/library/LibraryHero";
import type { LibraryTool } from "@/app/components/library/types";
import { getTools } from "@/lib/getTools";

export default async function LibraryPage() {
    const tools = (await getTools()) as LibraryTool[];

    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#fff9f4_0%,#fffdf9_42%,#ffffff_100%)]">
            <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
                <LibraryHero />
                {tools.length === 0 ? <LibraryEmptyState /> : <LibraryGrid tools={tools} />}
            </div>
        </main>
    );
}
