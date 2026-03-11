#!/usr/bin/env node
/**
 * wp-to-astro.js
 * Converts a WordPress XML export into Astro-compatible markdown files.
 *
 * Usage:
 *   node tools/wp-to-astro.js <export.xml> [output-dir]
 *
 * Output dir defaults to src/content/blog/
 * Creates one .md file per published post with correct Astro frontmatter.
 * Images referenced in post content are logged to images-to-download.txt.
 */

const fs = require("fs");
const path = require("path");
const { DOMParser } = require("@xmldom/xmldom");

const [, , inputFile, outputDir = "src/content/blog"] = process.argv;

if (!inputFile) {
  console.error("Usage: node tools/wp-to-astro.js <export.xml> [output-dir]");
  process.exit(1);
}

const xml = fs.readFileSync(inputFile, "utf-8");
const doc = new DOMParser().parseFromString(xml, "text/xml");
const items = doc.getElementsByTagName("item");

fs.mkdirSync(outputDir, { recursive: true });

const imagesToDownload = [];
let exportedCount = 0;
let skippedCount = 0;

for (let i = 0; i < items.length; i++) {
  const item = items[i];

  // Only process posts (not pages, attachments, etc.)
  const postType = getText(item, "wp:post_type");
  if (postType !== "post") continue;

  // Only published posts
  const status = getText(item, "wp:status");
  if (status !== "publish") {
    skippedCount++;
    continue;
  }

  const title = getText(item, "title") || "Untitled";
  const slug = getText(item, "wp:post_name") || slugify(title);
  const dateStr = getText(item, "pubDate") || getText(item, "wp:post_date");
  const date = parseDate(dateStr);
  const content = getContent(item);
  const excerpt = getText(item, "excerpt:encoded") || "";

  // Extract categories
  const categories = [];
  const catElements = item.getElementsByTagName("category");
  for (let j = 0; j < catElements.length; j++) {
    const domain = catElements[j].getAttribute("domain");
    if (domain === "category") {
      categories.push(catElements[j].textContent.trim());
    }
  }
  if (categories.length === 0) categories.push("Carpet Cleaning");

  // Extract featured image (if any)
  // WP stores featured images as attachment meta — use first <img> in content as fallback
  const featuredImageUrl = extractFirstImage(content);
  const imagePath = featuredImageUrl
    ? `/images/blog/${slug}${path.extname(new URL(featuredImageUrl).pathname) || ".webp"}`
    : `/images/blog/${slug}.webp`;

  if (featuredImageUrl) {
    imagesToDownload.push({ url: featuredImageUrl, dest: `public${imagePath}` });
  }

  // Clean content for markdown
  const markdownContent = htmlToMarkdown(content);

  // Build frontmatter
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `meta_title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(truncate(excerpt || markdownContent, 155))}`,
    `date: ${date}`,
    `image: ${JSON.stringify(imagePath)}`,
    `categories: ${JSON.stringify(categories)}`,
    `draft: false`,
    "---",
    "",
  ].join("\n");

  const outputFile = path.join(outputDir, `${slug}.md`);
  fs.writeFileSync(outputFile, frontmatter + markdownContent);
  console.log(`✓ ${slug}.md`);
  exportedCount++;
}

// Write image download list
if (imagesToDownload.length > 0) {
  const lines = imagesToDownload.map(({ url, dest }) => `${url} -> ${dest}`);
  fs.writeFileSync("tools/images-to-download.txt", lines.join("\n") + "\n");
  console.log(`\n📸 ${imagesToDownload.length} images to download: tools/images-to-download.txt`);
}

console.log(`\n✅ Done. Exported: ${exportedCount}, Skipped (non-published): ${skippedCount}`);
console.log(`\nNext steps:`);
console.log(`  1. Download images listed in tools/images-to-download.txt`);
console.log(`  2. Review generated .md files for any HTML artifacts`);
console.log(`  3. Delete placeholder posts: blog-1.md through blog-6.md`);
console.log(`  4. git add src/content/blog/ public/images/blog/ && git commit -m "feat: import WordPress blog posts"`);

// --- Helpers ---

function getText(node, tagName) {
  const el = node.getElementsByTagName(tagName)[0];
  if (!el) return "";
  // Handle CDATA sections
  for (let i = 0; i < el.childNodes.length; i++) {
    const child = el.childNodes[i];
    if (child.nodeType === 4 /* CDATA_SECTION_NODE */ || child.nodeType === 3 /* TEXT_NODE */) {
      return child.data || child.nodeValue || "";
    }
  }
  return el.textContent || "";
}

function getContent(item) {
  return getText(item, "content:encoded");
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseDate(dateStr) {
  if (!dateStr) return new Date().toISOString();
  try {
    return new Date(dateStr).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function truncate(text, maxLen) {
  const plain = text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return plain.length > maxLen ? plain.slice(0, maxLen - 3) + "..." : plain;
}

function extractFirstImage(html) {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function htmlToMarkdown(html) {
  // Basic HTML → Markdown conversion
  // For production, consider using turndown (npm install turndown)
  return html
    // Headings
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n")
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n\n")
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n\n")
    // Bold / italic
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
    // Links
    .replace(/<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    // Images — note the src for download list
    .replace(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/gi, "![$2]($1)")
    .replace(/<img[^>]+src=["']([^"']+)["'][^>]*\/?>/gi, "![]($1)")
    // Lists
    .replace(/<ul[^>]*>/gi, "\n")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<ol[^>]*>/gi, "\n")
    .replace(/<\/ol>/gi, "\n")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    // Paragraphs and line breaks
    .replace(/<p[^>]*>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    // Blockquotes
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, "> $1\n\n")
    // Strip remaining HTML tags
    .replace(/<[^>]+>/g, "")
    // Fix HTML entities
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    // Collapse excess blank lines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
