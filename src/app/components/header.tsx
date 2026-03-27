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
        <header className="sticky top-0 z-40 border-b border-[rgba(43,37,57,0.09)] bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-10">
                <div className="flex items-center gap-4">
                    <a
                        href="#"
                        className="inline-flex items-center gap-3 text-stone-900 transition hover:opacity-90"
                    >
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(43,37,57,0.12)] bg-[linear-gradient(135deg,rgba(43,37,57,1)_0%,rgba(75,67,94,1)_100%)] text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_12px_26px_-18px_rgba(43,37,57,0.65)]">
                            et
                        </span>
                        <span className="flex items-baseline gap-[0.10rem]">
                            <span className="text-xl font-semibold tracking-tight text-[#2B2539]">
                                eira
                            </span>
                            <span className="text-xl font-medium tracking-tight text-[#7B6767]">
                                .tools
                            </span>
                        </span>
                    </a>
                </div>

                <nav
                    aria-label="Main navigation"
                    className="hidden items-center gap-2 rounded-full border border-[rgba(43,37,57,0.09)] bg-[linear-gradient(180deg,rgba(248,246,244,0.96)_0%,rgba(255,255,255,0.98)_100%)] p-1 md:flex"
                >
                    {mainNavItems.map((item, index) => (
                        <a
                            key={item}
                            href="#"
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                index === 1
                                    ? "border border-[#2B2539]/12 bg-[#2B2539] text-white shadow-[0_14px_26px_-18px_rgba(43,37,57,0.55)]"
                                    : "text-[#6c6477] hover:bg-white hover:text-[#2B2539]"
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
                                className="text-sm font-medium text-[#6c6477] transition hover:text-[#2B2539]"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center rounded-full border border-[#2B2539] bg-[#2B2539] px-4 py-2.5 text-sm font-medium text-white shadow-[0_16px_28px_-20px_rgba(43,37,57,0.65)] transition hover:-translate-y-0.5 hover:bg-[#3a334b]"
                    >
                        Submit a Tool
                    </button>
                </div>
            </div>
        </header>
    );
}
