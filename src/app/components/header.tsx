"use client";

const mainNavItems = [
    "Discover",
    "Library",
    "Collections",
    "Resources",
];

const utilityItems = ["Pricing", "Sign In"];

export default function Header() {
    return (
        <header className="sticky top-0 z-40 border-b border-white/8 bg-brand-ink">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-10">
                <div className="flex items-center gap-4">
                    <a
                        href="#"
                        className="inline-flex items-center gap-3 text-white transition hover:opacity-90"
                    >
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/10 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_12px_26px_-18px_rgba(0,0,0,0.45)]">
                            et
                        </span>
                        <span className="flex items-baseline gap-[0.10rem]">
                            <span className="text-xl font-semibold tracking-tight text-white">
                                eira
                            </span>
                            <span className="text-xl font-medium tracking-tight text-stone-300">
                                .tools
                            </span>
                        </span>
                    </a>
                </div>

                <nav
                    aria-label="Main navigation"
                    className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/6 p-1 md:flex"
                >
                    {mainNavItems.map((item, index) => (
                        <a
                            key={item}
                            href="#"
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                index === 1
                                    ? "border border-white/12 bg-white/12 text-white shadow-[0_14px_26px_-18px_rgba(0,0,0,0.45)]"
                                    : "text-stone-300 hover:bg-white/8 hover:text-white"
                            }`}
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-3 sm:flex">
                        {utilityItems.map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-sm font-medium text-stone-300 transition hover:text-white"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center rounded-full border border-white/14 bg-white/10 px-4 py-2.5 text-sm font-medium text-white shadow-[0_16px_28px_-20px_rgba(0,0,0,0.45)] transition hover:-translate-y-0.5 hover:border-white/22 hover:bg-white/14"
                    >
                        Submit a Tool
                    </button>
                </div>
            </div>
        </header>
    );
}
