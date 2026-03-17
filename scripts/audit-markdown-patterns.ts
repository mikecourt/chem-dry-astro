import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(import.meta.dirname || __dirname, "../src/content/blog");
const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("-"));

const patterns = {
  html: [] as string[],
  iframes: [] as string[],
  inlineImages: [] as string[],
  tables: [] as string[],
  codeBlocks: [] as string[],
};

for (const file of files) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  const { content } = matter(raw);

  if (/<[a-z][^>]*>/i.test(content)) patterns.html.push(file);
  if (/iframe/i.test(content)) patterns.iframes.push(file);
  if (/!\[.*\]\(.*\)/.test(content)) patterns.inlineImages.push(file);
  if (/\|.*\|.*\|/.test(content)) patterns.tables.push(file);
  if (/```/.test(content)) patterns.codeBlocks.push(file);
}

console.log("=== Blog Post Content Audit ===");
console.log(`Total files: ${files.length}`);
console.log(`HTML snippets: ${patterns.html.length}`);
console.log(`Iframes: ${patterns.iframes.length}`);
console.log(`Inline images: ${patterns.inlineImages.length}`);
console.log(`Tables: ${patterns.tables.length}`);
console.log(`Code blocks: ${patterns.codeBlocks.length}`);
if (patterns.html.length) console.log(`\nFiles with HTML:\n  ${patterns.html.join("\n  ")}`);
if (patterns.iframes.length) console.log(`\nFiles with iframes:\n  ${patterns.iframes.join("\n  ")}`);
