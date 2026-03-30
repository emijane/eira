"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
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
                className={`flex h-12 w-full items-center justify-between rounded-2xl border px-4 text-left text-white/72 transition ${
                    isOpen
                        ? "border-primary/34 bg-white/8 text-white"
                        : "border-white/10 bg-white/6 hover:border-primary/24 hover:text-white"
                }`}
            >
                <span className="truncate text-sm">{selected.label}</span>
                <span className="ml-4 shrink-0">
                    <ChevronIcon open={isOpen} />
                </span>
            </button>

            {isOpen ? (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(20,15,34,0.96)_0%,rgba(14,10,24,0.94)_100%)] shadow-[0_24px_70px_-42px_rgba(0,0,0,0.72)] backdrop-blur-xl">
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
                                                ? "bg-secondary/16 font-medium text-primary"
                                                : "text-white/72 hover:bg-white/6 hover:text-white"
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
        router.push(pathname, { scroll: true });
    }

    return {
        activeSearchQuery,
        activeCategory,
        activeSubcategory,
        updateFilters,
        clearFilters,
    };
}

export function LibrarySearchBar() {
    const { activeSearchQuery, updateFilters } = useLibraryFilterControls();

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                updateFilters({
                    searchQuery: String(formData.get("q") ?? ""),
                });
            }}
            className="flex h-12 items-center gap-3 rounded-[1.1rem] border border-primary/40 bg-[linear-gradient(180deg,rgba(20,15,34,0.86)_0%,rgba(14,10,24,0.78)_100%)] pl-4 pr-2 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.72)] backdrop-blur-xl"
        >
            <Search className="h-5 w-5 shrink-0 text-primary" />
            <input
                name="q"
                type="text"
                key={activeSearchQuery}
                defaultValue={activeSearchQuery}
                placeholder="Search tools, frameworks, and categories"
                className="min-w-0 flex-1 bg-transparent text-[0.92rem] text-white outline-none placeholder:text-white/34"
            />

            <button
                type="submit"
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,rgba(112,89,228,0.34)_0%,rgba(197,168,235,0.22)_100%)] px-3.5 text-[0.82rem] font-medium text-primary shadow-[0_10px_28px_-18px_rgba(112,89,228,0.75)] transition hover:bg-[linear-gradient(135deg,rgba(112,89,228,0.42)_0%,rgba(197,168,235,0.28)_100%)] hover:text-white"
            >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Search</span>
            </button>
        </form>
    );
}

export function LibrarySidebarFilters({ filters }: { filters: ToolFilters }) {
    const {
        activeSearchQuery,
        activeCategory,
        activeSubcategory,
        updateFilters,
        clearFilters,
    } = useLibraryFilterControls();
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
        <section className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(20,15,34,0.84)_0%,rgba(14,10,24,0.76)_100%)] p-6 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.72)] backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                filters
            </p>
            <div className="mt-5 space-y-5">
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
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
                {activeSearchQuery ? (
                    <span className="rounded-full border border-secondary/24 bg-secondary/14 px-3 py-1 text-xs font-medium text-primary">
                        {activeSearchQuery}
                    </span>
                ) : null}
                {activeCategory !== "all" ? (
                    <span className="rounded-full border border-secondary/24 bg-secondary/14 px-3 py-1 text-xs font-medium text-primary">
                        {activeCategory}
                    </span>
                ) : null}
                {activeSubcategory !== "all" ? (
                    <span className="rounded-full border border-secondary/24 bg-secondary/14 px-3 py-1 text-xs font-medium text-primary">
                        {activeSubcategory}
                    </span>
                ) : null}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/6 px-5 text-sm font-medium text-white/72 transition hover:border-primary/28 hover:text-white"
                >
                    Clear Filters
                </button>
            </div>
        </section>
    );
}
