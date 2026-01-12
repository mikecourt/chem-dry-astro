# External Integrations

**Analysis Date:** 2026-01-12

## APIs & External Services

**Payment Processing:**
- Not detected (no Stripe, PayPal, or payment SDKs)

**Email/SMS:**
- Not detected (no SendGrid, Mailgun, or email SDKs)
- Contact forms use `mailto:` action (`src/config/config.json`)
  - Form target: `mailto:office@whiteglovecarpet.com`
  - No serverless function or backend processing

**External APIs:**
- Not detected (no REST/GraphQL client libraries)
- Static content only - no runtime API calls

## Data Storage

**Databases:**
- Not applicable (static site, no database)
- Content stored in Markdown/MDX files in `src/content/`

**File Storage:**
- Local static assets in `public/` directory
- Images optimized by Sharp at build time
- No cloud storage (S3, Supabase Storage, etc.)

**Caching:**
- CDN-level caching via Vercel
- No application-level cache (Redis, Memcached)

## Authentication & Identity

**Auth Provider:**
- Not applicable (no user authentication)

**OAuth Integrations:**
- None

## Monitoring & Observability

**Error Tracking:**
- Not detected (no Sentry, LogRocket, etc.)

**Analytics:**
- Google Tag Manager - Conditional tracking (`@digi4care/astro-google-tagmanager`)
  - Config: `src/config/config.json` → `google_tag_manager.gtm_id`
  - Currently using placeholder `GTM-XXXXXX`
  - Includes `GoogleTagmanagerNoscript` fallback
  - Location: `src/layouts/Base.astro`

**Logs:**
- Vercel deployment logs only
- No structured logging service

## CI/CD & Deployment

**Hosting:**
- Vercel - Primary deployment platform
  - Deployment: Automatic on main branch push
  - Environment vars: Configured in Vercel dashboard
  - `.vercel/` directory present

- Netlify - Alternative/fallback (`netlify.toml`)
  - Node.js 20 specified
  - Build command: `astro build`
  - Publish directory: `dist`

**CI Pipeline:**
- Vercel automatic builds (no separate GitHub Actions)
- Type checking: `npm run check`
- No automated tests configured

## Environment Configuration

**Development:**
- No `.env` files or `.env.example` found
- Configuration via JSON files in `src/config/`
- All config checked into version control

**Staging:**
- Not configured (uses same config as production)

**Production:**
- Secrets management: Vercel environment variables (for GTM, etc.)
- No sensitive data in codebase

## Webhooks & Callbacks

**Incoming:**
- None (static site with no server endpoints)

**Outgoing:**
- None

## Development Tools Integration

**MCP Servers** (`.mcp.json`):
- Puppeteer MCP - Browser automation and screenshots
  - Package: `@modelcontextprotocol/server-puppeteer`
- Code Executor MCP - TypeScript/Python execution
  - Package: `code-executor-mcp`
- Filesystem MCP - File operations
  - Package: `@modelcontextprotocol/server-filesystem`
- Context7 MCP - Documentation retrieval
  - Package: `@upstash/context7-mcp`

## Third-Party Widgets

**Trust Signals:**
- Elfsight widgets - `src/layouts/components/TrustBar.astro`
  - Google Reviews widget (data attribute: `elfsight-app-93c123ef-5d66-4bcf-a30a-e97e2ba1e62f`)
  - Facebook Reviews widget (data attribute: `elfsight-app-fa05a03c-3bfa-41e9-a7e9-62e66df2abb0`)
  - Script: `https://static.elfsight.com/platform/platform.js`
  - No fallback if script fails

**Media Embeds:**
- YouTube - via `lite-youtube-embed` package
  - Lightweight alternative to standard iframe embed
  - Used in `src/layouts/shortcodes/Youtube.tsx`

## SEO & Structured Data

**Sitemap:**
- `@astrojs/sitemap` - Auto-generated XML sitemap

**RSS:**
- `@astrojs/rss` - Feed generation for blog

**Schema Markup:**
- JSON-LD structured data - `src/components/SchemaMarkup.astro`
- LocalBusiness schema for SEO

---

*Integration audit: 2026-01-12*
*Update when adding/removing external services*
