import type { Metadata } from "next";
import { getToolFilters } from "@/lib/getTools";

export const metadata: Metadata = {
  title: "Dev Tool",
  description:
    "Internal development page for quickly adding and classifying tools.",
};

export default async function DevToolPage() {
  const filters = await getToolFilters();
  const totalTools = Object.values(filters.categoryCounts).reduce((sum, count) => sum + count, 0);
  const topCategory = Object.entries(filters.categoryCounts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))[0];
  const topSubcategory = Object.entries(filters.subcategoryCounts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))[0];
  const categoryEntries = Object.entries(filters.categoryCounts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
  const subcategoryEntries = Object.entries(filters.subcategoryCounts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));

  return (
    <main className="min-h-screen bg-white px-6 pb-12 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1560px]">
        <section className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Dev Tool Manager
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-black sm:text-5xl">
            Add tools quickly while you build the library.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-black/80">
            A lightweight internal page for pasting a website URL, attaching an image,
            and checking live library counts while you classify tools in development.
          </p>
        </section>

        <section className="mt-10 space-y-8">
          <section className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-[0_2px_6px_rgba(16,24,40,0.04),0_1px_2px_rgba(16,24,40,0.03)] sm:p-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Quick add
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">
                URL + image placeholder
              </h2>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="block">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                  Website URL
                </span>
                <input
                  type="text"
                  placeholder="https://www.example.com"
                  className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-black outline-none placeholder:text-black/35"
                />
              </label>
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-dashed border-black/12 bg-[#fcfcfc] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                Upload image
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black/75 transition hover:text-black">
                  Choose file
                </button>
                <span className="text-sm text-black/55">No file selected</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-black/70">
                Placeholder only for now. Later this can wire into your image upload flow
                before insertion.
              </p>
            </div>
          </section>

          <aside className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-[0_2px_6px_rgba(16,24,40,0.04),0_1px_2px_rgba(16,24,40,0.03)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Live stats
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-black">
              Useful library breakdowns
            </h2>
            <p className="mt-2 text-sm text-black/60">
              Real counts from the current tool library while you add more entries.
            </p>

            <div className="mt-6 space-y-4">
              {[
                ["Total tools", String(totalTools)],
                ["Total categories", String(filters.categories.length)],
                ["Total subcategories", String(filters.subcategories.length)],
                ["Top category", topCategory ? `${topCategory[0]} (${topCategory[1]})` : "None"],
                ["Top subcategory", topSubcategory ? `${topSubcategory[0]} (${topSubcategory[1]})` : "None"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-black/8 bg-[#fcfcfc] px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                    {label}
                  </p>
                  <p className="mt-1 text-sm text-black/80">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <div className="rounded-[1.5rem] border border-black/10 bg-[#fbfbfb] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                  Category counts
                </p>
                <div className="mt-3 space-y-2">
                  {categoryEntries.map(([categoryName, count]) => (
                    <div key={categoryName} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm">
                      <span className="text-black/80">{categoryName}</span>
                      <span className="font-medium text-primary">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-black/10 bg-[#fbfbfb] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                  Subcategory counts
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  {subcategoryEntries.map(([subcategoryName, count]) => (
                    <div key={subcategoryName} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm">
                      <span className="text-black/80">{subcategoryName}</span>
                      <span className="font-medium text-primary">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
