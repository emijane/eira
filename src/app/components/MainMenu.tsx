"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { href: "/", label: "Home" },
    { href: "/library", label: "Library" },
    { href: "/collections", label: "Collections" },
    { href: "/submit-a-tool", label: "Submit a Tool" },
    { href: "/about", label: "About" },
];

export default function MainMenu() {
    const pathname = usePathname();

    return (
        <div className="mx-auto mb-10 flex items-center gap-6">
            <div className="flex min-w-0 items-center gap-6 sm:gap-8">
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
                    <span className="text-xl font-semibold tracking-tight text-black">
                        eira
                        <span className="ml-1 font-medium text-primary">/ tools</span>
                    </span>
                </Link>
            </div>

            <nav aria-label="Primary" className="min-w-0">
                <ul className="flex items-center gap-4 sm:gap-6">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`text-sm font-medium tracking-[0.01em] transition ${
                                        isActive
                                            ? "text-black"
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
            </nav>
        </div>
    );
}
