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
            <div className="mb-6 rounded-3xl border border-brand-ink/10 bg-white/90 p-6 shadow-[0_20px_50px_-38px_rgba(43,37,57,0.28)]">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-haze">
                            results
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-brand-ink">
                            {totalTools} tools found
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-brand-copy">
                            Explore curated picks across frameworks, ui kits, and developer
                            tools.
                        </p>
                    </div>

                    <div className="w-full sm:max-w-[15rem]">
                        <label className="block">
                            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-brand-haze">
                                sort by
                            </span>
                            <select className="h-11 w-full rounded-2xl border border-brand-ink/10 bg-brand-cream px-4 text-sm text-brand-ink outline-none">
                                <option>Most popular</option>
                                <option>Newest</option>
                                <option>Alphabetical</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                {tools.map((tool) => (
                    <LibraryCard key={tool.id} tool={tool} />
                ))}
            </div>
        </section>
    );
}
