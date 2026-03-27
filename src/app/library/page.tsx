import { getTools } from "@/lib/tools";

export default async function ToolsPage() {
    const tools = await getTools();

    return (
        <div>
            {tools.map((tool) => (
                <div key={tool.id}>
                    <h2>{tool.name}</h2>
                    <p>{tool.description}</p>
                </div>
            ))}
        </div>
    );
}