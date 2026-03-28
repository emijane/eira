"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import { cn } from "@/lib/utils";

function NavigationMenu({
    className,
    children,
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
    return (
        <NavigationMenuPrimitive.Root
            data-slot="navigation-menu"
            className={cn(
                "relative flex max-w-max flex-1 items-center justify-center",
                className
            )}
            {...props}
        >
            {children}
        </NavigationMenuPrimitive.Root>
    );
}

function NavigationMenuList({
    className,
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
    return (
        <NavigationMenuPrimitive.List
            data-slot="navigation-menu-list"
            className={cn(
                "flex flex-1 list-none items-center justify-center gap-2",
                className
            )}
            {...props}
        />
    );
}

function NavigationMenuItem({
    className,
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
    return (
        <NavigationMenuPrimitive.Item
            data-slot="navigation-menu-item"
            className={cn("relative", className)}
            {...props}
        />
    );
}

function NavigationMenuLink({
    className,
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
    return (
        <NavigationMenuPrimitive.Link
            data-slot="navigation-menu-link"
            className={cn(className)}
            {...props}
        />
    );
}

const navigationMenuTriggerStyle =
    "inline-flex h-9 items-center justify-center rounded-md border border-transparent px-3 py-2 text-sm font-medium transition-colors text-brand-haze hover:bg-white/6 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15";

export {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
};
