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
                containerClassName="flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#2B2539]/8 bg-white/80 p-1.5 shadow-[0_18px_40px_-32px_rgba(43,37,57,0.32)]"
                pageClassName="flex"
                pageLinkClassName="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[#2B2539]/10 bg-white px-3 text-sm font-medium text-[#5c5368] transition hover:border-[#2B2539]/16 hover:bg-[#f7f4f0] hover:text-[#2B2539]"
                previousClassName="flex"
                previousLinkClassName="inline-flex h-10 items-center justify-center rounded-full border border-[#2B2539]/10 bg-white px-4 text-sm font-medium text-[#5c5368] transition hover:border-[#2B2539]/16 hover:bg-[#f7f4f0] hover:text-[#2B2539]"
                nextClassName="flex"
                nextLinkClassName="inline-flex h-10 items-center justify-center rounded-full border border-[#2B2539]/10 bg-white px-4 text-sm font-medium text-[#5c5368] transition hover:border-[#2B2539]/16 hover:bg-[#f7f4f0] hover:text-[#2B2539]"
                breakClassName="flex"
                breakLinkClassName="inline-flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-sm text-[#8b8196]"
                activeClassName="[&>a]:border-[#2B2539] [&>a]:bg-[#2B2539] [&>a]:text-white [&>a]:shadow-[0_14px_28px_-18px_rgba(43,37,57,0.62)] [&>a:hover]:bg-[#2B2539] [&>a:hover]:text-white"
                disabledClassName="pointer-events-none opacity-45"
                renderOnZeroPageCount={null}
                pageCount={pageCount}
            />
        </div>
    );
}
