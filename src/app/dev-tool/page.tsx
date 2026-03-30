import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev Tool",
  description:
    "Internal development page for quickly adding and classifying tools.",
};

export default function DevToolPage() {
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
        </section>
      </div>
    </main>
  );
}
