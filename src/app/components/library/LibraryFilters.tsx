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
            className={`h-5 w-5 text-primary transition ${open ? "rotate-180" : ""}`}
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
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                {label}
            </label>
            <button
                type="button"
                onClick={onToggle}
                className={`flex h-12 w-full items-center justify-between rounded-2xl border px-4 text-left text-black/72 transition ${
                    isOpen
                        ? "border-primary/34 bg-white text-black"
                        : "border-black/10 bg-white hover:border-primary/24 hover:text-black"
                }`}
            >
                <span className="truncate text-sm">{selected.label}</span>
                <span className="ml-4 shrink-0">
                    <ChevronIcon open={isOpen} />
                </span>
            </button>

            {isOpen ? (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_16px_40px_-24px_rgba(16,24,40,0.14)]">
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
                                                ? "bg-primary/12 font-medium text-primary"
                                                : "text-black/72 hover:bg-black/[0.03] hover:text-black"
                                        }`}
                                    >
                                        <span>{option.label}</span>
                                        {active ? (
                                            <span className="text-primary">&#10003;</span>
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

function useLibraryFilterControls() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeSearchQuery = searchParams.get("q") ?? "";
    const activeCategory = searchParams.get("category") ?? "all";
    const activeSubcategory = searchParams.get("subcategory") ?? "all";
    const activeSort = searchParams.get("sort") ?? "popular";

    function updateFilters(nextValues?: {
        searchQuery?: string;
        category?: string;
        subcategory?: string;
        sort?: string;
    }) {
        const params = new URLSearchParams(searchParams.toString());
        const nextSearch = nextValues?.searchQuery ?? activeSearchQuery;
        const nextCategory = nextValues?.category ?? activeCategory;
        const nextSubcategory = nextValues?.subcategory ?? activeSubcategory;
        const nextSort = nextValues?.sort ?? activeSort;

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

        if (nextSort && nextSort !== "popular") {
            params.set("sort", nextSort);
        } else {
            params.delete("sort");
        }

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname, { scroll: true });
    }

    function clearFilters() {
        router.push(pathname, { scroll: true });
    }

    return {
        activeSearchQuery,
        activeCategory,
        activeSubcategory,
        activeSort,
        updateFilters,
        clearFilters,
    };
}

export function LibraryControls({
    filters,
}: {
    filters: ToolFilters;
}) {
    const {
        activeSearchQuery,
        activeCategory,
        activeSubcategory,
        activeSort,
        updateFilters,
        clearFilters,
    } = useLibraryFilterControls();
    const [controlsOpen, setControlsOpen] = useState(false);
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

    return (
        <section>
            <div className="flex flex-col gap-2 mb-10">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        updateFilters({
                            searchQuery: String(formData.get("q") ?? ""),
                        });
                    }}
                    className="flex h-12 items-center gap-3 rounded-[1.1rem] border border-black/10 bg-white pl-4 pr-2"
                >
                    <Search className="h-5 w-5 shrink-0 text-primary" />
                    <input
                        name="q"
                        type="text"
                        key={activeSearchQuery}
                        defaultValue={activeSearchQuery}
                        placeholder="Search tools, frameworks, and categories"
                        className="min-w-0 flex-1 bg-transparent text-[0.92rem] text-black outline-none placeholder:text-black/35"
                    />

                    <button
                        type="button"
                        onClick={() => {
                            setControlsOpen((current) => !current);
                            closeMenu();
                        }}
                        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 text-[0.82rem] font-medium text-primary transition hover:bg-primary/16"
                    >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                </form>
            </div>

            <div
                className={`overflow-hidden transition-[max-height,opacity,margin] duration-200 ease-out ${
                    controlsOpen ? "mt-4 max-h-[28rem] opacity-100" : "mt-0 max-h-0 opacity-0"
                }`}
                aria-hidden={!controlsOpen}
            >
                {(activeCategory !== "all" || activeSubcategory !== "all" || activeSearchQuery) ? (
                    <div className="mb-4 flex justify-end">
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="text-xs font-medium text-black/48 transition hover:text-black"
                        >
                            Clear all
                        </button>
                    </div>
                ) : null}
                <div className="grid gap-4 md:grid-cols-3">
                    <FilterDropdown
                        label="Category"
                        value={activeCategory}
                        isOpen={openMenu === "category"}
                        onToggle={() =>
                            setOpenMenu((current) => (current === "category" ? null : "category"))
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
                    <label className="block">
                        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                            Sort by
                        </span>
                        <select
                            value={activeSort}
                            onChange={(event) => updateFilters({ sort: event.target.value })}
                            className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-black outline-none"
                        >
                            <option value="popular">Most popular</option>
                            <option value="alphabetical">Alphabetical</option>
                            <option value="category">Category</option>
                        </select>
                    </label>
                </div>
            </div>
        </section>
    );
}
