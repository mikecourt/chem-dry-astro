import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { writeClient } from "./utils/sanity-client";
import { uploadImage } from "./utils/image-uploader";

const CONTENT_DIR = path.join(import.meta.dirname || __dirname, "../src/content");
const SECTIONS_DIR = path.join(import.meta.dirname || __dirname, "../src/content/sections");

// ─── helpers ────────────────────────────────────────────────────────────────

function readFrontmatter(filePath: string): Record<string, any> {
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw).data;
}

/** Upsert a singleton document (createOrReplace with fixed _id). */
async function upsert(doc: Record<string, any>) {
  return writeClient.createOrReplace(doc);
}

// ─── homepage ────────────────────────────────────────────────────────────────

async function migrateHomepage() {
  console.log("Migrating homepage...");
  const data = readFrontmatter(path.join(CONTENT_DIR, "homepage/-index.md"));

  // hero buttons
  const heroButtons = (data.hero?.buttons ?? []).map((b: any) => ({
    _type: "button",
    _key: Math.random().toString(36).slice(2),
    enable: b.enable ?? true,
    label: b.label ?? "",
    link: b.link ?? "",
    icon: b.icon ?? undefined,
  }));

  // hero reviews — company_logo stored as URL string (no binary available)
  const heroReviews = (data.hero?.reviews ?? []).map((r: any) => ({
    _key: Math.random().toString(36).slice(2),
    name: r.name ?? "",
    company_logo: r.company_logo
      ? { _type: "image", asset: { _type: "sanityAsset", url: r.company_logo } }
      : undefined,
    rating: r.rating ?? 0,
  }));

  // hero image
  const heroImage = data.hero?.image ? await uploadImage(data.hero.image) : undefined;

  // about section
  const aboutSchedule = (data.about?.schedule ?? []).map((s: any) => ({
    _key: Math.random().toString(36).slice(2),
    day: s.day ?? "",
    time: s.time ?? "",
  }));
  const aboutButton = data.about?.button
    ? {
        _type: "button",
        enable: data.about.button.enable ?? true,
        label: data.about.button.label ?? "",
        link: data.about.button.link ?? "",
      }
    : undefined;
  const aboutImages = [];
  for (const imgPath of data.about?.images ?? []) {
    const uploaded = await uploadImage(imgPath);
    if (uploaded) aboutImages.push({ ...uploaded, _key: Math.random().toString(36).slice(2) });
  }

  // responsibility section
  const respImage = data.responsibility?.image
    ? await uploadImage(data.responsibility.image)
    : undefined;
  const respThumb = data.responsibility?.video?.thumbnail
    ? await uploadImage(data.responsibility.video.thumbnail)
    : undefined;
  const respJobs = (data.responsibility?.job ?? []).map((j: any) => ({
    _key: Math.random().toString(36).slice(2),
    title: j.title ?? "",
    content: j.content ?? "",
  }));

  // customer section logos — stored as URL strings
  const customerLogos = (data.customer?.logo ?? []).map((logoPath: string) => ({
    _key: Math.random().toString(36).slice(2),
    _type: "image",
    asset: { _type: "sanityAsset", url: logoPath },
  }));

  // testimonial reviews
  const testimonialReviews = (data.testimonial?.review ?? []).map((r: any) => ({
    _key: Math.random().toString(36).slice(2),
    name: r.name ?? "",
    about: r.about ?? "",
    says: r.says ?? "",
    image: r.image
      ? { _type: "image", asset: { _type: "sanityAsset", url: r.image } }
      : undefined,
  }));

  await upsert({
    _id: "homepage",
    _type: "homepage",
    hero: {
      title: data.hero?.title ?? "",
      subtitle: data.hero?.subtitle ?? "",
      buttons: heroButtons,
      image: heroImage,
      reviews: heroReviews,
    },
    about: {
      enable: data.about?.enable ?? true,
      title: data.about?.title ?? "",
      subtitle: data.about?.subtitle ?? "",
      content: data.about?.content ?? "",
      schedule: aboutSchedule,
      button: aboutButton,
      badge: data.about?.badge ?? undefined,
      images: aboutImages,
    },
    responsibility: {
      enable: data.responsibility?.enable ?? true,
      title: data.responsibility?.title ?? "",
      subtitle: data.responsibility?.subtitle ?? "",
      content: data.responsibility?.content ?? "",
      image: respImage,
      video: {
        thumbnail: respThumb,
        url: data.responsibility?.video?.url ?? undefined,
      },
      job: respJobs,
    },
    customer: {
      enable: data.customer?.enable ?? true,
      title: {
        value: String(data.customer?.title?.value ?? ""),
        text: data.customer?.title?.text ?? "",
      },
      logo: customerLogos,
    },
    testimonial: {
      enable: data.testimonial?.enable ?? true,
      subtitle: data.testimonial?.subtitle ?? "",
      title: data.testimonial?.title ?? "",
      content: data.testimonial?.content ?? "",
      review: testimonialReviews,
    },
    blog: {
      enable: data.blog?.enable ?? true,
      title: data.blog?.title ?? "",
      subtitle: data.blog?.subtitle ?? "",
    },
  });

  console.log("  Done: homepage");
}

// ─── aboutPage ───────────────────────────────────────────────────────────────

async function migrateAboutPage() {
  console.log("Migrating aboutPage...");
  const data = readFrontmatter(path.join(CONTENT_DIR, "about/-index.md"));

  const whyUs = [];
  for (const item of data.why_us ?? []) {
    const img = item.image ? await uploadImage(item.image) : undefined;
    const overlayImg = item.overlay_image ? await uploadImage(item.overlay_image) : undefined;
    const btn = item.button
      ? {
          _type: "button",
          enable: item.button.enable ?? true,
          label: item.button.label ?? "",
          link: item.button.link ?? "",
        }
      : undefined;
    whyUs.push({
      _key: Math.random().toString(36).slice(2),
      title: item.title ?? "",
      content: item.content ?? undefined,
      subtitle: item.subtitle ?? undefined,
      button: btn,
      image: img,
      overlay_image: overlayImg,
      bullet_points: item.bullet_points ?? undefined,
    });
  }

  const prideImages = [];
  for (const imgPath of data.pride?.images ?? []) {
    const uploaded = await uploadImage(imgPath);
    if (uploaded) prideImages.push({ ...uploaded, _key: Math.random().toString(36).slice(2) });
  }

  const teamMembers = [];
  for (const member of data.team?.members ?? []) {
    const img = member.image ? await uploadImage(member.image) : undefined;
    teamMembers.push({
      _key: Math.random().toString(36).slice(2),
      name: member.name ?? "",
      designation: member.designation ?? "",
      image: img,
    });
  }

  await upsert({
    _id: "aboutPage",
    _type: "aboutPage",
    title: data.title ?? "",
    meta_title: data.meta_title ?? undefined,
    description: data.description ?? undefined,
    subtitle: data.subtitle ?? undefined,
    subheadline: data.subheadline ?? undefined,
    why_us: whyUs,
    pride: {
      title: data.pride?.title ?? "",
      subtitle: data.pride?.subtitle ?? "",
      content: data.pride?.content ?? "",
      images: prideImages,
    },
    team: {
      enable: data.team?.enable ?? false,
      title: data.team?.title ?? "",
      subtitle: data.team?.subtitle ?? "",
      members: teamMembers,
    },
  });

  console.log("  Done: aboutPage");
}

// ─── contactPage ─────────────────────────────────────────────────────────────

async function migrateContactPage() {
  console.log("Migrating contactPage...");
  const data = readFrontmatter(path.join(CONTENT_DIR, "contact/-index.md"));

  const image = data.image ? await uploadImage(data.image) : undefined;

  await upsert({
    _id: "contactPage",
    _type: "contactPage",
    title: data.title ?? "",
    subtitle: data.subtitle ?? undefined,
    meta_title: data.meta_title ?? undefined,
    description: data.description ?? undefined,
    image,
  });

  console.log("  Done: contactPage");
}

// ─── appointmentPage ─────────────────────────────────────────────────────────

async function migrateAppointmentPage() {
  console.log("Migrating appointmentPage...");
  const data = readFrontmatter(path.join(CONTENT_DIR, "appointment/-index.md"));

  const contactWay = (data.contact_way ?? []).map((item: any) => ({
    _key: Math.random().toString(36).slice(2),
    icon: item.icon ?? "",
    value: item.value ?? "",
  }));

  await upsert({
    _id: "appointmentPage",
    _type: "appointmentPage",
    title: data.title ?? "",
    subtitle: data.subtitle ?? undefined,
    meta_title: data.meta_title ?? undefined,
    description: data.description ?? undefined,
    contact_way: contactWay,
  });

  console.log("  Done: appointmentPage");
}

// ─── galleryPage ─────────────────────────────────────────────────────────────

async function migrateGalleryPage() {
  console.log("Migrating galleryPage...");
  const data = readFrontmatter(path.join(CONTENT_DIR, "gallery/-index.md"));

  const images = [];
  for (const item of data.images ?? []) {
    const uploaded = await uploadImage(item.image);
    images.push({
      _key: Math.random().toString(36).slice(2),
      image: uploaded,
      description: item.description ?? "",
    });
  }

  await upsert({
    _id: "galleryPage",
    _type: "galleryPage",
    title: data.title ?? "",
    subtitle: data.subtitle ?? undefined,
    meta_title: data.meta_title ?? undefined,
    description: data.description ?? undefined,
    images,
  });

  console.log("  Done: galleryPage");
}

// ─── callToAction ─────────────────────────────────────────────────────────────

async function migrateCallToAction() {
  console.log("Migrating callToAction...");
  const data = readFrontmatter(path.join(SECTIONS_DIR, "call-to-action.md"));

  const image = data.image ? await uploadImage(data.image) : undefined;

  const buttons = (data.buttons ?? []).map((b: any) => ({
    _type: "button",
    _key: Math.random().toString(36).slice(2),
    enable: b.enable ?? true,
    label: b.label ?? "",
    link: b.link ?? "",
    icon: b.icon ?? undefined,
  }));

  await upsert({
    _id: "callToAction",
    _type: "callToAction",
    enable: data.enable ?? true,
    title: data.title ?? "",
    subtitle: data.subtitle ?? undefined,
    content: data.content ?? undefined,
    image,
    buttons,
  });

  console.log("  Done: callToAction");
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== Singleton Migration ===\n");
  await migrateHomepage();
  await migrateAboutPage();
  await migrateContactPage();
  await migrateAppointmentPage();
  await migrateGalleryPage();
  await migrateCallToAction();
  console.log("\n=== All singletons migrated ===");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
