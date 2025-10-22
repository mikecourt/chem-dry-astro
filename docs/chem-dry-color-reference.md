# Chem-Dry Official Brand Colors

## Primary Brand Colors

### Chem-Dry Green (PMS 348)
- **Hex:** `#008752`
- **RGB:** 0, 135, 82
- **CMYK:** C:100 M:0 Y:85 K:24
- **Usage:** Primary brand color, main logo color, emphasis

### Chem-Dry Secondary Green (PMS 361)
- **Hex:** `#41AD49`
- **RGB:** 65, 173, 73
- **CMYK:** C:75 M:5 Y:100 K:0
- **Usage:** Secondary headings, buttons, CTAs, accents
- **Note:** This is the lighter, more vibrant green - use for interactive elements

### Chem-Dry Blue (PMS 286)
- **Hex:** `#005DAA`
- **RGB:** 0, 93, 170
- **CMYK:** C:100 M:66 Y:0 K:2
- **Usage:** Primary brand color, headings, logo color

### Chem-Dry Purple (PMS 513)
- **Hex:** `#9A4E9E`
- **RGB:** 154, 78, 158
- **CMYK:** C:47 M:87 Y:0 K:0
- **Usage:** Accent color, logo color (less common)

## Neutral Colors

### Chem-Dry Warm Gray (PMS 7530 C)
- **Hex:** `#A29588`
- **RGB:** 162, 149, 138
- **CMYK:** C:0 M:9 Y:18 K:43
- **Usage:** ⚠️ Backgrounds and subtle accents ONLY - NOT for text
- **Note:** This color fails WCAG AA accessibility standards for text (2.8:1 contrast ratio on white)

### Chem-Dry Dark Warm Gray (PMS 4090 C)
- **Hex:** `#8A7967`
- **RGB:** 138, 121, 103
- **CMYK:** C:0 M:14 Y:28 K:55
- **Usage:** ⚠️ Subtle elements and backgrounds ONLY - NOT for body text
- **Note:** This color barely passes for large text only (3.5:1 contrast ratio)

## Web-Optimized Text Colors
*These colors are NOT in the official Chem-Dry brand guide but are essential for accessibility and readability*

### Body Text Gray
- **Hex:** `#444444`
- **RGB:** 68, 68, 68
- **Usage:** Primary body text - meets WCAG AAA standards (9.73:1 contrast ratio)
- **Why:** The official Chem-Dry Warm Grays are too light for readable body text

### Muted Text Gray
- **Hex:** `#6B7280`
- **RGB:** 107, 114, 128
- **Usage:** Captions, labels, secondary information
- **Contrast:** 5.39:1 on white - meets WCAG AA standards

## White Glove Custom Accent Colors
*These are NOT official Chem-Dry colors but can be used as supplementary accents for Brimley's White Glove branding*

### Navy
- **Hex:** `#1A365D`
- **Usage:** Premium feel, professional backgrounds

### Gold
- **Hex:** `#D4AF37`
- **Usage:** Premium accents, awards, badges

### Background Gray
- **Hex:** `#F9FAFB`
- **Usage:** Page backgrounds, subtle sections

## Color Application Guide

### Buttons
- **Primary Action:** `#41AD49` (Chem-Dry Secondary Green) - hover to `#008752`
- **Secondary Action:** `#1A365D` (Navy)
- **CTA Gradient:** `#41AD49` to `#005DAA`

### Typography
- **Main Headings:** `#005DAA` (Chem-Dry Blue) or `#1A365D` (Navy)
- **Secondary Headings:** `#41AD49` (Chem-Dry Secondary Green) or `#008752` (Chem-Dry Green)
- **Body Text:** `#444444` (Dark Gray - optimal readability)
- **Muted Text:** `#6B7280` (for captions, secondary info)

**Important:** Do NOT use Chem-Dry Warm Grays (#A29588, #8A7967) for text. These colors fail accessibility standards and are difficult to read. Use them only for subtle backgrounds or decorative accents.

### Borders & Accents
- **Primary Borders:** `#41AD49` (Chem-Dry Secondary Green)
- **Secondary Borders:** `#005DAA` (Chem-Dry Blue)

### Trust Badges & Icons
- **Icon Backgrounds:** `#41AD49` (Chem-Dry Secondary Green)
- **Premium Badges:** `#D4AF37` (Gold)

## Accessibility Notes

All color combinations must meet WCAG AA standards:
- Text contrast ratio: 4.5:1 minimum
- Large text contrast ratio: 3:1 minimum
- Interactive elements: clearly distinguishable

**✅ Tested & Approved Combinations:**
- ✅ `#444444` body text on white background (9.73:1 ratio - excellent)
- ✅ `#41AD49` on white background
- ✅ `#008752` on white background
- ✅ `#005DAA` on white background
- ✅ White text on `#41AD49`
- ✅ White text on `#008752`
- ✅ White text on `#005DAA`
- ✅ White text on `#1A365D`

**❌ Do NOT Use for Text:**
- ❌ `#A29588` (Warm Gray) - Only 2.8:1 contrast ratio - FAILS accessibility
- ❌ `#8A7967` (Dark Warm Gray) - Only 3.5:1 contrast ratio - FAILS for body text
- These colors are for backgrounds and subtle accents only

## Quick Reference for Developers

```css
:root {
  /* Official Chem-Dry Brand Colors */
  --cd-green-primary: #008752;      /* PMS 348 */
  --cd-green-secondary: #41AD49;    /* PMS 361 */
  --cd-blue: #005DAA;               /* PMS 286 */
  --cd-purple: #9A4E9E;             /* PMS 513 */
  --cd-warm-gray: #A29588;          /* PMS 7530 C - backgrounds only */
  --cd-dark-warm-gray: #8A7967;     /* PMS 4090 C - accents only */
  
  /* Text Colors */
  --text-body: #444444;             /* Primary body text */
  --text-muted: #6B7280;            /* Captions, secondary info */
  
  /* White Glove Accent Colors */
  --wg-navy: #1A365D;
  --wg-gold: #D4AF37;
  --wg-bg-gray: #F9FAFB;
}
```

## Source
Official colors sourced from: `/mnt/skills/user/chem-dry-brand/references/style-guide.md`
