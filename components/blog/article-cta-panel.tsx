import Link from "next/link"
import { ArrowRight, Compass, FileText, Mail } from "lucide-react"
import { buildContactHref } from "@/lib/funnel"

interface ArticleCtaPanelProps {
  locale: "en" | "th"
  localePrefix: string
  solutionHref: string
  solutionLabel: string
  authorityHref: string
  authorityLabel: string
  conversionContext: string
  conversionLabel: string
}

export function ArticleCtaPanel({
  locale,
  localePrefix,
  solutionHref,
  solutionLabel,
  authorityHref,
  authorityLabel,
  conversionContext,
  conversionLabel,
}: ArticleCtaPanelProps) {
  const isTh = locale === "th"

  return (
    <section className="my-12 rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="max-w-2xl">
        <div className="text-sm font-semibold text-warm-amber">
          {isTh ? "เส้นทางถัดไปหลังอ่านบทความนี้" : "Where to go next from this article"}
        </div>
        <h2 className="mt-2 text-2xl font-bold text-foreground">
          {isTh ? "เชื่อมจากความรู้ไปสู่การประเมินระบบจริง" : "Move from knowledge into platform evaluation"}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {isTh
            ? "ทุกบทความเชิงวิจัยควรเชื่อมต่อไปยัง solution page, authority page, และ conversion path เพื่อให้การอ่านไม่จบแค่ traffic"
            : "Each research article should connect to a solution page, an authority page, and a conversion path so discovery turns into real evaluation."}
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link href={`${localePrefix}${solutionHref}`} className="group rounded-xl border border-border/70 bg-background/60 p-5 transition hover:border-accent/50">
          <Compass className="h-5 w-5 text-warm-amber" />
          <div className="mt-3 font-semibold text-foreground">{solutionLabel}</div>
          <div className="mt-1 text-sm text-muted-foreground">{isTh ? "ดู solution ที่เกี่ยวข้องกับบทความนี้" : "Go deeper into the related solution path."}</div>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-warm-amber">{isTh ? "เปิดหน้า solution" : "Open solution"}<ArrowRight className="h-4 w-4" /></div>
        </Link>

        <Link href={`${localePrefix}${authorityHref}`} className="group rounded-xl border border-border/70 bg-background/60 p-5 transition hover:border-accent/50">
          <FileText className="h-5 w-5 text-warm-amber" />
          <div className="mt-3 font-semibold text-foreground">{authorityLabel}</div>
          <div className="mt-1 text-sm text-muted-foreground">{isTh ? "ต่อยอดจากบทความไปยังหน้าที่อธิบายระบบในระดับลึกขึ้น" : "Continue into the authority layer for deeper system context."}</div>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-warm-amber">{isTh ? "เปิดหน้าอ้างอิง" : "Open authority page"}<ArrowRight className="h-4 w-4" /></div>
        </Link>

        <Link href={buildContactHref(locale, conversionContext)} className="group rounded-xl border border-border/70 bg-background/60 p-5 transition hover:border-accent/50">
          <Mail className="h-5 w-5 text-warm-amber" />
          <div className="mt-3 font-semibold text-foreground">{conversionLabel}</div>
          <div className="mt-1 text-sm text-muted-foreground">{isTh ? "ไปยัง contact funnel ที่ตรงกับ intent ของบทความนี้" : "Open the contact funnel aligned with this article's intent."}</div>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-warm-amber">{isTh ? "เริ่มคุยกับทีม" : "Start the conversation"}<ArrowRight className="h-4 w-4" /></div>
        </Link>
      </div>
    </section>
  )
}