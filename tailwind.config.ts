import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "3rem", xl: "4rem" },
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // KTM Affairs editorial palette
        ink: {
          DEFAULT: "#0B1E3D", // primary navy
          deep: "#071429", // near-black navy for footer / overlays
          light: "#14315C",
        },
        paper: {
          DEFAULT: "#FAF8F3", // warm off-white
          dim: "#F1ECE0", // card / section background
        },
        gold: {
          DEFAULT: "#B9922F", // brass gold accent
          light: "#D9BB6C",
          pale: "#F1E3C1",
        },
        hairline: "#DAD3C0",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["6rem", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-xl": ["4.5rem", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["3.25rem", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        "display-md": ["2.25rem", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        wideish: "0.06em",
        widest2: "0.22em",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "reveal-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "accordion-down": {
          "0%": { height: "0" },
          "100%": { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          "0%": { height: "var(--radix-accordion-content-height)" },
          "100%": { height: "0" },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.9s ease both",
        "reveal-line": "reveal-line 0.9s cubic-bezier(0.16,1,0.3,1) both",
      },
      backgroundImage: {
        "navy-vignette":
          "radial-gradient(120% 120% at 50% -10%, rgba(185,146,47,0.16) 0%, rgba(11,30,61,0) 55%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
