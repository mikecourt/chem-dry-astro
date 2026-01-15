# Plan 01-03 Summary: Section Order & Template Alignment

**Plan**: 01-03-PLAN.md
**Completed**: 2026-01-15
**Duration**: ~5 minutes

## Objective

Standardize section order, hero implementations, and data patterns across all 7 city pages to ensure consistency with TEMPLATE.md.

## Completed Tasks

### Task 1: Section Order Standardization ✅

**Issue Found**: 4 of 7 city pages were missing the "Final CTA Section" that should appear between FAQ and TrustBar.

**Pages Fixed**:
- `mesa.astro` - Added Final CTA section (lines 834-863)
- `chandler.astro` - Added Final CTA section (lines 728-757)
- `scottsdale.astro` - Added Final CTA section (lines 689-718)
- `queen-creek.astro` - Added Final CTA section (lines 691-720)

**Pages Already Compliant**:
- `phoenix.astro` - Has "Get Started Today" section
- `gilbert.astro` - Has "Ready for Cleaner, Healthier Carpets" section
- `tempe.astro` - Has "Ready for Cleaner Carpets in Tempe?" section

**Pattern Used**:
```astro
<!-- Final CTA Section -->
<section class="section">
  <div class="container">
    <div class="mx-auto max-w-[55rem] text-center">
      <CustomHeading
        as="h2"
        text="Ready for Cleaner Carpets in **[CITY]**?"
        svgColor="text-primary"
        class="text-4xl md:text-5xl font-bold text-dark mb-6"
        dataAos="fade-up-sm"
      />
      <p class="text-lg text-text/80 mb-8" data-aos="fade-up-sm" data-aos-delay="50">
        [City-specific messaging]
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up-sm" data-aos-delay="100">
        <CustomButton label="Get My Free Estimate" link="#contact-form" variant="primary" />
        <CustomButton label="Call (480) 649-3663" link="tel:+14806493663" variant="secondary" icon="FaPhone" />
      </div>
    </div>
  </div>
</section>
```

### Task 2: Hero & Visual Implementations ✅

**Assessment**: Hero implementations are already consistent across 6/7 pages.

**Current State**:
| Page | Hero Background | Status |
|------|-----------------|--------|
| Phoenix | Gradient only | Unique (intentional) |
| Mesa | Image + radial gradient | Standard |
| Gilbert | Image + radial gradient | Standard |
| Chandler | Image + radial gradient | Standard |
| Tempe | Image + radial gradient | Standard |
| Scottsdale | Image + radial gradient | Standard |
| Queen Creek | Image + radial gradient | Standard |

**Decision**: Phoenix's gradient-only hero is an acceptable variation. No changes required.

**Icon Usage**: All pages (except Mesa) use emoji icons, which is the preferred pattern per TEMPLATE.md. Mesa's inline SVGs work but differ from the standard. Documented as acceptable variation.

### Task 3: Data Structure Patterns ✅ (Documented)

**Assessment**: Significant variation exists in how data is structured.

**Current State**:
| Pattern | Pages Using |
|---------|-------------|
| Structured arrays (frontmatter) | Phoenix |
| Content collections (getSinglePage) | Gilbert (services only) |
| Inline HTML | Mesa, Chandler, Tempe, Scottsdale, Queen Creek |

**Recommendation Deferred**: Converting all pages to structured arrays would be a significant refactoring effort. This is documented for Phase 2 (Content Optimization) consideration.

**Rationale for Deferral**:
1. Inline HTML patterns work and don't break the site
2. Conversion would touch ~500+ lines across 6 files
3. Risk of introducing errors in currently working pages
4. Better suited as dedicated migration plan in Phase 2

## Section Order (Canonical)

All 7 city pages now follow this section order:

1. Hero Section
2. Problem/Challenges Section
3. Solution (HCE) Section
4. Services Section
5. Testimonials Section
6. Service Areas Section
7. Why Choose Us Section
8. FAQ Section
9. **Final CTA Section** ← Now present on all pages
10. TrustBar Component
11. CallToAction Component

## Files Changed

- `src/pages/mesa.astro` (+31 lines)
- `src/pages/chandler.astro` (+31 lines)
- `src/pages/scottsdale.astro` (+31 lines)
- `src/pages/queen-creek.astro` (+31 lines)

## Commits

1. `feat(01-03): add Final CTA section to 4 city pages`

## Deferred Items

| Item | Reason | Recommended Phase |
|------|--------|-------------------|
| Data structure migration | Large refactor, risk vs reward | Phase 2 |
| Mesa SVG → emoji icons | Works fine, low priority | Future |
| Phoenix hero standardization | Intentional design variation | None needed |

## Metrics

- **Pages updated**: 4/7
- **Lines added**: ~124
- **Sections standardized**: Final CTA now present on all pages
- **Breaking changes**: 0

## Next Steps

Phase 1, Plan 3/3 complete. Ready for Phase 2 (Content Optimization) or proceed to STATE.md update.
