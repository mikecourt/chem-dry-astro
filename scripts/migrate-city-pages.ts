import fs from "fs";
import path from "path";
import { writeClient } from "./utils/sanity-client";

const DATA_DIR = path.join(import.meta.dirname || __dirname, "data");

async function migrateCityPages() {
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.startsWith("city-") && f.endsWith(".json"));
  console.log(`Found ${files.length} city data files`);

  for (const file of files) {
    const data = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, file), "utf-8")
    );
    await writeClient.create({
      _type: "cityPage",
      city: data.city,
      slug: { _type: "slug", current: data.slug },
      state: data.state || "Arizona",
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      canonical: data.canonical,
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      whyChooseContent: data.whyChooseContent,
      neighborhoods: data.neighborhoods,
      services: data.services,
      zipCodes: data.zipCodes,
      faqs: data.faqs,
    });
    console.log(`  Migrated: ${data.city}`);
  }

  console.log(`\nDone! Migrated ${files.length} city pages.`);
}

migrateCityPages().catch(console.error);
