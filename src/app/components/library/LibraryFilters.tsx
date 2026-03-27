"use client";

import { useState } from "react";

type FilterOption = {
    value: string;
    label: string;
};

function ChevronIcon({ open }: { open: boolean }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className={`h-5 w-5 text-stone-400 transition ${open ? "rotate-180" : ""}`}
        >
            <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-5 w-5 text-stone-400"
        >
            <path
                d="M8.75 14.5a5.75 5.75 0 1 1 0-11.5a5.75 5.75 0 0 1 0 11.5ZM13 13l4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function FilterDropdown({
    label,
    value,
    options,
    isOpen,
    onToggle,
    onSelect,
}: {
    label: string;
    value: string;
    options: FilterOption[];
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (value: string) => void;
}) {
    const selected = options.find((option) => option.value === value) ?? options[0];

    return (
        <div className="relative">
            <label className="flex flex-col gap-2 text-sm">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-300">
                    {label}
                </span>
                <button
                    type="button"
                    onClick={onToggle}
                    className={`flex w-full items-center justify-between rounded-2xl border px-5 py-3 text-left text-white transition ${
                        isOpen
                            ? "border-[#BED3CC] ring-2 ring-[#BED3CC]/20"
                            : "border-white/12 hover:border-white/24"
                    }`}
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                    <span className="truncate">{selected.label}</span>
                    <span className="ml-4 shrink-0">
                        <ChevronIcon open={isOpen} />
                    </span>
                </button>
            </label>

            {isOpen ? (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-[#2B2539] bg-[#1f1a29] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)]">
                    <ul className="max-h-72 overflow-auto py-2">
                        {options.map((option) => {
                            const active = option.value === value;

                            return (
                                <li key={option.value}>
                                    <button
                                        type="button"
                                        onClick={() => onSelect(option.value)}
                                        className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition ${
                                            active
                                                ? "bg-white/10 font-medium text-white"
                                                : "text-stone-200 hover:bg-white/6"
                                        }`}
                                    >
                                        <span>{option.label}</span>
                                        {active ? (
                                            <span className="text-[#BED3CC]">&#10003;</span>
                                        ) : null}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}

export default function LibraryFilters() {
    // only one menu stays open at a time so the filter deck stays compact.
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [subcategory, setSubcategory] = useState("all");
    const [tags, setTags] = useState("all");
    const [sortBy, setSortBy] = useState("popular");

    const closeMenu = () => setOpenMenu(null);

    return (
        <div className="mt-10 overflow-visible rounded-[1.6rem] border border-[#2B2539]/10 bg-[#2B2539] p-5 shadow-[0_24px_55px_-30px_rgba(43,37,57,0.42)] sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-300">
                        Filter Studio
                    </p>
                    <p className="mt-2 text-lg font-semibold tracking-tight text-white">
                        Shape the collection your way.
                    </p>
                    <p className="mt-1 text-sm text-stone-300">
                        Use a few strong filters instead of a crowded dashboard.
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center self-start rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-[0_10px_24px_-18px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/14"
                >
                    Reset Filters
                </button>
            </div>

            <div className="mt-6 rounded-[1.45rem] bg-white/6 p-4 ring-1 ring-white/8">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)] lg:items-end">
                    <label className="flex flex-col gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-300">
                            Search
                        </span>
                        <div className="flex items-center rounded-[1.2rem] border border-white/12 bg-white/8 px-4 py-3">
                            <SearchIcon />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="search tools, frameworks, and categories"
                                className="ml-3 w-full bg-transparent text-sm text-white outline-none placeholder:text-stone-400"
                            />
                        </div>
                    </label>
                </div>

                <div className="mt-5 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(186,224,218,0.18),rgba(239,200,200,0.18),transparent)]" />

                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-[1.15rem] border border-white/8 bg-white/4 p-3">
                        <FilterDropdown
                            label="Category"
                            value={category}
                            isOpen={openMenu === "category"}
                            onToggle={() =>
                                setOpenMenu((current) =>
                                    current === "category" ? null : "category"
                                )
                            }
                            onSelect={(value) => {
                                setCategory(value);
                                closeMenu();
                            }}
                            options={[
                                { value: "all", label: "All categories" },
                                { value: "ui", label: "UI & Styling" },
                                { value: "frontend", label: "Frontend Frameworks" },
                                { value: "devtools", label: "Developer Tools" },
                            ]}
                        />
                    </div>

                    <div className="rounded-[1.15rem] border border-white/8 bg-white/4 p-3">
                        <FilterDropdown
                            label="Subcategory"
                            value={subcategory}
                            isOpen={openMenu === "subcategory"}
                            onToggle={() =>
                                setOpenMenu((current) =>
                                    current === "subcategory" ? null : "subcategory"
                                )
                            }
                            onSelect={(value) => {
                                setSubcategory(value);
                                closeMenu();
                            }}
                            options={[
                                { value: "all", label: "All subcategories" },
                                { value: "components", label: "Component Libraries" },
                                { value: "css", label: "CSS Frameworks" },
                                { value: "boilerplates", label: "Boilerplates" },
                            ]}
                        />
                    </div>

                    <div className="rounded-[1.15rem] border border-white/8 bg-white/4 p-3">
                        <FilterDropdown
                            label="Tags"
                            value={tags}
                            isOpen={openMenu === "tags"}
                            onToggle={() =>
                                setOpenMenu((current) => (current === "tags" ? null : "tags"))
                            }
                            onSelect={(value) => {
                                setTags(value);
                                closeMenu();
                            }}
                            options={[
                                { value: "all", label: "All tags" },
                                { value: "tailwind", label: "Tailwind CSS" },
                                { value: "react", label: "React" },
                                { value: "open-source", label: "Open source" },
                            ]}
                        />
                    </div>

                    <div className="rounded-[1.15rem] border border-white/8 bg-white/4 p-3">
                        <FilterDropdown
                            label="Sort by"
                            value={sortBy}
                            isOpen={openMenu === "sortBy"}
                            onToggle={() =>
                                setOpenMenu((current) => (current === "sortBy" ? null : "sortBy"))
                            }
                            onSelect={(value) => {
                                setSortBy(value);
                                closeMenu();
                            }}
                            options={[
                                { value: "popular", label: "Most popular" },
                                { value: "newest", label: "Newest" },
                                { value: "alphabetical", label: "Alphabetical" },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
