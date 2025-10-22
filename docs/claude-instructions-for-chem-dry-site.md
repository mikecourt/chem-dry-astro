# Brimley's White Glove Chem-Dry - Project Instructions

## Project Overview

This is a local SEO-optimized website for Brimley's White Glove Chem-Dry serving the Phoenix metro area. The site uses:
- **Astro framework** with the Cleaner theme (https://cleaner-astro.vercel.app/?aff=abfeatured)
- **Design inspiration** from HomeMaster template (https://homemasterr.webflow.io/home-01)
- **Deployed on Vercel** via GitHub
- **Chem-Dry branded** (see chem-dry-brand skill)

## SEO Optimization Strategy

Following the optimization plan from: https://www.youtube.com/watch?v=gWNFna6fgS8

### Key Phases:
1. **High-converting design** with 95% fidelity to Figma designs
2. **Keyword research** - Focus on high-intent, local keywords
3. **Technical SEO** - Deep audits, speed optimization, schema markup
4. **Content depth** - Location and service pages with topical authority
5. **Trust signals** - Google Business Profile consistency, reviews

### Priority Keywords Focus:
- Emergency, service, problem, and local keywords
- "carpet cleaning [city name]"
- "[city] carpet cleaners"
- High buying-intent searches

## City Page Customization Guidelines

When creating city pages, follow these rules:

### Must Customize Per City:
1. **City Name & Header**
   - H1: "Carpet Cleaning in [CITY NAME], AZ"
   - Replace all "Phoenix" references with target city

2. **Local Challenges Section**
   - "Why [CITY] Homes Need Regular Carpet Cleaning"
   - Base on city characteristics (see examples below)

3. **Neighborhoods Section**
   - Use actual neighborhoods for target city
   - Research: city website, real estate listings, subdivisions

4. **Local Details**
   - Geographic features (mountains, parks, landmarks)
   - Demographics (home age, residential vs mixed use)
   - Climate/environmental challenges

5. **ZIP Codes**
   - Use correct ZIP codes for target city

6. **Customer Testimonials**
   - Update city name in testimonials

7. **Service Area Links**
   - Remove current city from "Nearby Cities" list

### Keep Identical Across All Cities:
- "The Brimley's White Glove Difference" core messaging
- Service packages (Standard, Stain Fighter, Fresh & Healthy Home)
- "What We Clean" section
- Hot Carbonating Extraction explanation
- Chem-Dry advantage section
- About Brimley's White Glove Chem-Dry
- Mission statement
- Contact information: (480) 555-0100, info@whiteglovecarpet.com
- Business hours

## City-Specific Content Examples

### Mesa:
- Arizona's 3rd largest city
- Older homes with original carpeting
- Family-oriented (kids & pets)
- Proximity to Superstition Mountains (dust)
- Hard water from well systems

### Gilbert:
- One of fastest-growing communities
- Newer homes with builder-grade carpets
- High-income families (premium service demand)
- Lots of pools (chlorine tracking)
- Family-friendly, top-ranked place to live

### Chandler:
- Tech corridor (Intel, Microchip)
- Master-planned communities
- Mix of residential and commercial
- Growing population

### Scottsdale:
- "The West's Most Western Town"
- Luxury homes and high-end properties
- Resort community feel
- Higher service quality expectations
- Specialty rugs and premium carpeting

### Tempe:
- Home to Arizona State University
- ASU student population (rentals)
- Mix of older and newer neighborhoods
- Young professional demographic
- Mill Avenue District

## Chem-Dry Brand Guidelines (CRITICAL)

### Must Follow:
- ❌ Never say "Chem-Dry's" (possessive)
- ✅ Water usage: "about 80% less" (always include modifier like "about")
- ❌ Never: "no residue" 
- ✅ Always: "no dirt-attracting residue"
- ✅ The Natural® - proper capitalization and ®
- ❌ Never: "all natural" or "green certified"
- ✅ Use approved product descriptions from brand guide
- ✅ Mission statement: exact wording for franchise

### Approved Phrases:
- "The process used by Chem-Dry"
- "The method used by Chem-Dry"
- "Hot Carbonating Extraction"
- "The Natural® uses carbonation for a better clean and a healthier home"

## SEO Technical Requirements

### URL Structure:
- Format: `/carpet-cleaning-[city-name]-az`
- Examples: `/carpet-cleaning-mesa-az`, `/carpet-cleaning-gilbert-az`

### Title Tag Format:
`Carpet Cleaning in [CITY], AZ | Brimley's White Glove Chem-Dry`

### Meta Description Template:
`Professional carpet cleaning in [CITY], AZ. Hot Carbonating Extraction uses about 80% less water, dries in 1-2 hours. Family-owned, 25+ years experience. Free quote!`

### Header Structure:
- H1: City name + service
- H2: Major sections (include city name in 2-3 H2s naturally)
- H3: Subsections

### Schema Markup (Add to each city page):
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Carpet Cleaning",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Brimley's White Glove Chem-Dry",
    "areaServed": {
      "@type": "City",
      "name": "[CITY NAME]",
      "containedInPlace": {
        "@type": "State",
        "name": "Arizona"
      }
    }
  }
}
```

## Content Depth Requirements

For each location page:
- Go "super super deep" into content
- Include local landmarks
- Mention unique location information
- Address common industry issues affecting that area
- Include FAQs specific to that location
- Build topical authority for both search engines and LLMs

## Priority Cities (Create in Order)

**Tier 1 (Create First):**
1. Mesa
2. Gilbert
3. Chandler
4. Tempe
5. Scottsdale

**Tier 2:**
6. Glendale
7. Peoria
8. Queen Creek
9. Apache Junction
10. San Tan Valley

**Tier 3:**
11. Surprise
12. Fountain Hills
13. Cave Creek
14. Paradise Valley
15. Goodyear

## File Naming Convention

**Astro pages:**
`src/pages/carpet-cleaning-[city-name]-az.astro`

Examples:
- `carpet-cleaning-mesa-az.astro`
- `carpet-cleaning-gilbert-az.astro`

## Quality Control Checklist

Before publishing any city page:
- [ ] All "Phoenix" instances replaced with target city
- [ ] Neighborhoods accurate for the city
- [ ] ZIP codes correct
- [ ] No contradictory information
- [ ] Testimonials reference correct city
- [ ] Local landmarks/features accurate
- [ ] Links to other city pages work
- [ ] Contact information consistent
- [ ] Chem-Dry brand guidelines followed
- [ ] No grammar/spelling errors
- [ ] H1 tag unique with city name
- [ ] Meta description written
- [ ] Schema markup added
- [ ] Images have alt text with city name

## Performance Requirements

- Mobile-first design
- Fast loading (target: 90+ PageSpeed score)
- Images: WebP format, compressed
- Implement lazy loading
- Optimize for Core Web Vitals

## When Generating Code:

1. **Always reference** the Chem-Dry brand skill for approved messaging
2. **Always use** city-specific information when creating location pages
3. **Always include** proper schema markup
4. **Always optimize** for mobile and speed
5. **Always check** brand guidelines before using Chem-Dry terminology
6. **Never copy/paste** generic content - make it locally relevant
7. **Always add** internal links between related pages
8. **Always ensure** consistency across all pages for core business info

## Development Workflow

1. Generate code based on these instructions
2. Create files directly in VS Code workspace
3. Test locally with `npm run dev`
4. Commit to GitHub
5. Auto-deploy to Vercel

## Contact Information (Keep Consistent)

- **Phone:** (480) 555-0100
- **Email:** info@whiteglovecarpet.com
- **Business Name:** Brimley's White Glove Chem-Dry
- **Service Area:** Phoenix Metro Area, Arizona

---

**Remember:** This is a local service business. Every page should feel locally relevant while maintaining brand consistency and following Chem-Dry's strict brand guidelines.
