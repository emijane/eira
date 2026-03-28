import LibraryCard from "./LibraryCard";
import type { LibraryTool } from "./types";

export default function LibraryGrid({
    tools,
    totalTools,
}: {
    tools: LibraryTool[];
    totalTools: number;
}) {
    return (
        <section>
            <div className="mb-6 flex flex-col gap-4 border-b border-brand-ink/8 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-haze">
                        results
                    </p>
                    <p className="mt-2 text-base font-semibold text-brand-ink">
                        {totalTools} tools found
                    </p>
                </div>

                <label className="flex min-w-[13rem] flex-col gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-haze">
                        sort by
                    </span>
                    <select className="h-11 rounded-2xl border border-brand-ink/10 bg-white px-4 text-sm text-brand-ink outline-none">
                        <option>Most popular</option>
                        <option>Newest</option>
                        <option>Alphabetical</option>
                    </select>
                </label>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                {tools.map((tool) => (
                    <LibraryCard key={tool.id} tool={tool} />
                ))}
            </div>
        </section>
    );
}
