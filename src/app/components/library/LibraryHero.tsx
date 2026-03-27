const quickFilterPills = [
    "All Tools",
    "UI & Styling",
    "React",
    "Design Systems",
    "Developer Experience",
];

export default function LibraryHero() {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-stone-200/70 bg-[linear-gradient(180deg,#fffdfa_0%,#fff8f1_100%)] px-7 py-10 shadow-[0_24px_80px_-40px_rgba(120,53,15,0.18)] sm:px-10 lg:px-12 lg:py-12">
            <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.10),_transparent_38%)]" />

            <div className="relative max-w-5xl">
                <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-900">
                    Curated Tool Library
                </span>

                <h1 className="mt-15 max-w-2xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                    Discover beautiful tools for building on the web.
                </h1>

                <p className="mt-4 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
                    A warm, browsable collection of standout UI kits, frameworks,
                    and developer tools, organized so you can scan quickly and find
                    the right fit.
                </p>

                <div className="mt-8 max-w-4xl rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-5 shadow-[0_18px_45px_-36px_rgba(120,53,15,0.2)]">
                    <div className="flex flex-wrap items-center gap-2">
                        {quickFilterPills.map((pill, index) => (
                            <button
                                key={pill}
                                type="button"
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                    index === 0
                                        ? "bg-stone-900 text-white shadow-sm"
                                        : "border border-stone-200 bg-stone-50 text-stone-700 hover:bg-white"
                                }`}
                            >
                                {pill}
                            </button>
                        ))}
                    </div>

                    <div className="mt-5 grid gap-3 border-t border-stone-200/80 pt-5 sm:grid-cols-2 xl:grid-cols-4">
                        <label className="flex flex-col gap-2 text-sm">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                                Category
                            </span>
                            <select
                                defaultValue="all"
                                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-400"
                            >
                                <option value="all">All categories</option>
                                <option value="ui">UI & Styling</option>
                                <option value="frontend">Frontend Frameworks</option>
                                <option value="devtools">Developer Tools</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-2 text-sm">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                                Subcategory
                            </span>
                            <select
                                defaultValue="all"
                                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-400"
                            >
                                <option value="all">All subcategories</option>
                                <option value="components">Component Libraries</option>
                                <option value="css">CSS Frameworks</option>
                                <option value="boilerplates">Boilerplates</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-2 text-sm">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                                Tags
                            </span>
                            <select
                                defaultValue="all"
                                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-400"
                            >
                                <option value="all">All tags</option>
                                <option value="tailwind">Tailwind CSS</option>
                                <option value="react">React</option>
                                <option value="open-source">Open source</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-2 text-sm">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                                Sort by
                            </span>
                            <select
                                defaultValue="popular"
                                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-400"
                            >
                                <option value="popular">Most popular</option>
                                <option value="newest">Newest</option>
                                <option value="alphabetical">Alphabetical</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
}
