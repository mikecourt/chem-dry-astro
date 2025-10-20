import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    subtitle: z.string().optional(),
    why_us: z.array(
      z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        button: z
          .object({
            enable: z.boolean(),
            label: z.string(),
            link: z.string(),
            icon: z.string().optional(),
            type: z.string().optional(),
          })
          .optional(),
        image: z.string().optional(),
        bullet_points: z.array(z.string()).optional(),
        subtitle: z.string().optional(),
        overlay_image: z.string().optional(),
      })
    ),
    pride: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      content: z.string(),
      images: z.array(z.string()),
    }),
    team: z.object({
      enable: z.boolean(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      members: z.array(
        z.object({
          name: z.string(),
          designation: z.string(),
          image: z.string(),
        })
      ),
    }),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    badge: z.string().optional(),
  }),
});

const contactCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

const appointmentCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/appointment" }),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    contact_way: z.array(
      z.object({
        icon: z.string(),
        value: z.string(),
      })
    ),
  }),
});

const galleryCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/gallery" }),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    images: z.array(
      z.object({ image: z.string(), description: z.string().optional() })
    ),
  }),
});

const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      buttons: z.array(
        z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
          icon: z.string().optional(),
          type: z.string().optional(),
        })
      ),
      image: z.string(),
      reviews: z.array(
        z.object({
          name: z.string(),
          company_logo: z.string(),
          rating: z.number(),
        })
      ),
    }),
    about: z.object({
      enable: z.boolean(),
      title: z.string(),
      subtitle: z.string(),
      content: z.string(),
      schedule: z.array(z.object({ day: z.string(), time: z.string() })),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
        icon: z.string().optional(),
        type: z.string().optional(),
      }),
      images: z.array(z.string()),
      badge: z.string(),
    }),
    responsibility: z.object({
      enable: z.boolean(),
      title: z.string(),
      subtitle: z.string(),
      content: z.string(),
      image: z.string(),
      video: z.object({ thumbnail: z.string(), url: z.string() }),
      job: z.array(z.object({ title: z.string(), content: z.string() })),
    }),
    customer: z.object({
      enable: z.boolean(),
      title: z.object({ value: z.string(), text: z.string() }),
      logo: z.array(z.string()),
    }),
    testimonial: z.object({
      enable: z.boolean(),
      review: z.array(
        z.object({
          name: z.string(),
          about: z.string(),
          image: z.string(),
          says: z.string(),
        })
      ),
    }),
    blog: z.object({
      enable: z.boolean(),
      title: z.string(),
      subtitle: z.string(),
    }),
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean(),
  }),
});

const ctaSectionsCollection = defineCollection({
  loader: glob({
    pattern: "call-to-action.{md,mdx}",
    base: "src/content/sections/",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    content: z.string().optional(),
    image: z.string().optional(),
    buttons: z
      .array(
        z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
          type: z.string().optional(),
          icon: z.string().optional(),
        })
      )
      .optional(),
  }),
});

const servicesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/services" }),
  schema: z.object({
    title: z.string().optional(),
    homepage_section_enable: z.boolean().optional(),
    home_title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    banner: z.string().optional(),
    draft: z.boolean().optional(),
    date: z.date().optional(),
    weight: z.number().optional(),
    subtitle: z.string().optional(),
    categories: z.array(z.string()).optional(),
    descriptions: z.array(z.string()).optional(),
    process: z
      .object({
        title: z.string().optional(),
        content: z.string(),
        processes: z.array(
          z.object({
            name: z.string(),
            icon: z.string().optional(),
            content: z.string(),
          })
        ),
      })
      .optional(),
  }),
});

export const collections = {
  about: aboutCollection,
  blog: blogCollection,
  contact: contactCollection,
  appointment: appointmentCollection,
  gallery: galleryCollection,
  homepage: homepageCollection,
  pages: pagesCollection,
  ctaSection: ctaSectionsCollection,
  services: servicesCollection,
};
