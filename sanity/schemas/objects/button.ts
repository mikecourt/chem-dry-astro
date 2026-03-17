import { defineType, defineField } from "sanity";

export const button = defineType({
  name: "button",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "enable",
      title: "Enable",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" },
          { title: "Ghost", value: "ghost" },
        ],
      },
    }),
  ],
});
