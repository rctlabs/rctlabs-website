import Link from "next/link"
import { Calendar, ExternalLink, ShieldCheck, UserRound } from "lucide-react"
import type { AuthorProfile } from "@/lib/authors"

interface ArticleTrustSummaryProps {
  locale: "en" | "th"
  localePrefix: string
  author: AuthorProfile | null
  reviewer: AuthorProfile | null
  reviewedDate: string
  references: string[]
}

export function ArticleTrustSummary({ locale, localePrefix, author, reviewer, reviewedDate, references }: ArticleTrustSummaryProps) {
  const isTh = locale === "th"

  return (
    <section className="mb-10 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <ShieldCheck className="h-4 w-4 text-accent" />
        {isTh ? "บทความนี้ผ่านระบบ trust review" : "This article uses the trust review format"}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border/70 bg-background/60 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <UserRound className="h-4 w-4" />
            {isTh ? "Author" : "Author"}
          </div>
          <div className="mt-2 text-sm font-medium text-foreground">{author?.name ?? (isTh ? "ทีมงาน RCT Labs" : "RCT Labs")}</div>
          {author ? (
            <Link href={`${localePrefix}/authors/${author.id}`} className="mt-1 inline-block text-sm text-accent hover:underline">
              {isTh ? "ดูโปรไฟล์ผู้เขียน" : "View author profile"}
            </Link>
          ) : null}
        </div>

        <div className="rounded-xl border border-border/70 bg-background/60 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            {isTh ? "Reviewer" : "Reviewer"}
          </div>
          <div className="mt-2 text-sm font-medium text-foreground">{reviewer?.name ?? (isTh ? "ทีมบรรณาธิการ" : "Editorial review")}</div>
          {reviewer ? (
            <Link href={`${localePrefix}/authors/${reviewer.id}`} className="mt-1 inline-block text-sm text-accent hover:underline">
              {isTh ? "ดูโปรไฟล์ผู้ตรวจทาน" : "View reviewer profile"}
            </Link>
          ) : null}
        </div>

        <div className="rounded-xl border border-border/70 bg-background/60 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {isTh ? "Last reviewed" : "Last reviewed"}
          </div>
          <div className="mt-2 text-sm font-medium text-foreground">{reviewedDate}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            {isTh ? "อัปเดตเพื่อคงความถูกต้องเชิงแนวคิดและการอ้างอิง" : "Reviewed for current positioning and reference quality"}
          </div>
        </div>
      </div>

      {references.length > 0 ? (
        <div className="mt-5 rounded-xl border border-border/70 bg-background/60 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {isTh ? "Evidence references" : "Evidence references"}
          </div>
          <div className="mt-3 grid gap-2">
            {references.map((reference) => (
              <a
                key={reference}
                href={reference}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                <span>{reference}</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}