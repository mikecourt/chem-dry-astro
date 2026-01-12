# Testing Patterns

**Analysis Date:** 2026-01-12

## Test Framework

**Runner:**
- **NOT DETECTED** - No test framework installed

**Assertion Library:**
- Not applicable

**Run Commands:**
```bash
# No test commands available
# package.json does not define a "test" script
```

## Test File Organization

**Location:**
- No test files found in codebase
- No `*.test.ts`, `*.test.tsx`, `*.spec.ts`, or `*.spec.tsx` files
- No `__tests__/` directories

**Naming:**
- Not applicable

**Structure:**
- Not applicable

## Test Structure

**Suite Organization:**
- Not applicable

**Patterns:**
- Not applicable

## Mocking

**Framework:**
- Not applicable

**Patterns:**
- Not applicable

## Fixtures and Factories

**Test Data:**
- Not applicable

**Location:**
- Not applicable

## Coverage

**Requirements:**
- No coverage target
- No coverage enforcement

**Configuration:**
- Not applicable

**View Coverage:**
- Not applicable

## Test Types

**Unit Tests:**
- Not implemented

**Integration Tests:**
- Not implemented

**E2E Tests:**
- Not implemented

## Quality Assurance Alternatives

Since no automated testing exists, the codebase relies on:

**Type Checking:**
- TypeScript strict mode (`tsconfig.json` extends `astro/tsconfigs/strict`)
- `npm run check` runs Astro type checking
- Build fails on type errors

**Build-Time Validation:**
- Zod schemas validate content at build time (`src/content.config.ts`)
- Invalid content frontmatter fails the build
- Dead links cause build warnings (depending on config)

**Manual Testing:**
- `npm run dev` for local development
- `npm run preview` to preview production build
- Browser DevTools for debugging

**Development Tools (MCP):**
- Puppeteer MCP for browser automation/screenshots
- Can be used for manual verification of UI changes

## Recommended Testing Setup

To add testing to this project, consider:

**Framework Options:**
- Vitest (recommended for Astro projects)
- Playwright (for E2E testing)

**Implementation Steps:**
1. Install dependencies:
   ```bash
   npm install -D vitest @vitest/ui
   npm install -D @playwright/test
   ```

2. Create `vitest.config.ts`:
   ```typescript
   import { defineConfig } from 'vitest/config';

   export default defineConfig({
     test: {
       include: ['src/**/*.test.ts'],
     },
   });
   ```

3. Add test script to `package.json`:
   ```json
   {
     "scripts": {
       "test": "vitest",
       "test:ui": "vitest --ui"
     }
   }
   ```

**Priority Test Areas:**
1. Utility functions (`src/lib/utils/`) - Pure functions, easy to test
2. Content parsing (`src/lib/contentParser.astro`) - Core business logic
3. Component rendering - Astro component unit tests
4. E2E flows - Homepage load, navigation, form submissions

---

*Testing analysis: 2026-01-12*
*Update when test patterns change*
