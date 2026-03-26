import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
import { MDXContent } from "@/components/mdx-content"
import { SITE_URL } from "@/lib/site-config"

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
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  // --- BlogPosting Schema for SEO ---
  // This schema is injected as a <script type="application/ld+json"> block for rich results
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt && post.excerpt.length < 150
      ? `${post.excerpt} Read the full article for practical strategies, examples, and best practices from RCT Labs.`
      : post.excerpt,
    "url": `${SITE_URL}${localePrefix}/blog/${slug}`,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
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

      {/* Article */}
      <article className="mx-auto max-w-4xl px-4 py-24">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href={`${localePrefix}/blog`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        <div className="space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent font-medium capitalize">
              {post.category}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>

        {/* MDX Content */}
        <div className="prose prose-invert max-w-none mb-16">
          <MDXContent content={post.content} />
        </div>

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
            <div className="w-16 h-16 bg-linear-to-br from-accent/20 to-secondary/20 rounded-full shrink-0 flex items-center justify-center">
              <User className="w-8 h-8 text-accent/40" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">{post.author}</h3>
              <p className="text-muted-foreground text-sm">
                {post.author} is a researcher and author at RCT Labs, contributing to our mission of advancing
                intent-driven AI.
              </p>
            </div>
          </div>
        </div>
      </article>

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
