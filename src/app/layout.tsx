import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/MainMenu";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Eira Tools",
    template: "%s | Eira Tools",
  },
  description:
    "Discover curated web development tools, UI libraries, frameworks, and developer resources in one warm, searchable library.",
  applicationName: "Eira Tools",
  keywords: [
    "web development tools",
    "ui libraries",
    "frontend frameworks",
    "developer tools",
    "tool directory",
    "design systems",
    "Eira Tools",
  ],
  authors: [{ name: "Eira Tools" }],
  creator: "Eira Tools",
  publisher: "Eira Tools",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Eira Tools",
    description:
      "Discover curated web development tools, UI libraries, frameworks, and developer resources in one warm, searchable library.",
    type: "website",
    siteName: "Eira Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eira Tools",
    description:
      "Discover curated web development tools, UI libraries, frameworks, and developer resources in one warm, searchable library.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="relative min-h-full flex flex-col">
        <header className="absolute inset-x-0 top-0 z-50 px-6 pt-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1560px]">
            <Header />
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
