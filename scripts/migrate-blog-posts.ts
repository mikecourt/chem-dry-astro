import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { writeClient } from "./utils/sanity-client";
import { markdownToPortableText } from "./utils/markdown-to-portable-text";
import { uploadImage } from "./utils/image-uploader";

const BLOG_DIR = path.join(import.meta.dirname || __dirname, "../src/content/blog");

async function migrateBlogPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("-"));
  console.log(`Found ${files.length} blog post files`);

  let migrated = 0;
  let errors = 0;

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");

      const body = markdownToPortableText(content);

      let image = undefined;
      if (data.image) {
        image = await uploadImage(data.image);
      }

      await writeClient.create({
        _type: "blogPost",
        title: data.title || slug,
        slug: { _type: "slug", current: slug },
        metaTitle: data.meta_title || undefined,
        description: data.description || undefined,
        date: data.date ? new Date(data.date).toISOString() : undefined,
        image,
        categories: data.categories || [],
        draft: data.draft ?? false,
        badge: data.badge || undefined,
        body,
      });

      migrated++;
      if (migrated % 25 === 0) console.log(`  Progress: ${migrated}/${files.length}`);
    } catch (err: any) {
      console.error(`  ERROR ${file}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\nDone! Migrated: ${migrated}, Errors: ${errors}`);
}

migrateBlogPosts().catch(console.error);
