# Pre-Launch Checklist — rctlabs.co

## DNS & Infrastructure
- [ ] DNS records configured (A, AAAA, CNAME) pointing to Vercel
- [ ] SSL/TLS certificate provisioned and valid
- [ ] `www` redirect configured (`www.rctlabs.co` → `rctlabs.co`)
- [ ] DNS TTL lowered before launch (≤300s)
- [ ] Domain verified in Vercel dashboard

## Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set in Vercel production
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in Vercel production
- [ ] `GOOGLE_SITE_VERIFICATION` set for Google Search Console
- [ ] `BING_SITE_VERIFICATION` set for Bing Webmaster Tools
- [ ] All secrets rotated from development to production values

## SEO & Metadata
- [ ] `app/sitemap.ts` covers all public routes
- [ ] `app/robots.ts` allows indexing of public pages
- [ ] Open Graph images render correctly (test with [opengraph.xyz](https://www.opengraph.xyz/))
- [ ] Canonical URLs set correctly on all pages
- [ ] Structured data (JSON-LD) validates via [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Bilingual hreflang tags (`en`, `th`, `x-default`) are correct
- [ ] `lighthouserc.json` assertions passing (SEO ≥ 95%, Perf ≥ 60%, A11y ≥ 90%)

## Performance
- [ ] Next.js build completes without errors (`npm run build`)
- [ ] Core Web Vitals measured in Vercel Analytics
- [ ] Images use Next.js `<Image>` with proper `sizes` and `priority`
- [ ] Static assets have long-term cache headers (`/_next/static/*`)
- [ ] No console errors or warnings in production build

## Security
- [ ] Security headers active (X-Frame-Options, CSP, HSTS, etc.) — verify via [securityheaders.com](https://securityheaders.com/)
- [ ] `poweredByHeader: false` in `next.config.mjs`
- [ ] No sensitive environment variables exposed to client bundle
- [ ] Supabase row-level security (RLS) enabled for all public tables
- [ ] Newsletter honeypot field active in footer form

## Testing
- [ ] All TypeScript compilation passes (`npm run build`)
- [ ] ESLint passes with no errors (`npm run lint`)
- [ ] Critical user flows manually tested (home, pricing, solutions, contact)
- [ ] Mobile responsive testing on iPhone SE, iPhone 15, Samsung Galaxy
- [ ] Cross-browser testing: Chrome, Firefox, Safari, Edge

## Monitoring & Analytics
- [ ] Vercel Analytics enabled and tracking
- [ ] Error monitoring configured (Vercel/Sentry)
- [ ] Uptime monitoring configured for rctlabs.co
- [ ] Google Search Console property verified
- [ ] Bing Webmaster Tools property verified

## Rollback Plan
- [ ] Previous deployment tagged in Vercel
- [ ] Database migration rollback scripts ready (if applicable)
- [ ] DNS TTL lowered before launch (≤300s)
- [ ] Team communication channel ready for launch day
