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
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-haze">
                    {label}
                </span>
                <button
                    type="button"
                    onClick={onToggle}
                    className={`flex h-12 w-full items-center justify-between rounded-2xl border px-4 text-left text-brand-ink transition ${
                        isOpen
                            ? "border-brand-ink/18 ring-2 ring-brand-ink/8"
                            : "border-brand-ink/10 hover:border-brand-ink/18"
                    }`}
                    style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
                >
                    <span className="truncate">{selected.label}</span>
                    <span className="ml-4 shrink-0">
                        <ChevronIcon open={isOpen} />
                    </span>
                </button>
            </label>

            {isOpen ? (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-brand-ink/10 bg-white shadow-[0_20px_50px_-24px_rgba(43,37,57,0.22)]">
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
                                                ? "bg-brand-oat font-medium text-brand-ink"
                                                : "text-brand-copy hover:bg-brand-cream"
                                        }`}
                                    >
                                        <span>{option.label}</span>
                                        {active ? (
                                            <span className="text-brand-ink">&#10003;</span>
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

    const closeMenu = () => setOpenMenu(null);

    return (
        <div className="mt-10 overflow-visible rounded-[1.75rem] border border-brand-ink/10 bg-white/92 p-4 shadow-[0_18px_44px_-34px_rgba(43,37,57,0.20)] sm:p-5">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] xl:items-end">
                <label className="flex flex-col gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-haze">
                        Search
                    </span>
                    <form action="#" className="flex items-center rounded-2xl border border-brand-ink/10 bg-brand-cream px-4 py-3">
                        <SearchIcon />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="search tools, frameworks, and categories"
                            className="ml-3 w-full bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-haze"
                        />
                    </form>
                </label>

                <div className="rounded-2xl border border-brand-ink/8 bg-brand-cream/70 p-3">
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

                <div className="rounded-2xl border border-brand-ink/8 bg-brand-cream/70 p-3">
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

                <div className="rounded-2xl border border-brand-ink/8 bg-brand-cream/70 p-3">
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
            </div>
        </div>
    );
}
