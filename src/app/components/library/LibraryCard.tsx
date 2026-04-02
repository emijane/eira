import Image from "next/image";
import type { LibraryTool } from "./types";

export default function LibraryCard({ tool }: { tool: LibraryTool }) {
    const imageSrc = tool.image_file_name
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${tool.image_file_name}`
        : null;

    return (
        <article className="group relative overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-[0_2px_6px_rgba(16,24,40,0.04),0_1px_2px_rgba(16,24,40,0.03)] transition duration-200 hover:-translate-y-0.5 hover:border-black/15 hover:shadow-[0_12px_24px_-12px_rgba(16,24,40,0.1)]">
            <div className="relative h-56 overflow-hidden border-b border-black/8 bg-[#faf8fb]">
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
                            className="h-full w-full object-cover object-top"
                            width={400}
                            height={240}
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                    </a>
                ) : (
                    <Image
                        src={imageSrc}
                        alt={tool.name}
                        className="h-full w-full object-cover object-top"
                        width={400}
                        height={240}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-end bg-[linear-gradient(180deg,#fcfbfd_0%,#f8f6fb_100%)] p-5">
                        <span className="rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-medium text-primary">
                            No preview image
                        </span>
                    </div>
                )}
            </div>

            <div className="h-28 bg-white" aria-hidden="true" />

            <div className="absolute inset-x-0 bottom-0 z-10 border-t border-black/8 bg-white px-6 pb-6 pt-5 transition-transform duration-300 ease-out md:translate-y-[calc(100%-7rem)] md:group-hover:translate-y-0 md:group-focus-within:translate-y-0">
                <div className="min-h-[2.5rem]">
                    <h2 className="text-lg font-semibold tracking-tight text-black">
                        {tool.name}
                    </h2>
                </div>

                {(tool.category || tool.subcategory) ? (
                    <div className="flex flex-wrap gap-2">
                        {tool.category ? (
                            <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[0.7rem] font-semibold text-primary">
                                {tool.category}
                            </span>
                        ) : null}
                        {tool.subcategory ? (
                            <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[0.7rem] font-semibold text-primary">
                                {tool.subcategory}
                            </span>
                        ) : null}
                    </div>
                ) : null}

                <div className="mt-6">
                    <p className="text-sm leading-6 text-black/80">
                        {tool.description}
                    </p>
                </div>
            </div>
        </article>
    );
}
