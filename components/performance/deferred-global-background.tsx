"use client"

import dynamic from "next/dynamic"
import { useIdleActivation } from "@/hooks/use-idle-activation"

const HeroAnimatedBackground = dynamic(() => import("@/components/ui/hero-animated-background"), {
  ssr: false,
  loading: () => null,
})

export function DeferredGlobalBackground() {
  const ready = useIdleActivation({ timeoutMs: 1600 })

  return ready ? <HeroAnimatedBackground variant="global" /> : null
}