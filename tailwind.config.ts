
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#ea384c",
          foreground: "#ffffff",
          50: "rgba(234, 56, 76, 0.05)",
          100: "rgba(234, 56, 76, 0.1)",
          200: "rgba(234, 56, 76, 0.2)",
          300: "rgba(234, 56, 76, 0.3)",
          400: "rgba(234, 56, 76, 0.4)",
          500: "rgba(234, 56, 76, 0.5)",
          600: "rgba(234, 56, 76, 0.6)",
          700: "rgba(234, 56, 76, 0.7)",
          800: "rgba(234, 56, 76, 0.8)",
          900: "rgba(234, 56, 76, 0.9)",
        },
        secondary: {
          DEFAULT: "#333333",
          foreground: "#ffffff",
          50: "rgba(51, 51, 51, 0.05)",
          100: "rgba(51, 51, 51, 0.1)",
          200: "rgba(51, 51, 51, 0.2)",
          300: "rgba(51, 51, 51, 0.3)", 
          400: "rgba(51, 51, 51, 0.4)",
          500: "rgba(51, 51, 51, 0.5)",
          600: "rgba(51, 51, 51, 0.6)",
          700: "rgba(51, 51, 51, 0.7)",
          800: "rgba(51, 51, 51, 0.8)",
          900: "rgba(51, 51, 51, 0.9)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          foreground: "#ffffff",
          hover: "rgba(255, 255, 255, 0.08)",
        },
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
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(234, 56, 76, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(234, 56, 76, 0.8)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "pulse-slow": "pulse-slow 3s infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite"
      },
      gridTemplateColumns: {
        "15": "repeat(15, minmax(0, 1fr))",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
