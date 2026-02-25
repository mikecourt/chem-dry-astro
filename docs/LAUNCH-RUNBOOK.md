# Initial Launch Runbook

## Deployment target

- Hosting target: **Vercel**
- Adapter: `@astrojs/vercel` (configured in `astro.config.mjs`)

## Prelaunch checklist

- Verify dependencies are installed: `npm ci`
- Verify static/type checks: `npm run check`
- Verify production build: `npm run build`
- Confirm no internal broken links in navigation/service cards/city pages
- Confirm URL parity matrix in `docs/LAUNCH-URL-MATRIX.md`
- Confirm forms post to `/api/contact` and redirect to `/thank-you`
- Confirm primary above-the-fold CTA is click-to-call
- Confirm phone/event tracking attributes exist on phone links and CTA buttons
- Confirm sitemap and robots are available in build output

## Analytics checks (GTM)

- Set valid GTM container ID in `src/config/config.json` before production publish.
- Enable GTM by setting:
  - `"google_tag_manager": { "enable": true, "gtm_id": "GTM-XXXXXXX" }`
- Validate in GTM preview:
  - `phone-click`
  - `quote-form`
  - `cta-click`
  - `form_submission_success` on `/thank-you`

## Cutover steps

1. Deploy release candidate to Vercel preview and run smoke checks.
2. Validate redirect behavior for high-value legacy URLs.
3. Validate lead flow:
   - Header call CTA
   - Hero call CTA
   - Footer form submit
   - Contact and appointment form submits
4. Promote preview to production.
5. Monitor first 24 hours:
   - 404 rate
   - Form API errors
   - Conversion events

## Rollback plan

1. Keep prior production deployment available in Vercel.
2. If conversion-critical issue occurs, revert to previous deployment.
3. Re-validate phone CTA and form endpoint before re-promoting.
