import { defineType, defineField } from "sanity";

export const cityPage = defineType({
  name: "cityPage",
  title: "City Page",
  type: "document",
  fields: [
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "city" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "canonical",
      title: "Canonical URL",
      type: "url",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "whyChooseContent",
      title: "Why Choose Us Content",
      type: "text",
    }),
    defineField({
      name: "neighborhoods",
      title: "Neighborhoods",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({
              name: "highlights",
              title: "Highlights",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({ name: "icon", title: "Icon", type: "string" }),
          ],
          preview: { select: { title: "name" } },
        },
      ],
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({ name: "icon", title: "Icon", type: "string" }),
            defineField({ name: "link", title: "Link", type: "string" }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "zipCodes",
      title: "Zip Codes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "zip", title: "Zip Code", type: "string" }),
            defineField({ name: "area", title: "Area", type: "string" }),
          ],
          preview: { select: { title: "zip", subtitle: "area" } },
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text" }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "city", subtitle: "state" },
  },
});
