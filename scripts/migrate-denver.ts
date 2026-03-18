/**
 * Migrate Denver-specific content from chem-dry-denver file-based content to Sanity.
 * Creates city pages, testimonials, and site config in the 'denver' dataset.
 *
 * Prerequisites:
 *   1. 'denver' dataset created in Sanity
 *   2. Service docs seeded via: npx tsx scripts/copy-dataset.ts production denver --seed
 *
 * Usage: npx tsx scripts/migrate-denver.ts
 */
import "dotenv/config";
import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: "denver",
  apiVersion: "2026-03-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

const DENVER_ROOT = path.resolve(
  "/Users/mikecourt/~/Chem-Dry/website/chem-dry-denver"
);

// ── Site Config ──
async function migrateSiteConfig() {
  console.log("\n── Migrating site config ──");
  const configPath = path.join(DENVER_ROOT, "src/config/config.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

  await client.createOrReplace({
    _id: "siteConfig",
    _type: "siteConfig",
    title: config.site.title,
    baseUrl: config.site.base_url,
    phone: config.params.phone,
    email: config.params.email,
    address: config.params.address,
    mailingAddress: config.params.mailing_address,
    footerDescription: config.params.footer_description,
    copyright: config.params.copyright,
  });
  console.log("  ✅ Site config created");
}

// ── Testimonials ──
async function migrateTestimonials() {
  console.log("\n── Migrating testimonials ──");
  const dir = path.join(DENVER_ROOT, "src/content/testimonials");
  if (!fs.existsSync(dir)) {
    console.log("  ⚠️  No testimonials directory found");
    return;
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  let count = 0;

  const tx = client.transaction();
  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    const slug = file.replace(".md", "");

    tx.createOrReplace({
      _id: `testimonial-${slug}`,
      _type: "testimonial",
      name: data.name || slug,
      location: data.location || "Denver, CO",
      source: data.source,
      rating: data.rating || 5,
      content: data.content || "",
      service: data.service,
      date: data.date ? new Date(data.date).toISOString() : undefined,
      featured: data.featured || false,
    });
    count++;
  }

  await tx.commit();
  console.log(`  ✅ ${count} testimonials migrated`);
}

// ── City Pages (from hardcoded .astro files) ──
// Denver city pages are hardcoded in .astro files. We extract the key data manually.
async function migrateCityPages() {
  console.log("\n── Migrating Denver city pages ──");

  // These are the Denver metro city pages based on the file listing
  const denverCities = [
    {
      city: "Denver",
      slug: "denver",
      state: "Colorado",
      metaTitle:
        "Carpet Cleaning Denver CO | All Pro Chem-Dry",
      metaDescription:
        "Professional carpet cleaning in Denver, CO. Hot Carbonating Extraction dries in 1-2 hours. Family-owned, 21+ years experience.",
    },
    {
      city: "Highlands Ranch",
      slug: "highlands-ranch",
      state: "Colorado",
      metaTitle:
        "Carpet Cleaning Highlands Ranch CO | All Pro Chem-Dry",
      metaDescription:
        "Professional carpet cleaning in Highlands Ranch, CO. Dries in 1-2 hours, no harsh chemicals.",
    },
    {
      city: "Centennial",
      slug: "centennial",
      state: "Colorado",
      metaTitle: "Carpet Cleaning Centennial CO | All Pro Chem-Dry",
      metaDescription:
        "Professional carpet cleaning in Centennial, CO. Dries in 1-2 hours, no harsh chemicals.",
    },
    {
      city: "Littleton",
      slug: "littleton",
      state: "Colorado",
      metaTitle: "Carpet Cleaning Littleton CO | All Pro Chem-Dry",
      metaDescription:
        "Professional carpet cleaning in Littleton, CO. Dries in 1-2 hours, no harsh chemicals.",
    },
    {
      city: "Parker",
      slug: "parker",
      state: "Colorado",
      metaTitle: "Carpet Cleaning Parker CO | All Pro Chem-Dry",
      metaDescription:
        "Professional carpet cleaning in Parker, CO. Dries in 1-2 hours, no harsh chemicals.",
    },
    {
      city: "Englewood",
      slug: "englewood",
      state: "Colorado",
      metaTitle: "Carpet Cleaning Englewood CO | All Pro Chem-Dry",
      metaDescription:
        "Professional carpet cleaning in Englewood, CO. Dries in 1-2 hours, no harsh chemicals.",
    },
    {
      city: "Lakewood",
      slug: "lakewood",
      state: "Colorado",
      metaTitle: "Carpet Cleaning Lakewood CO | All Pro Chem-Dry",
      metaDescription:
        "Professional carpet cleaning in Lakewood, CO. Dries in 1-2 hours, no harsh chemicals.",
    },
    {
      city: "Greenwood Village",
      slug: "greenwood-village",
      state: "Colorado",
      metaTitle: "Carpet Cleaning Greenwood Village CO | All Pro Chem-Dry",
      metaDescription:
        "Professional carpet cleaning in Greenwood Village, CO. Dries in 1-2 hours, no harsh chemicals.",
    },
    {
      city: "Thornton",
      slug: "thornton",
      state: "Colorado",
      metaTitle: "Carpet Cleaning Thornton CO | All Pro Chem-Dry",
      metaDescription:
        "Professional carpet cleaning in Thornton, CO. Dries in 1-2 hours, no harsh chemicals.",
    },
  ];

  const tx = client.transaction();
  for (const city of denverCities) {
    tx.createOrReplace({
      _id: `cityPage-${city.slug}`,
      _type: "cityPage",
      city: city.city,
      slug: { _type: "slug", current: city.slug },
      state: city.state,
      metaTitle: city.metaTitle,
      metaDescription: city.metaDescription,
      heroTitle: `Professional Carpet Cleaning in ${city.city}, ${city.state}`,
      heroSubtitle: `Carpet Cleaning ${city.city}, ${city.state}`,
      whyChooseContent: `All Pro Chem-Dry has been serving ${city.city} and the Denver metro area for over 21 years with our unique Hot Carbonating Extraction process.`,
      neighborhoods: [],
      services: [],
      zipCodes: [],
      faqs: [],
    });
  }

  await tx.commit();
  console.log(`  ✅ ${denverCities.length} city pages created (basic structure)`);
  console.log(
    "  ℹ️  Neighborhoods, ZIP codes, and FAQs need to be populated in Sanity Studio"
  );
  console.log(
    "  ℹ️  Or use the AI agent to generate this content (Phase 3)"
  );
}

// ── Homepage ──
async function migrateHomepage() {
  console.log("\n── Migrating homepage ──");
  const homepagePath = path.join(DENVER_ROOT, "src/content/homepage/-index.md");
  if (!fs.existsSync(homepagePath)) {
    console.log("  ⚠️  No homepage file found");
    return;
  }

  const raw = fs.readFileSync(homepagePath, "utf-8");
  const { data } = matter(raw);

  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    hero: {
      title: data.hero?.title || "Denver's Trusted Carpet Cleaning",
      subtitle: data.hero?.subtitle || "Professional, fast-drying, no harsh chemicals",
      buttons: (data.hero?.buttons || []).map((b: any, i: number) => ({
        _type: "button",
        _key: `btn-${i}`,
        enable: b.enable,
        label: b.label,
        link: b.link,
        icon: b.icon,
        type: b.type,
      })),
    },
    about: data.about
      ? {
          enable: data.about.enable,
          title: data.about.title,
          subtitle: data.about.subtitle,
          content: data.about.content,
          schedule: data.about.schedule?.map((s: any, i: number) => ({
            _type: "object",
            _key: `sched-${i}`,
            day: s.day,
            time: s.time,
          })),
          button: data.about.button
            ? {
                _type: "button",
                enable: data.about.button.enable,
                label: data.about.button.label,
                link: data.about.button.link,
              }
            : undefined,
          badge: data.about.badge,
        }
      : undefined,
    testimonial: data.testimonial
      ? {
          enable: data.testimonial.enable,
          title: data.testimonial.title,
          subtitle: data.testimonial.subtitle,
          content: data.testimonial.content,
        }
      : undefined,
    blog: data.blog
      ? {
          enable: data.blog.enable,
          title: data.blog.title,
          subtitle: data.blog.subtitle,
        }
      : undefined,
  });
  console.log("  ✅ Homepage created");
}

// ── CTA ──
async function migrateCta() {
  console.log("\n── Migrating CTA ──");
  const ctaPath = path.join(DENVER_ROOT, "src/content/sections/call-to-action.md");
  if (!fs.existsSync(ctaPath)) {
    // Use a Denver default
    await client.createOrReplace({
      _id: "callToAction",
      _type: "callToAction",
      enable: true,
      title: 'Ready to Experience the All Pro Difference?',
      subtitle: "Free estimate",
      content:
        "See for yourself why Denver metro families have trusted All Pro Chem-Dry for over 21 years.",
      buttons: [
        {
          _type: "object",
          _key: "btn1",
          enable: true,
          label: "(303) 381-2295",
          link: "tel:3033812295",
          icon: "FaPhone",
        },
        {
          _type: "object",
          _key: "btn2",
          enable: true,
          label: "Text Us Now",
          link: "sms:+13033812295?body=Hi%20All%20Pro!%20I'd%20like%20a%20free%20estimate.",
          icon: "FaCommentSms",
        },
      ],
    });
    console.log("  ✅ CTA created (default Denver)");
    return;
  }

  const raw = fs.readFileSync(ctaPath, "utf-8");
  const { data } = matter(raw);
  await client.createOrReplace({
    _id: "callToAction",
    _type: "callToAction",
    enable: data.enable ?? true,
    title: data.title,
    subtitle: data.subtitle,
    content: data.content,
    buttons: (data.buttons || []).map((b: any, i: number) => ({
      _type: "object",
      _key: `btn-${i}`,
      enable: b.enable,
      label: b.label,
      link: b.link,
      icon: b.icon,
    })),
  });
  console.log("  ✅ CTA migrated");
}

async function main() {
  console.log("=== Denver Content Migration ===");
  console.log(`Target: Sanity project ${process.env.SANITY_PROJECT_ID}, dataset: denver\n`);

  await migrateSiteConfig();
  await migrateTestimonials();
  await migrateCityPages();
  await migrateHomepage();
  await migrateCta();

  console.log("\n=== Migration Complete ===");
  console.log("Next steps:");
  console.log("  1. Run: npx tsx scripts/copy-dataset.ts production denver --seed");
  console.log("     (copies shared services, blog posts from Phoenix)");
  console.log("  2. Populate city page neighborhoods/ZIPs in Sanity Studio");
  console.log("  3. Create Denver Vercel project with SANITY_DATASET=denver");
}

main().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
