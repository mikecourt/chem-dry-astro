import { defineType, defineField } from "sanity";

export const galleryPage = defineType({
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
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
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "description", title: "Description", type: "string" }),
          ],
          preview: { select: { title: "description", media: "image" } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Gallery Page" };
    },
  },
});
