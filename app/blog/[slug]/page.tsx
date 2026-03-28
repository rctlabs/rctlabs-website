import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getAllBlogPosts, getPostJourney, getPostReviewDate, getResolvedAuthorProfile, getResolvedReviewerProfile } from "@/lib/blog"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, FlaskConical, Newspaper, Wrench, Lightbulb, BarChart3 } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { MDXContent } from "@/components/mdx-content"
import { SITE_URL } from "@/lib/site-config"
import { ArticleTrustSummary } from "@/components/blog/article-trust-summary"
import { ArticleCtaPanel } from "@/components/blog/article-cta-panel"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { ShareStrip } from "@/components/blog/share-strip"
import { TableOfContents } from "@/components/blog/table-of-contents"

const ARTICLE_CATEGORY_ICONS: Record<string, LucideIcon> = {
  research: FlaskConical,
  news: Newspaper,
  tutorial: Wrench,
  philosophy: Lightbulb,
  case_study: BarChart3,
}

const ARTICLE_CATEGORY_COLORS: Record<string, string> = {
  research: "text-blue-400 border-blue-400/40 bg-blue-400/10",
  news: "text-green-400 border-green-400/40 bg-green-400/10",
  tutorial: "text-purple-400 border-purple-400/40 bg-purple-400/10",
  philosophy: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  case_study: "text-cyan-400 border-cyan-400/40 bg-cyan-400/10",
}

function AuthorAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()
  return (
    <div className="w-16 h-16 bg-gradient-to-br from-warm-amber/30 to-warm-amber/10 border border-warm-amber/20 rounded-full shrink-0 flex items-center justify-center font-bold text-warm-amber text-lg">
      {initials}
    </div>
  )
}

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^#{2,3}\s+(.+)$/gm
  const matches: { id: string; text: string; level: number }[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const raw = match[0]
    const level = raw.startsWith("###") ? 3 : 2
    const text = match[1].replace(/\*\*/g, "").replace(/`/g, "").trim()
    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-")
    matches.push({ id, text, level })
  }
  return matches
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  const locale = await getRequestLocale()

  if (!post) {
    return createBilingualMetadata(locale, "Post Not Found", "ไม่พบบทความ", "The blog post you're looking for doesn't exist.", "ไม่พบบทความที่คุณกำลังค้นหา", "/blog")
  }

  const metaDescription = post.excerpt && post.excerpt.length < 150
    ? `${post.excerpt} Read the full article for practical strategies, examples, and best practices from RCT Labs.`
    : post.excerpt

  return createBilingualMetadata(
    locale,
    post.title,
    post.title,
    metaDescription || post.title,
    metaDescription || post.title,
    `/blog/${slug}`,
    ["AI blog", "RCT Labs article"]
  )
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"

  if (!post) {
    notFound()
  }

  const allPosts = getAllBlogPosts()
  const author = getResolvedAuthorProfile(post)
  const reviewer = getResolvedReviewerProfile(post)
  const reviewedDate = getPostReviewDate(post)
  const postJourney = getPostJourney(post)
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const headings = extractHeadings(post.content)
  const CatIcon = ARTICLE_CATEGORY_ICONS[post.category] ?? FlaskConical
  const catColor = ARTICLE_CATEGORY_COLORS[post.category] ?? "text-warm-amber border-warm-amber/40 bg-warm-amber/10"
  const articleUrl = `${SITE_URL}${localePrefix}/blog/${slug}`

  // --- BlogPosting Schema for SEO ---
  // Enhanced with image, about, isPartOf, citation for maximum E-E-A-T and AIO signals
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt && post.excerpt.length < 150
      ? `${post.excerpt} Read the full article for practical strategies, examples, and best practices from RCT Labs.`
      : post.excerpt,
    "url": `${SITE_URL}${localePrefix}/blog/${slug}`,
    "datePublished": post.date,
    "dateModified": reviewedDate,
    "wordCount": post.content.split(/\\s+/).length,
    "keywords": post.tags?.join(", "),
    "image": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/blog/${slug}/opengraph-image`,
      "width": 1200,
      "height": 630,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}${localePrefix}/blog/${slug}`
    },
    "isPartOf": {
      "@type": "Blog",
      "@id": `${SITE_URL}${localePrefix}/blog`,
      "name": "RCT Labs Blog",
    },
    "about": post.tags?.map((tag: string) => ({
      "@type": "DefinedTerm",
      "name": tag,
      "inDefinedTermSet": `${SITE_URL}/glossary`,
    })),
    "author": {
      "@type": author?.profileType === "organization" ? "Organization" : "Person",
      "name": author?.name ?? post.author,
      ...(author ? { "url": `${SITE_URL}${localePrefix}/authors/${author.id}` } : {}),
      ...(author?.sameAs ? { "sameAs": author.sameAs } : {}),
    },
    "editor": reviewer ? {
      "@type": reviewer.profileType === "organization" ? "Organization" : "Person",
      "name": reviewer.name,
      ...(reviewer ? { "url": `${SITE_URL}${localePrefix}/authors/${reviewer.id}` } : {})
    } : undefined,
    ...(post.references?.length ? {
      "citation": post.references.map((ref: string) => ({
        "@type": "CreativeWork",
        "url": ref,
      })),
    } : {}),
    "publisher": {
      "@type": "Organization",
      "name": "RCT Labs",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <ReadingProgress />

      {/* Article Hero Strip */}
      <div className="border-b border-white/8 bg-warm-charcoal/30">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-wrap items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href={`${localePrefix}/blog`}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Blog
            </Link>
          </Button>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${catColor}`}>
            <CatIcon className="w-3.5 h-3.5" />
            <span className="capitalize">{post.category.replace("_", " ")}</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime} min read
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
        </div>
      </div>

      {/* Article — 2 column layout on desktop */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Main content */}
          <article>
            <div className="space-y-6 mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>

            <ArticleTrustSummary
              locale={locale}
              localePrefix={localePrefix}
              author={author}
              reviewer={reviewer}
              reviewedDate={reviewedDate}
              references={post.references ?? []}
            />

            {/* MDX Content */}
            <div className="prose prose-lg prose-invert max-w-none mb-16
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:text-muted-foreground
              prose-a:text-warm-amber prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-code:text-warm-amber prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-card prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
              prose-blockquote:border-l-warm-amber prose-blockquote:text-muted-foreground
              prose-th:text-warm-amber prose-th:bg-white/5">
              <MDXContent content={post.content} />
            </div>

            <ShareStrip title={post.title} url={articleUrl} />

            <ArticleCtaPanel
              locale={locale}
              localePrefix={localePrefix}
              solutionHref={postJourney.solutionHref}
              solutionLabel={postJourney.solutionLabel}
              authorityHref={postJourney.authorityHref}
              authorityLabel={postJourney.authorityLabel}
              conversionContext={postJourney.conversionContext}
              conversionLabel={postJourney.conversionLabel}
            />

            {/* Article Navigation */}
            <div className="border-t border-border pt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {prevPost ? (
                  <Link href={`${localePrefix}/blog/${prevPost.slug}`} className="group">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Previous Post</p>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition">
                        {prevPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{prevPost.excerpt}</p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost ? (
                  <Link href={`${localePrefix}/blog/${nextPost.slug}`} className="group md:text-right">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Next Post</p>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition">
                        {nextPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{nextPost.excerpt}</p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>

            {/* Author Section */}
            <div className="border-t border-border mt-12 pt-12">
              <div className="flex gap-4">
                <AuthorAvatar name={author?.name ?? post.author} />
                <div>
                  <h3 className="font-bold text-foreground">{author?.name ?? post.author}</h3>
                  <p className="text-muted-foreground text-sm">
                    {author?.bio[locale] ?? `${post.author} contributes to the public research and editorial library at RCT Labs.`}
                  </p>
                  {author ? <Link href={`${localePrefix}/authors/${author.id}`} className="mt-2 inline-block text-sm text-accent hover:underline">{locale === "th" ? "ดูโปรไฟล์ผู้เขียน" : "View author profile"}</Link> : null}
                </div>
              </div>
            </div>
          </article>

          {/* TOC sidebar — desktop only */}
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>

      {/* Related Posts */}
      <section className="mx-auto max-w-7xl px-4 py-24 border-t border-border">
        <h2 className="text-3xl font-bold text-foreground mb-12">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allPosts
            .filter((p) => p.category === post.category && p.slug !== slug)
            .slice(0, 3)
            .map((relatedPost) => (
              <Link key={relatedPost.slug} href={`${localePrefix}/blog/${relatedPost.slug}`}>
                <article className="group h-full p-8 rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition bg-card">
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded capitalize">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
