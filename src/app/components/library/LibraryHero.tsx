import LibraryFilters from "./LibraryFilters";

export default function LibraryHero() {
    return (
        <section className="overflow-visible rounded-[2rem] border border-stone-200/70 bg-white px-6 py-8 shadow-[0_24px_80px_-40px_rgba(120,53,15,0.18)] sm:px-8 lg:px-10 lg:py-9">
            <div>
                <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-800">
                    Curated Tool Library
                </span>

                <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                    Discover beautiful tools for building on the web.
                </h1>

                <p className="mt-4 max-w-3xl text-base leading-7 text-stone-600 sm:text-lg">
                    A warm, browsable collection of standout UI kits, frameworks,
                    and developer tools, organized so you can scan quickly and find
                    the right fit.
                </p>

                <LibraryFilters />
            </div>
        </section>
    );
}
