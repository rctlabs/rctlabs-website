"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { useIdleActivation } from "@/hooks/use-idle-activation"

interface DeferredSectionProps {
  children: ReactNode
  minHeightClassName?: string
  rootMargin?: string
  idleTimeoutMs?: number
}

export function DeferredSection({
  children,
  minHeightClassName = "min-h-[420px]",
  rootMargin = "320px",
  idleTimeoutMs = 1800,
}: DeferredSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const idleReady = useIdleActivation({ timeoutMs: idleTimeoutMs })
  const [isNearViewport, setIsNearViewport] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || isNearViewport) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsNearViewport(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin, threshold: 0.01 },
    )

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current)
    }

    return () => observer.disconnect()
  }, [isNearViewport, rootMargin])

  const shouldRender = idleReady || isNearViewport

  return (
    <div ref={wrapperRef}>
      {shouldRender ? (
        <div className="animate-in fade-in duration-300">
          {children}
        </div>
      ) : (
        <div
          aria-hidden="true"
          className={`relative overflow-hidden rounded-[28px] border border-border/60 bg-white/55 dark:bg-card/45 ${minHeightClassName}`}
        >
          <div className="absolute inset-0 animate-pulse bg-[linear-gradient(135deg,rgba(255,255,255,0.58),rgba(247,241,235,0.2))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
        </div>
      )}
    </div>
  )
}