import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { BlogPostMetadata } from "@/lib/blog"

interface PostCardProps extends BlogPostMetadata {
  slug: string
}

export function PostCard({ slug, title, author, date, category, excerpt, readTime }: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="group h-full p-8 rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition bg-card">
        <div className="space-y-4 h-full flex flex-col">
          <div className="flex items-center gap-3">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded capitalize">
              {category}
            </span>
            <span className="text-xs text-muted-foreground">{readTime} min read</span>
          </div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition leading-tight">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm flex-1">{excerpt}</p>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex flex-col text-xs text-muted-foreground">
              <span>{author}</span>
              <span>{date}</span>
            </div>
            <div className="flex items-center text-accent opacity-0 group-hover:opacity-100 transition">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
