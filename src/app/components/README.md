# `src/app/components`

This folder contains UI components specific to the App Router portion of the site.

## Files

- `header.tsx`
  The main site header and navigation bar shown in the root layout.

## Subfolders

- `library/`
  Components that power the `/library` page.

## How this folder connects

- `src/app/layout.tsx` imports `header.tsx`.
- Route files like `src/app/library/page.tsx` import components from the `library/` subfolder.
- Some components here rely on shared UI primitives from `src/components/ui/`.
