# Eira

Eira is a curated frontend tool library for discovering design, UI, development, and workflow tools in one place. The site is built to feel editorial and easy to browse, while still supporting structured search, filtering, and lightweight taxonomy-driven classification behind the scenes.

## What The Site Is For

Eira is used to:

- browse a growing library of frontend and design-adjacent tools
- filter by category and subcategory
- search tools by name, description, and relevant tags
- curate consistent metadata for each tool
- ingest new tools quickly with an internal development workflow

## Core Features

- Minimal, card-based library UI
- Search plus collapsible filters for category, subcategory, and sort
- Infinite loading for the tool grid
- Shared taxonomy for classifier output and library filtering
- AI-assisted classification helps keep tool data structured and consistent
- Curated metadata for names, descriptions, categories, subcategories, and tags

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase
  - Postgres for tool records
  - Storage for uploaded tool images
- OpenAI API for tool classification
- Lucide React for icons

## Project Structure

- `src/app/`
  Next.js app routes, shared layout, route handlers, and app-level components.
- `src/app/library/`
  The main tool library route.
- `src/app/components/library/`
  Search, filters, grid, and card components used by the library.
- `src/app/classification/`
  Shared classification logic and taxonomy validation.
- `src/lib/`
  Shared server utilities, including Supabase access and tool querying.
- `docs/`
  Supporting project documentation, including taxonomy notes.

## Classification

Eira uses AI-assisted classification to help organize tools consistently before they are added to the library. That process is designed to keep taxonomy decisions predictable and reduce manual cleanup as the catalog grows.

The classifier generates structured fields such as:

- name
- one-sentence description
- category
- subcategory
- tags
- slug

Developers can test and refine this classification flow privately during content operations, while the public site stays focused on browsing and discovery.

## Search And Taxonomy

The library supports:

- text search across name, description, and tags
- category filtering
- subcategory filtering
- client-side sort options

Subcategories used by the filter UI come from the data in the database. The classifier is constrained by the shared taxonomy defined in:

- `src/app/classification/classifyTool.ts`

If you add a new subcategory there, it becomes available for future classified tools. It will appear in the library filters once tools using that subcategory exist in the database.
