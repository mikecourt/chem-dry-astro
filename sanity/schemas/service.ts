import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "seo", title: "SEO" },
    { name: "hero", title: "Hero Section" },
    { name: "content", title: "Content" },
    { name: "social", title: "Social Proof" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    // ── Core fields ──
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),

    // ── SEO ──
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "canonical",
      title: "Canonical URL",
      type: "url",
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
      options: { hotspot: true },
      group: "seo",
    }),

    // ── Hero Section ──
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow Text",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero H1 (supports **bold** markdown)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "trustBadges",
      title: "Hero Trust Badges",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "emoji", title: "Emoji", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            }),
          ],
          preview: { select: { title: "title", subtitle: "emoji" } },
        },
      ],
    }),

    // ── Content (Portable Text body for the main prose sections) ──
    defineField({
      name: "body",
      title: "Body Content",
      description:
        "Main page content: promise/problem sections, process, solutions, differentiators. Use headings to create section breaks.",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
      group: "content",
    }),

    // ── Service Timeline (Before / During / After) ──
    defineField({
      name: "serviceTimeline",
      title: "Service Timeline",
      description: "What happens before, during, and after the service",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Phase Title", type: "string" }),
            defineField({
              name: "items",
              title: "Bullet Points",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),

    // ── FAQ ──
    defineField({
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
            }),
            defineField({ name: "answer", title: "Answer", type: "text" }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),

    // ── Social Proof ──
    defineField({
      name: "pageTestimonials",
      title: "Page Testimonials",
      description: "3 testimonials displayed on this service page",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text" }),
            defineField({ name: "author", title: "Author", type: "string" }),
            defineField({
              name: "location",
              title: "Location",
              type: "string",
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              initialValue: 5,
            }),
          ],
          preview: { select: { title: "author", subtitle: "location" } },
        },
      ],
    }),
    defineField({
      name: "relatedServices",
      title: "Related Services",
      description: "3 related service cards shown at the bottom",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "emoji", title: "Emoji", type: "string" }),
            defineField({
              name: "heading",
              title: "Card Heading",
              type: "string",
            }),
            defineField({
              name: "serviceTitle",
              title: "Service Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({ name: "link", title: "Link", type: "string" }),
          ],
          preview: { select: { title: "serviceTitle", subtitle: "emoji" } },
        },
      ],
    }),

    // ── Settings ──
    defineField({
      name: "homepage_section_enable",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: false,
      group: "settings",
    }),
    defineField({
      name: "home_title",
      title: "Homepage Title",
      type: "string",
      group: "settings",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      group: "settings",
    }),
    defineField({
      name: "banner",
      title: "Banner Image (legacy)",
      type: "image",
      options: { hotspot: true },
      group: "settings",
    }),
    defineField({
      name: "draft",
      title: "Draft",
      type: "boolean",
      initialValue: false,
      group: "settings",
    }),
    defineField({
      name: "weight",
      title: "Sort Weight",
      type: "number",
      group: "settings",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      group: "settings",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      group: "settings",
    }),

    // ── Legacy fields (kept for backward compat during migration) ──
    defineField({
      name: "descriptions",
      title: "Descriptions (legacy)",
      type: "array",
      of: [{ type: "string" }],
      group: "settings",
      hidden: true,
    }),
    defineField({
      name: "process",
      title: "Process (legacy)",
      type: "object",
      group: "settings",
      hidden: true,
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "content", title: "Content", type: "text" }),
        defineField({
          name: "processes",
          title: "Process Steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({ name: "icon", title: "Icon", type: "string" }),
                defineField({
                  name: "content",
                  title: "Content",
                  type: "text",
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      group: "settings",
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "heroEyebrow" },
  },
});
