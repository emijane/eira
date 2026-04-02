import type { Metadata } from "next";
import { Geist_Mono, Google_Sans_Code, Inter } from "next/font/google";
import { Github, Instagram, Twitter } from "lucide-react";
import Header from "./components/MainMenu";
import "./globals.css";

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
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
  const year = new Date().getFullYear();

  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${googleSansCode.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="relative min-h-full flex flex-col">
        <header className="absolute inset-x-0 top-0 z-50 px-6 pt-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1560px]">
            <Header />
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-black/8 bg-white px-6 py-6 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1560px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-black/60">
              Copyright {year} Eira Tools. All rights reserved.
            </p>
            <nav aria-label="Social links">
              <ul className="flex flex-wrap items-center gap-4 text-sm">
                <li>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-black/60 transition hover:text-primary"
                    aria-label="X"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-black/60 transition hover:text-primary"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-black/60 transition hover:text-primary"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
