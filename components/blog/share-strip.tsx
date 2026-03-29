"use client"

import { useState } from "react"
import { Link2, ExternalLink, Check } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface ShareStripProps {
  locale: "en" | "th"
  title: string
  url: string
  citation: string
}

export function ShareStrip({ locale, title, url, citation }: ShareStripProps) {
  const [copiedState, setCopiedState] = useState<"link" | "citation" | null>(null)
  const { t } = useLanguage()

  const handleCopy = async (value: string, mode: "link" | "citation") => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedState(mode)
      setTimeout(() => setCopiedState(null), 2000)
    } catch {
      // Fallback for environments where clipboard API is unavailable
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  return (
    <div className="mb-12 rounded-[1.75rem] border border-border/70 bg-card/90 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.04)]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{t("blog.share")}</span>
        <span className="rounded-full border border-border bg-background/75 px-3 py-1 text-xs font-medium text-muted-foreground">
          {locale === "th" ? "Research distribution tools" : "Research distribution tools"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
      <button
        onClick={() => handleCopy(url, "link")}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-all duration-150 hover:border-warm-amber/30 hover:bg-warm-amber/5 hover:text-foreground"
        aria-label={`${t("blog.copy.link")}: ${title}`}
      >
        {copiedState === "link" ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-400" />
            {t("blog.copied")}
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            {t("blog.copy.link")}
          </>
        )}
      </button>
      <button
        onClick={() => handleCopy(citation, "citation")}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-all duration-150 hover:border-warm-amber/30 hover:bg-warm-amber/5 hover:text-foreground"
        aria-label={`${t("blog.copy.citation")}: ${title}`}
      >
        {copiedState === "citation" ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-400" />
            {t("blog.citation.copied")}
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            {t("blog.copy.citation")}
          </>
        )}
      </button>
      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-all duration-150 hover:border-warm-amber/30 hover:bg-warm-amber/5 hover:text-foreground"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        {t("blog.export.pdf")}
      </button>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        hrefLang={locale}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-all duration-150 hover:border-warm-amber/30 hover:bg-warm-amber/5 hover:text-foreground"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        {t("blog.linkedin")}
      </a>
      </div>
    </div>
  )
}
