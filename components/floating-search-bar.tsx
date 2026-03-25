"use client"

import { Search } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function FloatingSearchBar() {
  const { language } = useLanguage()

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("rct-open-search"))}
      aria-label={language === "th" ? "เปิดการค้นหา" : "Open search"}
      className="floating-element fixed bottom-20 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-border bg-background/95 px-4 py-2.5 shadow-xl backdrop-blur-xl transition-colors hover:bg-accent lg:flex"
    >
      <Search className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-medium text-foreground/80">
        {language === "th" ? "ค้นหาหน้า เอกสาร และโปรโตคอล" : "Search pages, docs, and protocols"}
      </span>
      <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">⌘K</kbd>
    </button>
  )
}
