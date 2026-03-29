"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrollable = el.scrollHeight - el.clientHeight
      const pct = scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0
      setProgress(pct)
    }

    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-0.5 bg-warm-amber z-50 transition-none pointer-events-none"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t("blog.reading.progress")}
    />
  )
}
