import Link from "next/link"
import { ArrowRight, Clock, Users, FlaskConical, Newspaper, Wrench, Lightbulb, BarChart3, FileIcon } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { BlogPostMetadata } from "@/lib/blog"
import { useCardSpotlight } from "@/hooks/use-card-spotlight"

interface PostCardProps extends BlogPostMetadata {
  slug: string
  localePrefix: string
}

const CATEGORY_COLORS: Record<string, string> = {
  research: "text-blue-400 border-blue-400/30 bg-blue-400/8",
  news: "text-green-400 border-green-400/30 bg-green-400/8",
  tutorial: "text-purple-400 border-purple-400/30 bg-purple-400/8",
  philosophy: "text-orange-400 border-orange-400/30 bg-orange-400/8",
  case_study: "text-cyan-400 border-cyan-400/30 bg-cyan-400/8",
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  research: FlaskConical,
  news: Newspaper,
  tutorial: Wrench,
  philosophy: Lightbulb,
  case_study: BarChart3,
}

export function PostCard({ slug, title, author, date, category, excerpt, readTime, tags = [], localePrefix }: PostCardProps) {
  const catColor = CATEGORY_COLORS[category] ?? "text-warm-amber border-warm-amber/30 bg-warm-amber/8"
  const CatIcon = CATEGORY_ICONS[category] ?? FileIcon
  const formattedDate = date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null
  const cardSpotlight = useCardSpotlight<HTMLAnchorElement>()

  return (
    <Link href={`${localePrefix}/blog/${slug}`} {...cardSpotlight} className="main-page-reactive-card group block h-full rounded-xl">
      <article className="relative h-full overflow-hidden rounded-xl border border-white/8 bg-warm-charcoal/40 backdrop-blur-sm p-6 flex flex-col hover:border-warm-amber/25 hover:bg-warm-charcoal/60 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Top gradient line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-amber/20 to-transparent" />

        {/* Category + read time */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${catColor}`}>
            <CatIcon className="w-3 h-3" />
            <span className="capitalize">{category}</span>
          </span>
          <span className="ml-auto flex items-center gap-1 text-xs text-warm-dim">
            <Clock className="w-3 h-3" />{readTime} min
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-warm-light-gray group-hover:text-warm-amber transition-colors duration-200 leading-snug mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-warm-dim text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded text-xs bg-white/5 border border-white/8 text-warm-dim/70">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 rounded text-xs text-warm-dim/50">+{tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/8 mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-warm-dim">
            <Users className="w-3 h-3" />
            <span>{author.split(" ").slice(0, 2).join(" ")}</span>
          </div>
          {formattedDate && (
            <span className="text-xs text-warm-dim/60 tabular-nums">{formattedDate}</span>
          )}
          <ArrowRight className="w-4 h-4 text-warm-amber opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </article>
    </Link>
  )
}
