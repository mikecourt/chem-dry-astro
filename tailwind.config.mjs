import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary Chem-Dry Colors
        "chemdry-blue": {
          50: "#e6f1ff",
          100: "#b3d7ff",
          200: "#80bdff",
          300: "#4da3ff",
          400: "#1a89ff",
          500: "#005DAA", // Default - PMS 286
          600: "#004a88",
          700: "#003766",
          800: "#002444",
          900: "#001122",
        },
        "chemdry-green": {
          50: "#e6f5f0",
          100: "#b3e0d1",
          200: "#80cbb2",
          300: "#4db693",
          400: "#1aa174",
          500: "#008752", // Default - PMS 348
          600: "#006c42",
          700: "#005132",
          800: "#003621",
          900: "#001b11",
        },
        "chemdry-purple": {
          50: "#f5edf5",
          100: "#e2c8e3",
          200: "#cfa3d1",
          300: "#bc7ebf",
          400: "#a959ad",
          500: "#9A4E9E", // Default - PMS 513
          600: "#7b3e7e",
          700: "#5c2f5f",
          800: "#3d1f3f",
          900: "#1e1020",
        },
        "chemdry-secondary-green": {
          50: "#edf8ee",
          100: "#c9eacd",
          200: "#a5dcac",
          300: "#81ce8b",
          400: "#5dc06a",
          500: "#41AD49", // Default - PMS 361
          600: "#348a3a",
          700: "#27682c",
          800: "#1a451d",
          900: "#0d230f",
        },
        "chemdry-warm-gray": {
          50: "#f7f6f5",
          100: "#e8e5e2",
          200: "#d9d4cf",
          300: "#cac3bc",
          400: "#bbb2a9",
          500: "#A2958A", // Default - PMS 7530 C
          600: "#82776e",
          700: "#615953",
          800: "#413b37",
          900: "#201e1c",
        },
        "chemdry-dark-gray": {
          50: "#f5f3f2",
          100: "#e2ddd9",
          200: "#cfc7c0",
          300: "#bcb1a7",
          400: "#a99b8e",
          500: "#8A7967", // Default - PMS 4090 C
          600: "#6e6152",
          700: "#53493e",
          800: "#373129",
          900: "#1c1815",
        },
      },
      fontFamily: {
        sans: ["Arial", ...defaultTheme.fontFamily.sans],
        headline: ["Arial", "Arial Black", ...defaultTheme.fontFamily.sans],
        futura: ["Futura", "Century Gothic", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        base: ["16px", { lineHeight: "1.6" }],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 93, 170, 0.1)",
        brand: "0 4px 12px rgba(0, 93, 170, 0.15)",
        "brand-lg": "0 8px 24px rgba(0, 93, 170, 0.2)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #005DAA 0%, #008752 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg, rgba(0, 93, 170, 0.1) 0%, rgba(0, 135, 82, 0.1) 100%)",
        "gradient-cta": "linear-gradient(135deg, #41AD49 0%, #008752 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, addUtilities }) {
      // Button Components
      addComponents({
        ".btn-primary": {
          "@apply px-6 py-3 bg-chemdry-blue-500 text-white font-bold rounded-lg shadow-brand hover:bg-chemdry-blue-600 transition-all duration-300 hover:shadow-brand-lg":
            {},
        },
        ".btn-secondary": {
          "@apply px-6 py-3 bg-chemdry-green-500 text-white font-bold rounded-lg shadow-brand hover:bg-chemdry-green-600 transition-all duration-300 hover:shadow-brand-lg":
            {},
        },
        ".btn-cta": {
          "@apply px-6 py-3 bg-chemdry-secondary-green-500 text-white font-bold rounded-lg shadow-brand hover:bg-chemdry-secondary-green-600 transition-all duration-300 hover:shadow-brand-lg":
            {},
        },
        ".btn-outline": {
          "@apply px-6 py-3 border-2 border-chemdry-blue-500 text-chemdry-blue-500 font-bold rounded-lg hover:bg-chemdry-blue-500 hover:text-white transition-all duration-300":
            {},
        },
      });

      // Card Components
      addComponents({
        ".card-brand": {
          "@apply bg-white rounded-lg shadow-brand p-6 hover:shadow-brand-lg transition-shadow duration-300":
            {},
        },
        ".service-card": {
          "@apply bg-white rounded-lg shadow-soft p-8 hover:shadow-brand transition-all duration-300 border border-gray-100":
            {},
        },
        ".testimonial-card": {
          "@apply bg-gradient-brand-soft rounded-lg p-6 border-l-4 border-chemdry-blue-500 shadow-soft":
            {},
        },
      });

      // Section Components
      addComponents({
        ".section-brand": {
          "@apply py-16 bg-gradient-brand text-white": {},
        },
        ".hero-brand": {
          "@apply py-24 bg-gradient-brand text-white": {},
        },
        ".container-brand": {
          "@apply container mx-auto px-4 md:px-6 lg:px-8": {},
        },
      });

      // Form Components
      addComponents({
        ".input-brand": {
          "@apply w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-chemdry-blue-500 focus:outline-none focus:ring-2 focus:ring-chemdry-blue-200 transition-all":
            {},
        },
        ".textarea-brand": {
          "@apply w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-chemdry-blue-500 focus:outline-none focus:ring-2 focus:ring-chemdry-blue-200 transition-all min-h-[120px]":
            {},
        },
      });

      // Typography Components
      addComponents({
        ".text-gradient-brand": {
          "@apply bg-gradient-to-r from-chemdry-blue-500 to-chemdry-green-500 bg-clip-text text-transparent":
            {},
        },
        ".phone-link": {
          "@apply text-chemdry-blue-500 hover:text-chemdry-secondary-green-500 font-bold transition-colors duration-300":
            {},
        },
      });

      // Utility Classes
      addUtilities({
        ".hover-lift": {
          "@apply transition-transform duration-300 hover:-translate-y-1": {},
        },
      });
    }),
  ],
};
