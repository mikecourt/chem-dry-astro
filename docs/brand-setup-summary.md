# Chem-Dry Brand Setup Summary

## Overview
This document summarizes the brand assets and configuration files set up for Brimley's White Glove Chem-Dry website.

## Files Created/Updated

### 1. Brand Configuration
- **Location:** [config/brand-colors.json](../config/brand-colors.json)
- **Purpose:** Central reference for all Chem-Dry brand colors with Pantone numbers, hex values, and RGB
- **Contains:**
  - Primary colors (Blue, Green, Purple)
  - Secondary colors (Secondary Green, Warm Gray, Dark Gray)
  - Usage guidelines for each color
  - Accessibility ratings

### 2. Tailwind Configuration
- **Location:** [tailwind.config.mjs](../tailwind.config.mjs)
- **Purpose:** Complete Tailwind CSS configuration with Chem-Dry branding
- **Features:**
  - All brand colors with 10 shades each (50-900)
  - Custom button components (`.btn-primary`, `.btn-secondary`, `.btn-cta`, `.btn-outline`)
  - Card components (`.card-brand`, `.service-card`, `.testimonial-card`)
  - Section layouts (`.section-brand`, `.hero-brand`, `.container-brand`)
  - Form components (`.input-brand`, `.textarea-brand`)
  - Brand gradients and shadows
  - Custom animations (fade-in, slide-up)
  - Typography utilities

### 3. Theme Configuration
- **Location:** [src/config/theme.json](../src/config/theme.json)
- **Updated with:**
  - Chem-Dry brand colors as default theme colors
  - Font family: Inter (body), Poppins (headlines)
  - Proper text colors using `#444444` for body text (readable and accessible)

### 4. Brand Assets
- **Favicon:** [public/favicon.png](../public/favicon.png) - Chem-Dry icon for browser tabs
- **Brand Reference:** [docs/brand-color-reference.md](../docs/brand-color-reference.md) - Quick reference guide

## Brand Colors

### Primary Colors
- **Chem-Dry Green (PMS 348):** `#008752` - Primary brand color, main logo color
- **Chem-Dry Secondary Green (PMS 361):** `#41AD49` - Secondary headings, buttons, CTAs, accents
- **Chem-Dry Blue (PMS 286):** `#005DAA` - Primary brand color, headings, logo color
- **Chem-Dry Purple (PMS 513):** `#9A4E9E` - Accent color, logo color (less common)

### Neutral Colors (Background Use Only - NOT for Text)
- **Chem-Dry Warm Gray (PMS 7530 C):** `#A29588` - ⚠️ Backgrounds and subtle accents ONLY
  - **WARNING:** Only 2.8:1 contrast ratio - FAILS WCAG for text
  - RGB: 162, 149, 138
  
- **Chem-Dry Dark Warm Gray (PMS 4090 C):** `#8A7967` - ⚠️ Subtle elements and backgrounds ONLY
  - **WARNING:** Only 3.5:1 contrast ratio - FAILS for body text
  - RGB: 138, 121, 103

### Web-Optimized Text Colors
**These colors are NOT in the official Chem-Dry brand guide but are essential for accessibility:**

- **Body Text Gray:** `#444444` - **USE THIS for all body text**
  - RGB: 68, 68, 68
  - Contrast: 9.73:1 on white - meets WCAG AAA standards
  
- **Muted Text Gray:** `#6B7280` - Captions, labels, secondary information
  - RGB: 107, 114, 128
  - Contrast: 5.39:1 on white - meets WCAG AA standards

### White Glove Custom Accent Colors
**These are NOT official Chem-Dry colors but can be used as supplementary accents:**

- **Navy:** `#1A365D` - Premium feel, professional backgrounds, secondary buttons
- **Gold:** `#D4AF37` - Premium accents, awards, badges
- **Background Gray:** `#F9FAFB` - Page backgrounds, subtle sections

## Button Color Application

### Correct Button Usage
```html
<!-- Primary Action (Chem-Dry Secondary Green) -->
<button class="btn-primary">Get Free Quote</button>
<!-- Background: #41AD49, Hover: #008752 -->

<!-- Secondary Action (Navy) -->
<button class="btn-secondary">Learn More</button>
<!-- Background: #1A365D -->

<!-- CTA Button (Gradient) -->
<button class="btn-cta">Call Now: (480) 555-0100</button>
<!-- Gradient: #41AD49 to #005DAA -->

<!-- Outline Button -->
<button class="btn-outline">View Services</button>
<!-- Border: #41AD49, Hover fill: #41AD49 -->
```

## Typography

### Font Families (Correct)
- **Body Text:** Inter (sans-serif)
- **Headlines:** Poppins (sans-serif, bold)
- **Fallback:** Arial/Futura for Chem-Dry brand compliance where needed

### Font Usage
```html
<h1 class="font-headline text-chemdry-blue">Main Headline</h1>
<h2 class="font-headline text-chemdry-secondary-green">Section Heading</h2>
<p class="font-sans text-chemdry-body-text">Body text content here</p>
<p class="text-muted">Caption or secondary info</p>
```

### Typography Color Application
- **Main Headings (H1, H2):** `#005DAA` (Chem-Dry Blue) or `#1A365D` (Navy)
- **Secondary Headings (H3, H4):** `#41AD49` (Secondary Green) or `#008752` (Primary Green)
- **Body Text:** `#444444` (Dark Gray - optimal readability)
- **Muted Text/Captions:** `#6B7280` (for secondary info)

**⚠️ CRITICAL:** Do NOT use Warm Grays (#A29588, #8A7967) for any text. These fail accessibility standards.

## Using Colors in Tailwind

### Background Colors
```html
<!-- Primary brand colors -->
<div class="bg-chemdry-green">Primary Green background</div>
<div class="bg-chemdry-secondary-green">Secondary Green background</div>
<div class="bg-chemdry-blue">Blue background</div>

<!-- Different shades (50 = lightest, 900 = darkest) -->
<div class="bg-chemdry-blue-50">Very light blue</div>
<div class="bg-chemdry-blue-500">Medium blue</div>
<div class="bg-chemdry-blue-900">Very dark blue</div>

<!-- Accent colors -->
<div class="bg-white-glove-navy">Navy background</div>
<div class="bg-white-glove-gold">Gold accent</div>
```

### Text Colors
```html
<!-- Readable body text -->
<p class="text-chemdry-body-text">Main content</p>

<!-- Muted text for captions -->
<p class="text-muted">Secondary information</p>

<!-- Brand color text -->
<h2 class="text-chemdry-blue">Blue heading</h2>
<h3 class="text-chemdry-secondary-green">Green heading</h3>
```

## Using Cards

```html
<!-- Standard brand card -->
<div class="card-brand">
  <h3>Service Name</h3>
  <p>Description here</p>
</div>

<!-- Service card with hover effect -->
<div class="service-card">
  <h3>Carpet Cleaning</h3>
  <p>Hot Carbonating Extraction</p>
  <button class="btn-primary">Learn More</button>
</div>

<!-- Testimonial card -->
<div class="testimonial-card">
  <p>"Amazing service! My carpets look brand new."</p>
  <p class="text-muted">— Sarah M., Gilbert</p>
</div>
```

## Using Sections

```html
<!-- Hero section with gradient -->
<section class="hero-brand">
  <div class="container-brand">
    <h1>Professional Carpet Cleaning in Phoenix</h1>
    <p>Dries in 1-2 hours. Uses about 80% less water.</p>
    <button class="btn-cta">Get Free Quote</button>
  </div>
</section>

<!-- Standard brand section -->
<section class="section-brand">
  <div class="container-brand">
    <h2>Why Choose Chem-Dry?</h2>
    <!-- Content here -->
  </div>
</section>

<!-- Soft background section -->
<section class="section-brand-soft">
  <div class="container-brand">
    <!-- Content here -->
  </div>
</section>
```

## Gradients

### Available Gradients
- `bg-gradient-brand` - Blue to Green gradient (Chem-Dry colors)
- `bg-gradient-brand-soft` - Subtle gradient with transparency
- `bg-gradient-cta` - Secondary Green to Blue (for CTA buttons)
- `text-gradient-brand` - Gradient text effect for headlines

```html
<!-- Gradient background -->
<div class="bg-gradient-cta text-white">
  <h2>Special Offer</h2>
</div>

<!-- Gradient text -->
<h1 class="text-gradient-brand">Stand Out Headline</h1>
```

## Custom Components

All custom components are pre-configured in Tailwind config for consistent branding:

### Buttons
- `.btn-primary` - Main actions (Secondary Green: #41AD49)
- `.btn-secondary` - Secondary actions (Navy: #1A365D)
- `.btn-cta` - High priority CTAs (Gradient: #41AD49 → #005DAA)
- `.btn-outline` - Tertiary actions (Secondary Green border)

### Cards
- `.card-brand` - Standard white card with shadow
- `.service-card` - Service offerings with hover lift
- `.testimonial-card` - Customer testimonials with green border accent

### Sections
- `.section-brand` - Full-width section with gradient background
- `.section-brand-soft` - Subtle gradient background
- `.hero-brand` - Hero section styling
- `.container-brand` - Max-width container with padding

### Forms
- `.input-brand` - Text input with Chem-Dry focus styles
- `.textarea-brand` - Textarea with brand styling

### Typography
- `.text-gradient-brand` - Gradient text effect
- `.phone-link` - Styled phone number links
- `.text-muted` - Muted text for captions

### Utilities
- `.hover-lift` - Adds hover lift animation
- `.trust-badge` - Trust signal component
- `.trust-icon` - Icon container with green background

## Accessibility Standards

### âœ… Approved Color Combinations (WCAG Compliant)
- âœ… `#444444` body text on white (9.73:1 - excellent)
- âœ… `#41AD49` on white background
- âœ… `#008752` on white background
- âœ… `#005DAA` on white background
- âœ… White text on `#41AD49`
- âœ… White text on `#008752`
- âœ… White text on `#005DAA`
- âœ… White text on `#1A365D`

### âŒ DO NOT Use for Text
- âŒ `#A29588` (Warm Gray) - Only 2.8:1 contrast - FAILS accessibility
- âŒ `#8A7967` (Dark Warm Gray) - Only 3.5:1 contrast - FAILS for body text

**These colors are for backgrounds and subtle accents ONLY.**

## Chem-Dry Brand Compliance

### âœ… Approved Phrases
- "The process used by Chem-Dry..."
- "The method used by Chem-Dry..."
- "Hot Carbonating Extraction"
- "The Natural® uses carbonation..."
- "uses about 80% less water" (always include modifier)
- "no dirt-attracting residue" (never just "no residue")

### âŒ Never Say
- âŒ "Chem-Dry's" (possessive form)
- âŒ "uses 80% less water" (without "about")
- âŒ "no residue" (must say "no dirt-attracting residue")
- âŒ "the natural" (must be "The Natural®")
- âŒ "all natural" or "green certified"

## Next Steps

1. **Review** the corrected color values and update any existing code
2. **Replace** any instances of `#A2958A` (wrong) with `#A29588` (correct)
3. **Verify** body text is using `#444444`, NOT Warm Gray
4. **Update** typography to use Inter (body) and Poppins (headlines)
5. **Test** color contrast for any new combinations
6. **Follow** Chem-Dry brand compliance guidelines for all content

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Brand Reference: [chem-dry-color-reference.md](chem-dry-color-reference.md)
- Design System: [design-system-reference-compliant.html](design-system-reference-compliant.html)
- Brand Utilities: [brand-utilities.css](brand-utilities.css)
- City Customization: [city-page-customization-guide.md](city-page-customization-guide.md)

## Critical Reminders

1. **Body text MUST use #444444** for readability and accessibility
2. **Warm Grays are decorative only** - never for text content
3. **Always include modifiers** with water usage claims ("about 80%")
4. **The Natural®** - proper capitalization and ® symbol required
5. **Button colors:** Primary = Secondary Green, Secondary = Navy, CTA = Gradient
