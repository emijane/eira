import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    ink: "#2B2539",
                    inkSoft: "#373144",
                    deep: "#1F1A29",
                    mauve: "#64586D",
                    lilac: "#4D4456",
                    copy: "#6C6477",
                    muted: "#5C5368",
                    haze: "#8B8196",
                    oat: "#F3EFEA",
                    cream: "#FFFEFC",
                },
                accent: {
                    sea: "#BED3CC",
                },
            },
        },
    },
};

export default config;
