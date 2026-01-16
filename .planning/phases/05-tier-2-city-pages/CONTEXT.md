# Phase 5: Tier 2 City Pages - Context

## Goal

Create 4 city landing pages for Tier 2 service areas using the optimized template from Phases 1-4:
- Glendale
- Peoria
- Apache Junction
- San Tan Valley

## Template Reference

Use Phoenix as the canonical template (most comprehensive, all sections standardized).

**Template file**: `src/pages/phoenix.astro`
**Template docs**: `.planning/phases/01-template-standardization-audit/TEMPLATE.md`

## Required Sections (11 total)

1. Hero Section
2. Neighborhoods Section
3. Local Challenges Section
4. Solution Section (HCE)
5. Services Section
6. Testimonials (CityTestimonials component)
7. Service Areas (ZIP Codes)
8. Why Choose Us Section
9. FAQ Section
10. Final CTA Section
11. TrustBar + CallToAction

## City Research

### Glendale, AZ

**Overview:**
- Population: ~250,000 (2024 estimate)
- Part of West Valley
- Home to State Farm Stadium (NFL Cardinals, Super Bowls)
- Desert Diamond Arena (NHL Coyotes until 2024)
- Historic downtown with antique district
- Diverse community with Hispanic heritage

**Key Neighborhoods:**
- Historic Catlin Court
- Arrowhead Ranch
- Glendale Heights
- Downtown Glendale
- Sahuaro Ranch
- Westgate Entertainment District

**Local Challenges:**
- Stadium event traffic (dirt tracked in)
- Older historic homes with original carpets
- Desert dust from west valley
- Family homes with kids and pets
- Agricultural heritage (dust/allergens)

**ZIP Codes:**
85301, 85302, 85303, 85304, 85305, 85306, 85307, 85308, 85310, 85311, 85312, 85318

**Landmarks:**
- State Farm Stadium
- Westgate Entertainment District
- Glendale Glitters (holiday event)
- Sahuaro Ranch Park
- Thunderbird Conservation Park

### Peoria, AZ

**Overview:**
- Population: ~195,000 (2024 estimate)
- Northwest Valley location
- Home to Peoria Sports Complex (Spring Training)
- Lake Pleasant proximity
- Mix of established and new communities
- Highly rated schools

**Key Neighborhoods:**
- Vistancia
- Fletcher Heights
- Sunrise Mountain
- Old Town Peoria
- Westwing Mountain
- Lake Pleasant Heights

**Local Challenges:**
- Lake Pleasant recreation (sand/dust tracked in)
- Spring Training visitor traffic
- Desert dust from northwest valley
- New construction dust
- Family community (pets, kids)

**ZIP Codes:**
85345, 85380, 85381, 85382, 85383

**Landmarks:**
- Peoria Sports Complex
- Lake Pleasant Regional Park
- Rio Vista Recreation Center
- Sunrise Mountain
- Pioneer Park

### Apache Junction, AZ

**Overview:**
- Population: ~42,000 (2024 estimate)
- Gateway to Superstition Mountains
- Strong RV/snowbird community
- Mining/Western heritage
- Mix of retirees and families
- More rural feel than metro Phoenix

**Key Neighborhoods:**
- Superstition Mountain
- Gold Canyon
- Renaissance Festival Area
- Lost Dutchman area
- Apache Trail neighborhoods
- Mountain View Estates

**Local Challenges:**
- Superstition Mountain dust/hiking debris
- RV/snowbird seasonal cleaning needs
- Older mobile/manufactured homes
- Well water mineral deposits
- Desert pack rat/pest allergens
- Gold Canyon golf course communities

**ZIP Codes:**
85117, 85118, 85119, 85120

**Landmarks:**
- Superstition Mountains
- Lost Dutchman State Park
- Apache Trail (Historic Route 88)
- Goldfield Ghost Town
- Renaissance Festival grounds

### San Tan Valley, AZ

**Overview:**
- Population: ~110,000 (2024 estimate)
- Census-designated place (unincorporated)
- One of fastest-growing areas in Arizona
- Master-planned community focus
- Strong family demographic
- Newer construction predominant

**Key Neighborhoods:**
- Johnson Ranch
- Pecan Creek
- San Tan Heights
- Skyline Ranch
- Encanterra
- Copper Basin

**Local Challenges:**
- New construction dust
- Builder-grade carpet maintenance
- Growing family needs
- San Tan Mountain Regional Park proximity
- Desert dust from open desert areas
- Pool communities (chlorine tracking)

**ZIP Codes:**
85140, 85142, 85143, 85144

**Landmarks:**
- San Tan Mountain Regional Park
- Johnson Ranch Sports Complex
- Schnepf Farms
- Copper Basin Railway Park

## Testimonials Strategy

Create 3 testimonials per city in `src/content/testimonials/`:
- `{city}-{name-slug}.md`
- Use CityTestimonials component (already exists)
- Vary sources: Google Review, Yelp Review, Facebook Review

## SEO Requirements

**Meta Title Format:**
`Carpet Cleaning [City] AZ | Neighborhoods | Brimley's`

**Meta Description Format:**
`Carpet cleaning [City] AZ - [Key Neighborhoods]. Hot Carbonating Extraction dries in 1-2 hrs. 25+ yrs experience. Free quote: (480) 649-3663`

**Canonical URL:**
`https://whiteglovecarpet.com/[city-slug]`

## File Naming

| City | File Name | URL |
|------|-----------|-----|
| Glendale | `glendale.astro` | `/glendale` |
| Peoria | `peoria.astro` | `/peoria` |
| Apache Junction | `apache-junction.astro` | `/apache-junction` |
| San Tan Valley | `san-tan-valley.astro` | `/san-tan-valley` |

## Schema Markup

Use existing SchemaMarkup component with city-specific data:
```astro
<SchemaMarkup
  type="city"
  city="[City]"
  state="Arizona"
  postalCodes={[...zip codes]}
/>
```

## Internal Linking

Each city page should link to:
- Other city pages in "Also Serving" section
- Service pages from services grid
- Contact/appointment pages from CTAs

## Brand Compliance Reminders

- "uses **about** 80% less water" (always include "about")
- "no **dirt-attracting** residue" (never just "no residue")
- Never use "Chem-Dry's" (possessive form)
- "The Natural®" (proper capitalization with ®)
- Body text: `#444444` (9.73:1 contrast)
