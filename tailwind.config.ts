import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B1220",
          900: "#0F172A",
          800: "#151F32",
          700: "#1E293B",
          600: "#334155",
        },
        brass: {
          50: "#FDF6E9",
          100: "#FAEBC8",
          300: "#EEC776",
          400: "#E3AE45",
          500: "#D69A2D",
          600: "#B37E1F",
          700: "#8C6218",
        },
        sea: {
          400: "#3FC1B0",
          500: "#22A699",
          600: "#178A7F",
        },
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 2px rgba(15,23,42,0.06), 0 8px 24px -12px rgba(15,23,42,0.18)",
      },
    },
  },
  plugins: [],
} satisfies Config;
