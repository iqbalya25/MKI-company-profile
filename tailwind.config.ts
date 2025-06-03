// File: tailwind.config.ts - UPDATED WITH YOUR ACTUAL BRAND COLORS
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Mederi Karya Indonesia Brand Colors - Based on Your Logo
        primary: {
          50: "#f0fdfa", // Very light teal
          100: "#ccfbf1", // Light teal
          200: "#99f6e4", // Light teal
          300: "#5eead4", // Medium teal
          400: "#2dd4bf", // Teal (from your logo)
          500: "#14b8a6", // Main teal
          600: "#0d9488", // Dark teal
          700: "#0f766e", // Darker teal
          800: "#115e59", // Very dark teal
          900: "#134e4a", // Darkest teal
          950: "#042f2e", // Almost black teal
        },
        secondary: {
          50: "#f8fafc", // Very light blue
          100: "#f1f5f9", // Light blue
          200: "#e2e8f0", // Light blue
          300: "#cbd5e1", // Medium blue
          400: "#94a3b8", // Blue gray
          500: "#1e40af", // Navy blue (from your logo)
          600: "#1d4ed8", // Bright blue
          700: "#1e3a8a", // Dark blue
          800: "#1e293b", // Very dark blue
          900: "#0f172a", // Navy
          950: "#020617", // Almost black
        },
        accent: {
          50: "#ecfeff", // Very light cyan
          100: "#cffafe", // Light cyan
          200: "#a5f3fc", // Light cyan
          300: "#67e8f9", // Medium cyan
          400: "#22d3ee", // Cyan (accent from logo)
          500: "#06b6d4", // Main cyan
          600: "#0891b2", // Dark cyan
          700: "#0e7490", // Darker cyan
          800: "#155e75", // Very dark cyan
          900: "#164e63", // Darkest cyan
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e", // Success green
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444", // Error red
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      spacing: {
        "18": "4.5rem",
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
      },
      boxShadow: {
        soft: "0 2px 4px 0 rgba(0, 0, 0, 0.05)",
        medium:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        large:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        mederi: "0 4px 14px 0 rgba(20, 184, 166, 0.15)", // Teal shadow for your brand
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
