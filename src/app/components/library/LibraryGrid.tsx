import LibraryCard from "./LibraryCard";
import { LibraryControls } from "./LibraryFilters";
import type { ToolFilters } from "@/lib/getTools";
import type { LibraryTool } from "./types";

export default function LibraryGrid({
    filters,
    tools,
}: {
    filters: ToolFilters;
    tools: LibraryTool[];
}) {
    return (
        <section>
            <LibraryControls filters={filters} />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool) => (
                    <LibraryCard key={tool.id} tool={tool} />
                ))}
            </div>
        </section>
    );
}
