// src/lib/tools.ts

// This file contains utility functions related to tools, such as fetching tools from the database.
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// fetch the full tool list for routes that do their own filtering or slicing.
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
