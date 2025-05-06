
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
        accent: {
          DEFAULT: "#3b82f6", // Blue accent
          foreground: "#ffffff",
          50: "rgba(59, 130, 246, 0.05)",
          100: "rgba(59, 130, 246, 0.1)",
          200: "rgba(59, 130, 246, 0.2)",
          300: "rgba(59, 130, 246, 0.3)",
          400: "rgba(59, 130, 246, 0.4)",
          500: "rgba(59, 130, 246, 0.5)",
          600: "rgba(59, 130, 246, 0.6)",
          700: "rgba(59, 130, 246, 0.7)",
          800: "rgba(59, 130, 246, 0.8)",
          900: "rgba(59, 130, 246, 0.9)",
        },
        success: {
          DEFAULT: "#10b981", // Green for success states
          foreground: "#ffffff",
          50: "rgba(16, 185, 129, 0.05)",
          100: "rgba(16, 185, 129, 0.1)",
          200: "rgba(16, 185, 129, 0.2)",
          300: "rgba(16, 185, 129, 0.3)",
          400: "rgba(16, 185, 129, 0.4)",
          500: "rgba(16, 185, 129, 0.5)",
          600: "rgba(16, 185, 129, 0.6)",
          700: "rgba(16, 185, 129, 0.7)",
          800: "rgba(16, 185, 129, 0.8)",
          900: "rgba(16, 185, 129, 0.9)",
        },
        warning: {
          DEFAULT: "#f59e0b", // Amber for warning states
          foreground: "#ffffff",
          50: "rgba(245, 158, 11, 0.05)",
          100: "rgba(245, 158, 11, 0.1)",
          200: "rgba(245, 158, 11, 0.2)",
          300: "rgba(245, 158, 11, 0.3)",
          400: "rgba(245, 158, 11, 0.4)",
          500: "rgba(245, 158, 11, 0.5)",
          600: "rgba(245, 158, 11, 0.6)",
          700: "rgba(245, 158, 11, 0.7)",
          800: "rgba(245, 158, 11, 0.8)",
          900: "rgba(245, 158, 11, 0.9)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          50: "rgba(239, 68, 68, 0.05)",
          100: "rgba(239, 68, 68, 0.1)",
          200: "rgba(239, 68, 68, 0.2)",
          300: "rgba(239, 68, 68, 0.3)",
          400: "rgba(239, 68, 68, 0.4)",
          500: "rgba(239, 68, 68, 0.5)",
          600: "rgba(239, 68, 68, 0.6)",
          700: "rgba(239, 68, 68, 0.7)",
          800: "rgba(239, 68, 68, 0.8)",
          900: "rgba(239, 68, 68, 0.9)",
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
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
        caveat: ["Caveat", "cursive"],
      },
      fontSize: {
        "heading-1": ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }],
        "heading-2": ["2rem", { lineHeight: "2.5rem", fontWeight: "600" }],
        "heading-3": ["1.75rem", { lineHeight: "2.25rem", fontWeight: "600" }],
        "heading-4": ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "body-base": ["1rem", { lineHeight: "1.5rem" }],
        "body-sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "body-xs": ["0.75rem", { lineHeight: "1rem" }],
      },
      boxShadow: {
        'card-sm': '0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
        'inner-glow-sm': 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.05)',
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
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "pulse-slow": "pulse-slow 3s infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
      },
      gridTemplateColumns: {
        "15": "repeat(15, minmax(0, 1fr))",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
