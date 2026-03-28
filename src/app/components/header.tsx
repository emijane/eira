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
        <header className="sticky top-0 z-40 border-b border-white/8 bg-white">
            <div className="mx-auto flex max-w-390 items-center gap-6 py-3 sm:px-6">
                <div className="flex min-w-0 items-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-baseline gap-0.5 transition hover:opacity-90"
                    >
                        <span className="text-lg font-semibold tracking-tight text-stone-900">
                            eira
                        </span>
                        <span className="text-lg font-medium tracking-tight text-stone-400">
                            .tool
                        </span>
                    </Link>

                    <label className="hidden min-w-[17rem] items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] lg:flex">
                        <Search className="h-4 w-4 text-stone-400" />
                        <input
                            type="text"
                            placeholder="Search documentation..."
                            className="w-full bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400"
                        />
                        <span className="inline-flex items-center rounded-md border border-stone-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-stone-400">
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
                                                        "bg-stone-900 text-white hover:bg-stone-900 hover:text-white"
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
                        className="inline-flex h-9 items-center rounded-xl bg-stone-900 px-4 text-sm font-medium text-white transition hover:bg-stone-800"
                    >
                        Submit a Tool
                    </Link>
                </div>
            </div>
        </header>
    );
}
