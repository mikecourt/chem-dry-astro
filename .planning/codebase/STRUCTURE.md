# Codebase Structure

**Analysis Date:** 2026-01-12

## Directory Layout

```
chem-dry-site/
├── src/                    # Source code
│   ├── pages/              # Route definitions (URL → HTML)
│   ├── content/            # Markdown/MDX content collections
│   ├── layouts/            # Reusable components and layouts
│   ├── lib/                # Utility functions and parsers
│   ├── components/         # Additional Astro components
│   ├── config/             # JSON configuration files
│   ├── styles/             # CSS organized by purpose
│   ├── types/              # TypeScript type definitions
│   └── tailwind-plugin/    # Custom Tailwind plugins
├── public/                 # Static assets (images, icons, fonts)
├── dist/                   # Built static site (generated)
├── .planning/              # Planning documents
├── .claude/                # Claude Code configuration
├── docs/                   # Project documentation
├── astro.config.mjs        # Astro framework config
├── tailwind.config.mjs     # Tailwind CSS config
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies and scripts
```

## Directory Purposes

**src/pages/**
- Purpose: Define URL routes and page composition
- Contains: `.astro` page files
- Key files:
  - `index.astro` - Homepage (`/`)
  - `[regular].astro` - Dynamic generic pages
  - `about.astro`, `contact.astro`, `gallery.astro` - Static pages
  - `phoenix.astro`, `mesa.astro`, `gilbert.astro`, etc. - City landing pages
- Subdirectories:
  - `blog/` - Blog listing and detail pages
  - `services/` - Service pages

**src/content/**
- Purpose: Markdown/MDX content as data source
- Contains: `.md` and `.mdx` files with YAML frontmatter
- Key collections:
  - `homepage/` - Homepage section content
  - `blog/` - Blog post articles
  - `services/` - Service descriptions
  - `locations/` - City/location content
  - `about/` - About page sections
  - `contact/` - Contact information
  - `appointment/` - Appointment form content
  - `gallery/` - Photo gallery data
  - `pages/` - General pages
  - `sections/` - Reusable sections (CTA)

**src/layouts/**
- Purpose: Reusable layout and component library
- Contains: `.astro` and `.tsx` components
- Key files:
  - `Base.astro` - Root layout (all pages inherit)
- Subdirectories:
  - `components/` - Feature-specific components
  - `components/homepage/` - Homepage sections (Hero, About, Services, etc.)
  - `components/services/` - Service display components
  - `components/about/` - About page components
  - `components/functional-component/` - React components (Counter, NavDropDown, etc.)
  - `partials/` - Header, Footer, CallToAction
  - `helpers/` - Utility components (DynamicIcon)
  - `shortcodes/` - MDX-embeddable components (Button, Accordion, Tabs, etc.)

**src/lib/**
- Purpose: Utility functions and content parsers
- Contains: `.astro` and `.ts` files
- Key files:
  - `contentParser.astro` - Collection loading, filtering, sorting
  - `taxonomyParser.astro` - Category/tag extraction
- Subdirectories:
  - `utils/` - Helper functions (textConverter, dateFormat, sortFunctions, etc.)

**src/config/**
- Purpose: Site-wide configuration as JSON
- Contains: `.json` config files
- Key files:
  - `config.json` - Site metadata, contact info, SEO, GTM
  - `theme.json` - Typography, colors, spacing
  - `menu.json` - Navigation structure
  - `social.json` - Social media links

**src/styles/**
- Purpose: Global CSS organized by function
- Contains: `.css` files
- Key files:
  - `main.css` - Entry point with Tailwind imports
  - `base.css` - Base element styles
  - `components.css` - Component classes
  - `buttons.css` - Button variants
  - `navigation.css` - Navigation styles
  - `animation.css` - Animation definitions

**src/types/**
- Purpose: TypeScript type definitions
- Contains: `.d.ts` files
- Key files:
  - `index.d.ts` - Shared type definitions (currently minimal)

**public/**
- Purpose: Static assets served as-is
- Contains: Images, icons, fonts
- Subdirectories: `images/` (organized by usage)

## Key File Locations

**Entry Points:**
- `astro.config.mjs` - Build configuration entry
- `src/pages/index.astro` - Homepage (`/`)
- `src/layouts/Base.astro` - Root layout wrapper

**Configuration:**
- `astro.config.mjs` - Astro framework settings
- `tsconfig.json` - TypeScript with path aliases
- `tailwind.config.mjs` - Custom brand colors and theme
- `src/config/config.json` - Site metadata and settings
- `src/content.config.ts` - Content collection schemas

**Core Logic:**
- `src/lib/contentParser.astro` - Content loading and filtering
- `src/lib/utils/textConverter.ts` - Text transformation (slugify, markdownify)
- `src/layouts/Base.astro` - SEO, analytics, layout structure

**Testing:**
- Not applicable (no test files present)

**Documentation:**
- `docs/` - Project documentation
- `.claude/CLAUDE.md` - Claude Code instructions
- `docs/DESIGN-SYSTEM-GUIDE.md` - Component and layout standards

## Naming Conventions

**Files:**
- PascalCase.astro: Astro components (`Hero.astro`, `ServiceCard.astro`)
- PascalCase.tsx: React components (`Counter.tsx`, `NavDropDown.tsx`)
- kebab-case.ts: Utility files (`textConverter.ts`, `dateFormat.ts`)
- kebab-case.md: Content files (`carpet-cleaning.md`, `blog-1.md`)
- lowercase.json: Config files (`config.json`, `theme.json`)

**Directories:**
- kebab-case: All directories (`functional-component/`, `homepage/`)
- Plural for collections: `components/`, `services/`, `pages/`

**Special Patterns:**
- `-index.md`: Collection index/config files (filtered from content)
- `[param].astro`: Dynamic route parameters
- `*.d.ts`: TypeScript declaration files

## Where to Add New Code

**New Page:**
- Static page: `src/pages/[page-name].astro`
- City page: `src/pages/[city-name].astro`
- Blog post: `src/content/blog/[post-slug].md`
- Tests: Not applicable (no test framework)

**New Component:**
- Astro component: `src/layouts/components/[ComponentName].astro`
- React component: `src/layouts/components/functional-component/[ComponentName].tsx`
- Types: Add to component file or `src/types/index.d.ts`

**New Section (Homepage):**
- Component: `src/layouts/components/homepage/[SectionName].astro`
- Content: `src/content/homepage/[section-name].md`

**New Service:**
- Page: `src/pages/services/[service-name].astro`
- Content: `src/content/services/[service-name].md`

**Utilities:**
- Shared helpers: `src/lib/utils/[function-name].ts`
- Type definitions: `src/types/index.d.ts`

**Shortcodes (MDX-embeddable):**
- Implementation: `src/layouts/shortcodes/[ComponentName].tsx`
- Auto-import via `astro-auto-import` in `astro.config.mjs`

## Special Directories

**dist/**
- Purpose: Build output (static HTML, CSS, JS)
- Source: Generated by `npm run build`
- Committed: No (in `.gitignore`)

**.vercel/**
- Purpose: Vercel deployment metadata
- Source: Generated by Vercel
- Committed: No (in `.gitignore`)

**.astro/**
- Purpose: Astro cache and data store
- Source: Generated by Astro
- Committed: No (in `.gitignore`)

**node_modules/**
- Purpose: npm dependencies
- Source: Generated by `npm install`
- Committed: No (in `.gitignore`)

**.planning/**
- Purpose: Project planning documents
- Source: Manual and GSD workflow
- Committed: Yes

---

*Structure analysis: 2026-01-12*
*Update when directory structure changes*
