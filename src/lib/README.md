# `src/lib`

This folder contains shared helpers for data access, external services, and utility functions.

## Files

- `getTools.ts`
  Fetches tools from Supabase for the library page and infinite-scroll API. It supports pagination, counting, and URL-driven filters.
- `supabaseAdmin.ts`
  Creates the authenticated Supabase admin client using environment variables.
- `utils.ts`
  Small general-purpose utilities, currently including the `cn` class-merging helper.

## How this folder connects

- `src/app/library/page.tsx` and `src/app/api/library/route.ts` both use `getTools.ts`.
- The classification scripts in `src/app/classification/` use `supabaseAdmin.ts`.
- UI components like `src/app/components/header.tsx` and `src/components/ui/navigation-menu.tsx` use `utils.ts`.
