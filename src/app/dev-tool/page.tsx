import type { Metadata } from "next";
import DevToolManager from "../components/dev-tool/DevToolManager";

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
        <DevToolManager />
      </div>
    </main>
  );
}
