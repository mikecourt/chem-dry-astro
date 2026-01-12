# Technology Stack

**Analysis Date:** 2026-01-12

## Languages

**Primary:**
- TypeScript 5.9.2 - All application code (`package.json`, `tsconfig.json`)

**Secondary:**
- JavaScript (ES6+) - Build scripts, config files
- JSX/TSX - React components (`src/layouts/shortcodes/*.tsx`, `src/layouts/components/functional-component/*.tsx`)
- Astro - SSG templating (`.astro` files throughout `src/`)

## Runtime

**Environment:**
- Node.js 20 - Required runtime (`netlify.toml`)
- No browser runtime (SSG with selective client hydration)

**Package Manager:**
- npm 10.x
- Lockfile: `package-lock.json` present (369KB)

## Frameworks

**Core:**
- Astro 5.14.7 - Meta-framework for static/hybrid site generation (`astro.config.mjs`)
- React 19.1.1 - UI component library for interactive islands (`package.json`)
- React DOM 19.1.1 - React rendering

**Testing:**
- None (no test framework detected)

**Build/Dev:**
- Vite 7.1.2 - Build tool via Astro
- TypeScript 5.9.2 - Type checking (`npm run check`)
- Astro Check 0.9.5 - Astro-specific type checking

## Key Dependencies

**Critical:**
- `@astrojs/react` 4.4.0 - React integration for client islands
- `@astrojs/sitemap` 3.6.0 - SEO sitemap generation
- `@astrojs/mdx` 4.3.7 - Markdown/MDX content support
- `@astrojs/rss` 4.0.12 - RSS feed generation

**Styling:**
- `tailwindcss` 4.1.12 - Utility-first CSS framework (`tailwind.config.mjs`)
- `@tailwindcss/vite` 4.1.12 - Vite integration
- `@tailwindcss/forms` 0.5.10 - Form styling
- `@tailwindcss/typography` 0.5.16 - Prose styling

**Content Processing:**
- `marked` 16.2.0 - Markdown to HTML (`src/lib/utils/textConverter.ts`)
- `gray-matter` 4.0.3 - YAML frontmatter parsing
- `shiki` 3.9.2 - Syntax highlighting (`astro.config.mjs`)
- `remark-toc` 9.0.0 - Table of contents generation
- `remark-collapse` 0.1.2 - Collapsible sections
- `github-slugger` 2.0.0 - URL slug generation

**Interactive Components:**
- `aos` 3.0.0-beta.6 - Scroll animations (`src/layouts/Base.astro`)
- `swiper` 11.2.10 - Touch slider/carousel
- `react-countup` 6.5.3 - Animated counters (`src/layouts/components/functional-component/Counter.tsx`)
- `react-intersection-observer` 9.16.0 - Viewport visibility detection
- `react-icons` 5.5.0 - Icon library (FontAwesome 6)

**Infrastructure:**
- `sharp` 0.33.5 - Image optimization (pinned version)
- `date-fns` 4.1.0 - Date formatting (`src/lib/utils/dateFormat.ts`)
- `astro-font` 1.1.0 - Google Fonts optimization
- `astro-auto-import` 0.4.4 - Auto-import shortcodes

## Configuration

**Environment:**
- No `.env` files detected
- Configuration via JSON files in `src/config/`
- GTM ID placeholder in config suggests env vars needed

**Build:**
- `astro.config.mjs` - Astro framework configuration
- `tsconfig.json` - TypeScript with strict mode, path aliases (`@/components`, `@/shortcodes`, etc.)
- `tailwind.config.mjs` - Custom Chem-Dry brand colors and theme

**Site Config:**
- `src/config/config.json` - Site metadata, SEO, contact info
- `src/config/theme.json` - Typography, colors, spacing
- `src/config/menu.json` - Navigation structure
- `src/config/social.json` - Social media links

## Platform Requirements

**Development:**
- macOS/Linux/Windows (any platform with Node.js 20+)
- No external dependencies (Docker not required)

**Production:**
- Vercel - Primary deployment target (auto-deploys on git push)
- Netlify - Alternative deployment (`netlify.toml` present)
- Static HTML output - CDN-friendly, no server runtime needed

---

*Stack analysis: 2026-01-12*
*Update after major dependency changes*
