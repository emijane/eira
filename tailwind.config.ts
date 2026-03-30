import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: "#C5A8EB",
                secondary: "#7059E4",
                brand: {
                    ink: "#2F2551",
                    inkSoft: "#4A3E76",
                    deep: "#21193E",
                    mauve: "#7059E4",
                    lilac: "#C5A8EB",
                    copy: "#625A7D",
                    muted: "#7A7097",
                    haze: "#9F96BC",
                    oat: "#F6F1FC",
                    cream: "#FEFCFF",
                },
                accent: {
                    sea: "#C5A8EB",
                },
            },
        },
    },
};

export default config;
