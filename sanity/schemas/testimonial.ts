import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "e.g. Google, Yelp, Facebook",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "content",
      title: "Review Content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "service",
      title: "Service",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "location" },
  },
});
