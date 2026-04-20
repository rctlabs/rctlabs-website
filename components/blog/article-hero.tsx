import Link from "next/link"
import { ArrowLeft, BookMarked, Calendar, Clock3, ExternalLink, FileCheck2, ShieldCheck, UserRound } from "lucide-react"
import type { BlogHeroMetric, BlogLocale, BlogPost } from "@/lib/blog"

interface ArticleHeroProps {
  locale: BlogLocale
  localePrefix: string
  post: BlogPost
  categoryLabel: string
  publicationType: string
  reviewedDate: string
  authorName: string
  reviewerName: string
  authorityHref: string
  authorityLabel: string
  metrics: BlogHeroMetric[]
}

function formatPublishedDate(locale: BlogLocale, value: string) {
  return new Date(value).toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function ArticleHero({
  locale,
  localePrefix,
  post,
  categoryLabel,
  publicationType,
  reviewedDate,
  authorName,
  reviewerName,
  authorityHref,
  authorityLabel,
  metrics,
}: ArticleHeroProps) {
  const isTh = locale === "th"
  const hasEnglishFallback = locale === "th" && !post.isLocalized

  return (
    <section className="relative overflow-hidden rounded-4xl border border-border/70 bg-card/85 px-5 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:px-7 md:px-10 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.11),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(123,158,135,0.08),transparent_30%)]" />

      <div className="relative z-10 space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`${localePrefix}/blog`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:border-warm-amber/40 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {isTh ? "กลับไปหน้าบทความ" : "Back to research library"}
          </Link>

          <span className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-warm-amber">
            <BookMarked className="h-3.5 w-3.5" />
            {categoryLabel}
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <FileCheck2 className="h-3.5 w-3.5" />
            {publicationType}
          </span>

          {hasEnglishFallback ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-warning/35 bg-warning/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-warning-foreground dark:text-warning">
              <ExternalLink className="h-3.5 w-3.5" />
              {isTh ? "English fallback active" : "English fallback active"}
            </span>
          ) : null}
        </div>

        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl leading-[1.02] text-foreground sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <p className={`max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl ${isTh ? "subtitle-th" : ""}`}>
            {post.excerpt}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <UserRound className="h-3.5 w-3.5" />
              {isTh ? "Author" : "Author"}
            </div>
            <div className="mt-2 text-sm font-semibold text-foreground">{authorName}</div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              {isTh ? "Reviewer" : "Reviewer"}
            </div>
            <div className="mt-2 text-sm font-semibold text-foreground">{reviewerName}</div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {isTh ? "Last reviewed" : "Last reviewed"}
            </div>
            <div className="mt-2 text-sm font-semibold text-foreground">{formatPublishedDate(locale, reviewedDate)}</div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5" />
              {isTh ? "Reading time" : "Reading time"}
            </div>
            <div className="mt-2 text-sm font-semibold text-foreground">
              {post.readTime} {isTh ? "นาทีอ่าน" : "min read"}
            </div>
          </div>
        </div>

        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-warm-amber" />
              {isTh ? "Trust review active" : "Trust review active"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm text-muted-foreground">
              <FileCheck2 className="h-4 w-4 text-warm-amber" />
              {post.references?.length ?? 0} {isTh ? "evidence sources" : "evidence sources"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm text-muted-foreground">
              <BookMarked className="h-4 w-4 text-warm-amber" />
              {isTh ? "BlogPosting schema active" : "BlogPosting schema active"}
            </span>
          </div>

          <Link
            href={`${localePrefix}${authorityHref}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition hover:border-warm-amber/40 hover:text-warm-amber"
          >
            {authorityLabel}
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        {metrics.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {metrics.map((metric) => (
              <div key={`${metric.label}-${metric.value}`} className="rounded-2xl border border-border/70 bg-background/72 px-4 py-3">
                <div className="text-xl font-bold text-foreground">{metric.value}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{metric.label}</div>
                {metric.detail ? <div className="mt-1 text-xs text-muted-foreground">{metric.detail}</div> : null}
                {metric.evidenceType ? (
                  <div className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    metric.evidenceType === "source"
                      ? "bg-warm-sage/15 text-warm-sage"
                      : "bg-warm-amber/15 text-warm-amber"
                  }`}>
                    {metric.evidenceType === "source" ? "Source-backed" : "Benchmark assumption"}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}