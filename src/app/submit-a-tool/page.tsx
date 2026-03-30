import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Tool",
  description:
    "Suggest a tool to be reviewed for inclusion in the Eira Tools library.",
};

export default function SubmitAToolPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#2f2551_0%,#7059e4_18%,#f6f1fc_18%,#fefcff_100%)] px-6 pb-5 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-brand-ink/8 bg-white p-8 shadow-[0_24px_70px_-44px_rgba(43,37,57,0.3)] sm:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Submit a Tool
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-brand-ink">
            Share something worth adding to the library.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-brand-copy">
            This placeholder can become a submission form, review guidelines, or a
            simple intake page for new tool recommendations.
          </p>
        </section>
      </div>
    </main>
  );
}
