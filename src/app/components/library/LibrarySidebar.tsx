const relatedTools = [
    "ui kits",
    "react libraries",
    "tailwind plugins",
    "design systems",
    "dev tools",
    "component libraries",
];

export default function LibrarySidebar() {
    return (
        <aside className="space-y-6">
            <section className="rounded-3xl border border-brand-ink/10 bg-white/90 p-6 shadow-[0_20px_50px_-38px_rgba(43,37,57,0.28)]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    submit a tool
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-brand-ink">
                    share something worth bookmarking.
                </h3>
                <p className="mt-3 text-sm leading-6 text-brand-copy">
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
                        className="h-11 w-full rounded-2xl border border-brand-ink/10 bg-brand-cream px-4 text-sm text-brand-ink outline-none placeholder:text-brand-haze"
                    />
                </label>
                <button
                    type="button"
                    className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-brand-ink px-4 text-sm font-medium text-white transition hover:bg-brand-inkSoft"
                >
                    submit a tool
                </button>
            </section>

            <section className="rounded-3xl border border-brand-ink/10 bg-white/85 p-6 shadow-[0_18px_40px_-34px_rgba(43,37,57,0.22)]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    related tools
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {relatedTools.map((tool) => (
                        <span
                            key={tool}
                            className="rounded-full border border-brand-ink/10 bg-brand-oat px-3 py-1.5 text-xs font-medium text-brand-muted"
                        >
                            {tool}
                        </span>
                    ))}
                </div>
            </section>
        </aside>
    );
}
