/**
 * Copy documents from one Sanity dataset to another.
 * Used for: production → phoenix (full copy), production → denver/chicago (template seed)
 *
 * Usage:
 *   npx tsx scripts/copy-dataset.ts production phoenix         # full copy
 *   npx tsx scripts/copy-dataset.ts production denver --seed    # seed with template content
 */
import "dotenv/config";
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID!;
const token = process.env.SANITY_API_TOKEN!;
const [, , sourceDataset, targetDataset, ...flags] = process.argv;
const seedMode = flags.includes("--seed");

if (!sourceDataset || !targetDataset) {
  console.error("Usage: npx tsx scripts/copy-dataset.ts <source> <target> [--seed]");
  process.exit(1);
}

const source = createClient({ projectId, dataset: sourceDataset, apiVersion: "2026-03-01", token, useCdn: false });
const target = createClient({ projectId, dataset: targetDataset, apiVersion: "2026-03-01", token, useCdn: false });

// Document types to copy in seed mode (shared content that applies to all locations)
const SEED_TYPES = ["service", "callToAction", "siteConfig"];
// Document types that are location-specific and should NOT be copied in seed mode
const LOCATION_SPECIFIC_TYPES = ["cityPage", "testimonial"];

async function run() {
  console.log(`\n${seedMode ? "Seeding" : "Copying"}: ${sourceDataset} → ${targetDataset}\n`);

  // Fetch all documents from source
  let query = `*[!(_type match "system.*") && !(_id in path("_.**"))]`;
  if (seedMode) {
    const typeFilter = SEED_TYPES.map((t) => `_type == "${t}"`).join(" || ");
    query = `*[(${typeFilter}) && !(_id in path("_.**"))]`;
  }

  const docs = await source.fetch(query);
  console.log(`Fetched ${docs.length} documents from ${sourceDataset}`);

  if (docs.length === 0) {
    console.log("Nothing to copy.");
    return;
  }

  // Create documents in target dataset using transactions
  const batchSize = 50;
  let created = 0;

  for (let i = 0; i < docs.length; i += batchSize) {
    const batch = docs.slice(i, i + batchSize);
    const tx = target.transaction();

    for (const doc of batch) {
      // Remove revision fields that would conflict
      const { _rev, ...cleanDoc } = doc;
      tx.createOrReplace(cleanDoc);
    }

    await tx.commit();
    created += batch.length;
    console.log(`  Created ${created}/${docs.length} documents...`);
  }

  console.log(`\n✅ ${seedMode ? "Seeded" : "Copied"} ${created} documents to ${targetDataset}`);

  if (seedMode) {
    console.log(`\nNote: ${LOCATION_SPECIFIC_TYPES.join(", ")} were NOT copied.`);
    console.log("You'll need to create city pages, testimonials, etc. for this location.");
  }
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
