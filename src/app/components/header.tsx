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
        <header className="sticky top-0 z-40 border-b border-stone-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-10">
                <div className="flex items-center gap-4">
                    <a
                        href="#"
                        className="inline-flex items-center gap-3 text-stone-900"
                    >
                        <span className="flex items-baseline gap-[0.10rem]">
                            <span className="text-xl font-semibold tracking-tight text-stone-950">
                                eira
                            </span>
                            <span className="text-xl font-medium tracking-tight text-stone-400">
                                .tools
                            </span>
                        </span>
                    </a>
                </div>

                <nav
                    aria-label="Main navigation"
                    className="hidden items-center gap-2 rounded-full border border-stone-200 bg-stone-50/80 p-1 md:flex"
                >
                    {mainNavItems.map((item, index) => (
                        <a
                            key={item}
                            href="#"
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                index === 1
                                    ? "bg-white text-stone-950 shadow-sm"
                                    : "text-stone-600 hover:bg-white/80 hover:text-stone-900"
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
                                className="text-sm font-medium text-stone-600 transition hover:text-stone-950"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center rounded-full bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
                    >
                        Submit a Tool
                    </button>
                </div>
            </div>
        </header>
    );
}
