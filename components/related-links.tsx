import Link from "next/link"
import type { InternalLink } from "@/lib/internal-links"

type RelatedLinksProps = {
  links: InternalLink[]
  locale?: "en" | "th"
  heading?: string
}

export default function RelatedLinks({ links, locale = "en", heading }: RelatedLinksProps) {
  const isEn = locale === "en"
  const defaultHeading = isEn ? "Related Content" : "เนื้อหาที่เกี่ยวข้อง"

  return (
    <nav aria-label="Related content" className="mt-10 border-t border-border pt-8">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        {heading ?? defaultHeading}
      </h3>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group block rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-muted/40 transition-colors"
            >
              <span className="block font-medium text-foreground group-hover:text-primary transition-colors">
                {isEn ? link.label : (link.labelTh ?? link.label)}
              </span>
              {(isEn ? link.description : (link.descriptionTh ?? link.description)) && (
                <span className="mt-1 block text-sm text-muted-foreground">
                  {isEn ? link.description : (link.descriptionTh ?? link.description)}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
