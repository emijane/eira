import LibraryCard from "./LibraryCard";
import { LibrarySearchBar } from "./LibraryFilters";
import type { LibraryTool } from "./types";

export default function LibraryGrid({
    tools,
    visibleTools = tools.length,
}: {
    tools: LibraryTool[];
    visibleTools?: number;
}) {
    return (
        <section>
            <div className="mb-6 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(20,15,34,0.84)_0%,rgba(14,10,24,0.76)_100%)] p-6 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.72)] backdrop-blur-xl">
                <div className="flex flex-col gap-5">
                    <LibrarySearchBar />
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                                results
                            </p>
                            <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]">
                                {visibleTools} tools
                            </h3>
                            <p className="mt-2 text-[0.92rem] leading-6 text-white/68">
                                Scroll to keep exploring curated picks across frameworks, ui kits,
                                and developer tools.
                            </p>
                        </div>

                        <div className="w-full sm:max-w-[15rem]">
                            <label className="block">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                                    sort by
                                </span>
                                <select className="h-11 w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-sm text-white outline-none">
                                    <option>Most popular</option>
                                    <option>Newest</option>
                                    <option>Alphabetical</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2 ">
                {tools.map((tool) => (
                    <LibraryCard key={tool.id} tool={tool} />
                ))}
            </div>
        </section>
    );
}
