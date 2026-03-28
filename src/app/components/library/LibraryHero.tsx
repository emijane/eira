import LibraryFilters from "./LibraryFilters";

export default function LibraryHero() {
    return (
        <section className="relative w-full overflow-hidden rounded-4xl border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.94)_0%,rgba(246,250,255,0.96)_38%,rgba(255,255,255,0.98)_100%)] px-6 py-10 shadow-[0_28px_90px_-42px_rgba(43,37,57,0.18)] sm:px-8 lg:px-12 lg:py-14">
            <div className="relative max-w-380 mx-auto">
                <span className="inline-flex items-center rounded-full border border-brand-ink/10 bg-white/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-haze">
                    curated tool library
                </span>

                <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight text-brand-ink sm:text-5xl lg:text-[4rem] lg:leading-[1.02]">
                    Find your next favorite tool within minutes.
                </h1>

                <h2 className="mt-4 max-w-2xl text-xl font-medium tracking-tight text-brand-inkSoft sm:text-2xl">
                    Browse curated frameworks, ui kits, and developer resources with a cleaner workflow.
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-brand-copy sm:text-base">
                    Explore standout tools for building web products, narrow by category or tags,
                    and quickly scan what fits your stack best.
                </p>

                <LibraryFilters />
            </div>
        </section>
    );
}
