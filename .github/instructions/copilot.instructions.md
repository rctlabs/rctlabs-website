# Copilot Custom Instructions — RCT Labs (rctlabs-v0)

## Project Overview
- **Framework:** Next.js 15 (App Router) with TypeScript
- **Styling:** Tailwind CSS v4 with custom warm/dark design tokens
- **i18n:** Bilingual EN/TH with locale prefix routing (`/en/...`, `/th/...`)
- **State:** React hooks + Zustand for global state
- **Auth:** Supabase Auth with Row Level Security
- **SEO:** JSON-LD structured data, bilingual metadata, Lighthouse CI assertions

## Code Standards
- Use `"use client"` directive only when hooks or browser APIs are needed
- Prefer server components by default
- Use `@/` path alias for imports
- Follow existing theme pattern: `isDark ? "dark-class" : "light-class"`
- All user-facing text must support EN/TH bilingual via `useLanguage()` hook
- Use `useMounted()` hook to prevent hydration mismatches with theme
- Prefer native HTML elements (`<details>`, `<dialog>`) over JS-heavy alternatives

## File Conventions
- Pages: `app/[locale]/[route]/page.tsx` (server component with metadata export)
- Client components: `components/*.tsx` with `"use client"` directive
- Utilities: `lib/*.ts`
- Hooks: `hooks/*.ts`
- SEO schemas: `lib/schema.ts` (single source of truth), `lib/seo-bilingual.ts` (locale-aware)

## Testing & Quality
- TypeScript strict mode enabled
- ESLint: `next/core-web-vitals` + `next/typescript`
- Lighthouse CI: Performance ≥ 60%, Accessibility ≥ 90%, Best Practices ≥ 90%, SEO ≥ 95%
- All components must be accessible (WCAG 2.1 AA)

## PR Review Focus
- Check for hydration mismatches (server vs client rendering)
- Verify bilingual support (EN/TH) for all user-facing text
- Ensure proper `aria-*` attributes and keyboard navigation
- Validate SEO metadata and JSON-LD schemas
- Check mobile responsiveness (safe-area-inset, touch targets ≥ 44px)
