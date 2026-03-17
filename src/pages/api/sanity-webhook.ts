export const prerender = false;
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.SANITY_REVALIDATE_SECRET;

  // Verify webhook secret if configured
  if (secret) {
    const authHeader = request.headers.get("sanity-webhook-secret");
    if (authHeader !== secret) {
      return new Response(JSON.stringify({ message: "Invalid secret" }), {
        status: 401,
      });
    }
  }

  // Parse the webhook body to log what changed
  try {
    const body = await request.json();
    console.log(
      `[sanity-webhook] ${body._type} ${body.slug?.current || body._id} was ${body.transition || "updated"}`,
    );
  } catch {
    // Body parsing is optional — the rebuild is what matters
  }

  // For Astro SSG, content changes require a full rebuild.
  // The primary mechanism is Sanity → Vercel Deploy Hook (configured in Sanity dashboard).
  // This endpoint exists as a secondary logging/validation layer.
  return new Response(
    JSON.stringify({ revalidated: true, now: Date.now() }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};
