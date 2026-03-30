# `src/app/dev-tool`

Internal development-only UI for quickly classifying and inserting tools without using the terminal script directly.

## What this route does

- Accepts a website URL from the browser
- Accepts an optional image upload from the browser
- Sends the request to server-side route handlers
- Reuses the existing classification workflow under `src/app/classification/`
- Shows the generated row before insertion
- Blocks insertion when a duplicate by name or website already exists
- Uploads images to the public `media` bucket before insertion

## Security notes

- This route is intended for development only.
- The backing API endpoints under `src/app/api/dev-tool/` return `404` when `NODE_ENV !== "development"`.
- OpenAI and Supabase credentials remain server-side only.
- Requests are validated on the server and restricted to `http` / `https` absolute URLs.
- Route handlers reject cross-origin requests when an `Origin` header is present.
- Uploaded images are validated server-side:
  - max size `5 MB`
  - allowed types: `png`, `jpg`, `jpeg`, `webp`
  - stored filenames are generated on the server

## Files

- `page.tsx`
  Server page shell for the dev tool manager.

- `../components/dev-tool/DevToolManager.tsx`
  Client UI for classifying a URL, previewing the generated row, and inserting it.
- `../classification/devToolImageUpload.ts`
  Server-side helper that validates image files and uploads them to the `media` bucket.

## How it connects

- `src/app/api/dev-tool/classify/route.ts` uploads the optional image, then builds a preview row using the shared classification helpers.
- `src/app/api/dev-tool/insert/route.ts` re-runs the workflow on the server and inserts only after duplicate checks pass.
- `src/app/classification/devToolWorkflow.ts` contains the shared validation and orchestration used by both endpoints.
