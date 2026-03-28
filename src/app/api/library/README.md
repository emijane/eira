# `src/app/api/library`

This folder contains the API route used by the library infinite-scroll feed.

## Files

- `route.ts`
  Handles `GET /api/library`. It reads paging and filter params from the URL, then calls `@/lib/getTools` to fetch the next batch of tools.

## How this folder connects

- `src/app/components/library/InfiniteLibraryGrid.tsx` calls this endpoint while the user scrolls.
- `route.ts` forwards the request to `src/lib/getTools.ts`.
- The route keeps the infinite-scroll feed in sync with the same filters used by `src/app/library/page.tsx`.
