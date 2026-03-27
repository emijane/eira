// src/lib/tools.ts

// This file contains utility functions related to tools, such as fetching tools from the database.
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Function to fetch all tools from the "tools" table in the Supabase database.
// It selects specific fields and orders the results by name in ascending order.
export async function getTools() {
    // Use the Supabase client to query the "tools" table and select specific fields.
    const { data, error } = await supabaseAdmin
        .from("tools")
        .select(`
            id,
            name,
            slug,
            website_url,
            image_file_name,
            image_url,
            description,
            category,
            subcategory,
            tags
        `)
        .order("name", { ascending: true });
    
    // If there was an error during the query operation, throw an error with a descriptive message.
    if (error) {
        throw new Error(`Failed to fetch tools: ${error.message}`);
    }

    return data;
}