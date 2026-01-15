# Roadmap: Brimley's White Glove Chem-Dry Website

## Overview

This roadmap guides the completion of a high-converting, SEO-optimized website for Brimley's White Glove Chem-Dry. Starting with a mature codebase (7 city pages, 7 service pages, complete design system), we'll standardize existing implementations, optimize for local SEO dominance, enhance conversion flows, and scale to additional service areas. The journey progresses from quality assurance and optimization of existing pages, through system improvements and content migration, to launching remaining Tier 2 cities and final launch preparation.

## Domain Expertise

None

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Template Standardization & Audit** - Audit and standardize existing city pages
- [x] **Phase 2: Content Optimization & SEO** - Optimize for local search rankings
- [x] **Phase 3: Quote Form & Conversion Flow** - Build lead capture and optimize CTAs
- [ ] **Phase 4: Testimonials System Migration** - Move testimonials to content collections
- [ ] **Phase 5: Tier 2 City Pages** - Create remaining 4 city pages
- [ ] **Phase 6: Navigation & Internal Linking** - Build city navigation and cross-linking
- [ ] **Phase 7: Launch Preparation & QA** - Performance, accessibility, final quality checks

## Phase Details

### Phase 1: Template Standardization & Audit
**Goal**: Establish a canonical city page pattern by auditing all 7 existing pages for consistency, standardizing component usage, fixing brand compliance issues, and documenting the definitive template.

**Depends on**: Nothing (first phase)

**Research**: Unlikely (established patterns exist in codebase - auditing and standardizing existing implementation)

**Plans**: 3

Plans:
- 01-01: Audit all 7 city pages, create AUDIT.md and TEMPLATE.md
- 01-02: Standardize imports and fix brand compliance violations
- 01-03: Standardize section structure and data patterns

### Phase 2: Content Optimization & SEO
**Goal**: Optimize existing city pages to rank #1 for local carpet cleaning searches through unique meta descriptions, proper schema markup, validated local content (ZIP codes, neighborhoods, challenges), and strategic internal linking.

**Depends on**: Phase 1

**Research**: Complete (2025 local SEO best practices researched)

**Research findings**:
- areaServed property critical for service-area businesses
- geo property with lat/long essential for "near me" searches
- Rich snippets with proper schema improve CTR by 20-30%
- Internal linking distributes PageRank and improves crawlability

**Plans**: 2

Plans:
- 02-01: Schema markup enhancement and meta description optimization
- 02-02: Internal linking and content enhancement

### Phase 3: Quote Form & Conversion Flow
**Goal**: Maximize lead generation by building a dedicated free quote form (adapting existing contact form pattern), integrating it strategically across city and service pages, optimizing phone CTAs, and setting up conversion tracking.

**Depends on**: Phase 2

**Research**: Complete (existing CallToAction partial has form UI, Netlify Forms pattern established)

**Plans**: 3

Plans:
- 03-01: Quote Form Backend & GHL Integration (Vercel adapter, /api/contact endpoint) ✅
- 03-02: Thank-You Page & Form Updates (thank-you page, contact/appointment forms to GHL) ✅
- 03-03: Phone CTA Optimization & Conversion Tracking (standardize phone links, add tracking) ✅

### Phase 4: Testimonials System Migration
**Goal**: Migrate hardcoded testimonials into content collections for maintainability, create structured testimonial data, implement dynamic display with city/service-specific filtering.

**Depends on**: Phase 3

**Research**: Unlikely (content collections already configured - straightforward data migration from existing hardcoded testimonials)

**Plans**: TBD

Plans:
- TBD

### Phase 5: Tier 2 City Pages
**Goal**: Scale to remaining service areas (Glendale, Peoria, Apache Junction, San Tan Valley) using the optimized template from Phases 1-2, ensuring consistent quality and brand compliance across all locations.

**Depends on**: Phase 4

**Research**: Unlikely (using proven, optimized template established in Phases 1-2)

**Plans**: TBD

Plans:
- TBD

### Phase 6: Navigation & Internal Linking
**Goal**: Build comprehensive city-to-city navigation system, enhance service area footer, establish strategic cross-linking between cities and services, and optimize sitemap for search engines.

**Depends on**: Phase 5

**Research**: Unlikely (Astro routing and navigation patterns already established in codebase)

**Plans**: TBD

Plans:
- TBD

### Phase 7: Launch Preparation & QA
**Goal**: Ensure production readiness by achieving PageSpeed targets (90+ mobile, 95+ desktop), passing WCAG AA accessibility standards, completing mobile/cross-browser testing, and conducting final brand compliance review.

**Depends on**: Phase 6

**Research**: Likely (performance optimization and testing require current methodologies)

**Research topics**:
- Astro build optimization and static site performance tuning
- PageSpeed Insights improvement techniques for 2025
- WCAG AA automated testing tools and manual audit procedures
- Cross-browser compatibility testing strategies

**Plans**: TBD

Plans:
- TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Template Standardization & Audit | 3/3 | Complete | 2026-01-15 |
| 2. Content Optimization & SEO | 2/2 | Complete | 2026-01-15 |
| 3. Quote Form & Conversion Flow | 3/3 | Complete | 2026-01-15 |
| 4. Testimonials System Migration | 0/TBD | Not started | - |
| 5. Tier 2 City Pages | 0/TBD | Not started | - |
| 6. Navigation & Internal Linking | 0/TBD | Not started | - |
| 7. Launch Preparation & QA | 0/TBD | Not started | - |
