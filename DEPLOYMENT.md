# RCT Labs Deployment Guide

## Deployment Overview

rctlabs.co is configured for seamless deployment on Vercel with optimized performance, SEO, and security settings.

## Pre-Deployment Checklist

- [x] SEO metadata configured (metadata.ts in app/layout.tsx)
- [x] Sitemap generated (app/sitemap.ts)
- [x] Robots.txt configured (app/robots.ts)
- [x] Manifest created for PWA support (app/manifest.ts)
- [x] Security headers added (next.config.mjs)
- [x] Image optimization enabled
- [x] Environment variables configured
- [x] Analytics setup (Vercel Analytics integrated)

## Deployment Steps

### Step 1: Push to GitHub
\`\`\`bash
git add .
git commit -m "Complete rctlabs.co deployment setup"
git push origin main
\`\`\`

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Deploy"
5. Wait for deployment to complete

### Step 3: Configure Custom Domain
1. In Vercel dashboard: Settings → Domains
2. Add domain: rctlabs.co
3. Update DNS records at your domain registrar:
   - Point to Vercel nameservers or
   - Add CNAME record pointing to your Vercel deployment
4. Wait 24-48 hours for DNS propagation

### Step 4: Verify SEO
- [ ] Google Search Console: Submit sitemap
- [ ] Bing Webmaster Tools: Add site
- [ ] Check Core Web Vitals in Vercel Analytics
- [ ] Verify robots.txt at /robots.txt
- [ ] Verify sitemap at /sitemap.xml
- [ ] Test Open Graph tags on social media

## Environment Variables

Required environment variables:
\`\`\`
# FloatingAI Backend Connection (Required)
NEXT_PUBLIC_API_URL=http://localhost:8003    # L3 API URL (development)
NEXT_PUBLIC_SITE_URL=http://localhost:3010   # Frontend URL

# Production values
# NEXT_PUBLIC_API_URL=https://api.rctlabs.co  # Production L3 API
# NEXT_PUBLIC_SITE_URL=https://rctlabs.co     # Production frontend
\`\`\`

Add these in Vercel Settings → Environment Variables

### Backend Dependency

The FloatingAI assistant requires the L3 API backend to be running:
- **Development**: `http://localhost:8003` (start with `bash start-l3-llm.sh`)
- **Production**: Deploy L3 API as a separate service
- **Endpoints used**: `POST /rctlabs/assistant/chat`, `GET /health`
- **CORS**: Backend must allow the frontend origin

## Performance Optimization

Current optimizations:
- Image optimization (AVIF/WebP formats)
- Font preconnection for faster loading
- Preload critical resources
- DNS prefetch control
- Security headers enabled
- Gzip compression enabled by default

## Monitoring

- Vercel Analytics: Real-time performance metrics
- Web Vitals: Core Web Vitals dashboard
- Error tracking: Automatic error reporting
- Deploy logs: Available in Vercel dashboard

## Troubleshooting

### Sitemap not generated
\`\`\`bash
npm run build
\`\`\`

### DNS not resolving
- Wait 24-48 hours for DNS propagation
- Check your domain registrar settings
- Verify Vercel nameservers are correct

### Images not loading
- Ensure remote image domains are allowed in next.config.mjs
- Check image file formats (AVIF/WebP supported)
- Verify image URLs are accessible

## Rollback

To rollback to previous deployment:
1. Go to Vercel dashboard
2. Click "Deployments"
3. Select previous deployment
4. Click "Promote to Production"

## Support

For deployment support:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- Contact: support@rctlabs.co
