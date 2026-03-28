import Image from "next/image";
import type { LibraryTool } from "./types";

export default function LibraryCard({ tool }: { tool: LibraryTool }) {
    const imageSrc = tool.image_file_name
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${tool.image_file_name}`
        : null;

    return (
        <article className="group overflow-hidden rounded-[1.75rem] border border-brand-ink/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,248,246,0.98)_100%)] shadow-[0_20px_60px_-40px_rgba(43,37,57,0.28)] transition duration-300 hover:-translate-y-1 hover:border-brand-ink/15 hover:shadow-[0_28px_72px_-38px_rgba(43,37,57,0.30)]">
            <div className="relative overflow-hidden border-b border-brand-ink/10 bg-[linear-gradient(180deg,rgba(255,245,244,0.92)_0%,rgba(255,255,255,0.72)_100%)]">
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
                            className="h-56 w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                            width={400}
                            height={240}
                        />
                    </a>
                ) : (
                    <Image
                        src={imageSrc}
                        alt={tool.name}
                        className="h-56 w-full object-cover object-top"
                        width={400}
                        height={240}
                    />
                ) : (
                    <div className="flex h-56 w-full items-end bg-[linear-gradient(135deg,rgba(239,200,200,0.42)_0%,rgba(186,224,218,0.32)_45%,rgba(255,255,255,0.9)_100%)] p-5">
                        <span className="rounded-full border border-brand-ink/10 bg-white/88 px-3 py-1 text-xs font-medium text-brand-mauve">
                            No preview image
                        </span>
                    </div>
                )}
            </div>

            <div className="space-y-5 p-6">
                <div className="flex flex-wrap gap-2">
                    {tool.category && (
                        <span className="rounded-full border border-brand-ink/12 bg-brand-ink px-3 py-1 text-xs font-semibold tracking-[0.04em] text-white shadow-[0_12px_24px_-18px_rgba(43,37,57,0.55)]">
                            {tool.category}
                        </span>
                    )}
                    {tool.subcategory && (
                        <span className="rounded-full border border-brand-ink/12 bg-brand-oat px-3 py-1 text-xs font-medium text-brand-lilac">
                            {tool.subcategory}
                        </span>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-brand-ink">
                        {tool.name}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-brand-copy">
                        {tool.description}
                    </p>
                </div>

                {tool.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                        {tool.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-brand-ink/10 bg-white px-3 py-1 text-xs text-brand-muted"
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
