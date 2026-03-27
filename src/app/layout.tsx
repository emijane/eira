import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/header";
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
