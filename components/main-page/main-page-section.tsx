"use client"

import { useState, useRef, type ReactNode } from "react"
import { useMotionValueEvent, useScroll } from "framer-motion"
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextProgress = quantize(clamp(latest, 0, 1), 0.02)
    setLocalProgress((current) => (current === nextProgress ? current : nextProgress))
  })

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