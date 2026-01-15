# Phase 3: Quote Form & Conversion Flow - Context

**Gathered:** 2026-01-15
**Status:** Ready for planning (plans need revision)

<vision>
## How This Should Work

When someone submits a quote request, it goes directly into GHL (Go High Level) CRM where automated follow-up sequences trigger immediately. No manual email checking, no copy-pasting leads — the form submission kicks off the entire sales automation pipeline.

The key insight: this isn't just a "contact form" — it's the entry point to the lead automation system. Speed to lead matters in carpet cleaning. The business already runs on GHL, so the website needs to feed leads directly into that existing system.

</vision>

<essential>
## What Must Be Nailed

- **Speed to lead** — Automated follow-up starts IMMEDIATELY when form submits. No delays, no manual steps.
- **Lead quality** — Capture enough information to qualify leads before calling (zip code, service type, contact info)
- **Conversion tracking** — Know which pages and cities generate the best leads so marketing can be optimized

All three are equally important for the business.

</essential>

<boundaries>
## What's Out of Scope

No explicit exclusions identified. Open to including:
- GHL webhook/API integration
- Phone tracking if it makes sense
- Analytics/GTM setup if it fits the phase

The scope is flexible — whatever gets leads flowing properly into GHL.

</boundaries>

<specifics>
## Specific Ideas

- **GHL is already set up** — Active account with workflows/automations ready to receive leads
- **Implementation flexibility** — Whether embedded GHL form, custom form to GHL API, or popup modal — method doesn't matter as long as leads get to GHL properly
- **Netlify Forms is NOT the right choice** — Original plans used Netlify Forms which would require extra work to pipe data into GHL. Direct GHL integration is better.

</specifics>

<notes>
## Additional Context

The original Phase 3 plans (03-01, 03-02, 03-03) were created using Netlify Forms before this context was gathered. Those plans need to be revised to use GHL integration instead.

Options for GHL integration:
1. Embedded GHL form (simplest — GHL handles everything)
2. Custom form → GHL webhook (keep site styling, POST to GHL)
3. GHL JavaScript SDK integration

Research needed: How does GHL form embedding work? What's the webhook format?

</notes>

---

*Phase: 03-quote-form-conversion-flow*
*Context gathered: 2026-01-15*
