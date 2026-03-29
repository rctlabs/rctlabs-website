"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Globe, Moon, Search, Sun } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useMounted } from "@/hooks/use-mounted"
import { useTheme } from "@/components/theme-provider"
import { UserProfileMenu } from "@/components/user-profile-menu"

interface UtilityActionsProps {
  mode: "desktop" | "mobile"
  onOpenSearch: () => void
  onTrackedAction?: (action: string, surface: "desktop" | "mobile") => void
  isOnDarkHero?: boolean
}

export function UtilityActions({ mode, onOpenSearch, onTrackedAction, isOnDarkHero = false }: UtilityActionsProps) {
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  const isDark = (mounted ? theme : "light") === "dark"
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
            <div className={`inline-flex rounded-full p-1 ${isDark ? "bg-white/6" : "bg-warm-sand/65"}`}>
              <button type="button" onClick={() => { onTrackedAction?.("locale_en", surface); setLanguage("en") }} className={localeButtonClass("en")}>EN</button>
              <button type="button" onClick={() => { onTrackedAction?.("locale_th", surface); setLanguage("th") }} className={localeButtonClass("th")}>TH</button>
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
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Sun size={16} />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Moon size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5 shrink-0" suppressHydrationWarning>
      <button
        type="button"
        onClick={() => {
          onTrackedAction?.("search", surface)
          onOpenSearch()
        }}
        className={`hidden md:flex shrink-0 items-center gap-1.5 px-2.5 py-2 text-[13px] font-medium transition-colors ${baseText}`}
        aria-label="Search"
        title="Search"
      >
        <Search size={16} className="shrink-0" />
        <span className="hidden xl:inline whitespace-nowrap">Search</span>
        <kbd className={`hidden xl:inline border px-2 py-0.5 text-[10px] font-mono ${isDark ? "border-white/12 bg-white/4 text-white/45" : "border-warm-light-gray bg-white/70 text-warm-gray/70"}`}>⌘K</kbd>
      </button>

      <div className={`hidden md:inline-flex items-center border p-1 ${isDark ? "border-white/10 bg-white/5" : "border-warm-light-gray bg-white/90"}`}>
        <button type="button" onClick={() => { onTrackedAction?.("locale_en", surface); setLanguage("en") }} className={localeButtonClass("en")}>EN</button>
        <button type="button" onClick={() => { onTrackedAction?.("locale_th", surface); setLanguage("th") }} className={localeButtonClass("th")}>TH</button>
      </div>

      <button
        type="button"
        onClick={() => {
          onTrackedAction?.("theme_toggle", surface)
          setTheme(isDark ? "light" : "dark")
        }}
        className={`hidden md:flex p-2 transition-colors ${baseText}`}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <Sun size={17} />
            </motion.div>
          ) : (
            <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <Moon size={17} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <div className="hidden md:flex">
        <UserProfileMenu />
      </div>
    </div>
  )
}