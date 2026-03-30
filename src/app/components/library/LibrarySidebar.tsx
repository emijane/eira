import type { ToolFilters } from "@/lib/getTools";
import { LibrarySidebarFilters } from "./LibraryFilters";

const relatedTools = [
    "ui kits",
    "react libraries",
    "tailwind plugins",
    "design systems",
    "dev tools",
    "component libraries",
];

export default function LibrarySidebar({ filters }: { filters: ToolFilters }) {
    return (
        <aside className="space-y-6">
            <LibrarySidebarFilters filters={filters} />
            <section className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(20,15,34,0.84)_0%,rgba(14,10,24,0.76)_100%)] p-6 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.72)] backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    submit a tool
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    share something worth bookmarking.
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/68">
                    suggest a standout framework, ui kit, or developer resource for the
                    library.
                </p>
                <label className="mt-5 block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                        website
                    </span>
                    <input
                        type="text"
                        placeholder="https://example.com"
                        className="h-11 w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-sm text-white outline-none placeholder:text-white/34"
                    />
                </label>
                <button
                    type="button"
                    className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/18 px-4 text-sm font-medium text-primary transition hover:bg-secondary/26 hover:text-white"
                >
                    submit a tool
                </button>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(18,14,31,0.82)_0%,rgba(13,10,22,0.72)_100%)] p-6 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    related tools
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {relatedTools.map((tool) => (
                        <span
                            key={tool}
                            className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-white/64"
                        >
                            {tool}
                        </span>
                    ))}
                </div>
            </section>
        </aside>
    );
}
