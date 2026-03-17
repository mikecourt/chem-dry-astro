import { defineType, defineField } from "sanity";

export const callToAction = defineType({
  name: "callToAction",
  title: "Call To Action",
  type: "document",
  fields: [
    defineField({
      name: "enable",
      title: "Enable",
      type: "boolean",
      initialValue: true,
    }),
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
      name: "content",
      title: "Content",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [{ type: "button" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: { title?: string }) {
      return { title: title ?? "Call To Action" };
    },
  },
});
