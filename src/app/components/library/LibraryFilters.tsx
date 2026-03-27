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
            className={`h-5 w-5 text-stone-500 transition ${open ? "rotate-180" : ""}`}
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
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-600">
                    {label}
                </span>
                <button
                    type="button"
                    onClick={onToggle}
                    className={`flex w-full items-center justify-between rounded-2xl border bg-white px-5 py-3 text-left text-stone-900 transition ${
                        isOpen
                            ? "border-amber-300 ring-2 ring-amber-100"
                            : "border-stone-200 hover:border-stone-300"
                    }`}
                >
                    <span className="truncate">{selected.label}</span>
                    <span className="ml-4 shrink-0">
                        <ChevronIcon open={isOpen} />
                    </span>
                </button>
            </label>

            {isOpen ? (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.22)]">
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
                                                ? "bg-amber-50 font-medium text-stone-900"
                                                : "text-stone-700 hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>{option.label}</span>
                                        {active ? (
                                            <span className="text-amber-700">&#10003;</span>
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
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [category, setCategory] = useState("all");
    const [tags, setTags] = useState("all");
    const [sortBy, setSortBy] = useState("popular");

    const closeMenu = () => setOpenMenu(null);

    return (
        <div className="mt-8 overflow-visible rounded-[1.9rem] bg-[linear-gradient(180deg,rgba(251,250,248,0.92)_0%,rgba(255,255,255,0.98)_100%)] p-5 shadow-[0_22px_55px_-36px_rgba(43,37,57,0.18)] ring-1 ring-[rgba(43,37,57,0.08)]">
                <div className="rounded-[1.5rem] border border-[rgba(43,37,57,0.08)] bg-white/55 p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7B6767]">
                            Filter Studio
                        </p>
                        <p className="mt-2 text-lg font-semibold tracking-tight text-[#2B2539]">
                            Shape the collection your way.
                        </p>
                        <p className="mt-1 text-sm text-stone-600">
                            Use a few strong filters instead of a crowded dashboard.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center self-start rounded-full border border-[rgba(43,37,57,0.14)] bg-white px-4 py-2 text-sm font-medium text-[#2B2539] shadow-[0_10px_24px_-18px_rgba(43,37,57,0.35)] transition hover:-translate-y-0.5 hover:border-[#2B2539]"
                    >
                        Reset Filters
                    </button>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr]">
                    <div className="rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(239,200,200,0.18),rgba(255,255,255,0.92))] p-3 ring-1 ring-[rgba(43,37,57,0.06)]">
                        <FilterDropdown
                            label="Category"
                            value={category}
                            isOpen={openMenu === "category"}
                            onToggle={() =>
                                setOpenMenu((current) => (current === "category" ? null : "category"))
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

                    <div className="rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(186,224,218,0.18),rgba(255,255,255,0.92))] p-3 ring-1 ring-[rgba(43,37,57,0.06)]">
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

                    <div className="rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(238,239,200,0.24),rgba(255,255,255,0.92))] p-3 ring-1 ring-[rgba(43,37,57,0.06)]">
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
