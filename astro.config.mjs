import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import sharp from "sharp";
import config from "./src/config/config.json";

let highlighter;
async function getHighlighter() {
  if (!highlighter) {
    const { getHighlighter } = await import("shiki");
    highlighter = await getHighlighter({ theme: "one-dark-pro" });
  }
  return highlighter;
}

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  adapter: vercel(),
  redirects: {
    // ── Phoenix (whiteglovecarpet.com) — Legacy WordPress → New Astro ──
    // Service / booking aliases
    "/booknow": "/appointment",
    "/frequently-asked-questions": "/contact",
    "/why-chem-dry": "/about",
    "/chem-dry-vs-steam-cleaning": "/services/carpet-cleaning",
    "/chem-dry-cares": "/about",
    "/accessibility": "/privacy-policy",
    // Service page URL variants
    "/services/tile-cleaning": "/services/tile-and-grout-cleaning",
    "/services/tile-grout-cleaning": "/services/tile-and-grout-cleaning",
    "/services/pet-urine-odor-removal": "/services/pet-urine-removal",
    "/services/stone-cleaning": "/services/stone-tile-cleaning-polishing",
    "/services/granite-renewal": "/services/granite-countertop-renewal",
    "/services/kitchen-tile-cleaning": "/services/tile-and-grout-cleaning",
    "/services/stone-tile-floor-cleaning": "/services/stone-tile-cleaning-polishing",
    // Blog posts — legacy WP root-level slugs discovered via Google index
    // (partial list; full blog post slugs pending WordPress XML export from Kite Media)
    "/commercial-carpet-cleaning-machines": "/services/commercial-cleaning",
    "/commercial-carpet-cleaning-machines/": "/services/commercial-cleaning",
    "/carpet-cleaning-equipment": "/services/carpet-cleaning",
    "/carpet-cleaning-equipment/": "/services/carpet-cleaning",
    "/commercial-carpet-cleaning-equipment": "/services/commercial-cleaning",
    "/commercial-carpet-cleaning-equipment/": "/services/commercial-cleaning",
  },

  image: { service: sharp() },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    sitemap(),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
    highlighter: getHighlighter,
  },
});
