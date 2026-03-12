export const prerender = false;
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  // Validate env vars are configured
  const GHL_TOKEN = import.meta.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const GHL_LOCATION = import.meta.env.GHL_LOCATION_ID;

  if (!GHL_TOKEN || !GHL_LOCATION) {
    console.error("GHL env vars missing — GHL_PRIVATE_INTEGRATION_TOKEN:", !!GHL_TOKEN, "GHL_LOCATION_ID:", !!GHL_LOCATION);
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await request.formData();

  // Parse name into first/last
  const fullName = data.get("name")?.toString().trim() || "";
  const nameParts = fullName.split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Clean phone number — strip non-digits, then normalize to +1XXXXXXXXXX
  const rawPhone = data.get("phone")?.toString() || "";
  let cleanPhone = rawPhone.replace(/\D/g, "");
  // If they entered the country code (11 digits starting with 1), strip it
  if (cleanPhone.length === 11 && cleanPhone.startsWith("1")) {
    cleanPhone = cleanPhone.slice(1);
  }

  const servicesRequested = data.get("services")?.toString() || "";

  const contact: Record<string, unknown> = {
    name: fullName,
    firstName,
    lastName,
    email: data.get("email")?.toString() || "",
    phone: cleanPhone ? `+1${cleanPhone}` : "",
    postalCode: data.get("zipcode")?.toString() || "",
    locationId: GHL_LOCATION,
    source: "Website Quote Form",
    tags: ["website-lead", "quote-request"],
  };

  // Only include customFields if we have a services value to send
  if (servicesRequested) {
    contact.customFields = [
      {
        key: "services_requested",
        field_value: servicesRequested,
      },
    ];
  }

  try {
    const response = await fetch(
      "https://services.leadconnectorhq.com/contacts/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_TOKEN}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify(contact),
      }
    );

    const responseBody = await response.text();
    let responseData: Record<string, unknown> = {};
    try {
      responseData = JSON.parse(responseBody);
    } catch {
      // response wasn't JSON
    }

    if (response.ok) {
      console.log("GHL contact created:", responseData.contactId || "ok");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Handle duplicate contact as success — contact already exists in CRM
    if (
      response.status === 400 &&
      responseBody.includes("duplicated contacts")
    ) {
      console.log("Duplicate contact detected, treating as success:", responseData.meta);
      return new Response(JSON.stringify({ success: true, duplicate: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Log the full error for debugging in Vercel logs
    console.error("GHL API error —", response.status, response.statusText, responseBody);
    return new Response(JSON.stringify({ error: "Failed to submit" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GHL network/fetch error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
