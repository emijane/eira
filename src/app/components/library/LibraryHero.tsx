import LibraryFilters from "./LibraryFilters";

export default function LibraryHero() {
    return (
        <section className="relative max-w-420 mx-auto rounded-b-3xl overflow-hidden border-2 border-brand-ink/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.94)_0%,rgba(246,250,255,0.96)_38%,rgba(255,255,255,0.98)_100%)] px-6 py-10 shadow-[0_28px_90px_-42px_rgba(43,37,57,0.18)] sm:px-8 lg:px-12 lg:py-14">
            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_320px] lg:items-start">
                    <div>
                        <div className="flex items-center gap-4">
                            <span className="inline-flex items-center rounded-full border border-brand-ink/10 bg-white/88 px-4 py-1.5 text-xs font-semibold text-brand-haze">
                                curated tool library
                            </span>
                            <span className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(43,37,57,0.14),rgba(186,224,218,0.16),transparent)] sm:block" />
                        </div>

                        <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight text-brand-ink sm:text-5xl lg:text-[4rem] lg:leading-[1.02]">
                            Find your next favorite tool within minutes.
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-brand-copy">
                            Explore standout tools for building web products, narrow by category
                            or tags, and quickly scan what fits your stack best.
                        </p>
                        <LibraryFilters />
                    </div>

                    <div className="hidden lg:block">
                        <div className="rounded-[1.75rem] border border-brand-ink/8 bg-white/72 p-4 shadow-[0_22px_44px_-34px_rgba(43,37,57,0.18)] backdrop-blur-sm">
                            <div className="rounded-[1.4rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.72)_0%,rgba(238,244,255,0.92)_46%,rgba(255,255,255,0.82)_100%)] p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-haze">
                                    featured lens
                                </p>
                                <p className="mt-3 text-lg font-semibold tracking-tight text-brand-ink">
                                    Browse by stack, styling approach, or workflow.
                                </p>
                                <div className="mt-5 grid gap-3">
                                    <div className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3">
                                        <span className="text-sm font-medium text-brand-copy">
                                            ui kits
                                        </span>
                                        <span className="text-sm font-semibold text-brand-ink">
                                            24
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3">
                                        <span className="text-sm font-medium text-brand-copy">
                                            frameworks
                                        </span>
                                        <span className="text-sm font-semibold text-brand-ink">
                                            18
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3">
                                        <span className="text-sm font-medium text-brand-copy">
                                            dev tools
                                        </span>
                                        <span className="text-sm font-semibold text-brand-ink">
                                            31
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
