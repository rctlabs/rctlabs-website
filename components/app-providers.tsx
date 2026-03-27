"use client"

import dynamic from "next/dynamic"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider, type Language } from "@/components/language-provider"
import { useEffect, useState, type ReactNode } from "react"

const FloatingAIComingSoon = dynamic(
  () => import("@/components/floating-ai-coming-soon").then((module) => module.FloatingAIComingSoon),
  { ssr: false, loading: () => null },
)

function DeferredFloatingAI() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (shouldRender) return

    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let idleId: any = null

    const activate = () => {
      setShouldRender(true)
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      if (idleId !== null && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleId)
      }
      window.removeEventListener("pointerdown", activate)
      window.removeEventListener("keydown", activate)
      window.removeEventListener("touchstart", activate)
    }

    window.addEventListener("pointerdown", activate, { once: true, passive: true })
    window.addEventListener("keydown", activate, { once: true })
    window.addEventListener("touchstart", activate, { once: true, passive: true })

    if ("requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(activate, { timeout: 1800 })
    } else {
      timeoutId = setTimeout(activate, 1200)
    }

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      if (idleId !== null && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleId)
      }
      window.removeEventListener("pointerdown", activate)
      window.removeEventListener("keydown", activate)
      window.removeEventListener("touchstart", activate)
    }
  }, [shouldRender])

  return shouldRender ? <FloatingAIComingSoon /> : null
}

interface AppProvidersProps {
  children: ReactNode
  initialLocale?: Language
}

export function AppProviders({ children, initialLocale = "en" }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LanguageProvider initialLocale={initialLocale}>
        {children}
        <DeferredFloatingAI />
      </LanguageProvider>
    </ThemeProvider>
  )
}
