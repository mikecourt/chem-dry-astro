import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || "mi2de5uc",
  dataset: import.meta.env.SANITY_DATASET || "production",
  apiVersion: "2026-03-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Fetch from Sanity with error handling and logging.
 * Returns null on failure instead of crashing the build.
 */
export async function safeFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (err: any) {
    console.error(
      `[sanity] GROQ query failed: ${err.message}\n  Query: ${query.slice(0, 100)}...`
    );
    return null;
  }
}
