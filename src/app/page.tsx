import type { Metadata } from "next";
import MainMenu from "./components/MainMenu";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Browse Eira Tools to discover curated UI libraries, frontend frameworks, and developer resources for building modern web experiences.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#2f2551_0%,#7059e4_26%,#f6f1fc_26%,#fefcff_100%)]">
      <section className="px-6 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <MainMenu />
          <div className="max-w-3xl pb-18 pt-6 text-white">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/70">
              curated web tools
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Discover standout tools for building on the web.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              Eira is a growing library of frontend tools, frameworks, and developer
              resources chosen to help you find the right fit faster.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
