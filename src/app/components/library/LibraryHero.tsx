import Link from "next/link";
import type { ToolFilters } from "@/lib/getTools";
import LibraryFilters from "./LibraryFilters";

export default function LibraryHero({ filters }: { filters: ToolFilters }) {
    const featuredCategories = Object.entries(filters.categoryCounts)
        .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
        .slice(0, 3);
    const collectionPreview = featuredCategories.slice(0, 2);
    const primaryCollection = collectionPreview[0]?.[0] ?? "UI & Styling";
    const totalTools = Object.values(filters.categoryCounts).reduce(
        (sum, count) => sum + count,
        0
    );
    const totalCategories = filters.categories.length;

    return (
        <section className="relative overflow-visible border-b border-b-white/60 bg-[radial-gradient(circle_at_top_right,rgba(196,181,253,0.28),transparent_18%),radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.16),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(120,214,229,0.24),transparent_24%),linear-gradient(135deg,#403569_0%,#5765c8_28%,#85a8ff_60%,#75d1e1_84%,#d5f2f3_100%)] px-6 py-10 shadow-[0_28px_90px_-42px_rgba(43,37,57,0.28)] sm:px-8 lg:px-12 lg:py-16">
            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_340px] lg:items-start xl:grid-cols-[minmax(0,1.15fr)_360px]">
                    <div>
                        <div className="flex items-center gap-4">
                            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/12 px-4 py-1.5 text-xs font-semibold text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm">
                                curated tool library
                            </span>
                            <span className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.22),rgba(209,242,243,0.28),transparent)] sm:block" />
                        </div>

                        <h1 className="mt-8 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-[4.25rem] lg:leading-[0.98]">
                            Find your next favorite tool within minutes.
                        </h1>

                        <p className="mt-6 max-w-2xl text-[1.02rem] leading-8 text-white/84">
                            Explore standout tools for building web products, narrow by category
                            or tags, and quickly scan what fits your stack best.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/86">
                            <span className="inline-flex items-center rounded-full border border-white/18 bg-white/12 px-3.5 py-1.5 backdrop-blur-sm">
                                {totalTools} tools cataloged
                            </span>
                            <span className="inline-flex items-center rounded-full border border-white/18 bg-white/12 px-3.5 py-1.5 backdrop-blur-sm">
                                {totalCategories} categories to explore
                            </span>
                            {featuredCategories[0] ? (
                                <span className="inline-flex items-center rounded-full border border-white/18 bg-white/12 px-3.5 py-1.5 backdrop-blur-sm">
                                    Popular: {featuredCategories[0][0]}
                                </span>
                            ) : null}
                        </div>
                        <LibraryFilters filters={filters} />
                    </div>

                    <div className="hidden lg:block">
                        <div className="rounded-[2rem] border border-white/24 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.1)_100%)] p-4 shadow-[0_28px_50px_-34px_rgba(31,25,49,0.46)] backdrop-blur-xl">
                            <div className="rounded-[1.6rem] border border-white/40 bg-[linear-gradient(160deg,rgba(255,255,255,0.86)_0%,rgba(238,247,255,0.7)_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                                    curated collection
                                </p>
                                <p className="mt-4 max-w-[15rem] text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.04em] text-slate-900">
                                    Tools for shipping polished interfaces faster.
                                </p>
                                <p className="mt-4 text-sm leading-7 text-slate-600">
                                    A focused starting point for building UI systems, landing
                                    pages, and frontend workflows that feel finished.
                                </p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {collectionPreview.map(([category, count]) => (
                                        <span
                                            key={category}
                                            className="inline-flex items-center rounded-full border border-white/52 bg-[rgba(255,255,255,0.7)] px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-[0_10px_24px_-22px_rgba(43,37,57,0.24)]"
                                        >
                                            {category}
                                            <span className="ml-2 text-slate-500">{count}</span>
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6 rounded-[1.4rem] border border-white/44 bg-[rgba(255,255,255,0.56)] p-4 shadow-[0_12px_28px_-24px_rgba(43,37,57,0.28)]">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                                        includes
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-700">
                                        Hand-picked picks across{" "}
                                        <span className="font-semibold text-slate-900">
                                            {primaryCollection}
                                        </span>{" "}
                                        and adjacent categories worth browsing together.
                                    </p>
                                </div>
                                <Link
                                    href={`/library?category=${encodeURIComponent(primaryCollection)}`}
                                    className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_-22px_rgba(15,23,42,0.65)] transition hover:bg-slate-800"
                                >
                                    View collection
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
