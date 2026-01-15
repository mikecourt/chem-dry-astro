---
phase: 02-content-optimization-seo
plan: 01
subsystem: seo
tags: [schema, json-ld, meta-description, canonical, local-seo]

# Dependency graph
requires:
  - phase: 01-template-standardization-audit
    provides: standardized city page template structure
provides:
  - Enhanced LocalBusiness schema with areaServed, geo, address, openingHours
  - City-specific schema markup with postalCodes for all 7 cities
  - Optimized meta descriptions with CTR formula
  - Canonical URLs for all city pages
affects: [search-rankings, rich-snippets, google-business-profile]

# Tech tracking
tech-stack:
  added: []
  patterns: [schema-markup-with-city-props, canonical-url-pattern]

key-files:
  created: []
  modified:
    - src/components/SchemaMarkup.astro
    - src/pages/phoenix.astro
    - src/pages/mesa.astro
    - src/pages/gilbert.astro
    - src/pages/chandler.astro
    - src/pages/tempe.astro
    - src/pages/scottsdale.astro
    - src/pages/queen-creek.astro

key-decisions:
  - "Use City type in areaServed for geographic targeting (vs. broader State)"
  - "Include postalCodes array in props but use City schema (codes for future use)"
  - "Mesa office coordinates (33.4152, -111.8315) used as business geo for all cities"
  - "Opening hours Mon-Sat 7am-6pm codified in schema"

patterns-established:
  - "SchemaMarkup receives city/state/postalCodes props for city pages"
  - "Meta descriptions follow CTR formula: keyword + city + differentiator + phone"
  - "Canonical URLs point to production domain: https://whiteglovecarpet.com/[city]"

issues-created: []

# Metrics
duration: 3 min
completed: 2026-01-15
---

# Phase 2 Plan 1: Schema Markup & Meta Description Optimization Summary

**Enhanced LocalBusiness schema with geo, address, openingHours, areaServed; optimized meta descriptions with CTR formula; added canonical URLs to all 7 city pages**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-15T17:40:55Z
- **Completed:** 2026-01-15T17:43:56Z
- **Tasks:** 4
- **Files modified:** 8

## Accomplishments
- SchemaMarkup component enhanced with city, state, postalCodes props
- LocalBusiness schema now includes geo coordinates, physical address, opening hours, priceRange
- All 7 city pages pass city-specific areaServed schema
- Meta descriptions optimized with "Carpet cleaning [city] AZ" primary keyword + phone CTA
- Canonical URLs set to production domain for all city pages

## Task Commits

Each task was committed atomically:

1. **Task 1: Enhance SchemaMarkup component** - `66b71cf6` (feat)
   - Added city/state/postalCodes props
   - Added areaServed with City type
   - Added geo, address, openingHours, priceRange properties

2. **Tasks 2-4: Update city pages** - `f4facb55` (feat)
   - Pass enhanced schema props to all 7 city pages
   - Optimize meta descriptions with CTR formula
   - Add canonical URLs

## Files Created/Modified
- `src/components/SchemaMarkup.astro` - Enhanced with local SEO properties
- `src/pages/phoenix.astro` - City schema, meta desc, canonical
- `src/pages/mesa.astro` - City schema, meta desc, canonical
- `src/pages/gilbert.astro` - City schema, meta desc, canonical
- `src/pages/chandler.astro` - City schema, meta desc, canonical
- `src/pages/tempe.astro` - City schema, meta desc, canonical
- `src/pages/scottsdale.astro` - City schema, meta desc, canonical
- `src/pages/queen-creek.astro` - City schema, meta desc, canonical

## Decisions Made
- Used City type in areaServed (more specific than State for local SEO)
- Mesa office coordinates used as business geo for all cities (single physical location)
- postalCodes prop added for future expansion (not currently rendered in schema)
- Meta description formula: "Carpet cleaning [city] AZ - [differentiator]. [benefit]. Free quote: (480) 649-3663"

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness
- Schema markup complete with all local SEO properties
- Ready for 02-02-PLAN.md (Internal linking and content enhancement)
- Recommend validating schema at https://validator.schema.org/ and https://search.google.com/test/rich-results

---
*Phase: 02-content-optimization-seo*
*Completed: 2026-01-15*
