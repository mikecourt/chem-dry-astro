# Conversion Tracking Setup

This document describes the tracking data attributes implemented on the website for Google Tag Manager (GTM) integration.

## Overview

The site uses data attributes (`data-track`, `data-track-location`, `data-track-action`) to mark conversion points. These are passive - they require no JavaScript until GTM is configured. GTM will read these attributes via CSS selector triggers in Phase 7.

**Phone Number:** (480) 649-3663
**Tel Link Format:** `tel:4806493663`

---

## Trackable Events

### 1. Phone Clicks

**Attribute:** `data-track="phone-click"`

Tracks when users click phone number links to initiate calls.

| Location | data-track-location | Files |
|----------|---------------------|-------|
| Header notification | header | config.json (via notification) |
| Footer contact | footer | Footer.astro |
| Thank you page | thank-you | thank-you.astro |
| Phoenix hero | hero-phoenix | phoenix.astro |
| Phoenix services | services-phoenix | phoenix.astro |
| Phoenix ZIP codes | zipcode-phoenix | phoenix.astro |
| Phoenix FAQ | faq-phoenix | phoenix.astro |
| Phoenix bottom CTA | bottom-cta-phoenix | phoenix.astro |
| Mesa hero | hero-mesa | mesa.astro |
| Mesa neighborhoods | neighborhoods-mesa | mesa.astro |
| Mesa bottom CTA | bottom-cta-mesa | mesa.astro |
| Gilbert hero | hero-gilbert | gilbert.astro |
| Gilbert ZIP codes | zipcode-gilbert | gilbert.astro |
| Gilbert bottom CTA | bottom-cta-gilbert | gilbert.astro |
| Chandler hero | hero-chandler | chandler.astro |
| Chandler bottom CTA | bottom-cta-chandler | chandler.astro |
| Scottsdale hero | hero-scottsdale | scottsdale.astro |
| Scottsdale bottom CTA | bottom-cta-scottsdale | scottsdale.astro |
| Tempe hero | hero-tempe | tempe.astro |
| Tempe ZIP codes | zipcode-tempe | tempe.astro |
| Tempe bottom CTA | bottom-cta-tempe | tempe.astro |
| Queen Creek hero | hero-queen-creek | queen-creek.astro |
| Queen Creek ZIP codes | zipcode-queen-creek | queen-creek.astro |
| Queen Creek bottom CTA | bottom-cta-queen-creek | queen-creek.astro |

**GTM Trigger Configuration:**
- Trigger Type: Click - All Elements
- Trigger fires on: Some Clicks
- Conditions: Click Element matches CSS selector `[data-track="phone-click"]`

---

### 2. Form Submissions

**Attribute:** `data-track="quote-form"`

Tracks quote request forms across the site.

| Location | data-track-location | Form ID | File |
|----------|---------------------|---------|------|
| CTA section | cta-section | cta-form | CallToAction.astro |
| Footer | footer | (none) | Footer.astro |
| Contact page | contact-page | contact-form | contact.astro |
| Appointment page | appointment-page | appointment-form | appointment.astro |

**GTM Trigger Configuration:**
- Trigger Type: Form Submission (or Element Visibility on thank-you page)
- Trigger fires on: Some Forms
- Conditions: Form Element matches CSS selector `[data-track="quote-form"]`

**Alternative:** Use `form_submission_success` dataLayer event (see Data Layer Events below).

---

### 3. CTA Button Clicks

**Attribute:** `data-track="cta-click"`

Tracks interactions with call-to-action buttons.

| Action | data-track-action | Description |
|--------|-------------------|-------------|
| submit-quote | Submit quote form | CTA section, Footer |
| submit-contact | Submit contact form | Contact page |
| submit-appointment | Submit appointment form | Appointment page |
| navigate-appointment | Click to appointment page | Hero sections |
| navigate-form | Click to scroll to form | Hero sections |

**Location Examples:**
- `hero-phoenix`, `hero-mesa`, `hero-gilbert`, etc.
- `faq-phoenix`
- `bottom-cta-phoenix`, `bottom-cta-mesa`, etc.

**GTM Trigger Configuration:**
- Trigger Type: Click - All Elements
- Trigger fires on: Some Clicks
- Conditions: Click Element matches CSS selector `[data-track="cta-click"]`

---

## Data Layer Events

### form_submission_success

Fired on the `/thank-you` page after successful form submission.

**Location:** `src/pages/thank-you.astro`

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'form_submission_success',
  form_name: 'quote_request',
  conversion_type: 'lead'
});
```

**GTM Trigger Configuration:**
- Trigger Type: Custom Event
- Event name: `form_submission_success`
- This trigger fires on: All Custom Events

---

## Conversion Goals

| Goal | Trigger | Value | Priority |
|------|---------|-------|----------|
| Quote Form Submission | `form_submission_success` event on /thank-you | Primary | 1 |
| Phone Click | `[data-track="phone-click"]` click | Secondary | 2 |
| CTA Engagement | `[data-track="cta-click"]` click | Micro | 3 |

### Goal Hierarchy

1. **Primary Conversion:** Form submission (tracked via thank-you page dataLayer event)
2. **Secondary Conversion:** Phone calls (tracked via tel: link clicks)
3. **Micro Conversions:** CTA engagement (tracked for funnel analysis)

---

## GTM Variable Configuration

### Built-in Variables to Enable
- Click Element
- Click Classes
- Click ID
- Click URL
- Form Element
- Form Classes
- Form ID

### Custom Variables

**Click Data Track:**
- Variable Type: Data Layer Variable or DOM Element
- Element Attribute: `data-track`

**Click Data Track Location:**
- Variable Type: DOM Element
- Element Attribute: `data-track-location`

**Click Data Track Action:**
- Variable Type: DOM Element
- Element Attribute: `data-track-action`

---

## Tag Configuration Examples

### Phone Click Tag (Google Ads)

```
Tag Type: Google Ads Conversion Tracking
Conversion ID: [Your Conversion ID]
Conversion Label: [Your Phone Click Label]
Trigger: Phone Click Trigger
```

### Form Submission Tag (Google Ads)

```
Tag Type: Google Ads Conversion Tracking
Conversion ID: [Your Conversion ID]
Conversion Label: [Your Form Submit Label]
Trigger: form_submission_success Custom Event
```

### Google Analytics 4 Event Tag

```
Tag Type: GA4 Event
Event Name: generate_lead
Event Parameters:
  - form_name: {{Click Data Track Location}}
  - method: phone_click | form_submit
Trigger: Phone Click OR Form Submission
```

---

## Implementation Notes

1. **Data attributes are passive** - No JavaScript overhead until GTM is loaded
2. **GTM reads attributes via CSS selectors** - Use `[data-track="value"]` syntax
3. **All tracking happens client-side** after GTM loads
4. **Phone format standardized** to `tel:4806493663` (no +1 prefix)
5. **Consistent location naming** follows pattern: `section-city` (e.g., `hero-phoenix`)

---

## Testing Checklist

Before enabling GTM tags in production:

- [ ] Verify all phone links fire `phone-click` events in GTM Preview
- [ ] Verify form submissions trigger `form_submission_success` on thank-you page
- [ ] Verify CTA clicks fire `cta-click` events with correct location/action
- [ ] Test on mobile devices (phone clicks should initiate dialer)
- [ ] Confirm no duplicate events are firing
- [ ] Validate conversion tracking in Google Ads test mode

---

## Future Enhancements (Phase 7)

When implementing GTM:

1. Add GTM container snippet to site
2. Create triggers based on data attributes
3. Configure Google Ads conversion tags
4. Set up GA4 event tracking
5. Enable enhanced conversions if applicable
6. Test thoroughly in GTM Preview mode
7. Publish and monitor conversions

---

## File Reference

| File | Tracking Elements |
|------|-------------------|
| `src/layouts/components/CustomButton.astro` | Accepts tracking props |
| `src/layouts/partials/Header.astro` | Header phone link |
| `src/layouts/partials/Footer.astro` | Footer phone + form |
| `src/layouts/partials/CallToAction.astro` | CTA form + submit |
| `src/pages/thank-you.astro` | dataLayer event |
| `src/pages/contact.astro` | Contact form + submit |
| `src/pages/appointment.astro` | Appointment form + submit |
| `src/pages/phoenix.astro` | City page CTAs |
| `src/pages/mesa.astro` | City page CTAs |
| `src/pages/gilbert.astro` | City page CTAs |
| `src/pages/chandler.astro` | City page CTAs |
| `src/pages/scottsdale.astro` | City page CTAs |
| `src/pages/tempe.astro` | City page CTAs |
| `src/pages/queen-creek.astro` | City page CTAs |
