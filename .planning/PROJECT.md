# Brimley's White Glove Chem-Dry Website

## What This Is

A high-converting, SEO-optimized website for Brimley's White Glove Chem-Dry serving the Phoenix metro area, built with Astro + Tailwind CSS. The site follows franchise brand guidelines and serves as a template for scaling to 2-5 locations with city-specific landing pages that rank #1 for local carpet cleaning searches.

## Core Value

Rank #1 in Google for "[city] carpet cleaning" keywords in every service area - without rankings, nothing else matters. Every page, component, and piece of content is optimized to dominate local search results.

## Requirements

### Validated

*Shipped features confirmed working in the existing codebase:*

- ✓ **Astro + React SSG architecture** - Static site generation with island architecture (existing)
- ✓ **Complete Chem-Dry brand system** - Official colors (PMS 348, 361, 286, 513), typography (Poppins/Inter), accessibility-compliant (existing)
- ✓ **Tailwind CSS configuration** - Custom components (buttons, cards, sections), brand gradients, animations (existing)
- ✓ **Content collections structure** - Blog, services, locations, homepage sections with Zod validation (existing)
- ✓ **SEO foundation** - Schema markup (LocalBusiness), sitemap, RSS feed, meta tags (existing)
- ✓ **Responsive layouts** - Mobile-first design with AOS scroll animations (existing)
- ✓ **Image optimization** - Sharp processing, WebP format, lazy loading (existing)
- ✓ **Design system documentation** - Brand guide, component reference, city customization guide (existing)

### Active

*Features to complete for v1 launch:*

- [ ] **City landing page template system** - Reusable template with dynamic content for Mesa, Gilbert, Chandler, Tempe, Scottsdale
- [ ] **City-specific content** - Unique neighborhoods, landmarks, local challenges, ZIP codes for each location
- [ ] **Service pages** - Carpet cleaning, upholstery, area rugs, tile & grout, pet urine & odor removal
- [ ] **Lead capture forms** - Free quote form with validation, contact form, conversion tracking
- [ ] **Phone CTA optimization** - Click-to-call buttons, prominent phone numbers (480) 649-3663
- [ ] **City navigation system** - Links between location pages, service area footer
- [ ] **Testimonials integration** - Customer reviews with city-specific attribution
- [ ] **Schema markup per city** - LocalBusiness with areaServed for each location page

### Out of Scope

- **Online booking/scheduling system** - Keep conversion simple (phone/form only) to maximize response rate
- **E-commerce/payment processing** - Not selling products online, service-based business only
- **Customer portal/login area** - No account management, this is a lead generation site not a SaaS
- **Blog content management** - Use existing content collections, no CMS admin needed for v1
- **Multi-language support** - Phoenix metro area is English-primary, defer international if needed later

## Context

### Existing Foundation

This is a **brownfield project** continuing from established codebase. Previous work completed:
- Complete Astro SSG setup with React islands
- Chem-Dry franchise brand system implemented
- Design documentation in `docs/` folder
- Technical architecture mapped in `.planning/codebase/`
- Previous project plan in `docs/PROJECT-HANDOFF.md` (still valid)

### Business Context

- **Business Type**: Chem-Dry franchise (carpet cleaning service)
- **Service Area**: Phoenix metro area (Mesa, Gilbert, Chandler, Tempe, Scottsdale, Glendale, Peoria, Queen Creek, Apache Junction, San Tan Valley)
- **Scale**: 2-5 locations (multi-location owner, not franchisee)
- **Competitive Advantage**: Hot Carbonating Extraction (uses about 80% less water, dries in 1-2 hours)
- **Contact**: (480) 649-3663, office@whiteglovecarpet.com, 1451 N Delmar, Mesa, AZ 85203

### User Research

**Target Audience**: Homeowners in Phoenix metro area with:
- Pet stains and odors (high priority)
- Original carpeting in older homes (Mesa)
- Builder-grade carpets in new homes (Gilbert)
- Luxury/high-end properties (Scottsdale)
- Family homes with kids (Gilbert, Chandler)
- Hard water issues from wells (Mesa)
- Chlorine tracking from pools (Gilbert)

**Search Intent**: High-intent keywords like:
- "[city] carpet cleaning"
- "carpet cleaners [city]"
- "professional carpet cleaning [city] az"
- "pet stain removal [city]"
- "emergency carpet cleaning [city]"

### Technical Environment

- **Framework**: Astro 5.14.7 with React 19.1.1
- **Styling**: Tailwind CSS 4.1.12 with custom Chem-Dry brand utilities
- **Content**: MDX with YAML frontmatter, Zod schema validation
- **Deployment**: Vercel (auto-deploy on git push)
- **Performance Targets**: PageSpeed 90+ mobile, 95+ desktop, LCP < 2.5s

### Known Issues

- City pages not yet created (template exists but needs implementation)
- Service pages incomplete (structure ready, content needed)
- Lead forms not integrated (design done, functionality needed)
- Testimonials not city-specific (generic testimonials exist, need localization)

## Constraints

- **Franchise Brand Compliance**: Strict Chem-Dry guidelines - must follow approved messaging, never use possessive "Chem-Dry's", always say "about 80% less water", must capitalize "The Natural®" properly
- **Brand Colors**: Must use official Chem-Dry colors (PMS 348: #008752, PMS 361: #41AD49, PMS 286: #005DAA, PMS 513: #9A4E9E)
- **Accessibility**: WCAG AA compliance required - body text must use #444444 (9.73:1 contrast), never use warm grays #A29588 or #8A7967 for text
- **Typography**: Poppins for headings, Inter for body text (no deviations from brand standard)
- **Tech Stack**: Must use Astro + Tailwind (already implemented, cannot switch frameworks)
- **SEO Requirements**: Each city page needs unique content (800-1200 words), proper H1 with city name, schema markup with areaServed

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro + React over Next.js | Static site generation ideal for SEO, no server needed, faster builds | ✓ Good - excellent PageSpeed scores, simple deployment |
| Tailwind CSS with custom components | Brand compliance needs custom utilities, Tailwind provides flexibility | ✓ Good - consistent design system, easy to extend |
| Content collections for city pages | Type-safe content management, reusable across locations | — Pending - template ready, awaiting implementation |
| Forms over online booking | Maximize conversion rate with simple lead capture first | — Pending - forms not yet built |
| Multi-location template approach | Same owner, multiple locations, need consistent branding | — Pending - template designed, scaling not tested |

---
*Last updated: 2026-01-12 after project initialization*
