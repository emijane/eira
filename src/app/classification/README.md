# Eira Classification System

## This folder handles adding new tools to the database using AI.

### Workflow:
1. Enter a tool URL and image file name in the terminal
2. classifyTool.ts sends the input to OpenAI
3. AI returns structured data (name, description, category, etc.)
4. tool-input.ts builds a database row
5. The row is shown for confirmation
6. If approved, it is inserted into the Supabase "tools" table

### Files:

- classifyTool.ts
  Handles AI classification and validates output against the taxonomy.

- tool-input.ts
  Runs the terminal script, builds the row, and inserts into Supabase.

- slugify.ts
  Converts tool names into URL-safe slugs.

- supabaseAdmin.ts (outside this folder)
  Creates the Supabase client using the service role key.

### Environment Variables:

OPENAI_API_KEY
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY

### Run the script:

npx tsx src/app/classification/tool-input.ts

### Purpose:

This system allows fast tool ingestion by generating structured data automatically,
while still requiring manual confirmation before inserting into the database.