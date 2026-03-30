import type { Metadata } from "next";
import MainMenu from "../components/MainMenu";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse themed collections of curated developer tools on Eira Tools.",
};

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#2f2551_0%,#7059e4_18%,#f6f1fc_18%,#fefcff_100%)] px-6 py-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <MainMenu />
        <section className="rounded-[2rem] border border-brand-ink/8 bg-white p-8 shadow-[0_24px_70px_-44px_rgba(43,37,57,0.3)] sm:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Collections
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-brand-ink">
            Curated sets are coming together here.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-brand-copy">
            This page is ready for themed groupings like design systems, AI tools,
            starter stacks, and niche workflows.
          </p>
        </section>
      </div>
    </main>
  );
}
