const quickFilterPills = [
    "All Tools",
    "UI & Styling",
    "React",
    "Design Systems",
    "Developer Experience",
];

export default function LibraryFilters() {
    return (
        <div className="mt-6 w-full rounded-[1.75rem] border border-stone-200/80 bg-stone-50/70 p-5 shadow-[0_18px_45px_-36px_rgba(120,53,15,0.16)]">
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

            <div className="mt-5 grid gap-3 border-t border-stone-200/80 pt-5 md:grid-cols-2 xl:grid-cols-4">
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
    );
}
