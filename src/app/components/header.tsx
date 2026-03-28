"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Slash } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Discover", href: "/" },
    { label: "Library", href: "/library" },
    { label: "Collections", href: "#" },
    { label: "Resources", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Sign In", href: "#" },
] as const;

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-40 border-b border-white/8 bg-black">
            <div className="mx-auto flex max-w-390 items-center gap-6 py-3 sm:px-6">
                <div className="flex min-w-0 items-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-baseline gap-0.5 text-white transition hover:opacity-90"
                    >
                        <span className="text-lg font-semibold tracking-tight text-white">
                            eira
                        </span>
                        <span className="text-lg font-medium tracking-tight text-brand-haze">
                            .tool
                        </span>
                    </Link>

                    <label className="hidden min-w-[17rem] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-brand-haze shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:flex">
                        <Search className="h-4 w-4 text-brand-haze" />
                        <input
                            type="text"
                            placeholder="Search documentation..."
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-brand-haze"
                        />
                        <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-brand-haze">
                            <Slash className="mr-1 h-3 w-3" />
                            k
                        </span>
                    </label>
                </div>

                <div className="ml-auto hidden items-center gap-4 lg:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navItems.map((item) => {
                                const isActive =
                                    item.href !== "#" &&
                                    (pathname === item.href ||
                                        (item.href !== "/" &&
                                            pathname.startsWith(item.href)));

                                return (
                                    <NavigationMenuItem key={item.label}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    navigationMenuTriggerStyle,
                                                    isActive &&
                                                        "bg-white/10 text-white"
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                );
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <Link
                        href="#"
                        className="inline-flex h-9 items-center rounded-xl bg-white px-4 text-sm font-medium text-black transition hover:bg-white/90"
                    >
                        Submit a Tool
                    </Link>
                </div>
            </div>
        </header>
    );
}
