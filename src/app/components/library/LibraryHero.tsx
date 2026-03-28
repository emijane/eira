import Link from "next/link";
import type { ToolFilters } from "@/lib/getTools";
import LibraryFilters from "./LibraryFilters";

export default function LibraryHero({ filters }: { filters: ToolFilters }) {
    const featuredCategories = Object.entries(filters.categoryCounts)
        .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
        .slice(0, 3);

    return (
        <section className="relative overflow-visible border-b border-b-white bg-[radial-gradient(circle_at_top_right,rgba(167,210,255,0.28),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(196,181,253,0.24),transparent_22%),linear-gradient(135deg,#3d3360_0%,#4d5fbf_22%,#8da7ff_52%,#6fcfe2_78%,#d3f2f3_100%)] px-6 py-10 shadow-[0_28px_90px_-42px_rgba(43,37,57,0.28)] sm:px-8 lg:px-12 lg:py-14">
            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_320px] lg:items-start">
                    <div>
                        <div className="flex items-center gap-4">
                            <span className="inline-flex items-center rounded-full border border-white/24 bg-white/16 px-4 py-1.5 text-xs font-semibold text-white/88 backdrop-blur-sm">
                                curated tool library
                            </span>
                            <span className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.22),rgba(209,242,243,0.28),transparent)] sm:block" />
                        </div>

                        <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[4rem] lg:leading-[1.02]">
                            Find your next favorite tool within minutes.
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-white/84">
                            Explore standout tools for building web products, narrow by category
                            or tags, and quickly scan what fits your stack best.
                        </p>
                        <LibraryFilters filters={filters} />
                    </div>

                    <div className="hidden lg:block">
                        <div className="rounded-[1.75rem] border border-white/24 bg-white/18 p-4 shadow-[0_22px_44px_-34px_rgba(43,37,57,0.3)] backdrop-blur-xl">
                            <div className="rounded-[1.4rem] border border-white/42 bg-[linear-gradient(160deg,rgba(255,255,255,0.82)_0%,rgba(240,248,255,0.68)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                                    quick paths
                                </p>
                                <p className="mt-3 text-lg font-semibold tracking-tight text-slate-900">
                                    Jump straight into the busiest parts of the library.
                                </p>
                                <div className="mt-5 grid gap-3">
                                    {featuredCategories.map(([category, count]) => (
                                        <Link
                                            key={category}
                                            href={`/library?category=${encodeURIComponent(category)}`}
                                            className="flex items-center justify-between rounded-2xl border border-white/38 bg-[rgba(255,255,255,0.56)] px-4 py-3 text-left shadow-[0_10px_24px_-20px_rgba(43,37,57,0.25)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/72"
                                        >
                                            <span className="block text-sm font-semibold text-slate-800">
                                                {category}
                                            </span>
                                            <span className="text-sm font-semibold text-slate-900">
                                                {count}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href="/library"
                                    className="mt-4 inline-flex text-sm font-semibold text-slate-700 transition hover:text-slate-950"
                                >
                                    Explore the full library
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
