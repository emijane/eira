import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Tool",
  description:
    "Suggest a tool to be reviewed for inclusion in the Eira Tools library.",
};

export default function SubmitAToolPage() {
  return (
    <main className="min-h-screen bg-white px-6 pb-12 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1560px]" />
    </main>
  );
}
