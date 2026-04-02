"use client";

import { Github, Instagram, Menu, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const menuItems = [
    { href: "/", label: "Home" },
    { href: "/library", label: "Library" },
    { href: "/collections", label: "Collections" },
    { href: "/submit-a-tool", label: "Submit a Tool" },
    { href: "/dev-tool", label: "Dev Tool" },
    { href: "/about", label: "About" },
];

const socialLinks = [
    { href: "https://x.com", label: "X", icon: Twitter },
    { href: "https://github.com", label: "GitHub", icon: Github },
    { href: "https://instagram.com", label: "Instagram", icon: Instagram },
];

export default function MainMenu() {
    const pathname = usePathname();
    const usesLightText =
        pathname === "/" ||
        pathname === "/collections" ||
        pathname === "/submit-a-tool" ||
        pathname === "/about";

    return (
        <div className="mx-auto flex items-center gap-4 sm:gap-6">
            <div className="flex min-w-0 items-center gap-3">
                <Link
                    href="/"
                    className="inline-flex min-w-0 items-center gap-2 transition hover:opacity-90"
                >
                    <Image
                        src="/favicon.png"
                        alt="Eira Tools icon"
                        width={44}
                        height={44}
                        className="h-11 w-11 shrink-0 object-contain"
                    />
                    <span className="inline-flex min-w-0 items-center gap-1.5 leading-none">
                        <span
                            className={`truncate text-[1.2rem] font-semibold tracking-[-0.03em] leading-none sm:text-[1.45rem] ${
                                usesLightText ? "text-white" : "text-black"
                            }`}
                        >
                            eira
                        </span>
                        <span
                            className={`shrink-0 text-[1.05rem] font-medium leading-none sm:text-[1.2rem] ${
                                usesLightText ? "text-white/72" : "text-primary"
                            }`}
                        >
                            /
                        </span>
                        <span
                            className={`truncate rounded-md border px-2 py-0.5 text-[0.82rem] font-medium leading-none tracking-[-0.01em] sm:text-[0.92rem] ${
                                usesLightText
                                    ? "border-white/14 bg-white/8 text-white/88"
                                    : "border-primary/18 bg-primary/6 text-primary"
                            }`}
                        >
                            tools
                        </span>
                    </span>
                </Link>
            </div>

            <div className="ml-auto flex items-center gap-4">
                <nav aria-label="Primary" className="hidden min-w-0 lg:block">
                    <div className="flex items-center gap-5 lg:gap-8">
                        <ul className="flex items-center gap-5 lg:gap-8">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`text-[0.95rem] font-medium tracking-[-0.01em] transition ${
                                                isActive
                                                    ? usesLightText
                                                        ? "text-white"
                                                        : "text-black"
                                                    : usesLightText
                                                        ? "text-white/72 hover:text-white"
                                                        : "text-black/56 hover:text-black"
                                            }`}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div
                            className={`hidden h-5 w-px ${
                                usesLightText ? "bg-white/18" : "bg-black/10"
                            } lg:block`}
                        />

                        <ul className="hidden items-center gap-3 lg:flex">
                            {socialLinks.map(({ href, label, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={label}
                                        className={`${
                                            usesLightText
                                                ? "text-white/62 hover:text-white"
                                                : "text-black/50 hover:text-primary"
                                        } transition`}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <Sheet>
                    <SheetTrigger asChild>
                        <button
                            type="button"
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition lg:hidden ${
                                usesLightText
                                    ? "border-white/16 bg-white/8 text-white hover:bg-white/14"
                                    : "border-black/10 bg-white text-black hover:border-primary/24 hover:text-primary"
                            }`}
                            aria-label="Open menu"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[88vw] max-w-xs">
                        <SheetHeader className="pr-10">
                            <SheetTitle>Eira Tools</SheetTitle>
                            <SheetDescription>
                                Browse the site and jump between sections.
                            </SheetDescription>
                        </SheetHeader>

                        <nav aria-label="Mobile primary" className="mt-4">
                            <ul className="flex flex-col gap-2">
                                {menuItems.map((item) => {
                                    const isActive = pathname === item.href;

                                    return (
                                        <li key={item.href}>
                                            <SheetClose asChild>
                                                <Link
                                                    href={item.href}
                                                    className={`flex items-center rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                                                        isActive
                                                            ? "border-primary/20 bg-primary/10 text-primary"
                                                            : "border-black/10 bg-white text-black/72 hover:border-primary/24 hover:text-black"
                                                    }`}
                                                    aria-current={isActive ? "page" : undefined}
                                                >
                                                    {item.label}
                                                </Link>
                                            </SheetClose>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="mt-6 border-t border-black/8 pt-5">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45">
                                Social
                            </p>
                            <ul className="mt-3 flex items-center gap-3">
                                {socialLinks.map(({ href, label, icon: Icon }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={label}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/65 transition hover:border-primary/24 hover:text-primary"
                                        >
                                            <Icon className="h-4 w-4" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
