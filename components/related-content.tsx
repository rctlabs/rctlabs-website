"use client"

/*
 * RelatedContent — Related page/article suggestions
 * Improves navigation and engagement on inner pages
 * Migrated from manus-frontend-design: wouter Link → next/link (no nested <a>)
 */
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useCardSpotlight } from "@/hooks/use-card-spotlight"

export interface RelatedItem {
  title: string
  description?: string
  href: string
  category?: string
}

interface RelatedContentProps {
  items: RelatedItem[]
  title?: string
  className?: string
}

export default function RelatedContent({
  items,
  title = "Related Content",
  className = "",
}: RelatedContentProps) {
  const cardSpotlight = useCardSpotlight<HTMLAnchorElement>()

  if (items.length === 0) return null

  return (
    <section className={`mt-12 pt-8 border-t border-warm-light-gray dark:border-white/10 ${className}`}>
      <h3 className="text-xl font-bold text-warm-charcoal dark:text-white mb-6">{title}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            {...cardSpotlight}
            className="main-page-reactive-card group block rounded-xl border border-warm-light-gray bg-white p-5 dark:border-white/10 dark:bg-warm-charcoal hover:border-warm-amber dark:hover:border-warm-amber transition-all hover:shadow-md"
          >
            {item.category && (
              <span className="inline-block px-2 py-1 mb-3 text-xs font-semibold rounded-full bg-warm-cream dark:bg-white/5 text-warm-amber">
                {item.category}
              </span>
            )}
            <h4 className="font-semibold text-warm-charcoal dark:text-white mb-2 group-hover:text-warm-amber transition-colors">
              {item.title}
            </h4>
            {item.description && (
              <p className="text-sm text-warm-gray dark:text-white/60 mb-3 line-clamp-2">
                {item.description}
              </p>
            )}
            <div className="flex items-center gap-1 text-sm text-warm-amber font-medium">
              <span>Learn more</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
