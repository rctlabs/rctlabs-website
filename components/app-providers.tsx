"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider, type Language } from "@/components/language-provider"
import type { ReactNode } from "react"

interface AppProvidersProps {
  children: ReactNode
  initialLocale?: Language
}

export function AppProviders({ children, initialLocale = "en" }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LanguageProvider initialLocale={initialLocale}>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
