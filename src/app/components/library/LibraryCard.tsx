import Image from "next/image";
import type { LibraryTool } from "./types";

export default function LibraryCard({ tool }: { tool: LibraryTool }) {
    const imageSrc = tool.image_file_name
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${tool.image_file_name}`
        : null;

    return (
        <article className="group overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white/90 shadow-[0_18px_60px_-40px_rgba(120,53,15,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-36px_rgba(120,53,15,0.35)]">
            <div className="relative overflow-hidden border-b border-stone-100 bg-[linear-gradient(180deg,#fffaf5_0%,#fff4e8_100%)]">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={tool.name}
                        className="h-56 w-full object-cover object-top"
                        width={400}
                        height={240}
                        unoptimized
                    />
                ) : (
                    <div className="flex h-56 w-full items-end bg-[linear-gradient(135deg,#fff7ed_0%,#fffbeb_100%)] p-5">
                        <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-stone-600">
                            No preview image
                        </span>
                    </div>
                )}
            </div>

            <div className="space-y-5 p-6">
                <div className="flex flex-wrap gap-2">
                    {tool.category && (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold tracking-wide text-amber-900">
                            {tool.category}
                        </span>
                    )}
                    {tool.subcategory && (
                        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                            {tool.subcategory}
                        </span>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
                        {tool.name}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-stone-600">
                        {tool.description}
                    </p>
                </div>

                {tool.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                        {tool.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-stone-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : null}
            </div>
        </article>
    );
}
