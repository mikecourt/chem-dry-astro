import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "string",
    }),
    defineField({
      name: "why_us",
      title: "Why Us",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "content", title: "Content", type: "text" }),
            defineField({ name: "button", title: "Button", type: "button" }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "bullet_points",
              title: "Bullet Points",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
            defineField({
              name: "overlay_image",
              title: "Overlay Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "pride",
      title: "Pride Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({ name: "content", title: "Content", type: "text" }),
        defineField({
          name: "images",
          title: "Images",
          type: "array",
          of: [{ type: "image" }],
        }),
      ],
    }),
    defineField({
      name: "team",
      title: "Team Section",
      type: "object",
      fields: [
        defineField({ name: "enable", title: "Enable", type: "boolean", initialValue: true }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({
          name: "members",
          title: "Members",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({ name: "designation", title: "Designation", type: "string" }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
              preview: { select: { title: "name", subtitle: "designation" } },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
