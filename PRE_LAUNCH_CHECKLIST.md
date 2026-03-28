# RCT Labs — Pre-Launch Checklist

## DNS & Domain
- [ ] Verify `rctlabs.co` DNS resolves correctly
- [ ] SSL certificate valid and auto-renewing
- [ ] www → non-www redirect configured

## Vercel Environment Variables
- [ ] GOOGLE_SITE_VERIFICATION set
- [ ] BING_SITE_VERIFICATION set
- [ ] All API keys configured

## SEO
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Submit sitemap.xml to Bing Webmaster Tools
- [ ] Verify OG images render correctly (use https://opengraph.xyz)
- [ ] Test hreflang tags with Google's URL Inspection tool
- [ ] robots.txt allows indexing of public routes

## Performance
- [ ] Lighthouse scores: Performance ≥85, Accessibility ≥90, SEO ≥90
- [ ] Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- [ ] Images optimized (AVIF/WebP with fallbacks)

## Accessibility
- [ ] Skip-to-content link works
- [ ] All images have alt text
- [ ] Color contrast ratios meet WCAG 2.1 AA
- [ ] Keyboard navigation works for all interactive elements

## Content
- [ ] All pages have unique meta titles (50-60 chars)
- [ ] All pages have unique meta descriptions (150-160 chars)
- [ ] No broken internal links
- [ ] 404 page works and is branded

## Security
- [ ] Security headers verified (X-Frame-Options, CSP, HSTS)
- [ ] No sensitive data in client-side code
- [ ] API routes have proper authentication
