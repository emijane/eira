"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import type { ToolFilters } from "@/lib/getTools";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

function XMarkIcon({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" />
        </svg>
    );
}

function FilterDropdown({
    label,
    value,
    options,
    onSelect,
}: {
    label: string;
    value: string;
    options: FilterOption[];
    onSelect: (value: string) => void;
}) {
    const selected = options.find((option) => option.value === value) ?? options[0];

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="flex h-12 w-full items-center justify-between rounded-2xl border border-black/10 bg-white px-4 text-left text-black/72 transition hover:border-primary/24 hover:text-black focus:border-primary/34 focus:text-black focus:outline-none"
                    >
                        <span className="truncate text-sm">{selected.label}</span>
                        <span className="ml-4 shrink-0">
                            <ChevronIcon open={false} />
                        </span>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    <DropdownMenuLabel>{label}</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={value} onValueChange={onSelect}>
                        {options.map((option) => (
                            <DropdownMenuRadioItem key={option.value} value={option.value}>
                                {option.label}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
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

    const categoryOptions: FilterOption[] = [
        { value: "all", label: "Select category" },
        ...filters.categories.map((category) => ({
            value: category,
            label: category,
        })),
    ];

    const visibleSubcategories = activeCategory === "all"
        ? filters.subcategories
        : filters.subcategoriesByCategory[activeCategory] ?? [];

    const subcategoryOptions: FilterOption[] = [
        { value: "all", label: "Select subcategory" },
        ...visibleSubcategories.map((subcategory) => ({
            value: subcategory,
            label: subcategory,
        })),
    ];


    return (
        <section className="relative z-10">
            <div className="mx-auto flex max-w-200 flex-col gap-2">
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
                </form>
            </div>

            <button
                type="button"
                onClick={() => {
                    setControlsOpen((current) => !current);
                }}
                className="inline-flex h-9 mt-3 shrink-0 items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 text-[0.82rem] font-medium text-primary transition hover:bg-primary/16"
            >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Filters</span>
            </button>

            <div className="flex text-xs gap-2 mb-5">
                {activeCategory !== "all" && (
                    <button
                    type="button"
                    onClick={() => updateFilters({ category: '', subcategory: '' })}
                    className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-1 text-sm text-black/72 outline-none transition hover:border-primary/24 hover:text-black focus:border-primary/34 hover:cursor-pointer"
                    >
                        <span>{activeCategory}</span>
                        <XMarkIcon className="h-3 w-3" />
                    </button>
                )}
                {activeSubcategory !== "all" && (
                    <button
                    type="button"
                    onClick={() => updateFilters({ subcategory: '' })}
                    className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-1 text-sm text-black/72 outline-none transition hover:border-primary/24 hover:text-black focus:border-primary/34 hover:cursor-pointer"
                    >
                        <span>{activeSubcategory}</span>
                        <XMarkIcon className="h-3 w-3" />
                    </button>
                )}
            </div>

            <div
                className={`transition-[opacity,margin] duration-200 ease-out ${
                    controlsOpen ? "mb-10 opacity-100" : "mt-0 mb-0 hidden opacity-0"
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
                        onSelect={(value) => {
                            updateFilters({
                                category: value,
                                subcategory: "all",
                            });
                        }}
                        options={categoryOptions}
                    />
                    <FilterDropdown
                        label="Subcategory"
                        value={activeSubcategory}
                        onSelect={(value) => {
                            if (value === "all") {
                                updateFilters({ subcategory: "all" });
                                return;
                            }

                            const parentCategory = Object.entries(filters.subcategoriesByCategory).find(
                                ([, subcategories]) => subcategories.includes(value)
                            )?.[0] ?? "all";

                            updateFilters({ category: parentCategory, subcategory: value });
                        }}
                        options={subcategoryOptions}
                    />
                    <FilterDropdown
                        label="Sort by"
                        value={activeSort}
                        onSelect={(value) => updateFilters({ sort: value })}
                        options={[
                            { value: "popular", label: "Most popular" },
                            { value: "alphabetical", label: "Alphabetical" },
                            { value: "category", label: "Category" },
                        ]}
                    />
                </div>
            </div>
        </section>
    );
}
