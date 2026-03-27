// src/app/classification/insertTool.ts
// This file defines a function to insert a new tool into the "tools" table in the Supabase database.
// It imports the Supabase client with admin privileges and defines the structure of the input data required for the insertion.

import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Define the structure of the input data required to insert a new tool into the database.
export type ToolInsertInput = {
    name: string;
    slug: string;
    website_url: string;
    image_file_name?: string | null;
    image_url?: string | null;
    description: string;
    category: string;
    subcategory: string;
    tags: string[];
};

// Function to insert a new tool into the "tools" table in the Supabase database. 
// It takes a ToolInsertInput object as an argument and returns the inserted tool data.
export async function insertTool(tool: ToolInsertInput) {
    // Check if a tool with the same website URL already exists in the database to prevent duplicates.
    const { data: existing } = await supabaseAdmin
        .from("tools")
        .select("id")
        .eq("website_url", tool.website_url)
        .maybeSingle();

    // If a tool with the same website URL already exists, log a message and skip the insertion to avoid duplicates.
    if (existing) {
        console.log("Tool already exists. Skipping insert.");
        return;
    }

    // Use the Supabase client to insert the new tool into the "tools" table.
    const { data, error } = await supabaseAdmin
        .from("tools")
        .insert([tool])
        .select()
        .single();

    // If there was an error during the insert operation, throw an error with a descriptive message.
    if (error) {
        throw new Error(`Supabase insert failed: ${error.message}`);
    }

    // If the insert was successful, return the inserted tool data.
    return data;
}