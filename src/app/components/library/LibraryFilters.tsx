"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import type { ToolFilters } from "@/lib/getTools";

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
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-haze">
                {label}
            </label>
            <button
                type="button"
                onClick={onToggle}
                className={`flex h-12 w-full items-center justify-between rounded-2xl border px-4 text-left text-brand-copy transition ${
                    isOpen
                        ? "border-brand-ink/18 ring-2 ring-brand-ink/8 text-brand-ink"
                        : "border-brand-ink/10 hover:border-brand-ink/18 hover:text-brand-ink"
                }`}
            >
                <span className="truncate text-sm">{selected.label}</span>
                <span className="ml-4 shrink-0">
                    <ChevronIcon open={isOpen} />
                </span>
            </button>

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

export default function LibraryFilters({ filters }: { filters: ToolFilters }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeSearchQuery = searchParams.get("q") ?? "";
    const activeCategory = searchParams.get("category") ?? "all";
    const activeSubcategory = searchParams.get("subcategory") ?? "all";
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const closeMenu = () => setOpenMenu(null);

    const categoryOptions: FilterOption[] = [
        { value: "all", label: "All categories" },
        ...filters.categories.map((category) => ({
            value: category,
            label: category,
        })),
    ];

    const visibleSubcategories = activeCategory === "all"
        ? filters.subcategories
        : filters.subcategoriesByCategory[activeCategory] ?? [];

    const subcategoryOptions: FilterOption[] = [
        { value: "all", label: "All subcategories" },
        ...visibleSubcategories.map((subcategory) => ({
            value: subcategory,
            label: subcategory,
        })),
    ];

    function updateFilters(nextValues?: {
        searchQuery?: string;
        category?: string;
        subcategory?: string;
    }) {
        const params = new URLSearchParams(searchParams.toString());
        const nextSearch = nextValues?.searchQuery ?? activeSearchQuery;
        const nextCategory = nextValues?.category ?? activeCategory;
        const nextSubcategory = nextValues?.subcategory ?? activeSubcategory;

        if (nextSearch.trim()) {
            params.set("q", nextSearch.trim());
        } else {
            params.delete("q");
        }

        if (nextCategory && nextCategory !== "all") {
            params.set("category", nextCategory);
        } else {
            params.delete("category");
        }

        if (nextSubcategory && nextSubcategory !== "all") {
            params.set("subcategory", nextSubcategory);
        } else {
            params.delete("subcategory");
        }

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname, { scroll: true });
    }

    function clearFilters() {
        setFiltersOpen(false);
        closeMenu();
        router.push(pathname, { scroll: true });
    }

    return (
        <div className="mt-8 overflow-visible">
            <div className="rounded-[1.45rem] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,255,0.92)_100%)] p-1 shadow-[0_20px_40px_-32px_rgba(24,24,40,0.34)]">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        updateFilters({
                            searchQuery: String(formData.get("q") ?? ""),
                        });
                    }}
                    className="flex h-12 items-center rounded-[1.1rem] bg-white/96 px-3.5"
                >
                    <Search className="h-3.5 w-3.5 text-brand-haze" />
                    <input
                        name="q"
                        type="text"
                        key={activeSearchQuery}
                        defaultValue={activeSearchQuery}
                        placeholder="Search tools, frameworks, and categories"
                        className="ml-2.5 w-full bg-transparent text-[0.92rem] text-brand-ink outline-none placeholder:text-brand-haze"
                    />

                    <button
                        type="button"
                        onClick={() => {
                            setFiltersOpen((current) => !current);
                            closeMenu();
                        }}
                        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-brand-ink/8 bg-brand-cream/45 px-3 text-[0.82rem] font-medium text-brand-ink transition hover:border-brand-ink/14 hover:bg-brand-cream/75 hover:text-brand-inkSoft"
                    >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                </form>
            </div>

            <div
                className={`overflow-hidden transition-[max-height,opacity,margin] duration-200 ease-out ${
                    filtersOpen
                        ? "mt-4 max-h-[32rem] opacity-100"
                        : "mt-0 max-h-0 opacity-0"
                }`}
                aria-hidden={!filtersOpen}
            >
                <div
                    className={`rounded-[2rem] border border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(245,248,255,0.92)_100%)] p-5 shadow-[0_24px_50px_-34px_rgba(24,24,40,0.38)] transition-transform duration-200 ease-out sm:p-6 ${
                        filtersOpen
                            ? "translate-y-0"
                            : "-translate-y-1 pointer-events-none"
                    }`}
                >
                    <div className="mb-5 flex flex-wrap gap-2">
                        {activeSearchQuery ? (
                            <span className="rounded-full bg-brand-oat px-3 py-1 text-xs font-medium text-brand-ink">
                                {activeSearchQuery}
                            </span>
                        ) : null}
                        {activeCategory !== "all" ? (
                            <span className="rounded-full bg-brand-oat px-3 py-1 text-xs font-medium text-brand-ink">
                                {activeCategory}
                            </span>
                        ) : null}
                        {activeSubcategory !== "all" ? (
                            <span className="rounded-full bg-brand-oat px-3 py-1 text-xs font-medium text-brand-ink">
                                {activeSubcategory}
                            </span>
                        ) : null}
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <FilterDropdown
                                label="Category"
                                value={activeCategory}
                                isOpen={openMenu === "category"}
                                onToggle={() =>
                                    setOpenMenu((current) =>
                                        current === "category" ? null : "category"
                                    )
                                }
                                onSelect={(value) => {
                                    updateFilters({
                                        category: value,
                                        subcategory: "all",
                                    });
                                    closeMenu();
                                }}
                                options={categoryOptions}
                            />
                        </div>

                        <div>
                            <FilterDropdown
                                label="Subcategory"
                                value={activeSubcategory}
                                isOpen={openMenu === "subcategory"}
                                onToggle={() =>
                                    setOpenMenu((current) =>
                                        current === "subcategory" ? null : "subcategory"
                                    )
                                }
                                onSelect={(value) => {
                                    updateFilters({ subcategory: value });
                                    closeMenu();
                                }}
                                options={subcategoryOptions}
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            type="submit"
                            className="inline-flex h-11 items-center justify-center rounded-full bg-brand-ink px-5 text-sm font-medium text-white shadow-[0_18px_28px_-20px_rgba(43,37,57,0.5)] transition hover:bg-brand-inkSoft"
                        >
                            Apply Search
                        </button>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="inline-flex h-11 items-center justify-center rounded-full border border-brand-ink/10 bg-white px-5 text-sm font-medium text-brand-copy transition hover:border-brand-ink/18 hover:text-brand-ink"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
