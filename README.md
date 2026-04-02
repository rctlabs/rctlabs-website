# RCT Labs - Intent Operating System

A cutting-edge website for RCT Labs featuring philosophy, research, protocol documentation, and community resources.

## Project Overview

This is a Next.js 16 application built with modern technologies:

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Content**: MDX for blog posts and documentation
- **Performance**: Optimized images, static generation, and caching

## Project Structure

\`\`\`
├── app/                          # Next.js App Router
│   ├── (public pages)
│   ├── blog/                     # Blog listing and individual posts
│   ├── company/                  # Company pages (About, Careers, Press, Partners)
│   ├── community/                # Community hub
│   ├── philosophy/               # Philosophy concepts and frameworks
│   ├── research/                 # Research papers
│   ├── open-protocol/            # Protocol documentation
│   ├── contact/                  # Contact form
│   └── layout.tsx                # Root layout
├── components/
│   ├── blog/                     # Blog-specific components
│   ├── sections/                 # Reusable page sections
│   ├── ui/                       # shadcn/ui components
│   ├── navbar.tsx                # Navigation component
│   ├── footer.tsx                # Footer component
│   └── theme-provider.tsx        # Theme configuration
├── content/
│   └── blog/                     # MDX blog posts
├── lib/
│   ├── blog.ts                   # Blog utilities and metadata
│   ├── constants.ts              # Navigation and config constants
│   ├── seo.ts                    # SEO utilities
│   └── utils.ts                  # General utilities
├── public/                       # Static assets
└── styles/                       # Global styles
\`\`\`

## Key Features

### Blog System
- MDX-based blog with frontmatter metadata
- Automatic static generation from content directory
- Related posts recommendations
- Navigation between posts
- Category filtering and search

### FloatingAI Assistant (Backend-Connected)
- Real-time chat powered by L3 API backend (55+ knowledge base topics)
- LLM fallback via Ollama multi-model chain (llama3.2:3b → 1b → mistral:7b)
- Source indicators: ✓ KB, 🤖 LLM, 🔗 Hybrid, ⚡ Cache, ⚠️ Fallback
- Conversation history (last 6 messages) with context awareness
- Suggested follow-up questions from backend
- Feedback buttons (thumbs up/down)
- Quick-start scenarios for common questions
- Expand/minimize mode

### Pages Included
- **Home**: Hero section with CTA and feature overview
- **About**: Company mission, values, timeline, and team
- **Contact**: Contact form with integration options
- **Company**: Company hub with careers, press, and partners
- **Community**: Community hub with forums, events, and members
- **Philosophy**: Core concepts including FDIA, RCT-7, JITNA, Intent OS
- **Research**: Published papers and research directory
- **Blog**: Blog listing with featured posts and filtering
- **Open Protocol**: Protocol documentation and specs

### Design System
- Consistent color palette using semantic design tokens
- Responsive layouts with Tailwind CSS
- Accessibility-first approach with ARIA labels
- Dark mode support via next-themes
- Performance optimized with proper caching headers

## Getting Started

### Installation

\`\`\`bash
# Clone the repository
git clone <repository>

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

### Development

The application runs on `http://localhost:3010` (to avoid conflicts with Enterprise-refactor frontend).

**To use FloatingAI with the backend:**
```bash
# Terminal 1: Start L3 API backend
cd ../rct/Enterprise-refactor
bash start-l3-llm.sh

# Terminal 2: Start rctlabs-v0 frontend
cd rctlabs-v0
npm install --legacy-peer-deps
npx next dev --port 3010
```

### Adding Blog Posts

Create new MDX files in the `content/blog/` directory with frontmatter:

\`\`\`mdx
---
title: "Post Title"
author: "Author Name"
date: "2025-02-15"
category: "research|philosophy|industry|news"
excerpt: "Brief excerpt for the post list"
tags: ["tag1", "tag2"]
readTime: 5
---

# Post content in Markdown...
\`\`\`

## Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required for FloatingAI backend connection
NEXT_PUBLIC_API_URL=http://localhost:8003

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3010
```

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | L3 API backend URL | `http://localhost:8003` |
| `NEXT_PUBLIC_SITE_URL` | Frontend URL | `http://localhost:3000` |

### SEO
SEO metadata is configured in `lib/seo.ts` with:
- OpenGraph tags for social sharing
- Twitter card configuration
- Canonical URLs
- Meta descriptions

### Redirects
Common redirects are configured in `next.config.mjs`:
- `/home` → `/`
- `/social` → `/community`

## Performance Optimizations

- Static generation for all pages
- Automatic image optimization
- CSS-in-JS with Tailwind CSS
- Component code splitting
- Proper caching headers

## Technologies Used

- **Next.js 16**: React framework with App Router
- **React 19.2**: UI library with latest features
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **MDX**: Markdown with JSX support
- **gray-matter**: YAML frontmatter parser
- **next-mdx-remote**: MDX rendering for Next.js
- **Lucide React**: Icon library
- **Recharts**: Data visualization library
- **Framer Motion**: Animation library
- **L3 API Backend**: FloatingAI chat backend (FastAPI, port 8003)

## Deployment

### Vercel (Recommended)

\`\`\`bash
npm run build
vercel deploy
\`\`\`

### Docker

\`\`\`bash
docker build -t rct-labs .
docker run -p 3000:3000 rct-labs
\`\`\`

### Standard Hosting

\`\`\`bash
npm run build
npm start
\`\`\`

## SEO & Performance

- Sitemap auto-generated
- Robots.txt configured
- Mobile-responsive design
- Lighthouse optimized
- Accessibility tested (WCAG 2.1)

## Contributing

Contributions welcome! Please follow these guidelines:

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## License

© 2025 RCT Labs. All rights reserved.

## Support

For support, visit `/contact` or email founder@rctlabs.co

---

**Built with Next.js 16, React 19.2, and Tailwind CSS v4**
