import Image from "next/image";
import type { LibraryTool } from "./types";

export default function LibraryCard({ tool }: { tool: LibraryTool }) {
    const imageSrc = tool.image_file_name
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${tool.image_file_name}`
        : null;

    return (
        <article className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(21,16,34,0.9)_0%,rgba(14,10,25,0.86)_100%)] shadow-[0_24px_70px_-40px_rgba(0,0,0,0.7)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_30px_90px_-42px_rgba(112,89,228,0.38)]">
            <div className="relative overflow-hidden border-b border-white/8 bg-[linear-gradient(180deg,rgba(29,20,52,0.92)_0%,rgba(16,12,29,0.6)_100%)]">
                {imageSrc ? tool.website_url ? (
                    <a
                        href={tool.website_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${tool.name}`}
                        className="block"
                    >
                        <Image
                            src={imageSrc}
                            alt={tool.name}
                            className="h-56 w-full object-cover object-top opacity-88 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
                            width={400}
                            height={240}
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                    </a>
                ) : (
                    <Image
                        src={imageSrc}
                        alt={tool.name}
                        className="h-56 w-full object-cover object-top opacity-88"
                        width={400}
                        height={240}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-56 w-full items-end bg-[radial-gradient(circle_at_18%_20%,rgba(197,168,235,0.26),transparent_22%),radial-gradient(circle_at_82%_28%,rgba(112,89,228,0.28),transparent_24%),linear-gradient(180deg,rgba(28,21,47,0.96)_0%,rgba(16,11,28,0.98)_100%)] p-5">
                        <span className="rounded-full border border-primary/20 bg-white/8 px-3 py-1 text-xs font-medium text-primary">
                            No preview image
                        </span>
                    </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%)]" />
            </div>

            <div className="space-y-5 p-6">
                <div className="flex flex-wrap gap-2">
                    {tool.category && (
                        <span className="rounded-full border border-secondary/30 bg-secondary/16 px-3 py-1 text-xs font-semibold tracking-[0.04em] text-primary shadow-[0_12px_24px_-18px_rgba(112,89,228,0.45)]">
                            {tool.category}
                        </span>
                    )}
                    {tool.subcategory && (
                        <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs font-medium text-primary/88">
                            {tool.subcategory}
                        </span>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                        {tool.name}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                        {tool.description}
                    </p>
                </div>

                {tool.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                        {tool.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/58"
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
