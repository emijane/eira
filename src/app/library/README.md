# `src/app/library`

This folder contains the `/library` route.

## Files

- `page.tsx`
  The main library page. It reads search params from the URL, fetches the first page of tools from Supabase through `@/lib/getTools`, and renders the hero, results, and sidebar.

## How this folder connects

- Uses `src/app/components/library/` for all page UI.
- Uses `src/lib/getTools.ts` for the initial server-side fetch.
- Passes active filters into `InfiniteLibraryGrid.tsx` so later API fetches stay consistent with the first page.
