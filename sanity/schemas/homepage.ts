import { defineType, defineField } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    // Hero section
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({
          name: "buttons",
          title: "Buttons",
          type: "array",
          of: [{ type: "button" }],
        }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "reviews",
          title: "Reviews",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({
                  name: "company_logo",
                  title: "Company Logo",
                  type: "image",
                  options: { hotspot: true },
                }),
                defineField({ name: "rating", title: "Rating", type: "number" }),
              ],
              preview: { select: { title: "name" } },
            },
          ],
        }),
      ],
    }),

    // About section
    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      fields: [
        defineField({ name: "enable", title: "Enable", type: "boolean", initialValue: true }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({ name: "content", title: "Content", type: "text" }),
        defineField({
          name: "schedule",
          title: "Schedule",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "day", title: "Day", type: "string" }),
                defineField({ name: "time", title: "Time", type: "string" }),
              ],
              preview: { select: { title: "day", subtitle: "time" } },
            },
          ],
        }),
        defineField({ name: "button", title: "Button", type: "button" }),
        defineField({
          name: "images",
          title: "Images",
          type: "array",
          of: [{ type: "image" }],
        }),
        defineField({ name: "badge", title: "Badge", type: "string" }),
      ],
    }),

    // Responsibility section
    defineField({
      name: "responsibility",
      title: "Responsibility Section",
      type: "object",
      fields: [
        defineField({ name: "enable", title: "Enable", type: "boolean", initialValue: true }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({ name: "content", title: "Content", type: "text" }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "video",
          title: "Video",
          type: "object",
          fields: [
            defineField({
              name: "thumbnail",
              title: "Thumbnail",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        }),
        defineField({
          name: "job",
          title: "Job Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "content", title: "Content", type: "text" }),
              ],
              preview: { select: { title: "title" } },
            },
          ],
        }),
      ],
    }),

    // Customer section
    defineField({
      name: "customer",
      title: "Customer Section",
      type: "object",
      fields: [
        defineField({ name: "enable", title: "Enable", type: "boolean", initialValue: true }),
        defineField({
          name: "title",
          title: "Title",
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "text", title: "Text", type: "string" }),
          ],
        }),
        defineField({
          name: "logo",
          title: "Logos",
          type: "array",
          of: [{ type: "image" }],
        }),
      ],
    }),

    // Testimonial section
    defineField({
      name: "testimonial",
      title: "Testimonial Section",
      type: "object",
      fields: [
        defineField({ name: "enable", title: "Enable", type: "boolean", initialValue: true }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "content", title: "Content", type: "text" }),
        defineField({
          name: "review",
          title: "Reviews",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({ name: "about", title: "About", type: "string" }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                }),
                defineField({ name: "says", title: "Quote", type: "text" }),
              ],
              preview: { select: { title: "name" } },
            },
          ],
        }),
      ],
    }),

    // Blog section
    defineField({
      name: "blog",
      title: "Blog Section",
      type: "object",
      fields: [
        defineField({ name: "enable", title: "Enable", type: "boolean", initialValue: true }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
