# Fixes & Improvements Log
> Generated: 2026-03-28 | Phase 1 + Phase 2 (Critical + Performance)

---

## ✅ Phase 1 — Critical Bug Fixes

### 1. `package.json` — Removed invalid Node.js built-in dependencies
- **Removed:** `"fs": "0.0.1-security"`, `"net": "1.0.2"`, `"path": "0.12.7"`
- **Why:** These are Node.js built-in modules. Listing them as npm dependencies does nothing useful and can cause bundler confusion or inflate build size.
- **Fixed:** `"@emotion/is-prop-valid"` version locked from `"latest"` → `"^1.3.1"` to prevent unexpected breaking changes on future installs.
- **Fixed:** `"name"` changed from `"my-v0-project"` (scaffold default) → `"rctlabs-web"` for correct project identity.
- **Fixed:** `"version"` updated to `"2026.03.0"` to match SITE_VERSION.

### 2. `app/layout.tsx` — Locale detection deduplicated
- **Bug:** `headers()` was called twice (once in `generateMetadata`, once in `RootLayout`) — both reading `x-locale` independently. A mismatch could cause the HTML `lang` attribute and metadata locale to diverge.
- **Fix:** Extracted a shared `getLocale()` async helper that both functions call, ensuring a single consistent resolution path.
- **Fixed:** `generator: "v0.app"` removed from metadata — this exposed internal scaffolding tooling publicly and has no SEO value.
- **Improved:** `title` now uses template format `{ default, template: "%s | RCT Labs" }` for per-page title suffixes.
- **Improved:** `authors` now includes URL pointing to the author page for E-E-A-T signal.
- **Improved:** Added `twitter.site` field alongside `twitter.creator`.
- **Added:** `preconnect` for Vercel Analytics domain (`va.vercel-scripts.com`).

### 3. `lib/site-config.ts` — Stats data consistency fix
- **Bug:** `SITE_TEST_COUNT = 389` and `SITE_MICROSERVICE_COUNT = 33` contradicted `press/page.tsx` which states 4,849 tests and 62 microservices. This inconsistency directly damages E-E-A-T (Google's trust signal).
- **Fix:** Updated to canonical values:
  - `SITE_TEST_COUNT = 4849`
  - `SITE_MICROSERVICE_COUNT = 62`
  - Added `SITE_ALGORITHM_COUNT = 41`
  - Added `SITE_HEXACORE_COUNT = 7`
  - Added `SITE_COMPRESSION_RATE = "74%"`
  - Added `SITE_COST_REDUCTION = "3.74x"`
- **Added:** Inline comment warning developers to keep these in sync with `press/page.tsx` and `benchmark-summary/page.tsx`.

---

## ✅ Phase 2 — Performance & Security

### 4. `next.config.mjs` — Security, redirects, caching
- **Added:** `Content-Security-Policy` header (was completely missing). Configured to allow:
  - `unsafe-inline` for styles (required by Tailwind CSS)
  - Vercel Analytics scripts
  - Google Fonts
  - CloudFront image CDN
  - `frame-ancestors 'none'` (reinforces X-Frame-Options: DENY)
- **Added:** `redirects()` function with:
  - `/home` → `/` (permanent)
  - `/social` → `/community` (permanent)
  - `/protocols/fdia` → `/protocols/fdia-equation` (permanent)
- **Added:** Cache-Control headers:
  - `/_next/static/*` → `immutable, max-age=31536000` (1 year, Next.js hashes files)
  - `/images/*` → `max-age=86400, stale-while-revalidate=604800`
- **Expanded:** `optimizePackageImports` to include major Radix UI components.
- **Added:** `deviceSizes` and `imageSizes` for Next.js image optimization tuning.
- **Removed:** `poweredByHeader: false` already existed — kept as-is.

### 5. `components/ui/optimized-image.tsx` — Bug fix + accessibility
- **Fixed:** Third `useEffect` (SSR hydration check) had an empty dependency array `[]` with `eslint-disable` suppression. Changed to use `[isInView, isLoaded]` as proper dependencies — this is safer and removes the lint suppression.
- **Fixed:** Duplicate `<source>` case for `jpg`/`jpeg` — merged into a single conditional `(extension === "jpg" || extension === "jpeg")`.
- **Improved:** Error state `<div>` now has `role="img"` and `aria-label` for screen reader accessibility.
- **Improved:** Skeleton placeholder now uses `animate-pulse` Tailwind class for visible loading feedback.
- **Added:** Comprehensive inline documentation explaining the singleton observer pattern.

---

## 📋 Remaining — Phase 3 & 4 (SEO Content + Pre-Launch)

These items require content decisions and are tracked separately:

- [ ] Add `answer-first` paragraph to solutions, platform, products, research pages
- [ ] Add FAQ sections (with FAQSchema JSON-LD) to solutions, platform, whitepaper, protocols
- [ ] Add dense internal link clusters: protocol ↔ use-case ↔ solution ↔ research
- [ ] Add author blocks to all protocol and research pages
- [ ] Fix title tag lengths (target 50–60 chars) across all pages
- [ ] Add entity pages: FDIA deep-dive, JITNA deep-dive, RCT Kernel, Memory Architecture
- [ ] Add engineering validation / evidence sections with benchmarks
- [ ] Submit sitemap to Google Search Console after DNS cutover
- [ ] Run Lighthouse CI and enforce 90+ threshold in `.github/workflows`
- [ ] Verify OG image via social card validator before public launch
- [ ] Confirm all ENV vars set in Vercel: `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `NEXT_PUBLIC_API_URL`