import { defineType, defineField } from "sanity";

export const siteConfig = defineType({
  name: "siteConfig",
  title: "Site Config",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
    }),
    defineField({
      name: "baseUrl",
      title: "Base URL",
      type: "url",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mailingAddress",
      title: "Mailing Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
    }),
    defineField({
      name: "gtmId",
      title: "Google Tag Manager ID",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "footerLogo",
      title: "Footer Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "link", title: "Link", type: "string" }),
            defineField({
              name: "children",
              title: "Dropdown Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "link", title: "Link", type: "string" }),
                  ],
                  preview: { select: { title: "label" } },
                },
              ],
            }),
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", title: "Platform", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
            defineField({ name: "icon", title: "Icon", type: "string" }),
          ],
          preview: { select: { title: "platform" } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Config" };
    },
  },
});
