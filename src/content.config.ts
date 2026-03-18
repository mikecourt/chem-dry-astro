import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Only the "pages" collection remains — generic markdown pages like
// privacy-policy, coupons, reviews, etc. that haven't been migrated to Sanity.
// All other content (blog, services, testimonials, homepage, about, contact,
// appointment, gallery, CTA) now comes from Sanity via GROQ queries.

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean(),
  }),
});

export const collections = {
  pages: pagesCollection,
};
