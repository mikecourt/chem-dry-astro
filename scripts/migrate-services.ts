import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { writeClient } from "./utils/sanity-client";
import { markdownToPortableText } from "./utils/markdown-to-portable-text";
import { uploadImage } from "./utils/image-uploader";

const SERVICES_DIR = path.join(import.meta.dirname || __dirname, "../src/content/services");

async function migrateServices() {
  const files = fs.readdirSync(SERVICES_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("-"));
  console.log(`Found ${files.length} service files`);

  let migrated = 0;
  let errors = 0;

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(SERVICES_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "").replace(/^_/, "");

      const body = content.trim() ? markdownToPortableText(content) : undefined;

      let banner = undefined;
      if (data.banner) {
        banner = await uploadImage(data.banner);
      }

      await writeClient.create({
        _type: "service",
        title: data.title || slug,
        slug: { _type: "slug", current: slug },
        metaTitle: data.meta_title || undefined,
        description: data.description || undefined,
        icon: data.icon || undefined,
        banner,
        date: data.date ? new Date(data.date).toISOString() : undefined,
        categories: data.categories || [],
        draft: data.draft ?? false,
        weight: data.weight ?? undefined,
        homepageSectionEnable: data.homepage_section_enable ?? undefined,
        homeTitle: data.home_title || undefined,
        subtitle: data.subtitle || undefined,
        descriptions: data.descriptions || undefined,
        process: data.process || undefined,
        body,
      });

      migrated++;
      console.log(`  Migrated: ${slug}`);
    } catch (err: any) {
      console.error(`  ERROR ${file}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\nDone! Migrated: ${migrated}, Errors: ${errors}`);
}

migrateServices().catch(console.error);
