"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { useMainPageActiveSection } from "@/components/main-page/main-page-orchestrator"
import { cn } from "@/lib/utils"

interface MainPageSectionProps {
  sectionId: string
  tone?: "base" | "raised" | "elevated" | "settle"
  continuityMode?: "standard" | "dense" | "settle"
  className?: string
  children: ReactNode
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function quantize(value: number, step: number) {
  return Number((Math.round(value / step) * step).toFixed(4))
}

export function MainPageSection({
  sectionId,
  tone = "base",
  continuityMode = "standard",
  className,
  children,
}: MainPageSectionProps) {
  const activeSection = useMainPageActiveSection()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [localProgress, setLocalProgress] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // progress: 0 when bottom of el enters viewport, 1 when top of el leaves viewport
      const raw = 1 - (rect.bottom / (vh + rect.height))
      const next = quantize(clamp(raw, 0, 1), 0.02)
      setLocalProgress((cur) => (cur === next ? cur : next))
    }

    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  const focus = clamp(1 - Math.abs(localProgress - 0.5) * 2, 0, 1)
  const isActive = activeSection === sectionId

  return (
    <div
      ref={sectionRef}
      data-main-section={sectionId}
      data-active={isActive ? "true" : "false"}
      className={cn(
        "main-page-section",
        `main-page-section--${tone}`,
        `main-page-section--${continuityMode}`,
        className,
      )}
      style={{
        ["--main-section-progress" as string]: localProgress.toFixed(3),
        ["--main-section-focus" as string]: focus.toFixed(3),
      }}
    >
      <div className="main-page-section__surface" aria-hidden="true" />
      <div className="main-page-section__divider" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}