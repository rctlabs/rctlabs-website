"use client"

import dynamic from "next/dynamic"
import { useIdleActivation } from "@/hooks/use-idle-activation"

const HeroArchitectureVisual = dynamic(
  () => import("@/components/sections/hero-architecture-visual"),
  { ssr: false, loading: () => null },
)

export function HeroArchitectureIsland() {
  const ready = useIdleActivation({ timeoutMs: 450 })

  if (!ready) {
    return (
      <div className="mx-auto w-full max-w-105 sm:max-w-115 lg:ml-auto lg:max-w-121">
        <div className="aspect-[1/1.04] sm:aspect-5/4 w-full rounded-4xl border border-[#e6ddd0] bg-white/50 shadow-[0_20px_48px_rgba(84,61,31,0.08)] dark:border-border dark:bg-card/45">
          <div className="flex h-full flex-col items-center justify-center gap-3 px-8 opacity-40">
            <div className="h-2 w-24 animate-pulse rounded-full bg-warm-amber/40 dark:bg-warm-amber/30" />
            <div className="grid w-full max-w-50 grid-cols-2 gap-2">
              {["Intent", "Verify", "Memory", "Kernel"].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 rounded-lg border border-[#e6ddd0] bg-warm-sand/50 px-2.5 py-1.5 dark:border-border/60 dark:bg-card/60"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-warm-amber/60" />
                  <span className="text-[10px] font-medium text-warm-gray dark:text-warm-muted">{label}</span>
                </div>
              ))}
            </div>
            <div className="h-1.5 w-16 animate-pulse rounded-full bg-warm-sage/30 dark:bg-warm-sage/20" />
          </div>
        </div>
      </div>
    )
  }

  return <HeroArchitectureVisual />
}
