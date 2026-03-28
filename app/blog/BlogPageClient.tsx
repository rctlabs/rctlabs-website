"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RESEARCH_CATEGORIES } from "@/lib/constants"
import type { BlogPost } from "@/lib/blog"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"
import { ArrowRight, BookOpen, Clock, Search, TrendingUp, FileText, Users, Filter } from "lucide-react"

interface BlogPageClientProps {
  posts: BlogPost[]
}

const CATEGORY_ICONS: Record<string, string> = {
  all: "📚",
  research: "🔬",
  news: "📰",
  tutorial: "🛠️",
  philosophy: "💡",
  case_study: "📊",
}

const CATEGORY_COLORS: Record<string, string> = {
  all: "text-warm-amber border-warm-amber/40 bg-warm-amber/10",
  research: "text-blue-400 border-blue-400/40 bg-blue-400/10",
  news: "text-green-400 border-green-400/40 bg-green-400/10",
  tutorial: "text-purple-400 border-purple-400/40 bg-purple-400/10",
  philosophy: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  case_study: "text-cyan-400 border-cyan-400/40 bg-cyan-400/10",
}

const getCategoryColor = (cat: string) =>
  CATEGORY_COLORS[cat] ?? "text-warm-amber border-warm-amber/40 bg-warm-amber/10"

function ArticleCard({
  post,
  localePrefix,
  isFeatured = false,
  t,
}: {
  post: BlogPost
  localePrefix: string
  isFeatured?: boolean
  t: (key: string) => string
}) {
  const catColor = getCategoryColor(post.category)
  const catLabel = t(`blog.cat.${post.category}`) || post.category

  if (isFeatured) {
    return (
      <Link href={`${localePrefix}/blog/${post.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-warm-charcoal/80 to-warm-charcoal/40 backdrop-blur-sm p-8 h-full hover:border-warm-amber/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(191,160,110,0.10)]">
          {/* Glow accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-warm-amber/5 rounded-full blur-3xl pointer-events-none" />

          {/* Badges */}
          <div className="flex items-center gap-3 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${catColor}`}>
              <span>{CATEGORY_ICONS[post.category] ?? "📄"}</span>
              <span className="capitalize">{catLabel}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-warm-amber/30 bg-warm-amber/10 text-warm-amber text-xs font-bold">
              ⭐ {t("blog.featured")}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-warm-light-gray group-hover:text-warm-amber transition-colors duration-200 leading-tight mb-4 text-balance">
            {post.title}
          </h2>

          <p className="text-warm-dim leading-relaxed mb-6 line-clamp-3 text-base">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded text-xs bg-white/5 border border-white/10 text-warm-dim">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4 text-sm text-warm-dim">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {post.author ?? post.authorId ?? "RCT Labs"}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} {t("common.min")}
              </span>
            </div>
            <span className="flex items-center gap-1.5 text-warm-amber text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
              {t("blog.read.article")} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`${localePrefix}/blog/${post.slug}`} className="group block h-full">
      <article className="relative h-full overflow-hidden rounded-xl border border-white/8 bg-warm-charcoal/40 backdrop-blur-sm p-6 flex flex-col hover:border-warm-amber/25 hover:bg-warm-charcoal/60 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Top gradient accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-amber/20 to-transparent" />

        <div className="flex items-center gap-2 mb-4">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${catColor}`}>
            <span>{CATEGORY_ICONS[post.category] ?? "📄"}</span>
            <span className="capitalize">{catLabel}</span>
          </span>
          <span className="ml-auto flex items-center gap-1 text-xs text-warm-dim">
            <Clock className="w-3 h-3" />{post.readTime} {t("common.min")}
          </span>
        </div>

        <h3 className="text-base font-bold text-warm-light-gray group-hover:text-warm-amber transition-colors duration-200 leading-snug mb-3 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-warm-dim text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded text-xs bg-white/5 border border-white/8 text-warm-dim/70">
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded text-xs text-warm-dim/50">+{post.tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-white/8 mt-auto">
          <span className="text-xs text-warm-dim">{(post.author ?? post.authorId ?? "RCT Labs").split(" ").slice(0, 2).join(" ")}</span>
          <ArrowRight className="w-4 h-4 text-warm-amber opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </article>
    </Link>
  )
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const pathname = usePathname()
  const { t } = useLanguage()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, "en"))

  const filteredPosts = useMemo(() => {
    let result = selectedCategory === "all" ? posts : posts.filter((p) => p.category === selectedCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.tags?.some((tg) => tg.toLowerCase().includes(q))
      )
    }
    return result
  }, [posts, selectedCategory, searchQuery])

  const totalWords = posts.reduce((acc, p) => acc + (p.readTime ?? 5) * 200, 0)
  const categories = [
    { id: "all", label: t("blog.filter.all") },
    ...RESEARCH_CATEGORIES.map((c) => ({ ...c, label: t(`blog.cat.${c.id}`) || c.label })),
  ]

  const categoryCount = (id: string) =>
    id === "all" ? posts.length : posts.filter((p) => p.category === id).length

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(191,160,110,0.08),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 py-24 md:py-32">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-amber/30 bg-warm-amber/8 text-warm-amber text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              {t("blog.badge")}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-warm-light-gray leading-tight text-balance">
              {t("blog.title").includes("Constitutional") ? (
                <>
                  {t("blog.title").split("Constitutional")[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-amber to-orange-400">
                    Constitutional AI
                  </span>
                </>
              ) : (
                t("blog.title")
              )}
            </h1>
            <p className="text-xl text-warm-dim leading-relaxed max-w-2xl">
              {t("blog.subtitle")}
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { icon: FileText, label: t("blog.stat.articles"), value: posts.length },
                { icon: TrendingUp, label: t("blog.stat.topics"), value: new Set(posts.map(p => p.category)).size },
                { icon: Clock, label: t("blog.stat.reading"), value: `${Math.round(totalWords / 1000)}K words` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2 text-sm">
                  <Icon className="w-4 h-4 text-warm-amber" />
                  <span className="font-bold text-warm-light-gray">{value}</span>
                  <span className="text-warm-dim">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters + Search ──────────────────────────────────── */}
      <section className="sticky top-16 z-20 border-y border-white/8 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Category pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-warm-dim shrink-0" />
            {categories.map((cat) => {
              const count = categoryCount(cat.id)
              if (count === 0 && cat.id !== "all") return null
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? getCategoryColor(cat.id)
                      : "border-white/10 text-warm-dim hover:border-white/20 hover:text-warm-light-gray"
                  }`}
                >
                  {CATEGORY_ICONS[cat.id] && <span className="mr-1">{CATEGORY_ICONS[cat.id]}</span>}
                  {cat.label}
                  <span className="ml-1.5 opacity-50">({count})</span>
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div className="sm:ml-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-warm-dim" />
            <input
              type="text"
              placeholder={t("blog.search.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm text-warm-light-gray placeholder:text-warm-dim focus:outline-none focus:border-warm-amber/40 focus:bg-white/8 transition-all w-48 sm:w-56"
            />
          </div>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-warm-dim text-lg">{t("blog.noResults")} &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("all") }}
              className="mt-4 px-4 py-2 rounded-lg border border-white/10 text-sm text-warm-dim hover:border-warm-amber/30 hover:text-warm-amber transition"
            >
              {t("blog.clearFilters")}
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Results count */}
            <div className="flex items-center justify-between">
              <p className="text-warm-dim text-sm">
                {t("blog.showing")} <span className="font-semibold text-warm-light-gray">{filteredPosts.length}</span>{" "}
                {t("blog.articles")}
                {selectedCategory !== "all" && (
                  <span> {t("blog.in")} <span className="text-warm-amber capitalize">{t(`blog.cat.${selectedCategory}`)}</span></span>
                )}
              </p>
            </div>

            {/* Featured (first post) + 2 sidebar */}
            {filteredPosts.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  <ArticleCard post={filteredPosts[0]} localePrefix={localePrefix} isFeatured t={t} />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {filteredPosts.slice(1, 3).map((post) => (
                    <ArticleCard key={post.slug} post={post} localePrefix={localePrefix} t={t} />
                  ))}
                </div>
              </div>
            )}

            {/* Rest grid */}
            {filteredPosts.length > 3 && (
              <>
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-warm-amber/20 to-transparent" />
                  <span className="text-xs text-warm-dim font-semibold uppercase tracking-wider">{t("blog.all.articles")}</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-warm-amber/20 to-transparent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredPosts.slice(3).map((post) => (
                    <ArticleCard key={post.slug} post={post} localePrefix={localePrefix} t={t} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </section>

      {/* ── Newsletter / CTA strip ────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-2xl border border-warm-amber/20 bg-gradient-to-br from-warm-amber/8 to-transparent p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-warm-light-gray mb-2">{t("blog.cta.title")}</h2>
            <p className="text-warm-dim max-w-md">
              {t("blog.cta.desc")}
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href={`${localePrefix}/authors/ittirit-saengow`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-warm-amber text-background font-semibold text-sm hover:bg-warm-amber/90 transition"
            >
              {t("blog.cta.button")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
