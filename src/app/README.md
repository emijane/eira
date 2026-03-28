# `src/app`

This folder contains the Next.js App Router app for Eira Tools.

## Files

- `layout.tsx`
  The root layout for the app. It loads global fonts, metadata, global CSS, and the shared header.
- `globals.css`
  Global Tailwind and theme styles used across the site.
- `page.tsx`
  The homepage route.

## Subfolders

- `api/`
  Server route handlers for app-specific endpoints.
- `classification/`
  Terminal-side ingestion helpers for classifying and inserting tools.
- `components/`
  UI components used by routes in this app.
- `library/`
  The `/library` route.

## How this folder connects

- `layout.tsx` imports `./components/header`.
- Route files like `library/page.tsx` pull data from `@/lib/getTools`.
- Components under `app/components/` are composed into the route pages here.
