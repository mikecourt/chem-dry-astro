import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { writeClient } from "./utils/sanity-client";

const TESTIMONIALS_DIR = path.join(import.meta.dirname || __dirname, "../src/content/testimonials");

async function migrateTestimonials() {
  const files = fs.readdirSync(TESTIMONIALS_DIR).filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} testimonial files`);

  let migrated = 0;
  for (const file of files) {
    const raw = fs.readFileSync(path.join(TESTIMONIALS_DIR, file), "utf-8");
    const { data } = matter(raw);

    await writeClient.create({
      _type: "testimonial",
      name: data.name,
      location: data.location,
      source: data.source || undefined,
      rating: data.rating ?? 5,
      content: data.content,
      service: data.service || undefined,
      date: data.date ? new Date(data.date).toISOString() : undefined,
      featured: data.featured ?? false,
    });

    migrated++;
    console.log(`  ${migrated}/${files.length}: ${data.name} (${data.location})`);
  }

  console.log(`\nDone! Migrated ${migrated} testimonials`);
}

migrateTestimonials().catch(console.error);
