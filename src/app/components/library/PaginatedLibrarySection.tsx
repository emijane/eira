"use client";

import { useRouter, useSearchParams } from "next/navigation";
import LibraryGrid from "./LibraryGrid";
import LibraryPagePagination from "./LibraryPagePagination";
import type { LibraryTool } from "./types";

export default function PaginatedLibrarySection({
    tools,
    totalTools,
    currentPage,
    pageCount,
    startIndex,
    endIndex,
}: {
    tools: LibraryTool[];
    totalTools: number;
    currentPage: number;
    pageCount: number;
    startIndex: number;
    endIndex: number;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handlePageChange(selectedPage: number) {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedPage <= 1) {
            params.delete("page");
        } else {
            params.set("page", String(selectedPage));
        }

        const query = params.toString();
        router.push(query ? `/library?${query}` : "/library", { scroll: true });
    }

    return (
        <>
            <LibraryGrid
                tools={tools}
                totalTools={totalTools}
                startIndex={startIndex}
                endIndex={endIndex}
            />
            <LibraryPagePagination
                currentPage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageChange}
            />
        </>
    );
}
