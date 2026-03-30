import type { Metadata } from "next";
import MainMenu from "../components/MainMenu";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Eira Tools and the thinking behind the curated library.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#2f2551_0%,#7059e4_18%,#f6f1fc_18%,#fefcff_100%)] px-6 py-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <MainMenu />
        <section className="rounded-[2rem] border border-brand-ink/8 bg-white p-8 shadow-[0_24px_70px_-44px_rgba(43,37,57,0.3)] sm:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            About
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-brand-ink">
            A calmer way to browse web tooling.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-brand-copy">
            This page can hold the project story, curation criteria, and what makes
            Eira different from a generic tool directory.
          </p>
        </section>
      </div>
    </main>
  );
}
