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
                            <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold text-primary">
                                curated tool library
                            </span>
                        </div>

                        <h1 className="mt-8 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-black sm:text-5xl lg:text-[4.25rem] lg:leading-[0.95]">
                            Find your next favorite tool within minutes.
                        </h1>

                        <p className="mt-6 max-w-2xl text-[1.02rem] leading-6 text-black/80">
                            Explore standout tools for building web products, narrow by category
                            or tags, and quickly scan what fits your stack best.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
