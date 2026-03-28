# `src/app/components/library`

This folder contains the UI for the `/library` page.

## Files

- `LibraryHero.tsx`
  The hero section at the top of the library page. It introduces the page and renders the filter controls.
- `LibraryFilters.tsx`
  The client-side filter UI. It reads and writes URL params for search, category, and tag filtering.
- `LibraryGrid.tsx`
  The grid wrapper that renders the result header and the list of tool cards.
- `LibraryCard.tsx`
  The individual tool card. It builds the public image URL from `image_file_name` and renders the tool details.
- `InfiniteLibraryGrid.tsx`
  The client-side infinite-scroll wrapper. It requests more tools from `/api/library` and appends them to the grid.
- `LibrarySidebar.tsx`
  The sidebar content shown beside the library feed.
- `LibraryEmptyState.tsx`
  The fallback view when no tools match the current query.
- `types.ts`
  Shared TypeScript types used by the library components.

## How this folder connects

- `src/app/library/page.tsx` composes these components into the library route.
- `LibraryFilters.tsx` updates URL params, which causes `src/app/library/page.tsx` to refetch server-side data.
- `InfiniteLibraryGrid.tsx` calls `src/app/api/library/route.ts` for additional pages.
- `LibraryCard.tsx` depends on the image and tool fields returned by `src/lib/getTools.ts`.
