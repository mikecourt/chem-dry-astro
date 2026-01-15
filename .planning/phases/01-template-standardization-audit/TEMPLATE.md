# Canonical City Page Template

**Created**: 2026-01-15
**Phase**: 01 - Template Standardization & Audit
**Source**: Based on Phoenix (structure) + Mesa (import paths)

This document defines the canonical pattern all city pages must follow. Use this as the reference when creating new city pages or standardizing existing ones.

---

## 1. Standard Imports

All city pages MUST use this exact import block:

```astro
---
import Base from "@/layouts/Base.astro";
import SchemaMarkup from "@/components/SchemaMarkup.astro";
import CustomButton from "@/components/CustomButton.astro";
import CustomHeading from "@/components/CustomHeading.astro";
import CallToAction from "@/components/CallToAction.astro";
import TrustBar from "@/components/TrustBar.astro";
import { getEntry } from "astro:content";

// Fetch site config
const config = await getEntry("config", "site");

// City-specific variables (customize per city)
const cityName = "Phoenix"; // Change per city
const citySlug = "phoenix"; // URL-safe version

// ... city data definitions (see Section 4)
---
```

**Import Path Rules:**
- ✅ Use `@/components/` for all components
- ✅ Use `@/layouts/` for layout components (Base)
- ❌ Never use `@/layouts/components/` (legacy path)

---

## 2. Required Sections (In Order)

Every city page MUST include these sections in this exact order:

| # | Section | Purpose |
|---|---------|---------|
| 1 | Hero | Primary headline, city name, main CTA |
| 2 | Local Challenges | City-specific carpet problems |
| 3 | Our Solution (HCE) | Hot Carbonating Extraction benefits |
| 4 | Services | Service offerings grid |
| 5 | Testimonials | Customer reviews (city-specific) |
| 6 | Service Areas | Neighborhoods + ZIP codes |
| 7 | Why Choose Us | Trust signals, certifications |
| 8 | FAQ | Common questions (city-aware) |
| 9 | Final CTA | Closing conversion section |
| 10 | TrustBar | Trust badges component |
| 11 | CallToAction | Floating/footer CTA component |

---

## 3. Section Templates

### 3.1 Hero Section

```astro
<!-- Hero Section -->
<section class="relative min-h-[600px] flex items-center overflow-hidden">
  <!-- Background with gradient overlay -->
  <div
    class="absolute inset-0 z-0"
    style="background: radial-gradient(ellipse at center, rgba(0, 135, 82, 0.1) 0%, transparent 70%), url('/images/hero-carpet.webp') center/cover no-repeat;"
  >
  </div>

  <div class="container relative z-10 py-20 lg:py-28">
    <div class="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">
      <!-- Eyebrow -->
      <p class="text-sm font-semibold tracking-wider uppercase text-accent mb-3" data-aos="fade-up">
        Professional Carpet Cleaning in {cityName}
      </p>

      <!-- H1 -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6" data-aos="fade-up" data-aos-delay="100">
        Expert Carpet Cleaning in <span class="text-primary">{cityName}, AZ</span>
      </h1>

      <!-- Subheadline -->
      <p class="text-xl text-text/80 mb-8 max-w-2xl" data-aos="fade-up" data-aos-delay="200">
        Hot Carbonating Extraction uses <strong>about 80% less water</strong>,
        dries in 1-2 hours, and leaves no dirt-attracting residue.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="300">
        <CustomButton href="/contact" variant="cta" size="lg">
          Get Your Free Quote
        </CustomButton>
        <CustomButton href="tel:4806493663" variant="secondary" size="lg">
          📞 (480) 649-3663
        </CustomButton>
      </div>
    </div>
  </div>
</section>
```

### 3.2 Local Challenges Section

```astro
<!-- Why [City] Homes Need Professional Care -->
<section class="section bg-gray-50">
  <div class="container">
    <div class="text-center mb-12">
      <p class="text-sm font-semibold tracking-wider uppercase text-accent mb-3" data-aos="fade-up">
        Local Expertise
      </p>
      <CustomHeading
        as="h2"
        text={`Why ${cityName} Homes Need Professional Carpet Care`}
        class="text-3xl md:text-4xl font-bold text-dark"
        dataAos="fade-up"
      />
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {challenges.map((challenge, index) => (
        <div
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <span class="text-3xl mb-4 block">{challenge.icon}</span>
          <h3 class="text-lg font-semibold text-dark mb-2">{challenge.title}</h3>
          <p class="text-text/70">{challenge.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 3.3 Solution Section (HCE)

```astro
<!-- Hot Carbonating Extraction Solution -->
<section class="section">
  <div class="container">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <p class="text-sm font-semibold tracking-wider uppercase text-accent mb-3" data-aos="fade-up">
          Our Proven Process
        </p>
        <CustomHeading
          as="h2"
          text="Hot Carbonating Extraction"
          class="text-3xl md:text-4xl font-bold text-dark mb-6"
          dataAos="fade-up"
        />
        <div class="space-y-4 text-text/80" data-aos="fade-up" data-aos-delay="100">
          <p>
            The process used by Chem-Dry uses the power of carbonation to lift dirt and grime
            to the surface where it can be whisked away. This method uses <strong>about 80%
            less water</strong> than traditional steam cleaning.
          </p>
          <p>
            Because less water is used, carpets dry in just <strong>1-2 hours</strong>, not
            1-2 days. And our green-certified solution, The Natural®, leaves
            <strong>no dirt-attracting residue</strong> behind.
          </p>
        </div>

        <!-- Benefits Grid -->
        <div class="grid grid-cols-2 gap-4 mt-8" data-aos="fade-up" data-aos-delay="200">
          {hceBenefits.map((benefit) => (
            <div class="flex items-start gap-3">
              <span class="text-primary text-xl">✓</span>
              <span class="text-sm font-medium text-dark">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div class="relative" data-aos="fade-left">
        <img
          src="/images/hce-process.webp"
          alt={`Hot Carbonating Extraction carpet cleaning in ${cityName}`}
          class="rounded-2xl shadow-lg"
          width="600"
          height="400"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>
```

### 3.4 Services Section

```astro
<!-- Our Services -->
<section class="section bg-gray-50">
  <div class="container">
    <div class="text-center mb-12">
      <p class="text-sm font-semibold tracking-wider uppercase text-accent mb-3" data-aos="fade-up">
        What We Offer
      </p>
      <CustomHeading
        as="h2"
        text={`Cleaning Services in ${cityName}`}
        class="text-3xl md:text-4xl font-bold text-dark"
        dataAos="fade-up"
      />
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {services.map((service, index) => (
        <div
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <span class="text-3xl mb-4 block">{service.icon}</span>
          <h3 class="text-lg font-semibold text-dark mb-2">{service.name}</h3>
          <p class="text-text/70 text-sm">{service.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 3.5 Testimonials Section

```astro
<!-- Testimonials -->
<section class="section">
  <div class="container">
    <div class="text-center mb-12">
      <p class="text-sm font-semibold tracking-wider uppercase text-accent mb-3" data-aos="fade-up">
        Customer Reviews
      </p>
      <CustomHeading
        as="h2"
        text={`What ${cityName} Homeowners Say`}
        class="text-3xl md:text-4xl font-bold text-dark"
        dataAos="fade-up"
      />
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {testimonials.map((testimonial, index) => (
        <div
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <div class="flex gap-1 mb-4">
            {[...Array(5)].map(() => <span class="text-yellow-400">★</span>)}
          </div>
          <p class="text-text/80 italic mb-4">"{testimonial.quote}"</p>
          <div class="font-semibold text-dark">{testimonial.name}</div>
          <div class="text-sm text-text/60">{testimonial.location}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 3.6 Service Areas Section

```astro
<!-- Service Areas -->
<section class="section bg-gray-50">
  <div class="container">
    <div class="text-center mb-12">
      <p class="text-sm font-semibold tracking-wider uppercase text-accent mb-3" data-aos="fade-up">
        Areas We Serve
      </p>
      <CustomHeading
        as="h2"
        text={`Carpet Cleaning Throughout ${cityName}`}
        class="text-3xl md:text-4xl font-bold text-dark"
        dataAos="fade-up"
      />
    </div>

    <div class="max-w-4xl mx-auto">
      <!-- Neighborhoods -->
      <div class="mb-8" data-aos="fade-up">
        <h3 class="text-lg font-semibold text-dark mb-4">Neighborhoods We Serve</h3>
        <p class="text-text/70">
          {neighborhoods.join(" • ")}
        </p>
      </div>

      <!-- ZIP Codes -->
      <div data-aos="fade-up" data-aos-delay="100">
        <h3 class="text-lg font-semibold text-dark mb-4">ZIP Codes</h3>
        <div class="flex flex-wrap gap-2">
          {zipCodes.map((zip) => (
            <span class="bg-white px-3 py-1 rounded-full text-sm text-text/70 border border-gray-200">
              {zip}
            </span>
          ))}
        </div>
      </div>

      <!-- Nearby Cities -->
      <div class="mt-8 pt-8 border-t border-gray-200" data-aos="fade-up" data-aos-delay="200">
        <h3 class="text-lg font-semibold text-dark mb-4">Also Serving</h3>
        <div class="flex flex-wrap gap-3">
          {nearbyCities.map((city) => (
            <a
              href={`/${city.slug}`}
              class="text-primary hover:text-primary-dark underline"
            >
              {city.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

### 3.7 Why Choose Us Section

```astro
<!-- Why Choose Us -->
<section class="section">
  <div class="container">
    <div class="text-center mb-12">
      <p class="text-sm font-semibold tracking-wider uppercase text-accent mb-3" data-aos="fade-up">
        The Brimley's Difference
      </p>
      <CustomHeading
        as="h2"
        text="Why Choose Brimley's White Glove Chem-Dry"
        class="text-3xl md:text-4xl font-bold text-dark"
        dataAos="fade-up"
      />
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {trustSignals.map((signal, index) => (
        <div
          class="text-center p-6"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <span class="text-4xl mb-4 block">{signal.icon}</span>
          <h3 class="text-lg font-semibold text-dark mb-2">{signal.title}</h3>
          <p class="text-text/70 text-sm">{signal.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 3.8 FAQ Section

```astro
<!-- FAQ -->
<section class="section bg-gray-50">
  <div class="container">
    <div class="text-center mb-12">
      <p class="text-sm font-semibold tracking-wider uppercase text-accent mb-3" data-aos="fade-up">
        Common Questions
      </p>
      <CustomHeading
        as="h2"
        text={`Carpet Cleaning FAQ for ${cityName}`}
        class="text-3xl md:text-4xl font-bold text-dark"
        dataAos="fade-up"
      />
    </div>

    <div class="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <details
          class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
          data-aos="fade-up"
          data-aos-delay={index * 50}
        >
          <summary class="px-6 py-4 cursor-pointer font-semibold text-dark hover:bg-gray-50 flex justify-between items-center">
            {faq.question}
            <span class="text-primary group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div class="px-6 pb-4 text-text/70">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  </div>
</section>
```

### 3.9 Final CTA Section

```astro
<!-- Final CTA -->
<section class="section bg-gradient-to-br from-primary to-primary-dark text-white">
  <div class="container">
    <div class="text-center max-w-2xl mx-auto">
      <CustomHeading
        as="h2"
        text={`Ready for Cleaner Carpets in ${cityName}?`}
        class="text-3xl md:text-4xl font-bold text-white mb-6"
        dataAos="fade-up"
      />
      <p class="text-xl text-white/90 mb-8" data-aos="fade-up" data-aos-delay="100">
        Get a free, no-obligation quote today. Most jobs completed same-day!
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
        <CustomButton href="/contact" variant="white" size="lg">
          Get Your Free Quote
        </CustomButton>
        <CustomButton href="tel:4806493663" variant="outline-white" size="lg">
          📞 (480) 649-3663
        </CustomButton>
      </div>
    </div>
  </div>
</section>
```

### 3.10 Shared Components

```astro
<!-- TrustBar (shared component) -->
<TrustBar />

<!-- CallToAction (shared component) -->
<CallToAction />
```

---

## 4. Data Structure Standards

All city-specific data should be defined as structured arrays in the frontmatter:

### 4.1 Challenges Array

```astro
const challenges = [
  {
    icon: "🏜️",
    title: "Desert Dust & Allergens",
    description: "Fine desert particles settle deep in carpet fibers, triggering allergies and respiratory issues."
  },
  {
    icon: "☀️",
    title: "Sun Damage & Fading",
    description: "Intense Arizona sun can fade and weaken carpet fibers over time."
  },
  {
    icon: "🐕",
    title: "Pet Stains & Odors",
    description: "Family homes with pets need specialized treatment for accidents and odors."
  }
];
```

### 4.2 Services Array

```astro
const services = [
  {
    icon: "🧹",
    name: "Carpet Cleaning",
    description: "Deep cleaning using Hot Carbonating Extraction technology."
  },
  {
    icon: "🛋️",
    name: "Upholstery Cleaning",
    description: "Professional cleaning for sofas, chairs, and other furniture."
  },
  {
    icon: "🧱",
    name: "Tile & Grout Cleaning",
    description: "Restore your tile floors and grout to like-new condition."
  },
  {
    icon: "🌊",
    name: "Water Damage Restoration",
    description: "24/7 emergency water extraction and drying services."
  },
  {
    icon: "🏠",
    name: "Area Rug Cleaning",
    description: "Gentle, effective cleaning for delicate area rugs."
  },
  {
    icon: "🛡️",
    name: "Stain Protection",
    description: "Apply protective coating to resist future stains and spills."
  }
];
```

### 4.3 Testimonials Array

```astro
const testimonials = [
  {
    quote: "The team was professional, on time, and my carpets look brand new!",
    name: "Sarah M.",
    location: `${cityName}, AZ`
  },
  {
    quote: "Amazing results! They got out stains I thought were permanent.",
    name: "Mike T.",
    location: `${cityName}, AZ`
  },
  {
    quote: "Best carpet cleaning service in the Valley. Highly recommend!",
    name: "Jennifer L.",
    location: `${cityName}, AZ`
  }
];
```

### 4.4 Neighborhoods Array

```astro
const neighborhoods = [
  "Downtown", "North Side", "South Side", "East Valley", // ... city-specific
];
```

### 4.5 ZIP Codes Array

```astro
const zipCodes = [
  "85001", "85002", "85003", // ... city-specific
];
```

### 4.6 FAQs Array

```astro
const faqs = [
  {
    question: "How long does carpet cleaning take?",
    answer: "Most rooms take 15-20 minutes to clean. A typical home takes 1-2 hours."
  },
  {
    question: "How long until my carpets are dry?",
    answer: "With our Hot Carbonating Extraction method, carpets typically dry in 1-2 hours, not 1-2 days like steam cleaning."
  },
  {
    question: "Is your cleaning solution safe for pets and children?",
    answer: "Yes! The Natural® is green-certified and safe for your entire family, including pets."
  },
  {
    question: "Do you move furniture?",
    answer: "We move light furniture like chairs and small tables. Heavy items like beds and large furniture should be moved before we arrive."
  }
];
```

### 4.7 HCE Benefits Array

```astro
const hceBenefits = [
  "About 80% less water usage",
  "Dries in 1-2 hours",
  "No dirt-attracting residue",
  "Green-certified solution",
  "Safe for kids & pets",
  "Deeper clean"
];
```

### 4.8 Trust Signals Array

```astro
const trustSignals = [
  {
    icon: "🏆",
    title: "25+ Years Experience",
    description: "Serving Arizona families since 1998"
  },
  {
    icon: "✅",
    title: "Satisfaction Guaranteed",
    description: "Not happy? We'll re-clean for free"
  },
  {
    icon: "🌿",
    title: "Green Certified",
    description: "Safe for kids, pets & the planet"
  },
  {
    icon: "⭐",
    title: "5-Star Rated",
    description: "Hundreds of happy customers"
  }
];
```

### 4.9 Nearby Cities Array

```astro
// Exclude current city from this list
const nearbyCities = [
  { name: "Mesa", slug: "mesa" },
  { name: "Gilbert", slug: "gilbert" },
  { name: "Chandler", slug: "chandler" },
  // ... exclude current city
];
```

---

## 5. Brand Compliance Checklist

**BEFORE PUBLISHING ANY CITY PAGE, VERIFY:**

### Water Usage Claims
- ✅ "uses **about** 80% less water" (with "about")
- ❌ "uses 80% less water" (missing "about")
- ❌ "80% Less Water" (missing "about" and context)

### Residue Claims
- ✅ "no **dirt-attracting** residue"
- ✅ "leaves no **dirt-attracting** residue behind"
- ❌ "no residue" (missing "dirt-attracting")
- ❌ "no sticky residue" (incorrect qualifier)

### Possessive Usage
- ✅ "The process used by Chem-Dry..."
- ✅ "Chem-Dry uses carbonation..."
- ❌ "Chem-Dry's process..." (never use possessive)
- ❌ "Chem-Dry's technology..." (never use possessive)

### The Natural® Trademark
- ✅ "The Natural®" (capitalized, with ®)
- ❌ "the natural" (wrong capitalization)
- ❌ "The Natural" (missing ®)

### Other Requirements
- ✅ "Hot Carbonating Extraction" (official process name)
- ✅ Include city name in H1 tag
- ✅ City name in meta title and description
- ✅ Schema markup with city name

---

## 6. SEO Requirements

### Title Tag Format
```
Carpet Cleaning in [CITY], AZ | Brimley's White Glove Chem-Dry
```

### Meta Description Template
```
Professional carpet cleaning in [CITY], AZ. Hot Carbonating Extraction uses about 80% less water, dries in 1-2 hours. Family-owned, 25+ years experience. Free quote!
```

### H1 Tag (One Per Page)
```html
<h1>Expert Carpet Cleaning in [CITY], AZ</h1>
```

### Schema Markup

```astro
<SchemaMarkup
  type="LocalBusiness"
  name="Brimley's White Glove Chem-Dry"
  description={`Professional carpet cleaning in ${cityName}, AZ`}
  areaServed={cityName}
  telephone="480-649-3663"
  address={{
    streetAddress: "1451 N Delmar",
    addressLocality: "Mesa",
    addressRegion: "AZ",
    postalCode: "85203"
  }}
/>
```

---

## 7. File Naming Convention

City page files should follow this pattern:
- **URL-safe slug**: lowercase, hyphens for spaces
- **File location**: `src/pages/[city-slug].astro`

| City | File Name | URL Path |
|------|-----------|----------|
| Phoenix | `phoenix.astro` | `/phoenix` |
| Mesa | `mesa.astro` | `/mesa` |
| Gilbert | `gilbert.astro` | `/gilbert` |
| Queen Creek | `queen-creek.astro` | `/queen-creek` |
| San Tan Valley | `san-tan-valley.astro` | `/san-tan-valley` |

---

## 8. Quick Reference: Page Structure

```
src/pages/[city].astro
├── Frontmatter (---)
│   ├── Imports (standard block)
│   ├── Config fetch
│   ├── City variables (cityName, citySlug)
│   └── Data arrays (challenges, services, testimonials, etc.)
├── HTML
│   ├── <Base> wrapper
│   │   ├── <SchemaMarkup>
│   │   ├── Hero Section
│   │   ├── Local Challenges Section
│   │   ├── Solution (HCE) Section
│   │   ├── Services Section
│   │   ├── Testimonials Section
│   │   ├── Service Areas Section
│   │   ├── Why Choose Us Section
│   │   ├── FAQ Section
│   │   ├── Final CTA Section
│   │   ├── <TrustBar />
│   │   └── <CallToAction />
│   └── </Base>
└── <style> (if needed)
```

---

## 9. Customization Guide

When creating a new city page:

1. **Copy this template structure**
2. **Update city variables**: `cityName`, `citySlug`
3. **Customize challenges**: Research city-specific carpet issues
4. **Add local testimonials**: Use real or representative reviews
5. **List neighborhoods**: Research actual neighborhood names
6. **List ZIP codes**: Verify correct ZIPs for the city
7. **Update nearby cities**: Exclude current city from list
8. **Run brand compliance check**: Use checklist in Section 5
9. **Test locally**: `npm run dev`
10. **Verify Schema markup**: Check structured data

---

**This template is the authoritative reference for city pages.**
**Any deviation requires documented justification.**
