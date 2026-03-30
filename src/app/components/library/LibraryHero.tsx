import type { ToolFilters } from "@/lib/getTools";
import MainMenu from "../MainMenu";

export default function LibraryHero({ filters }: { filters: ToolFilters }) {
    return (
        <section className="relative overflow-visible px-6 py-5 sm:px-8 lg:px-12">
            <div className="relative mx-auto max-w-[1560px]">
                <MainMenu/>
                <div className="max-w-4xl mb-10">
                    <div>
                        <div className="flex items-center gap-4">
                            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/12 px-4 py-1.5 text-xs font-semibold text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm">
                                curated tool library
                            </span>
                            <span className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.22),rgba(209,242,243,0.28),transparent)] sm:block" />
                        </div>

                        <h1 className="mt-8 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-[4.25rem] lg:leading-[0.95]">
                            Find your next favorite tool within minutes.
                        </h1>

                        <p className="mt-6 max-w-2xl text-[1.02rem] leading-6 text-white/84">
                            Explore standout tools for building web products, narrow by category
                            or tags, and quickly scan what fits your stack best.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
