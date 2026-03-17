import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(import.meta.dirname || __dirname, "../../.env") });

export const writeClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2026-03-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});
