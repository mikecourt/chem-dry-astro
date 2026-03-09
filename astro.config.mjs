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
    // ── All Pro Chem-Dry (Denver) — Legacy WordPress → New Astro Site ──
    // Service pages
    "/professional-carpet-cleaning": "/services/carpet-cleaning",
    "/upholstery-cleaning": "/services/upholstery-cleaning",
    "/area-rug-cleaning": "/services/area-rug-cleaning",
    "/stain-removal": "/services/specialty-stain-removal",
    "/protect-deodorize": "/services/carpet-protection",
    "/cleaning-packages": "/services/carpet-cleaning",
    "/granite-countertop-cleaning": "/services/granite-countertop-renewal",
    "/water-damage-restoration": "/services/water-damage-restoration",
    "/leather-cleaning": "/services/leather-cleaning",
    "/business-and-commercial-carpet-cleaning": "/services/commercial-cleaning",
    "/tile-and-stone-care": "/services/tile-and-grout-cleaning",
    "/wood-floor-cleaning": "/services/wood-floor-cleaning",
    // About / info pages
    "/why-chem-dry": "/about",
    "/home-health-study": "/about",
    "/the-power-of-carbonation": "/about",
    "/chem-dry-vs-steam-cleaning": "/services/carpet-cleaning",
    "/sustainable-allergy-relief": "/about",
    "/about-us": "/about",
    // Contact / booking
    "/contact-us": "/contact",
    "/schedule-appointment": "/appointment",
    "/reviews-testimonials": "/contact",
    "/leave-a-review": "/contact",
    "/coupons": "/appointment",
    // Legal
    "/privacy-policy": "/privacy-policy",
    // Blog
    "/blog": "/blog",
    "/blog/august-newsletter": "/blog/august-newsletter",
    // Location pages — normalize from legacy verbose URLs to clean city slugs
    "/all-pro-chem-dry-in-aurora-co": "/aurora",
    "/all-pro-chem-dry-castle-pines-co": "/castle-pines",
    "/all-pro-chem-dry-castle-rock-co": "/castle-rock",
    "/all-pro-chem-dry-centennial-co": "/centennial",
    "/all-pro-chem-dry-cherry-hills-village-co": "/cherry-hills-village",
    "/all-pro-chem-dry-denver-co": "/denver",
    "/all-pro-chem-dry-englewood-co": "/englewood",
    "/all-pro-chem-dry-greenwood-village-co": "/greenwood-village",
    "/all-pro-chem-dry-highlands-ranch-co": "/highlands-ranch",
    "/all-pro-chem-dry-lakewood-co": "/lakewood",
    "/all-pro-chem-dry-littleton-co": "/littleton",
    "/all-pro-chem-dry-lone-tree-co": "/lone-tree",
    "/all-pro-chem-dry-parker-co": "/parker",
    "/all-pro-chem-dry-thornton-co": "/thornton",
    // Typo in original URL — must be preserved
    "/arvada-carpet-clearners": "/arvada",
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
