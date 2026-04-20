"use client"

import { Globe, Moon, Search, Sun } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useMounted } from "@/hooks/use-mounted"
import { useTheme } from "@/components/theme-provider"
import dynamic from "next/dynamic"

const UserProfileMenu = dynamic(
  () => import("@/components/user-profile-menu").then(m => ({ default: m.UserProfileMenu })),
  { ssr: false }
)

interface UtilityActionsProps {
  mode: "desktop" | "mobile"
  onOpenSearch: () => void
  onTrackedAction?: (action: string, surface: "desktop" | "mobile") => void
  isOnDarkHero?: boolean
}

export function UtilityActions({ mode, onOpenSearch, onTrackedAction, isOnDarkHero = false }: UtilityActionsProps) {
  const { language, setLanguage, isLocaleChanging } = useLanguage()
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  const isDark = (mounted ? resolvedTheme : "light") === "dark"
  const surface = mode === "desktop" ? "desktop" : "mobile"

  const baseText = isOnDarkHero && mode === "desktop"
    ? "text-white/82 hover:text-white"
    : isDark
      ? "text-white/72 hover:text-white"
      : "text-warm-gray hover:text-warm-charcoal"

  const localeButtonClass = (locale: "en" | "th") => {
    const active = language === locale
    return `rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
      active
        ? isDark
          ? "bg-white/10 text-white"
          : "bg-white text-warm-charcoal shadow-sm"
        : isDark
          ? "text-white/55 hover:text-white"
          : "text-warm-gray hover:text-warm-charcoal"
    }`
  }

  if (mode === "mobile") {
    return (
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => {
            onTrackedAction?.("search", surface)
            onOpenSearch()
          }}
          className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
            isDark ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "border-warm-light-gray bg-white text-warm-charcoal hover:bg-warm-sand/45"
          }`}
        >
          <Search size={16} />
          <span>{language === "th" ? "ค้นหา" : "Search"}</span>
        </button>

        <div className="flex items-center gap-3">
          <div className={`flex flex-1 items-center justify-between rounded-2xl border px-3 py-2 ${isDark ? "border-white/10 bg-white/5" : "border-warm-light-gray bg-white"}`}>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-warm-amber">
              <Globe className="h-4 w-4" />
              Locale
            </div>
            <div className={`inline-flex rounded-full p-1 relative ${isDark ? "bg-white/6" : "bg-warm-sand/65"}`}>
              {isLocaleChanging && (
                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-warm-amber/10 pointer-events-none">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-warm-amber border-t-transparent" />
                </span>
              )}
              <button type="button" disabled={isLocaleChanging} onClick={() => { onTrackedAction?.("locale_en", surface); setLanguage("en") }} className={localeButtonClass("en")}>EN</button>
              <button type="button" disabled={isLocaleChanging} onClick={() => { onTrackedAction?.("locale_th", surface); setLanguage("th") }} className={localeButtonClass("th")}>TH</button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onTrackedAction?.("theme_toggle", surface)
              setTheme(isDark ? "light" : "dark")
            }}
            className={`flex min-h-12 min-w-12 items-center justify-center rounded-2xl border transition-colors ${
              isDark ? "border-white/10 bg-white/5 text-warm-amber hover:bg-white/10" : "border-warm-light-gray bg-white text-warm-charcoal hover:bg-warm-sand/45"
            }`}
            aria-label="Toggle theme"
          >
            <span className="inline-block transition-transform duration-150">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 shrink-0" suppressHydrationWarning>
      <button
        type="button"
        onClick={() => {
          onTrackedAction?.("theme_toggle", surface)
          setTheme(isDark ? "light" : "dark")
        }}
        className={`hidden md:flex min-h-12 min-w-12 items-center justify-center rounded-lg p-2 transition-colors ${baseText}`}
        aria-label="Toggle theme"
      >
        <span className="inline-block transition-transform duration-150">
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </span>
      </button>

      <div className="hidden md:flex">
        <UserProfileMenu />
      </div>
    </div>
  )
}