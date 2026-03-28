import LibraryFilters from "./LibraryFilters";

export default function LibraryHero() {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-brand-ink/10 bg-white/80 px-6 py-10 shadow-[0_28px_90px_-42px_rgba(43,37,57,0.18)] sm:px-8 lg:px-10 lg:py-12">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(90deg,rgba(239,200,200,0.12),rgba(186,224,218,0.12),rgba(255,255,255,0))]" />
                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(186,224,218,0.18)_0%,rgba(186,224,218,0)_70%)]" />
            </div>

            <div className="relative max-w-4xl">
                <span className="inline-flex items-center rounded-full border border-brand-ink/12 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-haze">
                    curated tool library
                </span>

                <h1 className="mt-8 text-4xl font-semibold tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
                    Discover your next build tool faster.
                </h1>

                <h2 className="mt-4 max-w-3xl text-2xl font-medium tracking-tight text-brand-inkSoft sm:text-3xl">
                    Browse curated frameworks, ui kits, and developer resources in one place.
                </h2>

                <p className="mt-5 max-w-3xl text-base leading-7 text-brand-copy sm:text-lg">
                    Explore standout tools for shipping web products, compare categories at a
                    glance, and save time finding the right fit for your stack.
                </p>

                <LibraryFilters />
            </div>
        </section>
    );
}
