import { defineType, defineField } from "sanity";

export const appointmentPage = defineType({
  name: "appointmentPage",
  title: "Appointment Page",
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
      name: "contact_way",
      title: "Contact Ways",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: { select: { title: "value" } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Appointment Page" };
    },
  },
});
