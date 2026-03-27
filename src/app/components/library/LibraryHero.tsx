import LibraryFilters from "./LibraryFilters";

export default function LibraryHero() {
    return (
        <section className="relative overflow-visible rounded-[2rem] border border-[rgba(43,37,57,0.10)] bg-[linear-gradient(180deg,#fffefc_0%,#ffffff_100%)] px-6 py-8 shadow-[0_28px_90px_-42px_rgba(43,37,57,0.18)] sm:px-8 lg:px-10 lg:py-10">
            {/* decorative color atmospheres that sit behind the hero copy */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
                <div className="absolute -left-8 top-20 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(255,196,196,0.45)_0%,rgba(255,196,196,0)_72%)]" />
                <div className="absolute right-[-2.5rem] top-[-1.5rem] h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(186,224,218,0.32)_0%,rgba(186,224,218,0)_72%)]" />
            </div>

            <div className="relative">
                {/* the hero pairs the main message with a supporting "featured lens" card on large screens */}
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center rounded-full border border-[#2B2539]/16 bg-[#2B2539] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-20px_rgba(43,37,57,0.55)]">
                                Curated Tool Library
                            </span>
                            <span className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(123,103,103,0.24),rgba(186,224,218,0.18),rgba(239,200,200,0.12),transparent)] sm:block" />
                        </div>

                        <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl lg:text-[3.7rem] lg:leading-[1.02]">
                            Discover beautiful tools for building on the web.
                        </h1>

                        <p className="mt-5 max-w-3xl text-base leading-7 text-stone-600 sm:text-lg">
                            A warm, browsable collection of standout UI kits, frameworks,
                            and developer tools, organized so you can scan quickly and find
                            the right fit.
                        </p>
                    </div>

                    <div className="hidden lg:block">
                        <div className="rounded-[1.75rem] border border-[#2B2539]/14 bg-[#2B2539] p-4 shadow-[0_24px_44px_-30px_rgba(43,37,57,0.28)]">
                            <div className="rounded-[1.25rem] border border-[#2B2539]/12 bg-[linear-gradient(135deg,rgba(239,200,200,0.46)_0%,rgba(186,224,218,0.38)_34%,rgba(238,239,200,0.36)_68%,rgba(196,181,253,0.18)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64586d]">
                                    Featured Lens
                                </p>
                                <p className="mt-3 text-lg font-semibold tracking-tight text-[#2B2539]">
                                    Browse by vibe, stack, or category.
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    <span className="rounded-full border border-[#2B2539]/14 bg-white/82 px-3 py-1 text-xs font-medium text-[#2B2539] shadow-[0_10px_18px_-16px_rgba(43,37,57,0.45)]">
                                        UI Kits
                                    </span>
                                    <span className="rounded-full border border-[#2B2539]/14 bg-white/82 px-3 py-1 text-xs font-medium text-[#2B2539] shadow-[0_10px_18px_-16px_rgba(43,37,57,0.45)]">
                                        Frameworks
                                    </span>
                                    <span className="rounded-full border border-[#2B2539]/14 bg-white/82 px-3 py-1 text-xs font-medium text-[#2B2539] shadow-[0_10px_18px_-16px_rgba(43,37,57,0.45)]">
                                        Dev Tools
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <LibraryFilters />
            </div>
        </section>
    );
}
