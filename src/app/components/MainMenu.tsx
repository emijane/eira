"use client";

import { Github, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { href: "/", label: "Home" },
    { href: "/library", label: "Library" },
    { href: "/collections", label: "Collections" },
    { href: "/submit-a-tool", label: "Submit a Tool" },
    { href: "/dev-tool", label: "Dev Tool" },
    { href: "/about", label: "About" },
];

export default function MainMenu() {
    const pathname = usePathname();
    const usesLightText = pathname === "/" || pathname === "/collections" || pathname === "/submit-a-tool" || pathname === "/about";

    return (
        <div className="mx-auto flex items-center gap-6">
            <div className="flex min-w-0 items-center gap-3">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 transition hover:opacity-90"
                >
                    <Image
                        src="/favicon.png"
                        alt="Eira Tools icon"
                        width={44}
                        height={44}
                        className="h-11 w-11 object-contain"
                    />
                    <span className={`text-[1.75rem] font-semibold tracking-[-0.04em] ${usesLightText ? "text-white" : "text-black"}`}>
                        eira
                        <span className="ml-1 font-medium text-primary">/ tools</span>
                    </span>
                </Link>
            </div>

            <nav aria-label="Primary" className="ml-auto min-w-0">
                <div className="flex items-center gap-5 sm:gap-8">
                    <ul className="flex items-center gap-5 sm:gap-8">
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

                    <div className={`hidden h-5 w-px ${usesLightText ? "bg-white/18" : "bg-black/10"} lg:block`} />

                    <ul className="hidden items-center gap-3 lg:flex">
                        <li>
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="X"
                                className={`${usesLightText ? "text-white/62 hover:text-white" : "text-black/50 hover:text-primary"} transition`}
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className={`${usesLightText ? "text-white/62 hover:text-white" : "text-black/50 hover:text-primary"} transition`}
                            >
                                <Github className="h-4 w-4" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className={`${usesLightText ? "text-white/62 hover:text-white" : "text-black/50 hover:text-primary"} transition`}
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
