# Brimley's White Glove Chem-Dry Design System Guide

## Table of Contents
1. [Overview](#overview)
2. [Brand Guidelines](#brand-guidelines)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Components](#components)
6. [Layout System](#layout-system)
7. [SEO Best Practices](#seo-best-practices)
8. [Performance Optimization](#performance-optimization)

---

## Overview

This design system provides a comprehensive foundation for building the Brimley's White Glove Chem-Dry website. It follows the video optimization strategy for high-converting, SEO-optimized local business websites.

### Design Philosophy
- **Mobile-first**: All components are designed and tested for mobile devices first
- **Conversion-focused**: Every element is designed to guide users toward contacting the business
- **Performance-optimized**: Fast loading times are critical for both UX and SEO
- **Brand-compliant**: Strictly follows Chem-Dry brand guidelines

---

## Brand Guidelines

### Chem-Dry Brand Compliance

**CRITICAL RULES:**
1. Never use "Chem-Dry's" (possessive form)
2. Water usage: Always say "about 80%" (include modifier)
3. Never say "no residue" → Always "no dirt-attracting residue"
4. The Natural® - proper capitalization and ® symbol
5. Never say "all natural" or "green certified"

**Approved Phrases:**
- "The process used by Chem-Dry..."
- "The method used by Chem-Dry..."
- "Hot Carbonating Extraction"
- "The Natural® uses carbonation for a better clean and a healthier home"

### White Glove Sub-Brand
- **Name**: Brimley's White Glove Chem-Dry
- **Positioning**: Premium, family-owned service with attention to detail
- **Tone**: Professional, trustworthy, warm, locally-focused

---

## Color System

### Primary Brand Colors

#### Chem-Dry Green
```css
--color-chem-dry-green: #8CC63F;
--color-chem-dry-green-light: #A8D96E;
--color-chem-dry-green-dark: #6FA32D;
```
**Usage**: Primary CTAs, success states, brand accents

#### Chem-Dry Blue
```css
--color-chem-dry-blue: #009DDC;
--color-chem-dry-blue-light: #33B1E5;
--color-chem-dry-blue-dark: #007AB3;
```
**Usage**: Links, informational elements, secondary CTAs

### White Glove Accent Colors

#### Navy
```css
--color-navy: #1A365D;
--color-navy-light: #2D4A73;
--color-navy-dark: #0F1F3A;
```
**Usage**: Headers, premium elements, text

#### Gold
```css
--color-gold: #D4AF37;
--color-gold-light: #E5C158;
--color-gold-dark: #B8941F;
```
**Usage**: Special offers, premium badges, accent elements

### Semantic Colors
- **Success**: `#8CC63F` (Chem-Dry Green)
- **Info**: `#009DDC` (Chem-Dry Blue)
- **Warning**: `#F59E0B`
- **Danger**: `#EF4444`

### Color Combinations

**High Contrast for Accessibility:**
- Navy text on white background
- White text on navy background
- Green text on white (use for CTAs)

**Avoid:**
- Gold on white (low contrast)
- Light blue on white (low contrast)
- Green on blue (brand conflict)

---

## Typography

### Font Families

#### Heading Font - Poppins
```css
font-family: 'Poppins', system-ui, sans-serif;
```
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
- **Use for**: H1-H6, buttons, navigation, card titles
- **Why**: Professional, modern, trustworthy

#### Body Font - Inter
```css
font-family: 'Inter', system-ui, sans-serif;
```
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Use for**: Paragraphs, lists, form inputs, general text
- **Why**: Highly readable, optimized for screens

### Type Scale (Mobile-First)

```css
--text-xs: 0.75rem;      /* 12px - Small labels */
--text-sm: 0.875rem;     /* 14px - Secondary text */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Large body */
--text-xl: 1.25rem;      /* 20px - Small headings */
--text-2xl: 1.5rem;      /* 24px - H4 */
--text-3xl: 1.875rem;    /* 30px - H3 */
--text-4xl: 2.25rem;     /* 36px - H2 */
--text-5xl: 3rem;        /* 48px - H1 */
--text-6xl: 3.75rem;     /* 60px - Hero H1 */
```

### Responsive Typography

```css
/* Mobile */
h1 { font-size: var(--text-4xl); }
h2 { font-size: var(--text-3xl); }

/* Tablet (768px+) */
h1 { font-size: var(--text-5xl); }
h2 { font-size: var(--text-4xl); }

/* Desktop (1024px+) */
h1 { font-size: var(--text-6xl); }
```

---

## Components

### Buttons

#### Primary Button (CTA)
```html
<button class="btn btn-primary">
  Schedule Now
</button>
```
- **Background**: Chem-Dry Green (#8CC63F)
- **Text**: White
- **Use for**: Primary actions (call, quote, schedule)

#### Secondary Button
```html
<button class="btn btn-secondary">
  Learn More
</button>
```
- **Background**: Navy (#1A365D)
- **Text**: White
- **Use for**: Secondary actions

#### CTA Button (Special)
```html
<button class="btn btn-cta">
  Call Now: (480) 555-0100
</button>
```
- **Background**: Green-to-blue gradient
- **Text**: White
- **Use for**: Hero CTAs, phone numbers

#### Button Sizes
```html
<button class="btn btn-sm">Small</button>
<button class="btn">Regular</button>
<button class="btn btn-lg">Large</button>
```

### Cards

#### Basic Card
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here...</p>
  </div>
</div>
```

#### Service Card
```html
<div class="card card-service">
  <div class="card-service-icon">
    <!-- Icon SVG -->
  </div>
  <h3>Service Name</h3>
  <p>Service description...</p>
  <a href="#" class="btn">Learn More</a>
</div>
```

### Forms

#### Contact Form
```html
<form class="quote-form">
  <div class="form-group">
    <label class="form-label" for="name">Full Name *</label>
    <input class="form-input" type="text" id="name" required />
  </div>
  
  <div class="form-group">
    <label class="form-label" for="phone">Phone *</label>
    <input class="form-input" type="tel" id="phone" required />
  </div>
  
  <button type="submit" class="btn btn-cta">
    Get Free Quote
  </button>
</form>
```

### Trust Badges

```html
<div class="trust-badges">
  <div class="trust-badge">
    <div class="trust-badge-icon">✓</div>
    <div class="trust-badge-text">
      <div class="trust-badge-title">Certified & Insured</div>
      <div class="trust-badge-description">Fully licensed professionals</div>
    </div>
  </div>
</div>
```

### Testimonials

```html
<div class="testimonial">
  <div class="testimonial-quote">
    Great service! Our carpets look amazing...
  </div>
  <div class="testimonial-author">
    <div class="testimonial-author-name">Sarah M.</div>
    <div class="testimonial-author-location">Phoenix, AZ</div>
  </div>
</div>
```

---

## Layout System

### Container
```html
<div class="container">
  <!-- Content with max-width and responsive padding -->
</div>
```
- Max-width: 1280px
- Padding: 1rem mobile, 1.5rem tablet, 2rem desktop

### Sections
```html
<section class="section">
  <!-- Standard section with padding -->
</section>

<section class="section section-alt">
  <!-- Alternate background color -->
</section>

<section class="section-hero">
  <!-- Hero-specific styling -->
</section>
```

### Grid System
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

---

## SEO Best Practices

### Page Structure
1. **One H1 per page** with city name and service
2. **H2 for major sections** (2-3 should include city name)
3. **H3 for subsections**
4. **Semantic HTML** (header, nav, main, section, article, footer)

### Meta Tags Template
```html
<title>Carpet Cleaning in [CITY], AZ | Brimley's White Glove Chem-Dry</title>
<meta name="description" content="Professional carpet cleaning in [CITY], AZ. Hot Carbonating Extraction uses about 80% less water, dries in 1-2 hours. Family-owned, 25+ years experience. Free quote!" />
```

### Schema Markup
Include LocalBusiness and Service schema on every page (see BaseLayout.astro)

### Internal Linking
- Link to related service pages
- Link to other city pages
- Use descriptive anchor text
- Include breadcrumbs on deep pages

### Image Optimization
```html
<img 
  src="/images/carpet-cleaning.webp"
  alt="Professional carpet cleaning in Phoenix, AZ showing before and after results"
  width="800"
  height="600"
  loading="lazy"
/>
```

---

## Performance Optimization

### Critical CSS
Load design-system.css in the `<head>` for above-the-fold content

### Font Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### Image Formats
1. **WebP** for photos (best compression)
2. **SVG** for icons and logos
3. **PNG** only when transparency required

### Lazy Loading
```html
<img loading="lazy" ... />
```

### Minification
- CSS: Minified in production build
- JS: Minified in production build
- HTML: Minified via Astro build process

---

## Quick Start Checklist

✅ **Before Creating a New Page:**
1. Read Chem-Dry brand guidelines
2. Review city customization guide
3. Check design tokens for colors/spacing
4. Use semantic HTML structure
5. Include schema markup
6. Optimize images
7. Test mobile-first
8. Verify accessibility

✅ **Before Publishing:**
1. Run PageSpeed Insights
2. Check all links work
3. Verify meta tags
4. Test form submissions
5. Check mobile responsiveness
6. Validate HTML
7. Test on multiple browsers
8. Verify schema markup

---

## Resources

- **Chem-Dry Brand Skill**: `/mnt/skills/user/chem-dry-brand/SKILL.md`
- **City Customization Guide**: `city-page-customization-guide.md`
- **Design Tokens**: `design-tokens.json`
- **Tailwind Config**: `tailwind.config.mjs`

---

## Support

For questions about:
- **Brand compliance**: Check Chem-Dry brand skill
- **City pages**: Reference customization guide
- **Technical issues**: Check Astro documentation
- **Design decisions**: Review this guide

**Remember**: Every decision should prioritize conversion, speed, and brand compliance.
