import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0F",
        surface: "#13131A",
        line: "#1F1F2E",
        muted: "#8B8BA0",
        accent: "#6366F1",
        "accent-hover": "#4F52D9"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px #1F1F2E",
        hover: "0 8px 32px rgba(99,102,241,0.15)",
        glow: "0 0 40px rgba(99,102,241,0.2)"
      }
    }
  },
  plugins: []
};

export default config;
