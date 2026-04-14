"use client"

import { useEffect, useState } from "react"

/**
 * Delays adding the `.hero-animated` class to the hero orb-field until after
 * first paint. This ensures the browser can paint the LCP element (h1) before
 * spending main-thread time on orb animation style/layout calculations.
 *
 * Render flow:
 * 1. Server sends static orb divs (no animation)
 * 2. Browser paints h1 (LCP) immediately
 * 3. After hydration + requestAnimationFrame, `.hero-animated` is added
 * 4. CSS animations begin
 */
export function HeroOrbActivator({ children }: { children: React.ReactNode }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    // Wait one frame after hydration to ensure first paint is complete
    const raf = requestAnimationFrame(() => {
      setAnimated(true)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className={`hero-orb-field absolute inset-0${animated ? " hero-animated" : ""}`}
      aria-hidden="true"
    >
      {children}
    </div>
  )
}
