# `src`

This is the main application source tree for Eira Tools.

## Folder map

- `app/`
  The Next.js App Router application. This includes pages, layout, API routes, and app-specific UI.
- `components/`
  Shared UI primitives that are not tied to a single route.
- `lib/`
  Reusable helpers for data access, utility functions, and external service setup.

## How the pieces connect

- `app/layout.tsx` wraps the full site and pulls in shared UI like the header.
- Route files in `app/` call data helpers from `lib/`.
- App-specific components in `app/components/` render the route UI.
- Shared components in `components/ui/` support reusable patterns like navigation.
