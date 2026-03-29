"use client"

import { useEffect, useState } from "react"
import { ChevronDown, FileCheck2, List, ScrollText } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  locale: "en" | "th"
  headings: Heading[]
  evidenceCount: number
  reviewedDate: string
  summaryId?: string
  resourcesId?: string
}

function scrollToTarget(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function TableOfContents({ locale, headings, evidenceCount, reviewedDate, summaryId, resourcesId }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrollable = el.scrollHeight - el.clientHeight
      const pct = scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0
      setProgress(Math.max(0, Math.min(100, pct)))
    }

    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  if (headings.length === 0) return null

  return (
    <>
      {/* Desktop sticky sidebar */}
      <nav className="sticky top-24 hidden lg:block" aria-label={t("blog.toc")}>
        <div className="rounded-[1.75rem] border border-border/70 bg-card/90 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-warm-amber" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("blog.toc")}</span>
          </div>

          <div className="mt-5 rounded-2xl border border-border/70 bg-background/70 p-4">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span>{locale === "th" ? "Reading progress" : "Reading progress"}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-warm-amber transition-[width] duration-150" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{locale === "th" ? "Evidence" : "Evidence"}</div>
              <div className="mt-2 text-base font-semibold text-foreground">{evidenceCount} {locale === "th" ? "sources" : "sources"}</div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{locale === "th" ? "Reviewed" : "Reviewed"}</div>
              <div className="mt-2 text-base font-semibold text-foreground">{reviewedDate}</div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {summaryId ? (
              <button
                onClick={() => scrollToTarget(summaryId)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/75 px-3 py-1.5 text-sm text-muted-foreground transition hover:border-warm-amber/35 hover:text-foreground"
              >
                <ScrollText className="h-3.5 w-3.5" />
                {locale === "th" ? "Summary" : "Summary"}
              </button>
            ) : null}
            {resourcesId ? (
              <button
                onClick={() => scrollToTarget(resourcesId)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/75 px-3 py-1.5 text-sm text-muted-foreground transition hover:border-warm-amber/35 hover:text-foreground"
              >
                <FileCheck2 className="h-3.5 w-3.5" />
                {locale === "th" ? "Resources" : "Resources"}
              </button>
            ) : null}
          </div>

          <ul className="mt-5 space-y-1.5">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={`block rounded-xl px-3 py-2 text-xs leading-snug transition-all duration-150 ${
                    h.level === 3 ? "ml-4" : ""
                  } ${
                    activeId === h.id
                      ? "border border-warm-amber/30 bg-warm-amber/10 font-semibold text-foreground"
                      : "border border-transparent text-muted-foreground hover:border-border hover:bg-background/70 hover:text-foreground"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToTarget(h.id)
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile utility rail */}
      <div className="sticky top-16 z-20 mb-8 lg:hidden">
        <div className="rounded-[1.25rem] border border-border/70 bg-card/95 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen((value) => !value)}
              className="inline-flex min-w-0 flex-1 items-center justify-between rounded-xl border border-border bg-background/75 px-3 py-2 text-sm font-medium text-foreground"
            >
              <span className="inline-flex items-center gap-2">
                <List className="h-4 w-4 text-warm-amber" />
                {t("blog.toc")}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {summaryId ? (
              <button
                onClick={() => scrollToTarget(summaryId)}
                className="rounded-xl border border-border bg-background/75 px-3 py-2 text-sm font-medium text-muted-foreground"
              >
                {locale === "th" ? "Summary" : "Summary"}
              </button>
            ) : null}
            {resourcesId ? (
              <button
                onClick={() => scrollToTarget(resourcesId)}
                className="rounded-xl border border-border bg-background/75 px-3 py-2 text-sm font-medium text-muted-foreground"
              >
                {locale === "th" ? "Sources" : "Sources"}
              </button>
            ) : null}
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-warm-amber transition-[width] duration-150" style={{ width: `${progress}%` }} />
          </div>

          {open ? (
            <div className="mt-4 space-y-4 border-t border-border pt-4">
              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="rounded-xl border border-border bg-background/70 px-3 py-2">
                  <div className="text-[11px] uppercase tracking-[0.16em]">{locale === "th" ? "Progress" : "Progress"}</div>
                  <div className="mt-1 font-semibold text-foreground">{Math.round(progress)}%</div>
                </div>
                <div className="rounded-xl border border-border bg-background/70 px-3 py-2">
                  <div className="text-[11px] uppercase tracking-[0.16em]">{locale === "th" ? "Evidence" : "Evidence"}</div>
                  <div className="mt-1 font-semibold text-foreground">{evidenceCount}</div>
                </div>
              </div>
              <ul className="space-y-2">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      hrefLang={locale}
                      className={`block rounded-xl border px-3 py-2 text-sm leading-snug transition-colors ${
                        activeId === h.id
                          ? "border-warm-amber/30 bg-warm-amber/10 text-foreground"
                          : "border-border bg-background/70 text-muted-foreground hover:text-foreground"
                      } ${h.level === 3 ? "ml-4" : ""}`}
                      onClick={(event) => {
                        event.preventDefault()
                        scrollToTarget(h.id)
                        setOpen(false)
                      }}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
