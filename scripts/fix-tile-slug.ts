import "dotenv/config";
import { createClient } from "@sanity/client";

const c = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2026-03-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

async function run() {
  const doc = await c.fetch(
    `*[_type == "service" && slug.current == "tile-grout-cleaning"][0]{ _id }`
  );
  if (!doc) {
    console.log("Not found");
    return;
  }
  await c
    .patch(doc._id)
    .set({
      heroEyebrow: "Tile & Grout Cleaning",
      heroHeading: "Restore Your Tile to **Like-New** Condition",
      heroSubheading:
        "Professional tile, grout, and stone cleaning and sealing for Phoenix & Mesa homes.",
      trustBadges: [
        { _type: "object", _key: "tb1", emoji: "\u2728", title: "Deep-Clean Extraction", subtitle: "Gets into grout lines other methods miss" },
        { _type: "object", _key: "tb2", emoji: "\ud83e\uddea", title: "Kills 99% of Bacteria", subtitle: "Hospital-grade sanitization" },
        { _type: "object", _key: "tb3", emoji: "\ud83d\udee1\ufe0f", title: "Seal & Protect", subtitle: "Grout sealing keeps floors cleaner longer" },
        { _type: "object", _key: "tb4", emoji: "\ud83c\udfc6", title: "30+ Years Experience", subtitle: "Phoenix's trusted tile cleaning experts" },
      ],
      serviceTimeline: [
        { _type: "object", _key: "st1", title: "Before We Arrive", items: ["Walkthrough call to discuss your tile concerns", "Clear upfront pricing with no hidden fees", "Scheduling that fits your life"] },
        { _type: "object", _key: "st2", title: "During Your Service", items: ["Inspect all tile and grout for damage", "Apply deep-cleaning solution to break down grime", "High-pressure extraction to remove embedded dirt", "Optional grout sealing for long-lasting protection", "Final inspection with you"] },
        { _type: "object", _key: "st3", title: "After We Leave", items: ["Tile care guide for maintaining your floors", "Follow-up to ensure satisfaction", "Satisfaction guarantee on all work"] },
      ],
      pageTestimonials: [
        { _type: "object", _key: "pt1", quote: "Our kitchen tile hadn't been deep-cleaned in years. Brimley's made it look brand new. The grout went from dark brown back to white. Amazing transformation!", author: "Jennifer M.", location: "Scottsdale, AZ", rating: 5 },
        { _type: "object", _key: "pt2", quote: "I was about to replace my tile because it looked so bad. Brimley's saved me thousands. The sealing they did has kept it looking great for months.", author: "David P.", location: "Mesa, AZ", rating: 5 },
        { _type: "object", _key: "pt3", quote: "Professional, on time, and the results speak for themselves. Our bathroom tile sparkles. Highly recommend their tile and grout service.", author: "Maria L.", location: "Chandler, AZ", rating: 5 },
      ],
      relatedServices: [
        { _type: "object", _key: "rs1", emoji: "\ud83e\uddf9", heading: "Dirty Carpets?", serviceTitle: "Carpet Cleaning", description: "Our Hot Carbonating Extraction process uses about 80% less water and dries in 1-2 hours.", link: "/services/carpet-cleaning" },
        { _type: "object", _key: "rs2", emoji: "\ud83e\udea8", heading: "Natural Stone?", serviceTitle: "Stone & Tile Cleaning", description: "Specialized care for granite, marble, travertine, and other natural stone surfaces.", link: "/services/stone-tile-cleaning-polishing" },
        { _type: "object", _key: "rs3", emoji: "\ud83d\udecb\ufe0f", heading: "Upholstery?", serviceTitle: "Upholstery Cleaning", description: "The same gentle process works beautifully on sofas, chairs, and other fabric surfaces.", link: "/services/upholstery-cleaning" },
      ],
      faqItems: [
        { _type: "object", _key: "fq1", question: "How long does tile and grout cleaning take?", answer: "Most rooms take 30-60 minutes depending on size and condition. A typical home with kitchen, bathrooms, and entryway takes 2-4 hours total." },
        { _type: "object", _key: "fq2", question: "Do you seal the grout after cleaning?", answer: "We offer optional grout sealing as an add-on service. Sealing protects grout from future staining and makes regular cleaning much easier." },
        { _type: "object", _key: "fq3", question: "Is your process safe for all tile types?", answer: "Yes. We adjust our cleaning approach based on your tile type \u2014 ceramic, porcelain, natural stone, or saltillo." },
        { _type: "object", _key: "fq4", question: "How often should tile and grout be professionally cleaned?", answer: "We recommend professional cleaning every 12-18 months for most homes. High-traffic areas may benefit from annual cleaning." },
        { _type: "object", _key: "fq5", question: "Can you fix cracked or damaged grout?", answer: "We focus on cleaning and sealing. For grout repair or re-grouting, we can recommend trusted local specialists." },
        { _type: "object", _key: "fq6", question: "What areas do you serve?", answer: "We serve the entire Phoenix Metro area including Mesa, Gilbert, Chandler, Scottsdale, Tempe, and surrounding communities." },
      ],
    })
    .commit();
  console.log("\u2705 Migrated: tile-grout-cleaning");
}

run();
