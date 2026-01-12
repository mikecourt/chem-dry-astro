# Coding Conventions

**Analysis Date:** 2026-01-12

## Naming Patterns

**Files:**
- PascalCase for Astro components (`Hero.astro`, `ServiceCard.astro`, `Base.astro`)
- PascalCase for React components (`Counter.tsx`, `NavDropDown.tsx`, `DynamicIcon.tsx`)
- camelCase for utility files (`textConverter.ts`, `dateFormat.ts`, `sortFunctions.ts`)
- kebab-case for content files (`carpet-cleaning.md`, `blog-1.md`)
- lowercase for config files (`config.json`, `theme.json`)

**Functions:**
- camelCase for all functions (`slugify`, `markdownify`, `humanize`, `dateFormat`)
- No special prefix for async functions
- Handler naming not applicable (minimal event handlers in static site)

**Variables:**
- camelCase for variables (`content`, `description`, `sectionData`)
- UPPER_SNAKE_CASE for constants (not widely used)
- No underscore prefix for private members

**Types:**
- PascalCase for interfaces and types (`CollectionEntry`, `Props`)
- No `I` prefix for interfaces
- Types defined inline in components or in `src/types/index.d.ts`

## Code Style

**Formatting:**
- Prettier with `prettier-plugin-astro` and `prettier-plugin-tailwindcss`
- 2 space indentation
- Double quotes for strings
- Semicolons required
- Format script: `npm run format` → `prettier -w ./src`

**Linting:**
- ESLint 9.33.0 installed
- No custom `.eslintrc` config (uses defaults)
- TypeScript strict mode via `tsconfig.json`

## Import Organization

**Order:**
1. Astro imports (`astro:content`, `astro:transitions`)
2. External packages (react, marked, date-fns)
3. Internal config imports (`@/config/config.json`)
4. Component imports (`@/components/`, `@/layouts/`)
5. Utility imports (`@/lib/utils/`)
6. Type imports (usually inline)

**Grouping:**
- Blank lines between groups
- No strict alphabetical ordering within groups

**Path Aliases:**
- `@/components` → `src/layouts/components`
- `@/shortcodes` → `src/layouts/shortcodes`
- `@/helpers` → `src/layouts/helpers`
- `@/partials` → `src/layouts/partials`
- `@/` → `src/` (general fallback)

## Error Handling

**Patterns:**
- Optional chaining (`?.`) for potentially missing data
- Default values via destructuring (`variant = "primary"`)
- Build-time validation via Zod schemas in content collections
- Minimal try/catch (mostly in utility functions)

**Error Types:**
- Type errors caught at compile time (TypeScript strict mode)
- Content validation errors caught at build time (Zod)
- Runtime errors handled with silent fallbacks

**Logging:**
- No console.log in committed code
- No structured logging framework

## Logging

**Framework:**
- None (static site, no server-side logging)
- Vercel deployment logs for build output

**Patterns:**
- Not applicable

## Comments

**When to Comment:**
- Minimal comments overall (code is self-documenting)
- Single-line comments for brief explanations
- No JSDoc or formal documentation comments observed

**JSDoc/TSDoc:**
- Not used
- Types serve as documentation

**TODO Comments:**
- Standard format: `// TODO: description`
- No TODO/FIXME comments found in codebase

**TypeScript Suppression:**
- `@ts-nocheck` used in `src/layouts/shortcodes/Tabs.tsx` (should be fixed)
- `@ts-ignore` used sparingly for third-party type issues

## Function Design

**Size:**
- Functions generally short (under 30 lines)
- Complex logic extracted to utility functions

**Parameters:**
- Destructured props in Astro components
- Inline type annotations for React components
- Default values via destructuring

**Return Values:**
- Explicit returns in TypeScript
- JSX returns for components
- Utility functions return transformed values

## Module Design

**Exports:**
- Named exports for utility functions
- Default exports not used for components (Astro convention)
- Named exports from utility files

**Barrel Files:**
- Not used (imports reference specific files)

## Component Patterns

**Astro Components:**
```astro
---
// Frontmatter: imports and logic
import { getEntry } from "astro:content";
import config from "@/config/config.json";

type Props = { title: string; description?: string };
const { title, description } = Astro.props;
---

<!-- Template -->
<div class="component">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</div>

<style>
  /* Scoped styles */
  .component { /* ... */ }
</style>
```

**React Components:**
```tsx
import React, { useState } from "react";

const Component = ({
  prop1,
  prop2 = "default",
}: {
  prop1: string;
  prop2?: string;
}) => {
  const [state, setState] = useState(false);

  return <div>{prop1}</div>;
};

export default Component;
```

## CSS Conventions

**Tailwind-First:**
- Utility classes for most styling
- Custom classes defined in `src/styles/`

**CSS Layers:**
- Base layer: Element defaults
- Components layer: Reusable patterns
- Organized in separate files (`base.css`, `components.css`, `buttons.css`)

**Scoped Styles:**
- Astro components use `<style>` for component-specific CSS
- Nested selectors supported via PostCSS

## Data Conventions

**Props Naming:**
- Astro: snake_case for data attributes (`data_aos`, `data_aos_delay`)
- React: camelCase for props (`dataAos`, `dataAosDelay`)

**Content Fields:**
- snake_case in Markdown frontmatter (YAML convention)
- Accessed via `entry.data.field_name`

---

*Convention analysis: 2026-01-12*
*Update when patterns change*
