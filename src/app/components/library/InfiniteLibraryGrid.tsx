"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LibraryGrid from "./LibraryGrid";
import type { LibraryTool } from "./types";

type InfiniteLibraryGridProps = {
    initialTools: LibraryTool[];
    totalTools: number;
    initialHasMore: boolean;
    pageSize: number;
};

type ToolsResponse = {
    tools: LibraryTool[];
    totalTools: number;
    hasMore: boolean;
    nextOffset: number;
};

export default function InfiniteLibraryGrid({
    initialTools,
    totalTools,
    initialHasMore,
    pageSize,
}: InfiniteLibraryGridProps) {
    const [tools, setTools] = useState(initialTools);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [offset, setOffset] = useState(initialTools.length);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function loadMoreTools() {
        if (!hasMore) {
            return;
        }

        try {
            setErrorMessage(null);

            const response = await fetch(
                `/api/library?offset=${offset}&limit=${pageSize}`,
                { cache: "no-store" },
            );

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
                <div className="mt-6 rounded-3xl border border-brand-ink/10 bg-white/80 px-5 py-4 text-center text-sm text-brand-copy shadow-[0_20px_50px_-38px_rgba(43,37,57,0.28)]">
                    Loading more tools...
                </div>
            }
            endMessage={
                tools.length > 0 ? (
                    <p className="mt-6 text-center text-sm text-brand-haze">
                        You&apos;ve reached the end of the library.
                    </p>
                ) : null
            }
            scrollThreshold="240px"
            style={{ overflow: "visible" }}
        >
            <LibraryGrid
                tools={tools}
                totalTools={totalTools}
                visibleTools={tools.length}
            />
            {errorMessage ? (
                <div className="mt-6 rounded-3xl border border-rose-200 bg-rose-50/90 px-5 py-4 text-sm text-rose-700">
                    {errorMessage}
                </div>
            ) : null}
        </InfiniteScroll>
    );
}
