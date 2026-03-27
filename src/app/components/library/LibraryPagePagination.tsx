"use client";

import ReactPaginate from "react-paginate";

export default function LibraryPagePagination({
    currentPage,
    pageCount,
    onPageChange,
}: {
    currentPage: number;
    pageCount: number;
    onPageChange: (selectedPage: number) => void;
}) {
    if (pageCount <= 1) {
        return null;
    }

    return (
        <div className="mt-10 flex justify-center">
            {/* react-paginate handles the page math while we keep the project styling here */}
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                previousLabel="Previous"
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                forcePage={currentPage - 1}
                onPageChange={(event) => onPageChange(event.selected + 1)}
                containerClassName="flex flex-wrap items-center justify-center gap-2"
                pageClassName="flex"
                pageLinkClassName="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-stone-200 bg-white px-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900"
                previousClassName="flex"
                previousLinkClassName="inline-flex h-10 items-center justify-center rounded-full border border-stone-200 bg-white px-4 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900"
                nextClassName="flex"
                nextLinkClassName="inline-flex h-10 items-center justify-center rounded-full border border-stone-200 bg-white px-4 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900"
                breakClassName="flex"
                breakLinkClassName="inline-flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-sm text-stone-400"
                activeClassName="[&>a]:border-stone-900 [&>a]:bg-stone-900 [&>a]:text-white [&>a]:shadow-[0_12px_24px_-16px_rgba(28,25,23,0.45)] [&>a:hover]:bg-stone-900 [&>a:hover]:text-white"
                disabledClassName="pointer-events-none opacity-45"
                renderOnZeroPageCount={null}
                pageCount={pageCount}
            />
        </div>
    );
}
