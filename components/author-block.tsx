import Link from "next/link"
import { getAuthorProfileById } from "@/lib/authors"
import { getPersonSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"

type AuthorBlockProps = {
  authorSlug: string
  locale?: "en" | "th"
}

export default function AuthorBlock({ authorSlug, locale = "en" }: AuthorBlockProps) {
  const author = getAuthorProfileById(authorSlug)
  if (!author) return null

  const isEn = locale === "en"
  const role = isEn ? author.role.en : author.role.th
  const bio = isEn ? author.bio.en : author.bio.th

  const personSchema =
    author.profileType === "person"
      ? getPersonSchema(
          author.name,
          role,
          `${SITE_URL}/${locale}/authors/${author.id}`,
          bio,
          author.sameAs,
          author.nameLocal,
          author.expertise,
        )
      : null

  return (
    <aside aria-label={isEn ? "About the author" : "เกี่ยวกับผู้เขียน"} className="mt-12 border-t border-border pt-8">
      {personSchema && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      )}
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        {isEn ? "Written by" : "เขียนโดย"}
      </p>
      <div className="flex items-start gap-4">
        {/* Avatar placeholder */}
        <div
          aria-hidden="true"
          className="flex-shrink-0 h-12 w-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground select-none"
        >
          {author.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <Link
            href={`/${locale}/authors/${author.id}`}
            className="font-semibold text-foreground hover:text-primary transition-colors"
          >
            {author.name}
            {author.nameLocal && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">({author.nameLocal})</span>
            )}
          </Link>
          <p className="text-sm text-muted-foreground mt-0.5">{role}</p>
          <p className="mt-2 text-sm text-foreground/80 leading-relaxed line-clamp-3">{bio}</p>
          <Link
            href={`/${locale}/authors/${author.id}`}
            className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
          >
            {isEn ? "View full profile →" : "ดูโปรไฟล์เต็ม →"}
          </Link>
        </div>
      </div>
    </aside>
  )
}
