"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Syncs the <html lang> attribute with the current URL locale.
 *
 * The root layout renders with lang="en" by default so that it doesn't call
 * headers() (which would break ISR on the locale homepage routes).
 * This component patches the attribute on the client after hydration,
 * which is fast enough that Googlebot (which executes JS) sees the correct value.
 */
export function LocaleLangSync() {
  const pathname = usePathname()
  useEffect(() => {
    const lang = pathname?.startsWith("/th") ? "th" : "en"
    if (document.documentElement.lang !== lang) {
      document.documentElement.setAttribute("lang", lang)
    }
  }, [pathname])
  return null
}
