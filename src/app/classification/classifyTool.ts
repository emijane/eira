import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing. Check your .env.local file.");
}

const client = new OpenAI({ apiKey });

export type ToolInput = {
    url: string;
    image_file_name: string;
};

export type ToolOutput = {
    name: string;
    description: string;
    category: string;
    subcategory: string;
    tags: string[];
};

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

const TAXONOMY_TEXT = Object.entries(TAXONOMY)
    .map(([category, subcategories]) => {
        const lines = subcategories.map((subcategory) => `- ${subcategory}`).join("\n");
        return `${category}:\n${lines}`;
    })
    .join("\n\n");

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
- Tags must be lowercase and relevant.
- Prefer 3-6 tags.
- Return no prose outside the JSON result.

Examples:
- Next.js -> Frameworks / React Frameworks
- Tailwind CSS -> UI & Styling / CSS Frameworks
- Clerk -> Authentication / Auth Providers
- Supabase -> Backend & Database / Backend-as-a-Service
`;

function isValidCategory(category: string): category is keyof typeof TAXONOMY {
    return category in TAXONOMY;
}

function isValidSubcategory(category: keyof typeof TAXONOMY, subcategory: string): boolean {
    return TAXONOMY[category].includes(subcategory as never);
}

function validateOutput(output: ToolOutput): ToolOutput {
    if (!output.name || !output.description || !output.category || !output.subcategory) {
        throw new Error("Model returned missing required fields.");
    }

    if (!Array.isArray(output.tags)) {
        throw new Error("Model returned invalid tags.");
    }

    const cleaned: ToolOutput = {
        name: output.name.trim(),
        description: output.description.trim(),
        category: output.category.trim(),
        subcategory: output.subcategory.trim(),
        tags: output.tags
            .map((tag) => String(tag).trim().toLowerCase())
            .filter(Boolean)
            .slice(0, 6)
    };

    if (!isValidCategory(cleaned.category)) {
        throw new Error(`Invalid category returned by model: ${cleaned.category}`);
    }

    if (!isValidSubcategory(cleaned.category, cleaned.subcategory)) {
        throw new Error(
            `Invalid subcategory "${cleaned.subcategory}" for category "${cleaned.category}".`
        );
    }

    return cleaned;
}

export async function classifyTool(input: ToolInput): Promise<ToolOutput> {
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

    const rawText = response.output_text;

    if (!rawText) {
        throw new Error("Model returned empty output.");
    }

    const parsed = JSON.parse(rawText) as ToolOutput;

    return validateOutput(parsed);
}