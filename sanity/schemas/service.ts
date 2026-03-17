import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "homepage_section_enable",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "home_title",
      title: "Homepage Title",
      type: "string",
    }),
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "canonical",
      title: "Canonical URL",
      type: "url",
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
    }),
    defineField({
      name: "banner",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "draft",
      title: "Draft",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
    }),
    defineField({
      name: "weight",
      title: "Sort Weight",
      type: "number",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "descriptions",
      title: "Descriptions",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "process",
      title: "Process",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "content",
          title: "Content",
          type: "text",
        }),
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
                defineField({ name: "content", title: "Content", type: "text" }),
              ],
              preview: { select: { title: "name" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
