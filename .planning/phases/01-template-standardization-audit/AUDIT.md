# City Pages Audit Report

**Date**: 2026-01-15
**Auditor**: Claude (Phase 01, Plan 01)
**Pages Audited**: 7 (phoenix, mesa, gilbert, chandler, tempe, scottsdale, queen-creek)

## Executive Summary

The 7 existing city pages have significant structural inconsistencies that need standardization. Phoenix is the most comprehensive (1033 lines) but uses a different import path convention. Gilbert uniquely uses `getSinglePage` for services. Brand compliance violations exist across multiple pages.

**Key Issues Found:**
- Import path inconsistency (Phoenix vs all others)
- Brand compliance violations in 5+ pages
- Inconsistent section ordering
- Mixed data patterns (inline vs dynamic)
- Inconsistent icon implementations

---

## 1. Import Analysis

### Import Path Comparison

| Component | Phoenix | All Others |
|-----------|---------|------------|
| CustomButton | `@/layouts/components/CustomButton.astro` | `@/components/CustomButton.astro` |
| CustomHeading | `@/layouts/components/CustomHeading.astro` | `@/components/CustomHeading.astro` |

**Finding**: Phoenix uses `@/layouts/components/` path while all 6 other pages use `@/components/`. This inconsistency should be standardized.

### Components Imported by Page

| Component | Phoenix | Mesa | Gilbert | Chandler | Tempe | Scottsdale | Queen Creek |
|-----------|:-------:|:----:|:-------:|:--------:|:-----:|:----------:|:-----------:|
| Base | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| SchemaMarkup | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| CustomButton | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| CustomHeading | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| CallToAction | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| TrustBar | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| getEntry | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| DynamicIcon | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| ServiceCard | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| getSinglePage | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |

**Unique Imports:**
- **Phoenix**: Imports `DynamicIcon` (though usage is minimal)
- **Gilbert**: Imports `ServiceCard` and `getSinglePage` for dynamic service rendering

### Recommended Standard Import Block

```astro
---
import Base from "@/layouts/Base.astro";
import SchemaMarkup from "@/components/SchemaMarkup.astro";
import CustomButton from "@/components/CustomButton.astro";
import CustomHeading from "@/components/CustomHeading.astro";
import CallToAction from "@/components/CallToAction.astro";
import TrustBar from "@/components/TrustBar.astro";
import { getEntry } from "astro:content";
---
```

---

## 2. Structure Analysis

### Page Line Counts

| Page | Lines | Complexity |
|------|------:|------------|
| Phoenix | 1,033 | High |
| Mesa | 838 | Medium-High |
| Tempe | 770 | Medium |
| Chandler | 732 | Medium |
| Gilbert | 721 | Medium |
| Queen Creek | 695 | Medium |
| Scottsdale | 693 | Medium |

### Section Presence Matrix

| Section | Phoenix | Mesa | Gilbert | Chandler | Tempe | Scottsdale | Queen Creek |
|---------|:-------:|:----:|:-------:|:--------:|:-----:|:----------:|:-----------:|
| Hero | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Problem/Challenges | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Solution (HCE) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Services | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Testimonials | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Service Areas | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Why Choose Us | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| FAQ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Final CTA | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| TrustBar | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| CallToAction | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Finding**: All pages have the same core sections. The issue is inconsistent implementation, not missing sections.

### Section Order Variations

**Phoenix Order:**
1. Hero (gradient bg)
2. Why Phoenix Homes Need Professional Care
3. The Brimley's White Glove Difference
4. Our Cleaning Services
5. What Phoenix Homeowners Are Saying
6. Service Areas
7. Frequently Asked Questions
8. Get Started Today
9. TrustBar
10. CallToAction

**Other Pages Order (Mesa as example):**
1. Hero (image bg)
2. City-Specific Challenges
3. Our Solution (HCE)
4. Our Services
5. What Customers Say
6. Service Areas
7. Why Choose Us
8. FAQ
9. Final CTA
10. TrustBar
11. CallToAction

**Finding**: Section order varies slightly. Phoenix has a unique structure compared to the others.

---

## 3. Data Pattern Analysis

### Data Storage Patterns

| Data Type | Phoenix | Mesa | Gilbert | Chandler | Tempe | Scottsdale | Queen Creek |
|-----------|---------|------|---------|----------|-------|------------|-------------|
| Neighborhoods | Inline array | Inline HTML | Inline array | Inline HTML | Inline HTML | Inline HTML | Inline HTML |
| ZIP Codes | Inline array | Inline HTML | Inline array | Inline HTML | Inline HTML | Inline HTML | Inline HTML |
| FAQs | Inline array | Inline HTML | Inline array | Inline HTML | Inline HTML | Inline HTML | Inline HTML |
| Testimonials | Inline array | Inline HTML | Inline HTML | Inline HTML | Inline HTML | Inline HTML | Inline HTML |
| Services | Inline array | Inline HTML | getSinglePage | Inline HTML | Inline HTML | Inline HTML | Inline HTML |

### Phoenix Data Pattern (Most Structured)

```astro
// Neighborhoods as array
const neighborhoods = [
  "Arcadia", "Ahwatukee", "Biltmore", ...
];

// ZIP codes as array
const phoenixZips = [
  "85003", "85004", "85006", ...
];

// FAQs as structured array
const faqs = [
  {
    question: "How long does carpet cleaning take?",
    answer: "Most rooms take 15-20 minutes..."
  },
  // ...
];

// Services as structured array
const services = [
  {
    name: "Carpet Cleaning",
    description: "...",
    icon: "sparkles"
  },
  // ...
];
```

### Gilbert Data Pattern (Uses Content Collections)

```astro
// Uses getSinglePage for services
import { getSinglePage } from "@/lib/contentParser";
const featuredServices = await getSinglePage("services");
```

### Other Pages (Inline HTML)

Most pages have neighborhoods and ZIP codes hardcoded directly in HTML:
```astro
<p class="text-gray-600">
  Downtown Mesa • East Mesa • West Mesa • Red Mountain • ...
</p>
```

**Finding**: Phoenix has the best data organization with structured arrays. Gilbert uniquely uses content collections for services. Other pages have hardcoded HTML which is harder to maintain.

---

## 4. Visual/Component Pattern Analysis

### Hero Section Implementations

| Page | Background Type | Implementation |
|------|-----------------|----------------|
| Phoenix | Gradient | `bg-gradient-to-br from-primary/5 via-white to-accent/5` |
| Mesa | Image | `background: radial-gradient(...)` with bg image |
| Gilbert | Image | `background: radial-gradient(...)` with bg image |
| Chandler | Image | `background: radial-gradient(...)` with bg image |
| Tempe | Image | `background: radial-gradient(...)` with bg image |
| Scottsdale | Image | `background: radial-gradient(...)` with bg image |
| Queen Creek | Image | `background: radial-gradient(...)` with bg image |

**Finding**: Phoenix uses a gradient background while all others use a background image with radial gradient overlay. Decision needed on canonical approach.

### Icon Usage Patterns

| Page | Primary Icon Method |
|------|---------------------|
| Phoenix | Emoji (🏆, ⭐, etc.) stored in data, rendered as text |
| Mesa | Inline SVG |
| Gilbert | Emoji |
| Chandler | Emoji |
| Tempe | Emoji |
| Scottsdale | Emoji |
| Queen Creek | Emoji |

**Finding**: Mesa uses inline SVGs while all others use emoji. Emoji is simpler but less customizable.

### Trust Badge Styling

All pages use similar trust badge patterns with slight variations:
- Green checkmark icons
- Grid layout (2x2 or 3-column)
- Shadow cards

---

## 5. Brand Compliance Check

### ❌ VIOLATIONS FOUND

#### "80% less water" without "about" qualifier

| Page | Line | Violation |
|------|------|-----------|
| Phoenix | ~180 | "uses 80% less water" |
| Mesa | ~95 | "80% less water" |
| Gilbert | ~85 | "uses 80% less water" |
| Chandler | 71 | "80% Less Water Used" (heading) |
| Tempe | ~90 | "80% less water" |
| Scottsdale | ~85 | "80% less water" |
| Queen Creek | ~85 | "80% less water" |

**Required Fix**: All instances must say "uses **about** 80% less water"

#### "No residue" without "dirt-attracting" qualifier

| Page | Line | Violation |
|------|------|-----------|
| Mesa | ~130 | "leaves no residue" |
| Chandler | ~125 | "no sticky residue" |
| Tempe | ~120 | "leaves no residue" |

**Required Fix**: Must say "no **dirt-attracting** residue"

#### Possessive "Chem-Dry's" Usage

**Status**: No violations found - pages correctly use "The process used by Chem-Dry" or similar constructions.

#### "The Natural®" Capitalization

**Status**: Most pages correctly use "The Natural®" with proper capitalization. Verify trademark symbol is present.

### Brand Compliance Summary

| Violation Type | Pages Affected | Severity |
|----------------|----------------|----------|
| "80% less water" without "about" | 7/7 | HIGH |
| "No residue" missing qualifier | 3/7 | HIGH |
| Chem-Dry possessive | 0/7 | OK |
| The Natural capitalization | 0/7 | OK |

---

## 6. Recommendations

### Immediate Actions (Plan 01-02)

1. **Standardize Import Paths**: Update Phoenix to use `@/components/` path
2. **Fix Brand Violations**: Add "about" to water claims, add "dirt-attracting" to residue claims

### Template Standardization (Plan 01-03)

1. **Choose Canonical Baseline**: Use Phoenix structure but with standard import paths
2. **Standardize Data Patterns**: Convert all pages to use structured arrays like Phoenix
3. **Unify Hero Implementation**: Decide on gradient vs image background
4. **Standardize Icon Approach**: Choose emoji (simpler) or SVG (more customizable)

### Content Collections (Future Phase)

Consider migrating to Astro content collections for:
- Testimonials
- FAQs
- Neighborhoods/ZIP codes

This would improve maintainability and enable cross-city queries.

---

## Appendix: Page-by-Page Details

### Phoenix (src/pages/phoenix.astro)
- **Lines**: 1,033
- **Import Path**: `@/layouts/components/` (non-standard)
- **Hero**: Gradient background
- **Data**: Structured arrays
- **Unique**: Most comprehensive, potential canonical source
- **Issues**: Import path, "80% less water"

### Mesa (src/pages/mesa.astro)
- **Lines**: 838
- **Import Path**: `@/components/` (standard)
- **Hero**: Image background
- **Data**: Inline HTML
- **Unique**: Uses inline SVG icons
- **Issues**: "80% less water", "leaves no residue"

### Gilbert (src/pages/gilbert.astro)
- **Lines**: 721
- **Import Path**: `@/components/` (standard)
- **Hero**: Image background
- **Data**: Mixed (getSinglePage for services, inline for others)
- **Unique**: Only page using content collections for services
- **Issues**: "80% less water"

### Chandler (src/pages/chandler.astro)
- **Lines**: 732
- **Import Path**: `@/components/` (standard)
- **Hero**: Image background
- **Data**: Inline HTML
- **Unique**: Has "80% Less Water" as section heading
- **Issues**: "80% Less Water Used" heading, "no sticky residue"

### Tempe (src/pages/tempe.astro)
- **Lines**: 770
- **Import Path**: `@/components/` (standard)
- **Hero**: Image background
- **Data**: Inline HTML
- **Unique**: Focus on rentals/landlords
- **Issues**: "80% less water", "leaves no residue"

### Scottsdale (src/pages/scottsdale.astro)
- **Lines**: 693
- **Import Path**: `@/components/` (standard)
- **Hero**: Image background
- **Data**: Inline HTML
- **Unique**: Luxury home focus
- **Issues**: "80% less water"

### Queen Creek (src/pages/queen-creek.astro)
- **Lines**: 695
- **Import Path**: `@/components/` (standard)
- **Hero**: Image background
- **Data**: Inline HTML
- **Unique**: Growing community focus
- **Issues**: "80% less water"

---

**Next Step**: Create TEMPLATE.md defining the canonical city page pattern based on these findings.
