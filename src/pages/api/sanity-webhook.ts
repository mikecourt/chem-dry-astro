export const prerender = false;
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.SANITY_REVALIDATE_SECRET;

  // Verify webhook secret
  if (secret) {
    const authHeader = request.headers.get("sanity-webhook-secret");
    if (authHeader !== secret) {
      return new Response(JSON.stringify({ message: "Invalid secret" }), {
        status: 401,
      });
    }
  }

  // Parse the webhook body to log what changed
  let docType = "unknown";
  let docId = "unknown";
  try {
    const body = await request.json();
    docType = body._type || "unknown";
    docId = body.slug?.current || body._id || "unknown";
    console.log(
      `[sanity-webhook] ${docType} ${docId} was ${body.transition || "updated"}`,
    );
  } catch {
    // Body parsing is optional — the rebuild is what matters
  }

  // Trigger Vercel rebuild via Deploy Hook
  const deployHookUrl = import.meta.env.VERCEL_DEPLOY_HOOK_URL;
  if (deployHookUrl) {
    try {
      const res = await fetch(deployHookUrl, { method: "POST" });
      if (!res.ok) {
        console.error(`[sanity-webhook] Deploy hook failed: ${res.status}`);
        return new Response(
          JSON.stringify({ revalidated: false, error: "Deploy hook failed" }),
          { status: 502, headers: { "Content-Type": "application/json" } },
        );
      }
      console.log(`[sanity-webhook] Deploy triggered for ${docType}/${docId}`);
    } catch (err) {
      console.error(`[sanity-webhook] Deploy hook error:`, err);
      return new Response(
        JSON.stringify({ revalidated: false, error: "Deploy hook unreachable" }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }
  } else {
    console.warn("[sanity-webhook] No VERCEL_DEPLOY_HOOK_URL configured");
  }

  return new Response(
    JSON.stringify({ revalidated: true, now: Date.now() }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};
