import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { sanityClient } from "@/lib/sanity";
import config from "@/config/config.json";

export async function GET(context: APIContext) {
  const posts = await sanityClient.fetch(
    `*[_type == "blogPost" && !draft] | order(date desc) {
      title,
      "slug": slug.current,
      description,
      date
    }`
  );

  return rss({
    title: config.site.title,
    description: config.metadata.meta_description,
    site: config.site.base_url,
    items: posts.map((post: any) => ({
      title: post.title,
      description: post.description || "",
      pubDate: post.date ? new Date(post.date) : new Date(),
      link: `/blog/${post.slug}`,
    })),
  });
}
