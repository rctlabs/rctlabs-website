import Link from "next/link"
import { Calendar, ExternalLink, FileCheck2, ScrollText, ShieldCheck } from "lucide-react"
import type { AuthorProfile } from "@/lib/authors"

interface ArticleTrustSummaryProps {
  locale: "en" | "th"
  localePrefix: string
  reviewer: AuthorProfile | null
  reviewedDate: string
  references: string[]
  authorityHref: string
  authorityLabel: string
}

function getReferenceLabel(reference: string) {
  try {
    return new URL(reference).hostname.replace(/^www\./, "")
  } catch {
    return reference
  }
}

export function ArticleTrustSummary({
  locale,
  localePrefix,
  reviewer,
  reviewedDate,
  references,
  authorityHref,
  authorityLabel,
}: ArticleTrustSummaryProps) {
  const isTh = locale === "th"

  return (
    <section className="rounded-[1.75rem] border border-border/70 bg-card/85 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.04)] md:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-warm-amber">
          <ShieldCheck className="h-3.5 w-3.5" />
          {isTh ? "Trust review active" : "Trust review active"}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <FileCheck2 className="h-3.5 w-3.5" />
          {isTh ? "Structured schema active" : "Structured schema active"}
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            {isTh ? "Reviewer" : "Reviewer"}
          </div>
          <div className="mt-2 text-sm font-semibold text-foreground">{reviewer?.name ?? (isTh ? "ทีมบรรณาธิการ" : "Editorial review")}</div>
          {reviewer ? (
            <Link href={`${localePrefix}/authors/${reviewer.id}`} className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
              <span>{isTh ? "ดูโปรไฟล์ผู้ตรวจทาน" : "View reviewer profile"}</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : null}
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {isTh ? "Last reviewed" : "Last reviewed"}
          </div>
          <div className="mt-2 text-sm font-semibold text-foreground">{reviewedDate}</div>
          <div className="mt-2 text-sm leading-6 text-muted-foreground">
            {isTh ? "บทความนี้ผ่านการตรวจทานเชิงอ้างอิงและการวางตำแหน่งเชิงแนวคิด" : "Reviewed for evidence quality, structural trust, and editorial positioning."}
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <FileCheck2 className="h-4 w-4" />
            {isTh ? "Evidence footprint" : "Evidence footprint"}
          </div>
          <div className="mt-2 text-sm font-semibold text-foreground">{references.length} {isTh ? "sources" : "sources"}</div>
          <div className="mt-2 text-sm leading-6 text-muted-foreground">
            {isTh ? "อ้างอิงพร้อมสำหรับการทวนสอบภายนอกและการตรวจเส้นทางความน่าเชื่อถือ" : "External references available for audit, verification, and trust-path review."}
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <ScrollText className="h-4 w-4" />
            {isTh ? "Method layer" : "Method layer"}
          </div>
          <Link href={`${localePrefix}${authorityHref}`} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-warm-amber">
            <span>{authorityLabel}</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
          <div className="mt-2 text-sm leading-6 text-muted-foreground">
            {isTh ? "เชื่อมไปยังหน้าที่ขยายคำอธิบายเชิง methodology หรือ authority สำหรับบทความนี้" : "Links into the methodology or authority layer that supports this article's claims."}
          </div>
        </div>
      </div>

      {references.length > 0 ? (
        <div className="mt-5 rounded-2xl border border-border/70 bg-background/70 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {isTh ? "Evidence sources" : "Evidence sources"}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {references.map((reference) => (
              <a
                key={reference}
                href={reference}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition hover:border-warm-amber/35 hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                <span>{getReferenceLabel(reference)}</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}