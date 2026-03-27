import Image from "next/image";
import { getTools } from "@/lib/getTools";

export default async function LibraryPage() {
    const tools = await getTools();

    return (
        <main className="mx-auto max-w-6xl px-6 py-10">
            <h1 className="mb-8 text-3xl font-bold">Library</h1>

            {tools.length === 0 ? (
                <p>No tools found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => {
                        const imageSrc = tool.image_file_name
                            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${tool.image_file_name}`
                            : null;

                        return (
                            <div
                                key={tool.id}
                                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                            >
                                {imageSrc && (
                                    <Image
                                        src={imageSrc}
                                        alt={tool.name}
                                        className="mb-4 rounded-xl object-cover"
                                        width={400}
                                        height={160}
                                        unoptimized
                                    />
                                )}

                                <h2 className="text-xl font-semibold">{tool.name}</h2>

                                <p className="mt-2 text-sm text-gray-600">
                                    {tool.description}
                                </p>

                                <div className="mt-4 space-y-1 text-sm text-gray-500">
                                    <p>{tool.category}</p>
                                    <p>{tool.subcategory}</p>
                                </div>

                                {tool.tags?.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {tool.tags.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
