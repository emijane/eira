import Image from "next/image";
import { getTools } from "@/lib/getTools";

export default async function LibraryPage() {
    const tools = await getTools();

    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#fff9f4_0%,#fffdf9_42%,#ffffff_100%)]">
            <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
                <section className="relative overflow-hidden rounded-[2rem] border border-stone-200/70 bg-white/80 px-7 py-10 shadow-[0_24px_80px_-40px_rgba(120,53,15,0.35)] backdrop-blur sm:px-10 lg:px-12 lg:py-14">
                    <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.12),_transparent_38%)]" />

                    <div className="relative max-w-3xl">
                        <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-semibold tracking-[0.22em] text-amber-900 uppercase">
                            Curated Tool Library
                        </span>

                        <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                            Discover beautiful tools for building on the web.
                        </h1>

                        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
                            A warm, browsable collection of standout UI kits, frameworks,
                            and developer tools, organized so you can scan quickly and find
                            the right fit.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3 text-sm text-stone-600">
                            <span className="rounded-full bg-stone-100 px-4 py-2">
                                {tools.length} tools
                            </span>
                            <span className="rounded-full bg-stone-100 px-4 py-2">
                                Clean categories
                            </span>
                            <span className="rounded-full bg-stone-100 px-4 py-2">
                                Visual browsing
                            </span>
                        </div>
                    </div>
                </section>

                {tools.length === 0 ? (
                    <section className="mt-10 rounded-[1.75rem] border border-dashed border-stone-300 bg-white/70 px-8 py-16 text-center shadow-sm">
                        <p className="text-lg font-medium text-stone-900">No tools found.</p>
                        <p className="mt-2 text-sm text-stone-600">
                            Add a few tools and they&apos;ll show up here as polished cards.
                        </p>
                    </section>
                ) : (
                    <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {tools.map((tool) => {
                            const imageSrc = tool.image_file_name
                                ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${tool.image_file_name}`
                                : null;

                            return (
                                <article
                                    key={tool.id}
                                    className="group overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white/90 shadow-[0_18px_60px_-40px_rgba(120,53,15,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-36px_rgba(120,53,15,0.35)]"
                                >
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

                                        {tool.tags?.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {tool.tags.map((tag: string) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-stone-700"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}
            </div>
        </main>
    );
}
