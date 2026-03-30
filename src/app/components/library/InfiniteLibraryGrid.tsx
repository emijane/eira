"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LibraryGrid from "./LibraryGrid";
import type { LibraryTool } from "./types";

type InfiniteLibraryGridProps = {
    initialTools: LibraryTool[];
    initialHasMore: boolean;
    pageSize: number;
    searchQuery?: string;
    category?: string;
    subcategory?: string;
};

type ToolsResponse = {
    tools: LibraryTool[];
    totalTools: number;
    hasMore: boolean;
    nextOffset: number;
};

export default function InfiniteLibraryGrid({
    initialTools,
    initialHasMore,
    pageSize,
    searchQuery = "",
    category = "",
    subcategory = "",
}: InfiniteLibraryGridProps) {
    const [tools, setTools] = useState(initialTools);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [offset, setOffset] = useState(initialTools.length);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setTools(initialTools);
        setHasMore(initialHasMore);
        setOffset(initialTools.length);
        setErrorMessage(null);
    }, [initialTools, initialHasMore]);

    async function loadMoreTools() {
        if (!hasMore) {
            return;
        }

        try {
            setErrorMessage(null);
            const params = new URLSearchParams({
                offset: String(offset),
                limit: String(pageSize),
            });

            if (searchQuery) {
                params.set("q", searchQuery);
            }

            if (category) {
                params.set("category", category);
            }

            if (subcategory) {
                params.set("subcategory", subcategory);
            }

            const response = await fetch(`/api/library?${params.toString()}`, {
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error("Could not load more tools right now.");
            }

            const data = (await response.json()) as ToolsResponse;

            setTools((currentTools) => {
                const existingIds = new Set(currentTools.map((tool) => tool.id));
                const nextTools = data.tools.filter((tool) => !existingIds.has(tool.id));
                return [...currentTools, ...nextTools];
            });
            setHasMore(data.hasMore);
            setOffset(data.nextOffset);
        } catch (error) {
            setHasMore(false);
            setErrorMessage(
                error instanceof Error ? error.message : "Could not load more tools.",
            );
        }
    }

    return (
        <InfiniteScroll
            dataLength={tools.length}
            next={loadMoreTools}
            hasMore={hasMore}
            loader={
                <div className="mt-6 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(20,15,34,0.84)_0%,rgba(14,10,24,0.76)_100%)] px-5 py-4 text-center text-sm text-white/68 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.72)] backdrop-blur-xl">
                    Loading more tools...
                </div>
            }
            endMessage={
                tools.length > 0 ? (
                    <p className="mt-6 text-center text-sm text-primary/72">
                        You&apos;ve reached the end of the library.
                    </p>
                ) : null
            }
            scrollThreshold="240px"
            style={{ overflow: "visible" }}
        >
            <LibraryGrid
                tools={tools}
                visibleTools={tools.length}
            />
            {errorMessage ? (
                <div className="mt-6 rounded-3xl border border-rose-300/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 backdrop-blur-xl">
                    {errorMessage}
                </div>
            ) : null}
        </InfiniteScroll>
    );
}
