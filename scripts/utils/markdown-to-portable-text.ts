import { htmlToBlocks } from "@portabletext/block-tools";
import { Schema } from "@sanity/schema";
import { JSDOM } from "jsdom";
import { marked } from "marked";

const defaultSchema = Schema.compile({
  name: "default",
  types: [
    {
      type: "document",
      name: "post",
      fields: [{ name: "body", type: "array", of: [{ type: "block" }] }],
    },
  ],
});

const blockContentType = defaultSchema
  .get("post")
  .fields.find((f: any) => f.name === "body").type;

export function markdownToPortableText(markdown: string): any[] {
  if (!markdown || !markdown.trim()) return [];
  const html = marked.parse(markdown, { async: false }) as string;
  const blocks = htmlToBlocks(html, blockContentType, {
    parseHtml: (htmlStr) => new JSDOM(htmlStr).window.document,
  });
  return blocks;
}
