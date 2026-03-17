import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import * as schemas from "./schemas";

export default defineConfig({
  name: "chem-dry",
  title: "Chem-Dry CMS",
  projectId: "mi2de5uc",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: Object.values(schemas) },
});
