# Phase 3: Quote Form & Conversion Flow - Research

**Researched:** 2026-01-15
**Domain:** GoHighLevel (GHL) CRM integration for lead capture
**Confidence:** HIGH

<research_summary>
## Summary

Researched GoHighLevel ecosystem for integrating website quote forms directly into the GHL CRM. The standard approach is to use the **GHL API v2 with Private Integration Tokens (PIT)** to create contacts, which automatically triggers GHL workflow automations for speed-to-lead.

Three integration approaches are viable:
1. **Embedded GHL Form** - GHL hosts form UI, handles submission. Simplest but least styling control.
2. **Custom Form → GHL API** - POST to `services.leadconnectorhq.com/contacts/` using PIT. Requires server-side endpoint (can't expose token in browser).
3. **Custom Form → GHL Inbound Webhook** - POST to GHL's inbound webhook URL. Triggers workflows directly. Premium feature ($97+/month plans).

Key finding: The existing CallToAction.astro form UI is complete — only the backend integration is missing (currently points to non-existent `/api/contact`). The simplest path is converting the form to use GHL API via a serverless function.

**Primary recommendation:** Use Custom Form → GHL API (Option 2) with Vercel/Netlify serverless function. This preserves site styling, keeps PIT server-side, and creates contacts that trigger existing GHL automations.
</research_summary>

<standard_stack>
## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| GHL API v2 | 2021-07-28 | Contact creation, CRM integration | Official API, replaces deprecated v1 |
| Private Integration Token | N/A | Authentication | Recommended over API keys (deprecated) |
| Astro API Routes | 5.x | Server-side form handling | Native to project stack |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Vercel Serverless | N/A | API endpoint hosting | Already deployed on Vercel |
| GHL MCP Server | Latest | Direct GHL operations from Claude | Development/testing/automation |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom Form + API | Embedded GHL Form | Simpler but loses site styling |
| API Direct Call | GHL Inbound Webhook | Webhook is simpler but requires premium plan |
| Vercel Function | Netlify Function | Either works, Vercel already in use |

### Configuration Required
```bash
# Environment variables needed
GHL_PRIVATE_INTEGRATION_TOKEN=pit-c135be07-6afd-46e9-9ec5-b2de2274ae43
GHL_LOCATION_ID=whWiJKEKIxuVxPacF4g2
```
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Recommended Project Structure
```
src/
├── pages/
│   └── api/
│       └── contact.ts      # Serverless endpoint for GHL
├── layouts/
│   └── partials/
│       └── CallToAction.astro  # Existing form UI (keep as-is)
└── lib/
    └── ghl.ts              # GHL API helper (optional)
```

### Pattern 1: Astro API Route → GHL Contact Creation
**What:** Server-side endpoint that receives form data and creates GHL contact
**When to use:** Primary pattern for custom forms
**Example:**
```typescript
// src/pages/api/contact.ts
export const prerender = false;
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const contact = {
    firstName: data.get("name")?.toString().split(" ")[0] || "",
    lastName: data.get("name")?.toString().split(" ").slice(1).join(" ") || "",
    email: data.get("email"),
    phone: data.get("phone"),
    address1: "",
    postalCode: data.get("zipcode"),
    locationId: import.meta.env.GHL_LOCATION_ID,
    source: "Website Quote Form",
    tags: ["website-lead", "quote-request"],
    customFields: [
      { key: "services_requested", field_value: data.get("services") }
    ]
  };

  const response = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.GHL_PRIVATE_INTEGRATION_TOKEN}`,
      "Content-Type": "application/json",
      "Version": "2021-07-28"
    },
    body: JSON.stringify(contact)
  });

  if (response.ok) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Failed to submit" }), { status: 500 });
};
```

### Pattern 2: Client-Side Progressive Enhancement
**What:** JavaScript intercepts form submission for better UX
**When to use:** With Pattern 1 for no-refresh submission
**Example:**
```javascript
// In CallToAction.astro <script>
const form = document.getElementById('cta-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      window.location.href = '/thank-you';
    }
  } catch (error) {
    // Fallback: regular form submission
    form.submit();
  }
});
```

### Pattern 3: Embedded GHL Form (Alternative)
**What:** Replace custom form with GHL-hosted embed
**When to use:** If API approach is blocked or for faster MVP
**Example:**
```html
<!-- Inline embed from GHL Form Builder > Integrate tab -->
<script src="https://link.msgsndr.com/js/form_embed.js"></script>
<iframe
  src="https://api.leadconnectorhq.com/widget/form/FORM_ID"
  style="width:100%;height:100%;border:none;border-radius:3px"
  id="inline-FORM_ID"
  data-layout="{'id':'INLINE'}"
  data-trigger-type="alwaysShow"
></iframe>
```

### Anti-Patterns to Avoid
- **Exposing PIT in client-side JavaScript:** Token must stay server-side only
- **Using deprecated V1 API keys:** V1 is end-of-support, use PIT with V2
- **Ignoring CORS:** Browser can't call GHL API directly, need server proxy
- **Synchronous form submission:** Always use async with loading states
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Contact creation | Custom CRM storage | GHL API `POST /contacts/` | GHL already handles deduplication, automation triggers |
| Lead notifications | Email/SMS sending logic | GHL Workflows | Workflows already configured in GHL account |
| Form validation | Complex server validation | HTML5 + minimal server | Browser handles most, GHL handles edge cases |
| Token management | Custom auth system | PIT with env vars | GHL provides secure, rotatable tokens |
| Analytics tracking | Custom event logging | GHL + GTM data layer | GHL has built-in attribution, add GTM for site analytics |

**Key insight:** GHL is already set up with workflows and automations. The website's job is only to create the contact record — GHL handles everything from there. Don't duplicate CRM functionality.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Token Exposure
**What goes wrong:** PIT exposed in browser, leads to unauthorized API access
**Why it happens:** Calling GHL API directly from frontend JavaScript
**How to avoid:** Always proxy through server-side endpoint (Astro API route, Vercel function)
**Warning signs:** PIT visible in browser Network tab, CORS errors

### Pitfall 2: Duplicate Contact Creation
**What goes wrong:** Same person submits twice, creates duplicate records
**Why it happens:** No loading state, user clicks submit multiple times
**How to avoid:** Disable submit button during processing, show loading state
**Warning signs:** Multiple identical contacts in GHL with same timestamp

### Pitfall 3: Missing Required Fields
**What goes wrong:** GHL API returns 400 error
**Why it happens:** `locationId` missing or email/phone not provided
**How to avoid:** Always include `locationId`, require email OR phone
**Warning signs:** Form appears to submit but no contact created

### Pitfall 4: Form Action URL Mismatch
**What goes wrong:** Form POST goes to wrong endpoint or 404
**Why it happens:** Astro API route not configured, prerender not disabled
**How to avoid:** Add `export const prerender = false;` to API route, verify endpoint exists
**Warning signs:** 404 on form submit, page refresh instead of AJAX

### Pitfall 5: Embed Code Updates Not Applied
**What goes wrong:** Changes to GHL form don't reflect on website
**Why it happens:** Embed codes are static — changes require re-copying code
**How to avoid:** Document which GHL form is embedded, re-copy after edits
**Warning signs:** Form looks different in GHL vs website
</common_pitfalls>

<code_examples>
## Code Examples

### GHL Contact Creation (cURL)
```bash
# Source: GHL API Documentation - https://marketplace.gohighlevel.com/docs/ghl/contacts/create-contact
curl --request POST \
  --url https://services.leadconnectorhq.com/contacts/ \
  --header 'Authorization: Bearer pit-c135be07-6afd-46e9-9ec5-b2de2274ae43' \
  --header 'Content-Type: application/json' \
  --header 'Version: 2021-07-28' \
  --data '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+14801234567",
    "postalCode": "85001",
    "locationId": "whWiJKEKIxuVxPacF4g2",
    "source": "Website Quote Form",
    "tags": ["website-lead"]
  }'
```

### Astro Form with Client-Side Enhancement
```astro
<!-- Source: Astro docs - https://docs.astro.build/en/recipes/build-forms-api/ -->
<form action="/api/contact" method="POST" id="quote-form">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <input type="tel" name="phone" required />
  <input type="text" name="zipcode" pattern="[0-9]{5}" required />
  <textarea name="services"></textarea>
  <button type="submit">Get Free Quote</button>
</form>

<script>
  const form = document.getElementById('quote-form');
  const button = form.querySelector('button');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    button.disabled = true;
    button.textContent = 'Submitting...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
      });

      if (response.ok) {
        window.location.href = '/thank-you';
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      button.disabled = false;
      button.textContent = 'Get Free Quote';
      alert('Something went wrong. Please try again.');
    }
  });
</script>
```

### ContactCreate Webhook Event Schema (Reference)
```json
// Source: GHL Webhook Docs - What GHL sends when contact is created
{
  "type": "ContactCreate",
  "locationId": "whWiJKEKIxuVxPacF4g2",
  "id": "contact_id_here",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+14801234567",
  "postalCode": "85001",
  "source": "Website Quote Form",
  "tags": ["website-lead"],
  "dateAdded": "2026-01-15T12:00:00.000Z"
}
```
</code_examples>

<sota_updates>
## State of the Art (2025-2026)

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| V1 API Keys | Private Integration Tokens (PIT) | 2024 | V1 deprecated, PIT required for new integrations |
| Iframe embeds only | JS + Iframe embed options | 2024 | Better responsive support, anti-spam |
| Manual webhook setup | Inbound Webhook Trigger | 2024 | Premium feature for workflow automation |

**New tools/patterns to consider:**
- **GHL MCP Server**: Claude can interact with GHL directly via MCP tools. Useful for testing and automation during development.
- **Enhanced Anti-Spam**: 2025 GHL update added built-in CAPTCHA and honeypot. Consider if spam becomes an issue.
- **Mobile-First Forms**: GHL embed updates optimize for mobile. Custom forms should match.

**Deprecated/outdated:**
- **V1 API Keys**: End-of-support. All new integrations must use PIT or OAuth2.
- **Static embed codes without regeneration**: GHL forms require re-copying embed code after changes.
</sota_updates>

<integration_options>
## Integration Options Comparison

| Approach | Complexity | Styling Control | Speed to Implement | GHL Automation |
|----------|------------|-----------------|-------------------|----------------|
| **1. Embedded GHL Form** | Low | Low (GHL controls) | 30 min | Automatic |
| **2. Custom Form → API** | Medium | Full | 2-3 hours | Via contact creation |
| **3. Custom Form → Webhook** | Medium | Full | 2-3 hours | Via workflow trigger |

### Recommendation for This Project

**Use Option 2 (Custom Form → GHL API)** because:
1. Form UI already exists in CallToAction.astro — only backend needed
2. Full styling control maintains brand consistency
3. PIT and Location ID already provided
4. Contact creation triggers GHL workflows automatically
5. Vercel serverless functions already available (current deployment)

### Implementation Steps
1. Add environment variables (PIT, Location ID) to Vercel
2. Create `/src/pages/api/contact.ts` API route
3. Add client-side JavaScript for loading states
4. Create thank-you page
5. Test end-to-end

**Alternative if issues arise:** Fall back to embedded GHL form (Option 1) — replace the form div in CallToAction.astro with GHL embed code.
</integration_options>

<open_questions>
## Open Questions

1. **Custom Fields Mapping**
   - What we know: GHL supports customFields array with id/key/field_value
   - What's unclear: What custom field IDs exist in the GHL account for service type, property details, etc.
   - Recommendation: During implementation, use GHL MCP to query custom fields, or start with tags instead

2. **Workflow Trigger Confirmation**
   - What we know: Creating a contact triggers ContactCreate event in GHL
   - What's unclear: Exact workflow configured to respond to new contacts
   - Recommendation: Test with sample contact, verify workflow fires. May need GHL admin to confirm trigger setup.

3. **Phone/Email Deduplication**
   - What we know: GHL deduplicates contacts by email/phone
   - What's unclear: Whether existing contacts should be updated or create new opportunity
   - Recommendation: Use `upsert-contact` endpoint if available, or accept default behavior (merge)
</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- [GHL API v2 Documentation](https://marketplace.gohighlevel.com/docs/ghl/contacts/create-contact) - Contact creation endpoint
- [Private Integration Tokens](https://marketplace.gohighlevel.com/docs/Authorization/PrivateIntegrationsToken) - Authentication pattern
- [Astro Forms Recipe](https://docs.astro.build/en/recipes/build-forms-api/) - Server-side form handling
- Context7 `/websites/marketplace_gohighlevel` - API reference (6544 snippets)

### Secondary (MEDIUM confidence)
- [GHL Form Embedding Guide](https://help.gohighlevel.com/support/solutions/articles/155000004524-embedding-highlevel-forms-on-non-highlevel-websites) - Embed options
- [GHL Inbound Webhook](https://help.gohighlevel.com/support/solutions/articles/48001237383-how-to-use-the-inbound-webhook-workflow-premium-trigger) - Premium trigger option
- [GHL API Integration 2025](https://isitdev.com/gohighlevel-api-integration-2025/) - Best practices overview

### Tertiary (LOW confidence - needs validation)
- Community patterns for form styling - verified against official docs
</sources>

<metadata>
## Metadata

**Research scope:**
- Core technology: GoHighLevel CRM API v2
- Ecosystem: PIT authentication, Astro API routes, Vercel serverless
- Patterns: Form → API → CRM → Automation
- Pitfalls: Token exposure, duplicates, missing fields

**Confidence breakdown:**
- Standard stack: HIGH - verified with Context7, official GHL docs
- Architecture: HIGH - from official Astro/GHL documentation
- Pitfalls: HIGH - documented in support articles, community reports
- Code examples: HIGH - from Context7/official sources

**Research date:** 2026-01-15
**Valid until:** 2026-02-15 (30 days - GHL API is stable)

**User-provided identifiers:**
- PIT: `pit-c135be07-6afd-46e9-9ec5-b2de2274ae43`
- Location ID: `whWiJKEKIxuVxPacF4g2`
</metadata>

---

*Phase: 03-quote-form-conversion-flow*
*Research completed: 2026-01-15*
*Ready for planning: yes*
