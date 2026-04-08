"use client"

import dynamic from "next/dynamic"
import { LazyMotion, domAnimation } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider, useLanguage, type Language } from "@/components/language-provider"
import { useEffect, useState, type ReactNode } from "react"

const FloatingAIComingSoon = dynamic(
  () => import("@/components/floating-ai-coming-soon").then((module) => module.FloatingAIComingSoon),
  { ssr: false, loading: () => null },
)

type IdleHandle = number

type IdleCallbackWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => IdleHandle
  cancelIdleCallback?: (handle: IdleHandle) => void
}

function DeferredFloatingAI() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (shouldRender) return

    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let idleId: IdleHandle | null = null
    const idleWindow = window as IdleCallbackWindow

    const activate = () => {
      setShouldRender(true)
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      if (idleId !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId)
      }
      window.removeEventListener("pointerdown", activate)
      window.removeEventListener("keydown", activate)
      window.removeEventListener("touchstart", activate)
    }

    window.addEventListener("pointerdown", activate, { once: true, passive: true })
    window.addEventListener("keydown", activate, { once: true })
    window.addEventListener("touchstart", activate, { once: true, passive: true })

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(activate, { timeout: 1800 })
    } else {
      timeoutId = setTimeout(activate, 1200)
    }

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      if (idleId !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId)
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
        <LazyMotion features={domAnimation}>
          {children}
          <DeferredFloatingAI />
          <LocaleTransitionOverlay />
        </LazyMotion>
      </LanguageProvider>
    </ThemeProvider>
  )
}

/**
 * Semi-transparent overlay shown while an in-flight locale-change RSC fetch
 * is pending. Prevents the user from seeing Thai content flash with the wrong
 * font during the ~200–500 ms between clicking the language toggle and the
 * new RSC payload committing.
 *
 * Uses isLocaleChanging from LanguageContext (driven by React useTransition).
 * Must be rendered INSIDE <LanguageProvider> to consume the context.
 */
function LocaleTransitionOverlay() {
  const { isLocaleChanging } = useLanguage()
  if (!isLocaleChanging) return null
  return (
    <div
      className="pointer-events-none fixed inset-0 z-9998 bg-background/90 backdrop-blur-sm"
      style={{ animation: "rct-page-enter 180ms cubic-bezier(0.22, 1, 0.36, 1) both" }}
      aria-hidden="true"
    />
  )
}
