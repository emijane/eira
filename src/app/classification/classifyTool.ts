// src/app/classification/classifyTool.ts

// This module defines the classifyTool function, which uses the OpenAI API 
// to classify frontend development tools based on their URL and an optional 
// image file name. The classification includes the tool's name, a brief description, 
// its category and subcategory within a predefined taxonomy, and relevant tags. 
// The function ensures that the output adheres to the specified taxonomy and 
// formatting rules, providing structured data for integration into the Eira database.

// allows us to use process.env and other Node.js features in this module, 
// even if it's used in a browser context
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Import the OpenAI client library to interact with the OpenAI API
import OpenAI from "openai";

// Ensure that the OPENAI_API_KEY environment variable is set, and initialize the OpenAI client
const apiKey = process.env.OPENAI_API_KEY;

// If the API key is missing, throw an error to alert the developer to check their .env.local file
if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing. Check your .env.local file.");
}

// Create a new instance of the OpenAI client using the provided API key
const client = new OpenAI({ apiKey });

// Define the input and output types for the classifyTool function
export type ToolInput = {
    url: string;
    image_file_name: string;
};

// Define the structure of the output that classifyTool will return, 
// including the tool's name, description, category, subcategory, and relevant tags
export type ToolOutput = {
    name: string;
    description: string;
    category: string;
    subcategory: string;
    tags: string[];
};

// Define the taxonomy of categories and subcategories that the classifyTool function will use for classification. 
// This taxonomy is based on common types of frontend development tools and is used to ensure consistent categorization 
// in the Eira database.
const TAXONOMY = {
    "Frameworks": [
        "React Frameworks",
        "Vue Frameworks",
        "Svelte / Solid Frameworks",
        "Fullstack Frameworks",
        "Static Site Generators"
    ],
    "UI & Styling": [
        "Component Libraries",
        "CSS Frameworks",
        "Styling Utilities",
        "Animation Libraries",
        "Icon Libraries",
        "Design Systems"
    ],
    "State & Data Management": [
        "State Management",
        "Server State / Data Fetching",
        "Forms",
        "Validation"
    ],
    "Backend & Database": [
        "Backend-as-a-Service",
        "Databases",
        "ORMs / Query Builders",
        "API Frameworks"
    ],
    "Authentication": [
        "Auth Providers",
        "Session Management",
        "Authorization / RBAC"
    ],
    "Dev Tools (DX)": [
        "Build Tools / Bundlers",
        "Package Managers",
        "Linters / Formatters",
        "Dev Utilities",
        "CLI Tools"
    ],
    "Testing": [
        "Unit Testing",
        "Integration Testing",
        "End-to-End Testing"
    ],
    "Deployment & Infrastructure": [
        "Hosting Platforms",
        "Edge / CDN",
        "CI/CD",
        "Containers / Infrastructure"
    ],
    "Analytics & Monitoring": [
        "Product Analytics",
        "Error Tracking",
        "Performance Monitoring",
        "Logging"
    ],
    "Payments & Monetization": [
        "Payment Processors",
        "Subscription Management",
        "Billing Infrastructure"
    ],
    "Communication & Messaging": [
        "Email APIs",
        "Notifications (Push / SMS)",
        "Chat / Realtime Messaging"
    ],
    "Media & File Handling": [
        "Image / Video Hosting",
        "File Storage",
        "Image Optimization"
    ],
    "Search & Indexing": [
        "Search Engines",
        "Indexing Tools"
    ],
    "AI & ML": [
        "AI APIs",
        "AI SDKs / Frameworks",
        "Embeddings / Vector Databases"
    ],
    "Security": [
        "Security / Protection Services",
        "Rate Limiting",
        "Bot Protection"
    ]
} as const;

// Convert the taxonomy object into a formatted string that can be included in the agent instructions.
// This string lists each category and its corresponding subcategories in a readable format, which helps 
// guide the model's classification process.
const TAXONOMY_TEXT = Object.entries(TAXONOMY)
    .map(([category, subcategories]) => {
        const lines = subcategories.map((subcategory) => `- ${subcategory}`).join("\n");
        return `${category}:\n${lines}`;
    })
    .join("\n\n");

const TAG_NORMALIZATION_MAP: Record<string, string> = {
    reactjs: "react",
    "react.js": "react",
    vuejs: "vue",
    "vue.js": "vue",
    "next.js": "nextjs",
    next: "nextjs",
    "tailwind css": "tailwind",
    tailwindcss: "tailwind",
    "open source": "open-source",
    opensource: "open-source",
    "design system": "design-systems",
    "design systems": "design-systems",
    icons: "icon-library",
    "icon library": "icon-library",
    "component library": "component-library",
    "component libraries": "component-library",
    animation: "animations",
    forms: "form-handling",
    form: "form-handling",
    auth: "authentication",
    authentication: "authentication",
};

// Define the instructions that will be provided to the OpenAI model when classifying tools.
const AGENT_INSTRUCTIONS = `
EIRA AGENT CONTEXT

Purpose:
This agent organizes frontend development tools into the Eira database.

Input:
The agent receives JSON in this shape:
{
  "url": "string",
  "image_file_name": "string"
}

Important:
- The agent should use the URL as the main classification signal.
- The agent may use image_file_name only as a weak hint if it contains the product name.
- The agent must classify based on the tool's primary purpose.
- The agent must return exactly one category and one subcategory.
- The agent must not invent categories or subcategories.
- The output must be valid JSON only.

Allowed taxonomy:
${TAXONOMY_TEXT}

Rules:
- Use the real product name.
- Description must be 1-2 sentences, neutral, no marketing fluff.
- Tags must be lowercase, relevant, and consistent across tools.
- Prefer short reusable tags over creative variations.
- Avoid near-duplicate tags and synonyms unless one version is clearly the project standard.
- Do not use category or subcategory names as tags unless they are genuinely useful for search.
- Prefer normalized tags such as "react", "vue", "nextjs", "tailwind", "open-source", "component-library", "icon-library", "animations", "form-handling", and "authentication" when they fit.
- Prefer 3-6 tags.
- Return no prose outside the JSON result.

Examples:
- Next.js -> Frameworks / React Frameworks
- Tailwind CSS -> UI & Styling / CSS Frameworks
- Clerk -> Authentication / Auth Providers
- Supabase -> Backend & Database / Backend-as-a-Service
`;

// Helper functions to validate the model's output against the defined taxonomy and formatting rules.

// This function checks if the provided category is a valid key in the TAXONOMY object.
function isValidCategory(category: string): category is keyof typeof TAXONOMY {
    return category in TAXONOMY;
}

// This function checks if the provided subcategory is valid for the given category in the TAXONOMY object.
function isValidSubcategory(category: keyof typeof TAXONOMY, subcategory: string): boolean {
    return TAXONOMY[category].includes(subcategory as never);
}

// This function validates the output from the model to ensure it contains all required fields,
function validateOutput(output: ToolOutput): ToolOutput {
    // Check for the presence of required fields and validate their types and formats.
    if (!output.name || !output.description || !output.category || !output.subcategory) {
        throw new Error("Model returned missing required fields.");
    }

    // Ensure that the tags field is an array, as expected. If it's not, throw an error to indicate invalid output.
    if (!Array.isArray(output.tags)) {
        throw new Error("Model returned invalid tags.");
    }

    // Clean and normalize the output by trimming whitespace from strings, converting tags to lowercase, and ensuring that only relevant tags are included (up to 6). This step helps maintain consistency in the Eira database.
    const cleaned: ToolOutput = {
        name: output.name.trim(),
        description: output.description.trim(),
        category: output.category.trim(),
        subcategory: output.subcategory.trim(),
        tags: output.tags
            .map((tag) =>
                String(tag)
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, " ")
            )
            .map((tag) => TAG_NORMALIZATION_MAP[tag] ?? tag)
            .filter(Boolean)
            .filter((tag, index, tags) => tags.indexOf(tag) === index)
            .slice(0, 6)
    };

    // Validate that the cleaned category and subcategory are valid according to the defined taxonomy. 
    // If either is invalid, throw an error to indicate that the model's output does not conform to 
    // the expected categories and subcategories.
    if (!isValidCategory(cleaned.category)) {
        throw new Error(`Invalid category returned by model: ${cleaned.category}`);
    }

    // Now that we know the category is valid, we can check if the subcategory is valid for that category.
    if (!isValidSubcategory(cleaned.category, cleaned.subcategory)) {
        throw new Error(
            `Invalid subcategory "${cleaned.subcategory}" for category "${cleaned.category}".`
        );
    }

    // If all validations pass, return the cleaned and validated output.
    return cleaned;
}

// The main function that classifies a tool based on its URL and an optional image file name.
export async function classifyTool(input: ToolInput): Promise<ToolOutput> {
    // Send a request to the OpenAI API to create a response based on the provided input and the defined agent instructions.
    const response = await client.responses.create({
        model: "gpt-5.4-mini",
        instructions: AGENT_INSTRUCTIONS,
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: `Classify this tool for the Eira database.

        Input JSON:
        ${JSON.stringify(input, null, 4)}

        Return only the structured result.`
                            }
                        ]
                    }
                ],
        text: {
            format: {
                type: "json_schema",
                name: "eira_tool_classification",
                strict: true,
                schema: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        name: {
                            type: "string"
                        },
                        description: {
                            type: "string"
                        },
                        category: {
                            type: "string"
                        },
                        subcategory: {
                            type: "string"
                        },
                        tags: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    },
                    required: [
                        "name",
                        "description",
                        "category",
                        "subcategory",
                        "tags"
                    ]
                }
            }
        }
    });

    // Extract the raw text output from the model's response. 
    // This is expected to be a JSON string that can be parsed into the ToolOutput structure.
    const rawText = response.output_text;

    // If the model returns an empty output, throw an error to indicate that the classification failed.
    if (!rawText) {
        throw new Error("Model returned empty output.");
    }

    // Attempt to parse the raw text as JSON and validate it against the expected structure.
    const parsed = JSON.parse(rawText) as ToolOutput;

    // Validate the parsed output to ensure it adheres to the defined taxonomy and formatting rules.
    return validateOutput(parsed);
}
