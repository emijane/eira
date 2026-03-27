import LibraryCard from "./LibraryCard";
import type { LibraryTool } from "./types";

export default function LibraryGrid({ tools }: { tools: LibraryTool[] }) {
    return (
        <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => (
                <LibraryCard key={tool.id} tool={tool} />
            ))}
        </section>
    );
}
