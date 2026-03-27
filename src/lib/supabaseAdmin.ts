// src/lib/supabaseAdmin.ts
// This file sets up a Supabase client with admin privileges using the service role key.
// It exports the supabaseAdmin client for use in other parts of the application.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing. Check your .env.local file.");
}

if (!supabaseServiceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing. Check your .env.local file.");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});