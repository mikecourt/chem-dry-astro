import fs from "fs";
import path from "path";
import { writeClient } from "./utils/sanity-client";

const CONFIG_DIR = path.join(import.meta.dirname || __dirname, "../src/config");

function readJson(filename: string): any {
  const raw = fs.readFileSync(path.join(CONFIG_DIR, filename), "utf-8");
  return JSON.parse(raw);
}

async function migrateSiteConfig() {
  console.log("=== Site Config Migration ===\n");

  const config = readJson("config.json");
  const menuConfig = readJson("menu.json");
  const socialConfig = readJson("social.json");

  // Flatten main nav items — schema only supports one level of children
  const navigation = (menuConfig.main ?? []).map((item: any) => ({
    _key: Math.random().toString(36).slice(2),
    label: item.name ?? "",
    link: item.url ?? "",
    children: (item.children ?? []).map((child: any) => ({
      _key: Math.random().toString(36).slice(2),
      label: child.name ?? "",
      link: child.url ?? "",
    })),
  }));

  const socialLinks = (socialConfig.main ?? []).map((s: any) => ({
    _key: Math.random().toString(36).slice(2),
    platform: s.name ?? "",
    url: s.link ?? "",
    icon: s.icon ?? undefined,
  }));

  const doc = {
    _id: "siteConfig",
    _type: "siteConfig",
    title: config.site?.title ?? "",
    baseUrl: config.site?.base_url ?? undefined,
    phone: config.params?.phone ?? undefined,
    email: config.params?.email ?? undefined,
    address: config.params?.address ?? undefined,
    mailingAddress: config.params?.mailing_address ?? undefined,
    footerDescription: config.params?.footer_description ?? undefined,
    copyright: config.params?.copyright ?? undefined,
    gtmId: config.google_tag_manager?.enable ? config.google_tag_manager?.gtm_id : undefined,
    // logo and footerLogo are SVG paths — not uploaded as binary assets
    // Store as undefined; they can be uploaded manually via Studio
    navigation,
    socialLinks,
  };

  await writeClient.createOrReplace(doc);

  console.log("  Done: siteConfig");
  console.log("\n=== Site config migration complete ===");
}

migrateSiteConfig().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
