# `src/app/api`

This folder contains Next.js route handlers that run on the server.

## Subfolders

- `library/`
  API endpoints related to the tool library feed.

## How this folder connects

- Route handlers here are called by client components in `src/app/components/`.
- These handlers usually delegate database work to helpers in `src/lib/`.
