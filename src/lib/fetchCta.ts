import { sanityClient } from "./sanity";

/**
 * Fetch the Call-to-Action section from Sanity.
 * Returns the CTA data or a sensible default if Sanity is unreachable.
 */
export async function fetchCta() {
  try {
    const cta = await sanityClient.fetch(`*[_type == "callToAction"][0]`);
    if (cta) return cta;
  } catch (err) {
    console.warn("[fetchCta] Sanity fetch failed, using default CTA");
  }

  // Default fallback
  return {
    enable: true,
    title: 'Ready to Experience the "White Glove" Difference?',
    subtitle: "Free estimate",
    content:
      "See for yourself why your neighbors have trusted Brimley's White Glove Chem-Dry for over 30 years.",
    buttons: [
      { enable: true, label: "(480) 649-3663", link: "tel:4806493663", icon: "FaPhone" },
      {
        enable: true,
        label: "Text Us Now",
        link: "sms:+14806493663?body=Hi%20Brimley's!%20I'd%20like%20a%20free%20estimate.",
        icon: "FaCommentSms",
      },
    ],
  };
}
