#!/usr/bin/env node
/**
 * generate-location-pages.js
 * Generates Astro location pages from a city config array.
 *
 * Usage:
 *   node tools/generate-location-pages.js chicago   # generate Chicago pages
 *   node tools/generate-location-pages.js denver    # generate Denver pages
 *   node tools/generate-location-pages.js all       # generate both
 *
 * Outputs files to src/pages/<slug>.astro
 * Run from the repo root of the target site (chem-dry-astro-chicago or chem-dry-astro-denver).
 */

const fs = require("fs");
const path = require("path");

// ─── Chicago Location Data ─────────────────────────────────────────────────
const CHICAGO_LOCATIONS = [
  {
    slug: "new-lenox",
    city: "New Lenox",
    state: "Illinois",
    stateAbbr: "IL",
    postalCodes: ["60451"],
    neighborhoods: "Manhattan, Mokena, Frankfort, Tinley Park, and Joliet",
    tagline: "New Lenox & Frankfort's Trusted Carpet Cleaning Service",
    isPrimary: true,
  },
  {
    slug: "frankfort",
    city: "Frankfort",
    state: "Illinois",
    stateAbbr: "IL",
    postalCodes: ["60423"],
    neighborhoods: "New Lenox, Mokena, Manhattan, Tinley Park, and Orland Park",
    tagline: "Frankfort's Trusted Carpet Cleaning Service",
    isPrimary: true,
  },
  {
    slug: "mokena",
    city: "Mokena",
    state: "Illinois",
    stateAbbr: "IL",
    postalCodes: ["60448"],
    neighborhoods: "New Lenox, Frankfort, Tinley Park, and Orland Park",
    tagline: "Carpet Cleaning in Mokena, IL",
    isPrimary: false,
  },
  {
    slug: "naperville",
    city: "Naperville",
    state: "Illinois",
    stateAbbr: "IL",
    postalCodes: ["60540", "60563", "60564", "60565"],
    neighborhoods: "Lisle, Bolingbrook, Aurora, Plainfield, and Romeoville",
    tagline: "Carpet Cleaning in Naperville, IL",
    isPrimary: false,
  },
  {
    slug: "oak-forest",
    city: "Oak Forest",
    state: "Illinois",
    stateAbbr: "IL",
    postalCodes: ["60452"],
    neighborhoods: "Tinley Park, Orland Park, Crestwood, and Markham",
    tagline: "Carpet Cleaning in Oak Forest, IL",
    isPrimary: false,
  },
  {
    slug: "palos-heights",
    city: "Palos Heights",
    state: "Illinois",
    stateAbbr: "IL",
    postalCodes: ["60463"],
    neighborhoods: "Palos Hills, Worth, Orland Park, and Oak Lawn",
    tagline: "Carpet Cleaning in Palos Heights, IL",
    isPrimary: false,
  },
  {
    slug: "plainfield",
    city: "Plainfield",
    state: "Illinois",
    stateAbbr: "IL",
    postalCodes: ["60544", "60585"],
    neighborhoods: "Joliet, Bolingbrook, Naperville, and Shorewood",
    tagline: "Carpet Cleaning in Plainfield, IL",
    isPrimary: false,
  },
];

// ─── Denver Location Data ──────────────────────────────────────────────────
const DENVER_LOCATIONS = [
  {
    slug: "denver",
    city: "Denver",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80202", "80203", "80204", "80205", "80209", "80210", "80211", "80218", "80220", "80222", "80224", "80230", "80246"],
    neighborhoods: "Capitol Hill, Cherry Creek, Park Hill, Wash Park, Highlands, and LoDo",
    tagline: "Denver's Trusted Carpet Cleaning Service",
    isPrimary: true,
  },
  {
    slug: "aurora",
    city: "Aurora",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80010", "80011", "80012", "80013", "80014", "80015", "80016", "80017", "80018", "80019"],
    neighborhoods: "Centennial, Parker, Englewood, and Denver",
    tagline: "Carpet Cleaning in Aurora, CO",
    isPrimary: false,
  },
  {
    slug: "castle-pines",
    city: "Castle Pines",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80108"],
    neighborhoods: "Castle Rock, Lone Tree, Parker, and Highlands Ranch",
    tagline: "Carpet Cleaning in Castle Pines, CO",
    isPrimary: false,
  },
  {
    slug: "castle-rock",
    city: "Castle Rock",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80104", "80108", "80109"],
    neighborhoods: "Castle Pines, Parker, Lone Tree, and Highlands Ranch",
    tagline: "Carpet Cleaning in Castle Rock, CO",
    isPrimary: false,
  },
  {
    slug: "centennial",
    city: "Centennial",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80015", "80016", "80111", "80112", "80121", "80122"],
    neighborhoods: "Greenwood Village, Englewood, Highlands Ranch, and Aurora",
    tagline: "Carpet Cleaning in Centennial, CO",
    isPrimary: false,
  },
  {
    slug: "cherry-hills-village",
    city: "Cherry Hills Village",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80113"],
    neighborhoods: "Englewood, Greenwood Village, and Denver",
    tagline: "Carpet Cleaning in Cherry Hills Village, CO",
    isPrimary: false,
  },
  {
    slug: "englewood",
    city: "Englewood",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80110", "80111", "80113"],
    neighborhoods: "Cherry Hills Village, Greenwood Village, Littleton, and Denver",
    tagline: "Carpet Cleaning in Englewood, CO",
    isPrimary: false,
  },
  {
    slug: "greenwood-village",
    city: "Greenwood Village",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80111", "80121"],
    neighborhoods: "Centennial, Englewood, Cherry Hills Village, and Lone Tree",
    tagline: "Carpet Cleaning in Greenwood Village, CO",
    isPrimary: false,
  },
  {
    slug: "highlands-ranch",
    city: "Highlands Ranch",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80126", "80129", "80130"],
    neighborhoods: "Littleton, Centennial, Castle Rock, and Lone Tree",
    tagline: "Carpet Cleaning in Highlands Ranch, CO",
    isPrimary: false,
  },
  {
    slug: "lakewood",
    city: "Lakewood",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80214", "80215", "80226", "80227", "80228"],
    neighborhoods: "Wheat Ridge, Arvada, Denver, and Littleton",
    tagline: "Carpet Cleaning in Lakewood, CO",
    isPrimary: false,
  },
  {
    slug: "littleton",
    city: "Littleton",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80120", "80121", "80123", "80127", "80128"],
    neighborhoods: "Highlands Ranch, Englewood, Centennial, and Lakewood",
    tagline: "Carpet Cleaning in Littleton, CO",
    isPrimary: false,
  },
  {
    slug: "lone-tree",
    city: "Lone Tree",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80124"],
    neighborhoods: "Highlands Ranch, Castle Rock, Centennial, and Parker",
    tagline: "Carpet Cleaning in Lone Tree, CO",
    isPrimary: false,
  },
  {
    slug: "parker",
    city: "Parker",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80134", "80138"],
    neighborhoods: "Castle Rock, Lone Tree, Aurora, and Highlands Ranch",
    tagline: "Carpet Cleaning in Parker, CO",
    isPrimary: false,
  },
  {
    slug: "thornton",
    city: "Thornton",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80229", "80233", "80241"],
    neighborhoods: "Westminster, Northglenn, Brighton, and Denver",
    tagline: "Carpet Cleaning in Thornton, CO",
    isPrimary: false,
  },
  // Arvada (legacy URL had a typo: /arvada-carpet-clearners)
  {
    slug: "arvada",
    city: "Arvada",
    state: "Colorado",
    stateAbbr: "CO",
    postalCodes: ["80002", "80003", "80004", "80005", "80007"],
    neighborhoods: "Westminster, Wheat Ridge, Lakewood, and Denver",
    tagline: "Carpet Cleaning in Arvada, CO",
    isPrimary: false,
  },
];

// ─── Page template ─────────────────────────────────────────────────────────
function generatePage(loc, businessName, phone, baseUrl) {
  const phonePlain = phone.replace(/\D/g, "");
  const title = `Carpet Cleaning ${loc.city} ${loc.stateAbbr} | ${businessName}`;
  const description = `Carpet cleaning ${loc.city} ${loc.stateAbbr} — Hot Carbonating Extraction, pet-safe, dries in 1-2 hours. Serving ${loc.city} and surrounding areas. Call ${phone}.`;
  const canonical = `${baseUrl}/${loc.slug}`;
  const postalCodesStr = JSON.stringify(loc.postalCodes);

  return `---
import CustomButton from "@/components/CustomButton.astro";
import CustomHeading from "@/components/CustomHeading.astro";
import ImageMod from "@/components/ImageMod.astro";
import SchemaMarkup from "@/components/SchemaMarkup.astro";
import Base from "@/layouts/Base.astro";
import CallToAction from "@/partials/CallToAction.astro";
import TrustBar from "@/components/TrustBar.astro";
import AllergenDisclaimer from "@/components/AllergenDisclaimer.astro";
import CityTestimonials from "@/components/CityTestimonials.astro";
import { getEntry, type CollectionEntry } from "astro:content";

const call_to_action = (await getEntry(
  "ctaSection",
  "call-to-action"
)) as CollectionEntry<"ctaSection">;

const title = ${JSON.stringify(title)};
const meta_title = ${JSON.stringify(title)};
const description = ${JSON.stringify(description)};
const canonical = ${JSON.stringify(canonical)};
---

<Base title={title} description={description} meta_title={meta_title} canonical={canonical} preloadImage="/images/carpet-cleaning-service-hero.webp">
  <SchemaMarkup type="city" city={${JSON.stringify(loc.city)}} state={${JSON.stringify(loc.state)}} postalCodes={${postalCodesStr}} />

  <!-- Hero Section -->
  <section
    class="hero-section py-24 md:py-40 lg:py-48 relative mb-0 overflow-hidden">
    <img
      src="/images/carpet-cleaning-service-hero.webp"
      alt=${JSON.stringify(`Professional carpet cleaning service in ${loc.city}, ${loc.stateAbbr}`)}
      width="1920"
      height="1280"
      fetchpriority="high"
      decoding="async"
      loading="eager"
      class="hero-bg-image absolute inset-0 w-full h-full object-cover object-center"
    />

    <div class="absolute inset-0 z-10" style="background: radial-gradient(ellipse at 25% 40%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 50%, transparent 85%);"></div>

    <div class="relative z-20 px-[30px]">
      <p
        class="text-sm font-semibold tracking-wider uppercase text-primary mb-3 text-center lg:text-left"
        data-aos="fade-up-sm"
      >
        ${loc.tagline}
      </p>

      <CustomHeading
        as="h1"
        text=${JSON.stringify(`Professional **Carpet Cleaning** in ${loc.city}, ${loc.state}`)}
        svgColor="text-primary"
        class="text-4xl md:text-5xl font-bold text-dark mb-4 md:mb-6 text-center lg:text-left mx-auto lg:mx-0"
        dataAos="fade-up-sm"
        dataAosDelay="50"
      />

      <h2
        class="text-lg md:text-xl text-text/80 mb-8 text-center lg:text-left"
        data-aos="fade-up-sm"
        data-aos-delay="100"
      >
        Serving ${loc.city} residents with safe, fast-drying carpet cleaning for ${loc.neighborhoods}
      </h2>

      <div
        class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        data-aos="fade-up-sm"
        data-aos-delay="200"
      >
        <CustomButton href={${"\"tel:" + phonePlain + "\""}} style="primary">
          Call ${phone}
        </CustomButton>
        <CustomButton href="/appointment" style="outline">
          Get a Free Quote
        </CustomButton>
      </div>
    </div>
  </section>

  <TrustBar />
  <AllergenDisclaimer />
  <CityTestimonials city={${JSON.stringify(loc.city)}} />
  <CallToAction call_to_action={call_to_action} />
</Base>
`;
}

// ─── CLI runner ────────────────────────────────────────────────────────────
const target = process.argv[2] || "all";

const CONFIGS = {
  chicago: {
    locations: CHICAGO_LOCATIONS,
    businessName: "K&T Chem-Dry",
    phone: "(815) 469-3170",
    baseUrl: "https://ktchemdrycarpetcleaning.com",
  },
  denver: {
    locations: DENVER_LOCATIONS,
    businessName: "All Pro Chem-Dry",
    phone: "PLACEHOLDER_PHONE",
    baseUrl: "https://allprochemdry.com",
  },
};

const targets = target === "all" ? Object.keys(CONFIGS) : [target];

for (const t of targets) {
  const cfg = CONFIGS[t];
  if (!cfg) {
    console.error(`Unknown target: ${t}. Use: chicago, denver, or all`);
    process.exit(1);
  }

  const outputDir = "src/pages";
  fs.mkdirSync(outputDir, { recursive: true });

  for (const loc of cfg.locations) {
    const content = generatePage(loc, cfg.businessName, cfg.phone, cfg.baseUrl);
    const outputFile = path.join(outputDir, `${loc.slug}.astro`);
    fs.writeFileSync(outputFile, content);
    console.log(`✓ ${outputFile}`);
  }
  console.log(`\n✅ Generated ${cfg.locations.length} ${t} location pages`);
}

console.log("\nNotes:");
console.log("  - Denver phone is a PLACEHOLDER — update config.json and CONFIGS.denver.phone before running");
console.log("  - Run from the root of the target site repo (chem-dry-astro-chicago or chem-dry-astro-denver)");
