# Phone Link Implementation Audit

**Date:** 2025-01-15
**Purpose:** Document all phone number implementations across the site for tracking standardization.

## Summary

- **Total Phone Link Implementations:** 45+
- **Tel: Protocol Usage:** Mixed (some use `tel:4806493663`, others `tel:+14806493663`)
- **Tracking Attributes:** Only thank-you page has tracking attributes
- **Consistency Issues:** Format variations in tel: links

---

## Phone Link Inventory

### Global Components

#### Header.astro (src/layouts/partials/Header.astro)
| Line | Implementation | Context | Mobile Visible | Has Tracking |
|------|----------------|---------|----------------|--------------|
| N/A | No direct phone link | Phone in notification bar via config | Yes | No |

**Note:** Phone number comes from `src/config/config.json` line 33-34:
```json
"link": "tel:+1-480-649-3663",
"label": "Call Us: (480) 649-3663"
```

#### Footer.astro (src/layouts/partials/Footer.astro)
| Line | Implementation | Context | Mobile Visible | Has Tracking |
|------|----------------|---------|----------------|--------------|
| 46 | `<a href="tel:+14806493663">` | Contact info section | Yes | No |

#### CallToAction.astro (src/layouts/partials/CallToAction.astro)
| Line | Implementation | Context | Mobile Visible | Has Tracking |
|------|----------------|---------|----------------|--------------|
| 243 | Text only in alert | Error message fallback | Yes | N/A (text only) |

---

### City Pages

#### phoenix.astro (src/pages/phoenix.astro)
| Line | Implementation | Context | Mobile Visible | Has Tracking |
|------|----------------|---------|----------------|--------------|
| 300 | `link="tel:4806493663"` | Hero CTA button | Yes | No |
| 663 | `link="tel:4806493663"` | Services section CTA | Yes | No |
| 787 | `link="tel:4806493663"` | ZIP code section CTA | Yes | No |
| 964 | `<a href="tel:4806493663">` | Inline text link | Yes | No |
| 968 | `link="tel:4806493663"` | CustomButton | Yes | No |
| 1009 | `link="tel:4806493663"` | FAQ section CTA | Yes | No |

**Note:** Phoenix uses `tel:4806493663` (no +1 prefix)

#### mesa.astro (src/pages/mesa.astro)
| Line | Implementation | Context | Mobile Visible | Has Tracking |
|------|----------------|---------|----------------|--------------|
| 117 | `link="tel:+14806493663"` | Hero CTA button | Yes | No |
| 642 | `link="tel:+14806493663"` | Mid-page CTA | Yes | No |
| 867 | `link="tel:+14806493663"` | Bottom CTA | Yes | No |

**Note:** Mesa uses `tel:+14806493663` (with +1 prefix)

#### gilbert.astro (src/pages/gilbert.astro)
| Line | Implementation | Context | Mobile Visible | Has Tracking |
|------|----------------|---------|----------------|--------------|
| 124 | `link="tel:+14806493663"` | Hero CTA button | Yes | No |
| 495 | `<a href="tel:+14806493663">` | ZIP code inline link | Yes | No |
| 719 | `link="tel:+14806493663"` | Bottom CTA | Yes | No |

#### chandler.astro (src/pages/chandler.astro)
| Line | Implementation | Context | Mobile Visible | Has Tracking |
|------|----------------|---------|----------------|--------------|
| 117 | `link="tel:+14806493663"` | Hero CTA button | Yes | No |
| 761 | `link="tel:+14806493663"` | Bottom CTA | Yes | No |

#### scottsdale.astro (src/pages/scottsdale.astro)
| Line | Implementation | Context | Mobile Visible | Has Tracking |
|------|----------------|---------|----------------|--------------|
| 117 | `link="tel:+14806493663"` | Hero CTA button | Yes | No |
| 722 | `link="tel:+14806493663"` | Bottom CTA | Yes | No |

#### tempe.astro (src/pages/tempe.astro)
| Line | Implementation | Context | Mobile Visible | Has Tracking |
|------|----------------|---------|----------------|--------------|
| 117 | `link="tel:+14806493663"` | Hero CTA button | Yes | No |
| 539 | `<a href="tel:+14806493663">` | Inline text link | Yes | No |
| 768 | `link="tel:+14806493663"` | Bottom CTA | Yes | No |

#### queen-creek.astro (src/pages/queen-creek.astro)
| Line | Implementation | Context | Mobile Visible | Has Tracking |
|------|----------------|---------|----------------|--------------|
| 116 | `link="tel:+14806493663"` | Hero CTA button | Yes | No |
| 487 | `<a href="tel:+14806493663">` | ZIP code inline link | Yes | No |
| 724 | `link="tel:+14806493663"` | Bottom CTA | Yes | No |

---

### Service Pages

#### carpet-cleaning.astro
| Line | Implementation | Context | Has Tracking |
|------|----------------|---------|--------------|
| 123 | `link="tel:+14806493663"` | Hero CTA | No |

#### upholstery-cleaning.astro
| Line | Implementation | Context | Has Tracking |
|------|----------------|---------|--------------|
| 123 | `link="tel:+14806493663"` | Hero CTA | No |
| 671 | `link="tel:+14806493663"` | Mid-page CTA | No |

#### tile-and-grout-cleaning.astro
| Line | Implementation | Context | Has Tracking |
|------|----------------|---------|--------------|
| 123 | `link="tel:+14806493663"` | Hero CTA | No |

#### leather-cleaning.astro
| Line | Implementation | Context | Has Tracking |
|------|----------------|---------|--------------|
| 123 | `link="tel:+14806493663"` | Hero CTA | No |

#### granite-countertop-renewal.astro
| Line | Implementation | Context | Has Tracking |
|------|----------------|---------|--------------|
| 123 | `link="tel:+14806493663"` | Hero CTA | No |

#### dryer-vent-cleaning.astro
| Line | Implementation | Context | Has Tracking |
|------|----------------|---------|--------------|
| 123 | `link="tel:+14806493663"` | Hero CTA | No |

#### stone-tile-cleaning-polishing.astro
| Line | Implementation | Context | Has Tracking |
|------|----------------|---------|--------------|
| 123 | `link="tel:+14806493663"` | Hero CTA | No |
| 531 | `link="tel:+14806493663"` | Mid-page CTA | No |

---

### Special Pages

#### thank-you.astro (src/pages/thank-you.astro)
| Line | Implementation | Context | Has Tracking |
|------|----------------|---------|--------------|
| 31 | `href="tel:4806493663"` | Primary phone link | **YES** |

**Tracking attributes present:**
```html
data-track="phone-click"
data-track-location="thank-you"
```

#### contact.astro (src/pages/contact.astro)
| Line | Implementation | Context | Has Tracking |
|------|----------------|---------|--------------|
| 160 | Text only in alert | Error message fallback | N/A |

#### appointment.astro (src/pages/appointment.astro)
| Line | Implementation | Context | Has Tracking |
|------|----------------|---------|--------------|
| 169 | Text only in alert | Error message fallback | N/A |

---

### Content Files

#### src/config/config.json
| Line | Implementation | Context |
|------|----------------|---------|
| 24 | `"phone": "(480) 649-3663"` | Site-wide phone display |
| 33 | `"link": "tel:+1-480-649-3663"` | Notification bar link |
| 34 | `"label": "Call Us: (480) 649-3663"` | Notification bar label |

#### src/content/homepage/-index.md
| Line | Implementation | Context |
|------|----------------|---------|
| 7-8 | `link: "tel:+1-480-649-3663"` | Hero button |

#### src/content/sections/call-to-action.md
| Line | Implementation | Context |
|------|----------------|---------|
| 9-10 | `link: "tel:+14806493663"` | CTA button |
| 15 | `link: "sms:+14806493663?body=..."` | SMS button |

#### src/layouts/components/homepage/About.astro
| Line | Implementation | Context |
|------|----------------|---------|
| 141-142 | `link="tel:+14806493663"` | About section CTA |

---

## Issues Identified

### 1. Tel: Link Format Inconsistency
Three different formats in use:
- `tel:4806493663` (Phoenix page, thank-you page)
- `tel:+14806493663` (Most city/service pages)
- `tel:+1-480-649-3663` (config.json, content files)

**Recommendation:** Standardize to `tel:4806493663` (simplest, works universally)

### 2. No Tracking Attributes
Only `thank-you.astro` has tracking attributes. All other 40+ phone links lack:
- `data-track="phone-click"`
- `data-track-location="[location]"`

### 3. CustomButton Component Lacks Tracking Support
The `CustomButton.astro` component doesn't accept tracking data attributes as props. Need to either:
- Add `data_track` and `data_track_location` props to component
- Add tracking directly to inline phone links

---

## Recommended Actions

1. **Update CustomButton.astro** to support tracking attributes
2. **Standardize tel: link format** to `tel:4806493663`
3. **Add tracking to all phone links** with appropriate location identifiers
4. **Add tracking to forms and CTAs** for comprehensive conversion tracking

---

## Form Inventory (for Task 3)

| File | Form ID | Location |
|------|---------|----------|
| Footer.astro:81 | (none) | Footer estimate form |
| CallToAction.astro:74 | `cta-form` | CTA section |
| contact.astro:46 | `contact-form` | Contact page |
| appointment.astro:46 | `appointment-form` | Appointment page |

---

## CTA Button Inventory (for Task 3)

Key CTA buttons that need tracking:
- Hero section phone buttons (all city pages)
- Hero section "Schedule Online" buttons
- "Get Free Quote" buttons throughout site
- Mid-page CTA buttons on service pages
