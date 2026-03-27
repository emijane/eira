// src/app/classification/toolInput.ts

import "dotenv/config";
import readline from "node:readline";
import { classifyTool } from "./classifyTool";
import { slugify } from "./slugify";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { findExistingToolByName } from "./findExistingTool";

// Utility function to prompt the user with a question and return their input as a string.
function askQuestion(question: string): Promise<string> {
    // Create a readline interface to read input from the command line.
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Return a promise that resolves with the user's input when they answer the question.
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

// Main function that orchestrates the process of classifying a tool and inserting it into the database.
async function main() {
    // Wrap the entire process in a try-catch block to handle any errors that may occur during execution.
    try {
        // Prompt the user for the URL and image file name of the tool they want to classify.
        const url = await askQuestion("URL: ");
        const imageFileName = await askQuestion("Image file name: ");

        // Validate that the URL is provided, as it is required for classification. If not, throw an error to inform the user.
        if (!url) {
            throw new Error("URL is required.");
        }

        // Call the classifyTool function with the provided URL and image file name to get the classification results.
        const classified = await classifyTool({
            url,
            image_file_name: imageFileName,
        });

        // Construct a new object that represents the row to be inserted into the database, 
        // using the classification results and user input.
        const rowToInsert = {
            name: classified.name,
            slug: slugify(classified.name),
            website_url: url,
            image_file_name: imageFileName || null,
            image_url: imageFileName ? `/tool-images/${imageFileName}` : null,
            description: classified.description,
            category: classified.category,
            subcategory: classified.subcategory,
            tags: classified.tags,
        };

        const existing = await findExistingToolByName(rowToInsert.name);

        if (existing) {
            console.log("Tool already exists. Skipping insert.");
            console.log(JSON.stringify(existing, null, 4));
            return;
        }

        // Log the generated row to the console in a formatted manner for the user 
        // to review before confirming the insertion into the database.
        console.log("\nGenerated row:");
        console.log(JSON.stringify(rowToInsert, null, 4));

        // Prompt the user to confirm whether they want to insert the generated row into the Supabase database.
        const confirmation = await askQuestion(
            "\nInsert this row into Supabase? (y/n): "
        );

        // If the user does not confirm with "y", log a cancellation message and exit the function without inserting.
        if (confirmation.toLowerCase() !== "y") {
            console.log("\nInsert cancelled.");
            return;
        }

        // Use the Supabase client to insert the new tool into the "tools" table.
        const { data, error } = await supabaseAdmin
            .from("tools")
            .insert([rowToInsert])
            .select()
            .single();

        // If there was an error during the insert operation, throw an error with a descriptive message.
        if (error) {
            throw new Error(error.message);
        }

        // If the insert was successful, log the inserted row data to the console in a formatted manner.
        console.log("\nInserted row:");
        console.log(JSON.stringify(data, null, 4));
    // Catch any errors that occur during the process and log them to the console for debugging purposes.
    } catch (error) {
        console.error("\nError:");
        console.error(error);
    }
}

main();