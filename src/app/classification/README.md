# `src/app/classification`

This folder contains the command-line ingestion workflow used to classify and add new tools to the database.

## Files

- `toolInput.ts`
  The terminal entry point. It prompts for a tool URL and screenshot filename, runs classification, shows the generated row, and inserts it after confirmation.
- `classifyTool.ts`
  Sends the tool input to OpenAI, validates the structured response, and maps it to the project taxonomy.
- `devToolWorkflow.ts`
  Shared server-side workflow for validating a URL, classifying a tool, building an insert row, and checking for duplicates.
- `insertTool.ts`
  Defines the insert shape and contains the helper for inserting a tool into Supabase.
- `findExistingTool.ts`
  Checks for an existing tool by name before a new insert goes through.
- `findExistingToolByWebsite.ts`
  Checks for an existing tool by website URL.
- `slugify.ts`
  Converts a tool name into a URL-safe slug.

## Subfolders

- `documentation/`
  Notes about the ingestion workflow.

## How this folder connects

- These scripts use `src/lib/supabaseAdmin.ts` for database access.
- The inserted rows are later consumed by the library route in `src/app/library/`.
- `toolInput.ts` orchestrates the other files in this folder.
- `src/app/api/dev-tool/` reuses `devToolWorkflow.ts` so the browser-based dev tool manager follows the same classification path as the terminal workflow.
