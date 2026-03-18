/**
 * Migrate structured service detail data to Sanity.
 * Patches existing service documents with hero, trust badges, FAQ, testimonials,
 * related services, and timeline data extracted from hardcoded .astro pages.
 *
 * Usage: npx tsx scripts/migrate-service-details.ts
 */
import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2026-03-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

interface ServiceDetailData {
  slug: string;
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  trustBadges: Array<{ emoji: string; title: string; subtitle: string }>;
  serviceTimeline: Array<{ title: string; items: string[] }>;
  pageTestimonials: Array<{
    quote: string;
    author: string;
    location: string;
    rating: number;
  }>;
  relatedServices: Array<{
    emoji: string;
    heading: string;
    serviceTitle: string;
    description: string;
    link: string;
  }>;
  faqItems: Array<{ question: string; answer: string }>;
}

const serviceDetails: ServiceDetailData[] = [
  {
    slug: "carpet-cleaning",
    heroEyebrow: "Carpet Cleaning",
    heroHeading:
      "A **Deeper**, Drier, Healthier Carpet Cleaning for Phoenix & Mesa",
    heroSubheading:
      "Our Hot Carbonating Extraction process dries in 1-2 hours \u2014 no harsh chemicals, soaps, or fragrances.",
    trustBadges: [
      {
        emoji: "\ud83d\udca7",
        title: "80% Less Water Used",
        subtitle: "Carpets dry faster with our carbonation method",
      },
      {
        emoji: "\ud83c\udf3f",
        title: "The Natural\u00ae Solution",
        subtitle: "No harsh chemicals, soaps, or fragrances",
      },
      {
        emoji: "\u2728",
        title: "Removes 98% of Common Household Allergens*",
        subtitle: "Healthier air quality after every cleaning",
      },
      {
        emoji: "\ud83c\udfc6",
        title: "Industry-Leading Results",
        subtitle: "Deep-clean extraction that lasts longer",
      },
    ],
    serviceTimeline: [
      {
        title: "Before We Arrive",
        items: [
          "Confirmation call to review your needs and answer questions",
          "Clear communication about pricing and what to expect",
          "Flexible scheduling that works around your busy life",
        ],
      },
      {
        title: "During Your Service",
        items: [
          "Uniformed, professional technicians arrive on time",
          "Complete walk-through to understand your concerns",
          "Protective booties, corner guards, and floor protection",
          "Pre-treatment of high-traffic areas and stains",
          "Thorough Hot Carbonating Extraction cleaning",
          "Post-cleaning inspection with you to ensure satisfaction",
        ],
      },
      {
        title: "After We Leave",
        items: [
          "Care instructions for maintaining your clean carpets",
          "Stain removal guide for future reference",
          "Follow-up call to ensure you're completely satisfied",
          "Satisfaction guarantee\u2014if you're not happy, we'll make it right",
        ],
      },
    ],
    pageTestimonials: [
      {
        quote:
          "I was skeptical about the 1-2 hour dry time, but they weren't kidding. My carpets were dry before bedtime, and they look brand new. Alex was so professional and respectful of our home. Highly recommend!",
        author: "Sarah K.",
        location: "Mesa, AZ",
        rating: 5,
      },
      {
        quote:
          "We have three dogs and a toddler, so our carpets take a beating. Brimley's got out stains I thought were permanent. The best part? No chemical smell and everything dried so fast the kids could play on the floor that same evening.",
        author: "Michael R.",
        location: "Gilbert, AZ",
        rating: 5,
      },
      {
        quote:
          "After years of using steam cleaners, I finally understand what 'clean' really means. Our carpets haven't gotten dirty nearly as fast, and my allergies are so much better. Worth every penny.",
        author: "Lisa T.",
        location: "Chandler, AZ",
        rating: 5,
      },
    ],
    relatedServices: [
      {
        emoji: "\ud83d\udc3e",
        heading: "Have Pets?",
        serviceTitle: "Pet Urine Removal Treatment (P.U.R.T.\u00ae)",
        description:
          "Traditional cleaners mask pet odors. Our P.U.R.T.\u00ae treatment uses advanced chemistry to destroy urine crystals at their source, eliminating odors permanently\u2014not just covering them up.",
        link: "/services/pet-urine-removal",
      },
      {
        emoji: "\ud83d\udecb\ufe0f",
        heading: "Dirty Upholstery?",
        serviceTitle: "Upholstery Cleaning",
        description:
          "The same gentle, effective Hot Carbonating Extraction process works beautifully on sofas, chairs, and other upholstery. Remove years of body oils, dust, and allergens while protecting your furniture investment.",
        link: "/services/upholstery-cleaning",
      },
      {
        emoji: "\u2728",
        heading: "Grimy Tile & Grout?",
        serviceTitle: "Tile, Stone & Grout Cleaning",
        description:
          "Restore the shine to your tile floors and eliminate the bacteria hiding in grout lines. Our specialized cleaning and sealing process makes tile look like new and stay cleaner longer.",
        link: "/services/tile-and-grout-cleaning",
      },
    ],
    faqItems: [
      {
        question: "How long does it really take to dry?",
        answer:
          "Most carpets are dry and ready for normal foot traffic in just 1-2 hours. That's about 80% faster than steam cleaning. Heavier-traffic areas or thicker carpets may take 3-4 hours, but you'll never wait 1-2 days like with traditional methods.",
      },
      {
        question: "Do I need to move my furniture?",
        answer:
          "We recommend moving small items, valuables, and breakables before we arrive. We'll move most furniture (sofas, chairs, tables, beds) and clean underneath, then place everything back on protective tabs to prevent moisture transfer while your carpets finish drying.",
      },
      {
        question:
          "Is the Chem-Dry process gentle enough for homes with kids and pets?",
        answer:
          "Absolutely. The Natural\u00ae, our primary cleaning solution, contains no soaps, harsh chemicals, or fragrances. You can feel confident it's gentle enough for your entire family\u2014even crawling babies and curious pets.",
      },
      {
        question: "How often should I get my carpets professionally cleaned?",
        answer:
          "Most carpet manufacturers recommend professional cleaning every 12-18 months to maintain your warranty and extend carpet life. For homes with pets, children, or allergy sufferers, we recommend cleaning every 6-9 months.",
      },
      {
        question:
          "What about tough stains\u2014can you really get them out?",
        answer:
          "While we can't guarantee removal of every stain (some substances permanently dye carpet fibers), the process used by Chem-Dry removes most common stains effectively. We pre-treat problem areas with specialized products. If we can't remove it, we'll be honest with you.",
      },
      {
        question: "Do you offer a satisfaction guarantee?",
        answer:
          "Yes. If you're not completely satisfied with our cleaning, let us know within 30 days and we'll return to re-clean any areas of concern at no charge.",
      },
      {
        question: "What areas do you serve?",
        answer:
          "We proudly serve the entire Phoenix Metro area, including Mesa, Gilbert, Chandler, Scottsdale, Tempe, Queen Creek, Apache Junction, San Tan Valley, and surrounding communities.",
      },
      {
        question: "How much does carpet cleaning cost?",
        answer:
          "Every home is unique, which is why we provide free, no-obligation estimates. Pricing depends on the square footage, carpet condition, and any special treatments needed. We'll give you a clear, honest price before we start.",
      },
    ],
  },
  // ── Tile & Grout ──
  {
    slug: "tile-and-grout-cleaning",
    heroEyebrow: "Tile & Grout Cleaning",
    heroHeading:
      "Restore Your Tile to **Like-New** Condition",
    heroSubheading:
      "Professional tile, grout, and stone cleaning and sealing for Phoenix & Mesa homes.",
    trustBadges: [
      { emoji: "\u2728", title: "Deep-Clean Extraction", subtitle: "Gets into grout lines other methods miss" },
      { emoji: "\ud83e\uddea", title: "Kills 99% of Bacteria", subtitle: "Hospital-grade sanitization" },
      { emoji: "\ud83d\udee1\ufe0f", title: "Seal & Protect", subtitle: "Grout sealing keeps floors cleaner longer" },
      { emoji: "\ud83c\udfc6", title: "30+ Years Experience", subtitle: "Phoenix's trusted tile cleaning experts" },
    ],
    serviceTimeline: [
      { title: "Before We Arrive", items: ["Walkthrough call to discuss your tile concerns", "Clear upfront pricing with no hidden fees", "Scheduling that fits your life"] },
      { title: "During Your Service", items: ["Inspect all tile and grout for damage", "Apply deep-cleaning solution to break down grime", "High-pressure extraction to remove embedded dirt", "Optional grout sealing for long-lasting protection", "Final inspection with you"] },
      { title: "After We Leave", items: ["Tile care guide for maintaining your floors", "Follow-up to ensure satisfaction", "Satisfaction guarantee on all work"] },
    ],
    pageTestimonials: [
      { quote: "Our kitchen tile hadn't been deep-cleaned in years. Brimley's made it look brand new. The grout went from dark brown back to white. Amazing transformation!", author: "Jennifer M.", location: "Scottsdale, AZ", rating: 5 },
      { quote: "I was about to replace my tile because it looked so bad. Brimley's saved me thousands. The sealing they did has kept it looking great for months.", author: "David P.", location: "Mesa, AZ", rating: 5 },
      { quote: "Professional, on time, and the results speak for themselves. Our bathroom tile sparkles. Highly recommend their tile and grout service.", author: "Maria L.", location: "Chandler, AZ", rating: 5 },
    ],
    relatedServices: [
      { emoji: "\ud83e\uddf9", heading: "Dirty Carpets?", serviceTitle: "Carpet Cleaning", description: "Our Hot Carbonating Extraction process uses about 80% less water and dries in 1-2 hours.", link: "/services/carpet-cleaning" },
      { emoji: "\ud83e\udea8", heading: "Natural Stone?", serviceTitle: "Stone & Tile Cleaning", description: "Specialized care for granite, marble, travertine, and other natural stone surfaces.", link: "/services/stone-tile-cleaning-polishing" },
      { emoji: "\ud83d\udecb\ufe0f", heading: "Upholstery?", serviceTitle: "Upholstery Cleaning", description: "The same gentle process works beautifully on sofas, chairs, and other fabric surfaces.", link: "/services/upholstery-cleaning" },
    ],
    faqItems: [
      { question: "How long does tile and grout cleaning take?", answer: "Most rooms take 30-60 minutes depending on size and condition. A typical home with kitchen, bathrooms, and entryway takes 2-4 hours total." },
      { question: "Do you seal the grout after cleaning?", answer: "We offer optional grout sealing as an add-on service. Sealing protects grout from future staining and makes regular cleaning much easier. We recommend it for high-traffic areas." },
      { question: "Is your process safe for all tile types?", answer: "Yes. We adjust our cleaning approach based on your tile type \u2014 ceramic, porcelain, natural stone, or saltillo. Each gets the right treatment for the best results without damage." },
      { question: "How often should tile and grout be professionally cleaned?", answer: "We recommend professional cleaning every 12-18 months for most homes. High-traffic areas like kitchens and bathrooms may benefit from annual cleaning." },
      { question: "Can you fix cracked or damaged grout?", answer: "We focus on cleaning and sealing. For grout repair or re-grouting, we can recommend trusted local specialists." },
      { question: "What areas do you serve?", answer: "We serve the entire Phoenix Metro area including Mesa, Gilbert, Chandler, Scottsdale, Tempe, and surrounding communities." },
    ],
  },
  // ── Upholstery ──
  {
    slug: "upholstery-cleaning",
    heroEyebrow: "Upholstery Cleaning",
    heroHeading: "Revive Your Furniture with a **Deeper**, Gentler Clean",
    heroSubheading: "Safe for all fabrics. Dries in hours, not days. No harsh chemicals.",
    trustBadges: [
      { emoji: "\ud83d\udecb\ufe0f", title: "Safe for All Fabrics", subtitle: "Cotton, microfiber, linen, velvet & more" },
      { emoji: "\ud83d\udca7", title: "80% Less Water", subtitle: "Furniture dries in hours, not days" },
      { emoji: "\ud83c\udf3f", title: "No Harsh Chemicals", subtitle: "The Natural\u00ae is gentle on your family" },
      { emoji: "\u2728", title: "Removes 98% Allergens*", subtitle: "Healthier home for kids & pets" },
    ],
    serviceTimeline: [
      { title: "Before We Arrive", items: ["Confirm furniture types and any stain concerns", "Clear pricing with no surprises", "Scheduling around your availability"] },
      { title: "During Your Service", items: ["Inspect fabric type and condition", "Pre-treat stains and high-use areas", "Hot Carbonating Extraction cleaning", "Post-cleaning inspection with you"] },
      { title: "After We Leave", items: ["Fabric care tips for maintaining freshness", "Follow-up satisfaction call", "30-day satisfaction guarantee"] },
    ],
    pageTestimonials: [
      { quote: "Our sofa looked 10 years old. After Brimley's cleaned it, it looked brand new. The kids' juice stains are completely gone.", author: "Amanda S.", location: "Gilbert, AZ", rating: 5 },
      { quote: "I was worried about my velvet chairs, but they were so careful and the results are perfect. No water damage, no chemical smell.", author: "Robert H.", location: "Scottsdale, AZ", rating: 5 },
      { quote: "Best upholstery cleaning we've ever had. Fast, professional, and our furniture dried in about 2 hours. Will use again.", author: "Karen W.", location: "Tempe, AZ", rating: 5 },
    ],
    relatedServices: [
      { emoji: "\ud83e\uddf9", heading: "Dirty Carpets?", serviceTitle: "Carpet Cleaning", description: "Our signature Hot Carbonating Extraction for carpets \u2014 dries in 1-2 hours with no residue.", link: "/services/carpet-cleaning" },
      { emoji: "\ud83d\udc3e", heading: "Pet Stains?", serviceTitle: "Pet Urine Removal (P.U.R.T.\u00ae)", description: "Eliminate pet odors at their source with our specialized treatment.", link: "/services/pet-urine-removal" },
      { emoji: "\ud83e\udea8", heading: "Leather Furniture?", serviceTitle: "Leather Cleaning", description: "Specialized care for leather sofas, chairs, and ottomans.", link: "/services/leather-cleaning" },
    ],
    faqItems: [
      { question: "Is your process safe for all upholstery fabrics?", answer: "Yes. We test a small hidden area first and adjust our approach for each fabric type. We clean cotton, microfiber, linen, velvet, synthetic blends, and more." },
      { question: "How long does upholstery take to dry?", answer: "Most furniture dries in 2-4 hours thanks to our low-moisture process. Much faster than traditional steam cleaning." },
      { question: "Can you remove pet stains from upholstery?", answer: "We can remove most pet stains and odors. For severe urine contamination, we may recommend our P.U.R.T.\u00ae treatment for complete odor elimination." },
      { question: "How much does upholstery cleaning cost?", answer: "Pricing depends on the furniture type, size, and condition. We provide free estimates before starting any work." },
      { question: "Do you clean leather furniture too?", answer: "We offer a separate leather cleaning and conditioning service. Leather requires different products and techniques than fabric upholstery." },
      { question: "How often should upholstery be professionally cleaned?", answer: "We recommend every 12-24 months for most furniture, or every 6-12 months if you have pets or allergies." },
    ],
  },
  // ── Stone & Tile ──
  {
    slug: "stone-tile-cleaning-polishing",
    heroEyebrow: "Stone & Tile Care",
    heroHeading: "Expert Care for Your **Natural Stone** Surfaces",
    heroSubheading: "Granite, marble, travertine, slate \u2014 we know how to clean and protect every stone type.",
    trustBadges: [
      { emoji: "\ud83e\udea8", title: "All Stone Types", subtitle: "Granite, marble, travertine, slate & more" },
      { emoji: "\u2728", title: "Deep Clean + Seal", subtitle: "Restore and protect in one visit" },
      { emoji: "\ud83d\udee1\ufe0f", title: "Damage-Free Process", subtitle: "pH-balanced for natural stone safety" },
      { emoji: "\ud83c\udfc6", title: "30+ Years Experience", subtitle: "Phoenix's stone care specialists" },
    ],
    serviceTimeline: [
      { title: "Before We Arrive", items: ["Discuss stone types and specific concerns", "Provide detailed estimate", "Schedule at your convenience"] },
      { title: "During Your Service", items: ["Full inspection of all stone surfaces", "pH-balanced deep cleaning", "Diamond polishing (if requested)", "Professional-grade sealing", "Final walkthrough with you"] },
      { title: "After We Leave", items: ["Stone care guide customized to your surfaces", "Follow-up satisfaction check", "Satisfaction guarantee on all work"] },
    ],
    pageTestimonials: [
      { quote: "Our travertine floors looked dull and lifeless. After Brimley's cleaned and sealed them, they look like the day they were installed. Incredible work.", author: "Patricia D.", location: "Paradise Valley, AZ", rating: 5 },
      { quote: "I was nervous about having someone work on our marble countertops, but they were extremely careful and knowledgeable. Beautiful results.", author: "Thomas G.", location: "Scottsdale, AZ", rating: 5 },
      { quote: "The team restored our slate entryway beautifully. Professional, respectful, and the results exceeded expectations.", author: "Nancy K.", location: "Mesa, AZ", rating: 5 },
    ],
    relatedServices: [
      { emoji: "\u2728", heading: "Tile Floors?", serviceTitle: "Tile & Grout Cleaning", description: "Deep clean and seal your tile and grout for a like-new appearance.", link: "/services/tile-and-grout-cleaning" },
      { emoji: "\ud83d\udc8e", heading: "Granite Countertops?", serviceTitle: "Granite Countertop Renewal", description: "Specialized restoration and sealing for granite kitchen and bath countertops.", link: "/services/granite-countertop-renewal" },
      { emoji: "\ud83e\uddf9", heading: "Carpets Too?", serviceTitle: "Carpet Cleaning", description: "Our signature carbonating process for deep, residue-free carpet cleaning.", link: "/services/carpet-cleaning" },
    ],
    faqItems: [
      { question: "What types of stone do you clean?", answer: "We clean and seal all natural stone: granite, marble, travertine, slate, limestone, sandstone, and quartzite. Each stone type gets customized treatment." },
      { question: "Do you polish stone surfaces?", answer: "Yes. We offer diamond polishing for marble, travertine, and other polish-able stones to restore the original shine." },
      { question: "How often should natural stone be sealed?", answer: "Most natural stone should be sealed every 1-3 years depending on usage and stone type. We can test your current seal and recommend a schedule." },
      { question: "Is your cleaning process safe for natural stone?", answer: "Absolutely. We use pH-balanced, stone-safe products. No acidic cleaners that can etch marble or damage sensitive stones." },
      { question: "Can you remove stains from natural stone?", answer: "We can remove most stains using specialized poultice treatments. Some deep stains may require multiple treatments." },
      { question: "What's included in stone cleaning vs. restoration?", answer: "Basic cleaning includes deep clean and seal. Restoration adds diamond polishing, honing, and stain removal for severely worn surfaces." },
    ],
  },
  // ── Leather ──
  {
    slug: "leather-cleaning",
    heroEyebrow: "Leather Cleaning",
    heroHeading: "Professional **Leather** Cleaning & Conditioning",
    heroSubheading: "Restore, protect, and extend the life of your leather furniture.",
    trustBadges: [
      { emoji: "\ud83d\udecb\ufe0f", title: "All Leather Types", subtitle: "Full-grain, top-grain, bonded & more" },
      { emoji: "\ud83e\uddf4", title: "Clean + Condition", subtitle: "Restore softness and prevent cracking" },
      { emoji: "\ud83d\udee1\ufe0f", title: "UV Protection", subtitle: "Guard against sun damage and fading" },
      { emoji: "\u2728", title: "Like-New Results", subtitle: "Revive tired, worn leather furniture" },
    ],
    serviceTimeline: [
      { title: "Before We Arrive", items: ["Discuss leather types and any concerns", "Provide clear pricing estimate", "Schedule at your convenience"] },
      { title: "During Your Service", items: ["Inspect leather type and condition", "Gentle pH-balanced cleaning", "Professional conditioning treatment", "UV protectant application", "Final walkthrough with you"] },
      { title: "After We Leave", items: ["Leather care guide for ongoing maintenance", "Follow-up satisfaction check", "Satisfaction guarantee"] },
    ],
    pageTestimonials: [
      { quote: "My leather sofa was cracking and fading. After Brimley's cleaned and conditioned it, the leather is soft and looks years younger. Worth every penny.", author: "James T.", location: "Scottsdale, AZ", rating: 5 },
      { quote: "They brought our dining chairs back to life. The leather is supple again and the color is restored. Very impressed.", author: "Sandra M.", location: "Mesa, AZ", rating: 5 },
      { quote: "Professional service from start to finish. Our leather sectional looks like the day we bought it. Highly recommend.", author: "Chris B.", location: "Gilbert, AZ", rating: 5 },
    ],
    relatedServices: [
      { emoji: "\ud83d\udecb\ufe0f", heading: "Fabric Furniture?", serviceTitle: "Upholstery Cleaning", description: "Our Hot Carbonating Extraction process is gentle on all fabric types and dries in hours.", link: "/services/upholstery-cleaning" },
      { emoji: "\ud83e\uddf9", heading: "Dirty Carpets?", serviceTitle: "Carpet Cleaning", description: "Deep, residue-free carpet cleaning that dries in 1-2 hours.", link: "/services/carpet-cleaning" },
      { emoji: "\ud83d\udc3e", heading: "Pet Damage?", serviceTitle: "Pet Urine Removal", description: "Eliminate pet odors at their source with our specialized P.U.R.T.\u00ae treatment.", link: "/services/pet-urine-removal" },
    ],
    faqItems: [
      { question: "What types of leather do you clean?", answer: "We clean full-grain, top-grain, corrected-grain, bonded leather, and most synthetic leather. We'll inspect and test before cleaning." },
      { question: "Will cleaning damage my leather?", answer: "No. We use pH-balanced, leather-specific products that clean without stripping natural oils or causing damage." },
      { question: "How often should leather furniture be cleaned?", answer: "We recommend professional cleaning and conditioning every 6-12 months to maintain softness and prevent cracking." },
      { question: "Can you fix scratches or discoloration?", answer: "Our conditioning treatment can minimize light scratches and restore some color. Deep scratches or significant discoloration may need restoration specialists." },
      { question: "How long does leather cleaning take to dry?", answer: "Leather cleaning uses minimal moisture. Your furniture is typically ready to use within 1-2 hours." },
      { question: "Do you condition the leather too?", answer: "Yes. Every leather cleaning includes conditioning treatment to restore moisture, softness, and flexibility. UV protectant is also applied." },
    ],
  },
  // ── Granite Countertop ──
  {
    slug: "granite-countertop-renewal",
    heroEyebrow: "Countertop Renewal",
    heroHeading: "Restore Your **Granite** Countertops to Like-New",
    heroSubheading: "Professional cleaning, polishing, and sealing for granite kitchen and bath surfaces.",
    trustBadges: [
      { emoji: "\ud83d\udc8e", title: "Diamond Polishing", subtitle: "Professional-grade shine restoration" },
      { emoji: "\ud83d\udee1\ufe0f", title: "Seal & Protect", subtitle: "Long-lasting stain resistance" },
      { emoji: "\ud83e\udea8", title: "All Granite Types", subtitle: "Kitchen counters, vanities, bar tops" },
      { emoji: "\ud83c\udfc6", title: "Expert Technicians", subtitle: "Trained in natural stone care" },
    ],
    serviceTimeline: [
      { title: "Assessment", items: ["Inspect granite condition and identify issues", "Test current seal integrity", "Provide detailed scope and pricing"] },
      { title: "Restoration", items: ["Deep cleaning to remove buildup and stains", "Diamond polishing to restore natural luster", "Professional-grade sealing application", "Edge and backsplash detailing"] },
      { title: "Protection", items: ["Care guide for maintaining sealed granite", "Product recommendations for daily cleaning", "Maintenance schedule recommendation"] },
    ],
    pageTestimonials: [
      { quote: "My kitchen granite was looking dull and had water marks everywhere. After Brimley's polished and sealed it, it's absolutely gorgeous. Like a brand new kitchen!", author: "Helen R.", location: "Scottsdale, AZ", rating: 5 },
      { quote: "They restored our bathroom vanity granite beautifully. The polishing made a huge difference. Very professional team.", author: "Mark S.", location: "Gilbert, AZ", rating: 5 },
      { quote: "We were quoted thousands by another company for granite 'restoration.' Brimley's did an incredible job for a fraction of the cost. Honest pricing, beautiful results.", author: "Diane L.", location: "Mesa, AZ", rating: 5 },
    ],
    relatedServices: [
      { emoji: "\ud83e\udea8", heading: "Stone Floors?", serviceTitle: "Stone & Tile Cleaning", description: "Expert cleaning and sealing for all natural stone surfaces including marble, travertine, and slate.", link: "/services/stone-tile-cleaning-polishing" },
      { emoji: "\u2728", heading: "Tile & Grout?", serviceTitle: "Tile & Grout Cleaning", description: "Deep clean and seal your tile and grout for a like-new appearance.", link: "/services/tile-and-grout-cleaning" },
      { emoji: "\ud83e\uddf9", heading: "Carpets?", serviceTitle: "Carpet Cleaning", description: "Our signature carbonating process for deep, residue-free carpet cleaning.", link: "/services/carpet-cleaning" },
    ],
    faqItems: [
      { question: "How do I know if my granite needs resealing?", answer: "Pour a small amount of water on the surface. If it absorbs within 5-10 minutes (darkens the stone), your seal is worn and needs reapplication." },
      { question: "What's included in granite renewal?", answer: "Our full service includes deep cleaning, diamond polishing to restore shine, professional-grade sealing, and edge detailing. We customize based on your countertop's condition." },
      { question: "How long does the seal last?", answer: "Our professional-grade sealers typically last 1-3 years depending on usage. Kitchen countertops with heavy use may need annual resealing." },
      { question: "Can you remove stains from granite?", answer: "We can remove most stains using poultice treatments. Oil-based stains, wine stains, and water marks respond well to our process." },
      { question: "How long does the service take?", answer: "Most kitchen countertop renewals take 2-4 hours. The sealer needs 24 hours to fully cure before heavy use." },
      { question: "Will polishing scratch my granite?", answer: "No. We use diamond polishing pads specifically designed for granite. The process enhances the natural polish without scratching." },
    ],
  },
  // ── Dryer Vent ──
  {
    slug: "dryer-vent-cleaning",
    heroEyebrow: "Dryer Vent Cleaning",
    heroHeading: "Protect Your Home from **Dryer Fires**",
    heroSubheading: "Professional dryer vent cleaning reduces fire risk, saves energy, and extends dryer life.",
    trustBadges: [
      { emoji: "\ud83d\udd25", title: "Fire Prevention", subtitle: "Dryer fires cause $35M in damage annually" },
      { emoji: "\u26a1", title: "Save Energy", subtitle: "Clean vents reduce drying time 25-50%" },
      { emoji: "\ud83d\udee1\ufe0f", title: "Carbon Monoxide Safety", subtitle: "Prevent dangerous gas buildup" },
      { emoji: "\ud83e\uddf9", title: "Full System Clean", subtitle: "Vent, lint trap, and exhaust path" },
    ],
    serviceTimeline: [
      { title: "Inspection", items: ["Check dryer vent path and connections", "Measure airflow and identify blockages", "Inspect exterior exhaust vent"] },
      { title: "Cleaning", items: ["High-powered rotary brush cleaning", "Full vent path cleared from dryer to exterior", "Lint trap housing deep clean", "Reconnect and test airflow"] },
      { title: "Verification", items: ["Airflow measurement before and after", "Photo documentation of results", "Maintenance schedule recommendation", "Safety checklist completion"] },
    ],
    pageTestimonials: [
      { quote: "I had no idea how much lint was in our dryer vent. The amount they pulled out was shocking. Our dryer works so much better now and I feel safer.", author: "Julie F.", location: "Mesa, AZ", rating: 5 },
      { quote: "Our clothes were taking forever to dry. After the vent cleaning, one cycle does the job. Should have done this years ago.", author: "Steve P.", location: "Chandler, AZ", rating: 5 },
      { quote: "Professional, thorough, and they showed us photos of the buildup. Great peace of mind knowing our family is safer. Highly recommend.", author: "Linda G.", location: "Gilbert, AZ", rating: 5 },
    ],
    relatedServices: [
      { emoji: "\ud83e\uddf9", heading: "Dirty Carpets?", serviceTitle: "Carpet Cleaning", description: "Our signature Hot Carbonating Extraction for deep, residue-free carpet cleaning.", link: "/services/carpet-cleaning" },
      { emoji: "\u2728", heading: "Tile Floors?", serviceTitle: "Tile & Grout Cleaning", description: "Professional deep cleaning and sealing for tile and grout.", link: "/services/tile-and-grout-cleaning" },
      { emoji: "\ud83d\udecb\ufe0f", heading: "Furniture?", serviceTitle: "Upholstery Cleaning", description: "Gentle, effective cleaning for sofas, chairs, and all fabric furniture.", link: "/services/upholstery-cleaning" },
    ],
    faqItems: [
      { question: "How often should dryer vents be cleaned?", answer: "The National Fire Protection Association recommends annual cleaning. Homes that do heavy laundry or have longer vent runs may need cleaning every 6-9 months." },
      { question: "What are signs my dryer vent needs cleaning?", answer: "Clothes taking longer to dry, the dryer feeling hot to the touch, a burning smell during operation, or visible lint around the exterior vent are all warning signs." },
      { question: "How long does dryer vent cleaning take?", answer: "Most residential dryer vent cleanings take 45-90 minutes depending on the vent length and amount of buildup." },
      { question: "Can a clogged dryer vent really cause a fire?", answer: "Yes. According to the U.S. Fire Administration, dryer fires cause an estimated 2,900 home fires annually, resulting in $35 million in property damage. Lint buildup is the leading cause." },
      { question: "Do you clean the dryer itself?", answer: "We clean the lint trap housing and the vent path from the dryer to the exterior exhaust. We don't service the dryer's internal components." },
      { question: "Will this reduce my energy bills?", answer: "Yes. A clogged vent forces your dryer to work harder and run longer. Cleaning can reduce drying time by 25-50%, saving energy and money." },
    ],
  },
];

async function migrateServiceDetails() {
  console.log("Starting service detail migration...\n");

  for (const detail of serviceDetails) {
    // Find the existing document by slug
    const doc = await client.fetch(
      `*[_type == "service" && slug.current == $slug][0]{ _id }`,
      { slug: detail.slug }
    );

    if (!doc) {
      console.log(`\u274c  No existing document for slug: ${detail.slug}`);
      continue;
    }

    try {
      await client
        .patch(doc._id)
        .set({
          heroEyebrow: detail.heroEyebrow,
          heroHeading: detail.heroHeading,
          heroSubheading: detail.heroSubheading,
          trustBadges: detail.trustBadges.map((b) => ({
            _type: "object",
            _key: Math.random().toString(36).slice(2, 10),
            ...b,
          })),
          serviceTimeline: detail.serviceTimeline.map((phase) => ({
            _type: "object",
            _key: Math.random().toString(36).slice(2, 10),
            title: phase.title,
            items: phase.items,
          })),
          pageTestimonials: detail.pageTestimonials.map((t) => ({
            _type: "object",
            _key: Math.random().toString(36).slice(2, 10),
            ...t,
          })),
          relatedServices: detail.relatedServices.map((rs) => ({
            _type: "object",
            _key: Math.random().toString(36).slice(2, 10),
            ...rs,
          })),
          faqItems: detail.faqItems.map((faq) => ({
            _type: "object",
            _key: Math.random().toString(36).slice(2, 10),
            ...faq,
          })),
        })
        .commit();

      console.log(`\u2705  Migrated: ${detail.slug}`);
    } catch (err: any) {
      console.log(`\u274c  Failed: ${detail.slug} \u2014 ${err.message}`);
    }
  }

  console.log("\nDone! Run `npm run build` to verify.");
}

migrateServiceDetails();
