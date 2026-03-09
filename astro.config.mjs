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
    // ── K&T Chem-Dry (Chicago) — Legacy WordPress → New Astro Site ──
    // Core pages
    "/services/": "/services/carpet-cleaning",
    "/services/carpet-cleaning/": "/services/carpet-cleaning",
    "/services/area-rug-cleaning/": "/services/area-rug-cleaning",
    "/services/specialty-stain-removal/": "/services/specialty-stain-removal",
    "/services/tile-cleaning/": "/services/tile-and-grout-cleaning",
    "/services/tile-cleaning": "/services/tile-and-grout-cleaning",
    "/services/upholstery-cleaning/": "/services/upholstery-cleaning",
    "/services/wood-floor-cleaning/": "/services/wood-floor-cleaning",
    "/services/pet-urine-odor-removal/": "/services/pet-urine-removal",
    "/services/pet-urine-odor-removal": "/services/pet-urine-removal",
    "/services/leather-cleaning/": "/services/leather-cleaning",
    "/services/commercial-cleaning/": "/services/commercial-cleaning",
    "/about/": "/about",
    "/contact/": "/contact",
    "/gallery/": "/gallery",
    "/reviews/": "/contact",
    "/coupons/": "/appointment",
    "/frequently-asked-questions/": "/contact",
    "/frequently-asked-questions": "/contact",
    "/why-chem-dry/": "/about",
    "/why-chem-dry": "/about",
    "/chem-dry-vs-steam-cleaning/": "/services/carpet-cleaning",
    "/chem-dry-vs-steam-cleaning": "/services/carpet-cleaning",
    "/chem-dry-cares/": "/about",
    "/chem-dry-cares": "/about",
    "/accessibility/": "/privacy-policy",
    "/accessibility": "/privacy-policy",
    "/videos/": "/",
    "/new-lenox-carpet-cleaners-ppc/": "/",
    "/blog/": "/blog",
    // Blog post redirects (root-level WP slug → /blog/slug)
    "/area-rug-care-maintenance-tips/": "/blog/area-rug-care-maintenance-tips",
    "/carpet-cleaning-myths-debunked/": "/blog/carpet-cleaning-myths-debunked",
    "/chem-dry-vs-carpet-cleaning-machine-rental/": "/blog/chem-dry-vs-carpet-cleaning-machine-rental",
    "/benefits-of-hot-carbonated-extraction-carpet-cleaning/": "/blog/benefits-of-hot-carbonated-extraction-carpet-cleaning",
    "/benefits-of-pet-friendly-carpet-cleaning/": "/blog/benefits-of-pet-friendly-carpet-cleaning",
    "/the-benefits-of-low-moisture-carpet-cleaning/": "/blog/the-benefits-of-low-moisture-carpet-cleaning",
    "/5-things-to-look-for-in-a-carpet-cleaning-company/": "/blog/5-things-to-look-for-in-a-carpet-cleaning-company",
    "/post-carpet-cleaning-tips-for-best-results/": "/blog/post-carpet-cleaning-tips-for-best-results",
    "/benefits-of-fast-drying-carpet-cleaning-methods/": "/blog/benefits-of-fast-drying-carpet-cleaning-methods",
    "/the-science-behind-carbonation-cleaning/": "/blog/the-science-behind-carbonation-cleaning",
    "/end-of-summer-time-for-carpet-cleaning/": "/blog/end-of-summer-time-for-carpet-cleaning",
    "/the-importance-of-regular-carpet-cleaning/": "/blog/the-importance-of-regular-carpet-cleaning",
    "/removing-tough-carpet-stains-expert-tips-tricks/": "/blog/removing-tough-carpet-stains-expert-tips-tricks",
    // Location page redirects (WP city-specific URLs → clean city slugs)
    "/carpet-cleaning-mokena-il/": "/mokena",
    "/carpet-cleaning-naperville-il/": "/naperville",
    "/carpet-cleaning-new-lenox-il/": "/new-lenox",
    "/carpet-cleaning-new-lenox-il": "/new-lenox",
    "/carpet-cleaning-oak-forest-il/": "/oak-forest",
    "/carpet-cleaning-palos-heights-il/": "/palos-heights",
    "/carpet-cleaning-plainfield-il/": "/plainfield",
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
