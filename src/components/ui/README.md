# `src/components/ui`

This folder contains reusable UI primitives.

## Files

- `navigation-menu.tsx`
  A thin wrapper around Radix Navigation Menu primitives with project styling. It is used by the site header navigation.

## How this folder connects

- `src/app/components/header.tsx` imports the navigation menu components from here.
- The helper `cn` from `src/lib/utils.ts` is used to merge classes cleanly inside these primitives.
