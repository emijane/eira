import "dotenv/config";
import readline from "node:readline";
import { classifyTool } from "./classifyTool";
import { slugify } from "./slugify";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function askQuestion(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function main() {
    try {
        const url = await askQuestion("URL: ");
        const imageFileName = await askQuestion("Image file name: ");

        if (!url) {
            throw new Error("URL is required.");
        }

        const classified = await classifyTool({
            url,
            image_file_name: imageFileName,
        });

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

        console.log("\nGenerated row:");
        console.log(JSON.stringify(rowToInsert, null, 4));

        const confirmation = await askQuestion(
            "\nInsert this row into Supabase? (y/n): "
        );

        if (confirmation.toLowerCase() !== "y") {
            console.log("\nInsert cancelled.");
            return;
        }

        const { data, error } = await supabaseAdmin
            .from("tools")
            .insert([rowToInsert])
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        console.log("\nInserted row:");
        console.log(JSON.stringify(data, null, 4));
    } catch (error) {
        console.error("\nError:");
        console.error(error);
    }
}

main();