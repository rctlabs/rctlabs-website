"use client"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useIdleActivation } from "@/hooks/use-idle-activation"

const HeroAnimatedBackground = dynamic(() => import("@/components/ui/hero-animated-background"), {
  ssr: false,
  loading: () => null,
})

export function DeferredGlobalBackground() {
  const pathname = usePathname()
  // Homepage already has its own layered background system — skip here to avoid
  // double-rendering and wasting GPU resources on redundant fixed-position layers.
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/th"
  const ready = useIdleActivation({ timeoutMs: 1600, enabled: !isHome })

  return ready ? <HeroAnimatedBackground variant="global" /> : null
}