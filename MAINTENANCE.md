# Maintenance Guide

## Adding New Pages

1. Create new file in `app/` directory
2. Add SEO metadata using `createPageMetadata()`
3. Use existing components from `components/sections/`
4. Test on mobile and desktop
5. Update navigation if public page

## Updating Blog Posts

1. Edit MDX file in `content/blog/`
2. Update date if major change
3. Test MDX rendering
4. Check for broken links

## Content Updates

### Company Information
- Edit `app/about/page.tsx`
- Update team members
- Update contact information in `components/navbar.tsx` and `components/footer.tsx`

### Navigation
- Update `lib/constants.ts` for main navigation
- Update footer links in `lib/constants.ts`

### Styling
- Global styles: `app/globals.css`
- Component styles: Individual component files
- Design tokens: `globals.css` CSS variables

## Common Tasks

### Add New Component

1. Create in `components/` directory
2. Export from component file
3. Import in page that uses it
4. Test responsive behavior

### Add New Blog Post

1. Create `.mdx` file in `content/blog/`
2. Add frontmatter metadata
3. Write content in Markdown
4. Build project to verify
5. Deploy

### Update Logo/Branding

1. Replace images in `public/`
2. Update favicon: `public/favicon.ico`
3. Update OG image: Update URL in `lib/seo.ts`
4. Update metadata in root `layout.tsx`

### Fix Broken Link

1. Search for link in codebase: `grep -r "path"`
2. Update link destination
3. Test navigation
4. Deploy

## Performance Monitoring

### Check Build Size

\`\`\`bash
npm run build
# Review terminal output for bundle size
\`\`\`

### Monitor Runtime Performance

1. Open DevTools
2. Go to Performance tab
3. Record page load
4. Analyze results
5. Optimize as needed

## Troubleshooting

### Build Fails

\`\`\`bash
# Clear cache and rebuild
rm -rf .next
npm run build
\`\`\`

### Page Doesn't Load

1. Check browser console for errors
2. Verify file paths are correct
3. Check imports are valid
4. Restart dev server

### Blog Post Not Showing

1. Verify filename matches pattern (`.mdx`)
2. Check frontmatter is valid YAML
3. Ensure file is in `content/blog/`
4. Rebuild project

### Styling Issues

1. Check Tailwind classes are spelled correctly
2. Verify design tokens exist in CSS
3. Check for conflicting styles
4. Use browser DevTools to inspect

## Backup & Recovery

### Backup Strategy

1. Repository on GitHub (source code)
2. Environment variables in Vercel
3. Blog content in git history
4. Static assets in GitHub

### Recovery Procedure

1. Revert commit in GitHub
2. Vercel auto-deploys
3. Or manually trigger redeploy

## Updates & Dependencies

### Check for Updates

\`\`\`bash
npm outdated
\`\`\`

### Update Dependencies Safely

\`\`\`bash
# Update patch versions
npm update

# Update to latest (review changes first)
npm install <package@latest>

# Update all
npm install --latest
\`\`\`

### Test After Updates

\`\`\`bash
npm run build
npm run dev
# Test all major pages and features
\`\`\`

## Security

### Keep Dependencies Updated

\`\`\`bash
npm audit
npm audit fix
\`\`\`

### Security Headers

Already configured in `next.config.mjs`:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

### Environment Variables

Never commit `.env.local` to repository. Use Vercel's environment variable management.

## Documentation Updates

Keep documentation current:
- Update README.md when structure changes
- Update DEPLOYMENT.md for new deployment steps
- Update MAINTENANCE.md for new procedures
