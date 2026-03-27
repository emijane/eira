// src/lib/tools.ts

// This file contains utility functions related to tools, such as fetching tools from the database.
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Function to fetch all tools from the "tools" table in the Supabase database.
// It selects specific fields and orders the results by name in ascending order.
export async function getTools() {
    const { data, error } = await supabaseAdmin
        .from("tools")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        throw new Error(`Failed to fetch tools: ${error.message}`);
    }

    return data;
}