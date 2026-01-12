# Architecture

**Analysis Date:** 2026-01-12

## Pattern Overview

**Overall:** Static Site Generation (SSG) with Island Architecture

**Key Characteristics:**
- Pre-rendered HTML at build time (zero server runtime)
- Selective client-side hydration for React components
- Content-driven via Markdown/MDX collections
- Component-based presentation layer
- SEO-optimized with structured data

## Layers

**Content Layer:**
- Purpose: Store and manage site content as data
- Contains: Markdown/MDX files with YAML frontmatter
- Location: `src/content/`
- Depends on: Nothing (source of truth)
- Used by: Page layer via Astro Content Collections

**Configuration Layer:**
- Purpose: Store site-wide settings and branding
- Contains: JSON config files (site metadata, theme, navigation, social)
- Location: `src/config/`
- Depends on: Nothing
- Used by: All components via imports

**Utility Layer:**
- Purpose: Shared helper functions for content processing
- Contains: Text converters, date formatters, sort functions, taxonomy filters
- Location: `src/lib/utils/`
- Depends on: Third-party libraries (marked, date-fns, github-slugger)
- Used by: Component layer

**Component Layer:**
- Purpose: Reusable UI components and layouts
- Contains: Astro components (`.astro`), React components (`.tsx`)
- Location: `src/layouts/`
- Depends on: Utility layer, Configuration layer
- Used by: Page layer

**Page Layer:**
- Purpose: Define URL routes and compose page content
- Contains: Page components with data fetching logic
- Location: `src/pages/`
- Depends on: Component layer, Content layer
- Used by: Astro build process

## Data Flow

**Static Page Build:**

1. Astro scans `src/pages/` for route definitions
2. For dynamic routes, `getStaticPaths()` enumerates all URLs
3. Content loaded via `getEntry()` or `getSinglePage()` from collections
4. Content processor filters drafts and sorts by weight
5. Page component receives content as props
6. Layout components render content to HTML
7. Utilities transform text (slugify, markdownify, humanize)
8. Static HTML written to `dist/`
9. Vercel CDN serves pre-built pages

**Content Loading Flow:**
```
Markdown/MDX Files (src/content/)
    ↓
Astro Content Loaders (glob patterns)
    ↓
Zod Schema Validation (src/content.config.ts)
    ↓
Collection Entries in Memory
    ↓
getSinglePage() (src/lib/contentParser.astro)
    ├─ Filter index files (match ^(?!-))
    ├─ Filter drafts
    └─ Sort by weight property
    ↓
Page Components (consume CollectionEntry<"collection">)
    ↓
render() generates HTML
    ↓
Static Output (dist/)
```

**State Management:**
- File-based: Content lives in Markdown files
- No persistent runtime state
- Each build is independent
- Client state only in hydrated React islands

## Key Abstractions

**Content Collection:**
- Purpose: Type-safe content management
- Examples: `blog`, `services`, `locations`, `homepage`, `sections`
- Pattern: Astro Content Collections with Zod schemas
- Location: `src/content.config.ts`

**Layout Component:**
- Purpose: Reusable page structure
- Examples: `Base.astro`, `Header.astro`, `Footer.astro`
- Pattern: Astro slot-based composition
- Location: `src/layouts/`

**Section Component:**
- Purpose: Data-driven page sections
- Examples: `Hero.astro`, `About.astro`, `Testimonial.astro`
- Pattern: Accept content frontmatter as props
- Location: `src/layouts/components/homepage/`

**Functional Component:**
- Purpose: Client-side interactivity
- Examples: `Counter.tsx`, `NavDropDown.tsx`, `ImageGallery.tsx`
- Pattern: React with selective hydration (`client:load`, `client:visible`)
- Location: `src/layouts/components/functional-component/`

**Shortcode:**
- Purpose: Content-embeddable UI elements
- Examples: `Button.tsx`, `Accordion.tsx`, `Tabs.tsx`, `Notice.tsx`
- Pattern: Auto-imported via MDX
- Location: `src/layouts/shortcodes/`

**Utility Function:**
- Purpose: Text and data transformation
- Examples: `slugify()`, `markdownify()`, `humanize()`, `dateFormat()`
- Pattern: Pure functions, no side effects
- Location: `src/lib/utils/`

## Entry Points

**Build Entry:**
- Location: `astro.config.mjs`
- Triggers: `npm run build` or `npm run dev`
- Responsibilities: Configure Astro, integrations, site URL

**Page Entry:**
- Location: `src/pages/index.astro`
- Triggers: HTTP request to `/`
- Responsibilities: Compose homepage from content collections

**Dynamic Route Entries:**
- Location: `src/pages/[regular].astro`, `src/pages/blog/[single].astro`
- Triggers: Matching URL patterns
- Responsibilities: Generate pages from content collections

## Error Handling

**Strategy:** Build-time validation, minimal runtime handling

**Patterns:**
- Zod schemas validate content at build time
- TypeScript strict mode catches type errors
- Optional chaining (`?.`) for potentially missing data
- No try/catch in most components (static rendering)
- Silent fallbacks for missing optional content

## Cross-Cutting Concerns

**SEO:**
- Meta tags injected via `Base.astro`
- OpenGraph and Twitter card support
- JSON-LD schema markup (`src/components/SchemaMarkup.astro`)
- Auto-generated sitemap (`@astrojs/sitemap`)
- RSS feed for blog (`@astrojs/rss`)

**Styling:**
- Tailwind CSS for utility classes
- Scoped styles in Astro components
- CSS layers: base, components (organized in `src/styles/`)
- Custom brand colors in `tailwind.config.mjs`

**Animation:**
- AOS (Animate On Scroll) initialized in `Base.astro`
- Swiper for carousels
- CSS transitions for hover/focus states

**Image Optimization:**
- Sharp for build-time processing
- Astro Image component for responsive images
- Lazy loading via `loading="lazy"` attribute

**Client Hydration:**
- React islands hydrate with `client:load` or `client:visible`
- Minimal JavaScript footprint
- Interactive components: Counter, NavDropDown, ImageGallery, VideoPlayer

---

*Architecture analysis: 2026-01-12*
*Update when major patterns change*
