import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getPersonSchema } from "@/lib/schema"
import { getAllAuthorProfiles, getAuthorProfileById } from "@/lib/authors"
import { getAllBlogPosts, getResolvedAuthorProfile, getResolvedReviewerProfile } from "@/lib/blog"
import { SITE_URL } from "@/lib/site-config"

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllAuthorProfiles().map((author) => ({ slug: author.id }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const locale = await getRequestLocale()
  const { slug } = await params
  const author = getAuthorProfileById(slug)

  if (!author) {
    return createBilingualMetadata(locale, "Author Not Found", "ไม่พบผู้เขียน", "The requested author profile was not found.", "ไม่พบโปรไฟล์ผู้เขียนที่ต้องการ", "/authors")
  }

  return createBilingualMetadata(
    locale,
    `${author.name} — Author Profile`,
    `${author.name} — โปรไฟล์ผู้เขียน`,
    `Profile, expertise, and related research content for ${author.name} at RCT Labs.`,
    `โปรไฟล์ ความเชี่ยวชาญ และบทความที่เกี่ยวข้องของ ${author.name} ใน RCT Labs`,
    `/authors/${author.id}`,
    [author.name, ...author.expertise]
  )
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"
  const { slug } = await params
  const author = getAuthorProfileById(slug)

  if (!author) notFound()

  const posts = getAllBlogPosts().filter((post) => {
    const resolvedAuthor = getResolvedAuthorProfile(post)
    const resolvedReviewer = getResolvedReviewerProfile(post)
    return resolvedAuthor?.id === author.id || resolvedReviewer?.id === author.id
  })

  // Build appropriate JSON-LD schema based on profile type
  const authorUrl = `${SITE_URL}${localePrefix}/authors/${author.id}`
  const schema = author.profileType === "organization"
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: author.name,
        url: authorUrl,
        description: author.bio[locale],
        ...(author.sameAs && { sameAs: author.sameAs }),
      }
    : getPersonSchema(
        author.name,
        author.role[locale],
        authorUrl,
        author.bio[locale],
        author.sameAs,
        author.nameLocal,
        author.expertise,
      )

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-24 md:py-32">
        <Link href={`${localePrefix}/authors`} className="text-sm text-accent hover:underline">
          {isTh ? "← กลับไปหน้าผู้เขียน" : "← Back to authors"}
        </Link>

        <div className="mt-6 rounded-2xl border border-border bg-card p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold text-foreground">{author.name}</h1>
            {author.isSoleDeveloper && (
              <span className="rounded-full bg-warm-amber/15 px-3 py-1 text-xs font-semibold text-warm-amber">Solo Founder & Developer</span>
            )}
          </div>
          {author.nameLocal && (
            <p className="mt-1 text-lg text-muted-foreground">{author.nameLocal}</p>
          )}
          <p className="mt-3 text-lg text-accent">{author.role[locale]}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{author.bio[locale]}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {author.expertise.map((item) => (
              <span key={item} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">{item}</span>
            ))}
          </div>

          {author.sameAs?.length ? (
            <div className="mt-6 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{isTh ? "ลิงก์ยืนยันตัวตน" : "Verified Links"}</div>
              {author.sameAs.map((link) => (
                <a key={link} href={link} target="_blank" rel="noopener noreferrer" className="block text-sm text-accent hover:underline">{link}</a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "บทความที่เกี่ยวข้อง" : "Related articles"}</h2>
          <div className="mt-6 grid gap-4">
            {posts.map((post) => (
              <Link key={post.slug} href={`${localePrefix}/blog/${post.slug}`} className="rounded-xl border border-border bg-card p-5 transition hover:border-accent/50">
                <div className="text-sm text-accent uppercase">{post.category}</div>
                <div className="mt-2 text-xl font-semibold text-foreground">{post.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}