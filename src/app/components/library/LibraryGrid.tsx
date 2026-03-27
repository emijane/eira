import LibraryCard from "./LibraryCard";
import type { LibraryTool } from "./types";

export default function LibraryGrid({
    tools,
    totalTools,
    startIndex,
    endIndex,
}: {
    tools: LibraryTool[];
    totalTools: number;
    startIndex: number;
    endIndex: number;
}) {
    return (
        <section className="mt-10">
            <div className="mb-5">
                <p className="text-sm font-medium text-stone-600">
                    Showing {startIndex}-{endIndex} of {totalTools} tools
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool) => (
                    <LibraryCard key={tool.id} tool={tool} />
                ))}
            </div>
        </section>
    );
}
