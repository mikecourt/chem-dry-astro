export const prerender = false;
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  // Parse name into first/last
  const fullName = data.get("name")?.toString() || "";
  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Clean phone number - GHL expects digits only, optionally with + prefix
  const rawPhone = data.get("phone")?.toString() || "";
  const cleanPhone = rawPhone.replace(/\D/g, ""); // Remove all non-digits

  const contact = {
    firstName,
    lastName,
    email: data.get("email")?.toString() || "",
    phone: cleanPhone ? `+1${cleanPhone}` : "",
    postalCode: data.get("zipcode")?.toString() || "",
    locationId: import.meta.env.GHL_LOCATION_ID,
    source: "Website Quote Form",
    tags: ["website-lead", "quote-request"],
    customFields: [
      {
        key: "services_requested",
        field_value: data.get("services")?.toString() || "",
      },
    ],
  };

  try {
    const response = await fetch(
      "https://services.leadconnectorhq.com/contacts/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.GHL_PRIVATE_INTEGRATION_TOKEN}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify(contact),
      }
    );

    if (response.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const errorData = await response.json();

    // Handle duplicate contact as success - contact already exists in CRM
    if (
      errorData.statusCode === 400 &&
      errorData.message?.includes("duplicated contacts")
    ) {
      console.log("Duplicate contact detected, treating as success:", errorData.meta?.contactId);
      return new Response(JSON.stringify({ success: true, duplicate: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error("GHL API error:", errorData);
    return new Response(JSON.stringify({ error: "Failed to submit" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
