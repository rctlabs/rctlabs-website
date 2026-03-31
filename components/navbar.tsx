"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { KeyboardShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"
import { DesktopNav } from "@/components/navigation/desktop-nav"
import { MobileNavDrawer } from "@/components/navigation/mobile-nav-drawer"
import { UtilityActions } from "@/components/navigation/utility-actions"
import { useNavAnalytics } from "@/components/navigation/use-nav-analytics"
import SearchModal, { useSearchModal } from "@/components/search/search-modal"
import { useLanguage } from "@/components/language-provider"
import { useMounted } from "@/hooks/use-mounted"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"
import { buildSearchIndex, findActiveResourceTrack, navigationGroups, resourceTracks } from "@/lib/navigation"
import { useTheme } from "@/components/theme-provider"

const LOGO_HORIZONTAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/Logo-horizontal-600x200-transparent_7bebf81e.png"
const LOGO_MARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/Logo-mark-256x256-transparent_27abc2a3.png"

interface NavbarProps {
  variant?: "default" | "article"
}

export function Navbar({ variant = "default" }: NavbarProps) {
  const { language } = useLanguage()
  const { theme } = useTheme()
  const mounted = useMounted()
  const pathname = usePathname()
  const { trackGroupOpen, trackLeafClick, trackResourceTrack, trackUtility } = useNavAnalytics()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroupId, setOpenGroupId] = useState<(typeof navigationGroups)[number]["id"] | null>(null)
  const [activeResourceTrackId, setActiveResourceTrackId] = useState(resourceTracks[0].id)
  const closeGroupTimeoutRef = useRef<number | null>(null)
  const scrollFrameRef = useRef<number | null>(null)
  const lastScrolledRef = useRef(false)
  const { isOpen: searchOpen, open: openSearch, close: closeSearch } = useSearchModal()

  const localePath = pathname?.replace(/^\/(en|th)/, "") || "/"
  const locale = resolveLocale(pathname, language)
  const localePrefix = getLocalePrefix(locale)
  const localHref = (href: string) => `${localePrefix}${href}`
  const isDark = (mounted ? theme : "light") === "dark"
  const searchData = useMemo(() => buildSearchIndex(locale), [locale])

  useEffect(() => {
    const updateScrolled = () => {
      const nextScrolled = window.scrollY > 20
      if (nextScrolled !== lastScrolledRef.current) {
        lastScrolledRef.current = nextScrolled
        setScrolled(nextScrolled)
      }
      scrollFrameRef.current = null
    }

    const onScroll = () => {
      if (scrollFrameRef.current !== null) return
      scrollFrameRef.current = window.requestAnimationFrame(updateScrolled)
    }

    updateScrolled()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current)
      }
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (closeGroupTimeoutRef.current !== null) {
          window.clearTimeout(closeGroupTimeoutRef.current)
          closeGroupTimeoutRef.current = null
        }
        setOpenGroupId(null)
        setMobileOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  useEffect(() => {
    const handleOpenSearch = () => openSearch()

    window.addEventListener("rct-open-search", handleOpenSearch as EventListener)
    return () => window.removeEventListener("rct-open-search", handleOpenSearch as EventListener)
  }, [openSearch])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- route changes should immediately collapse transient nav UI state.
    setMobileOpen(false)
    setOpenGroupId(null)
    setActiveResourceTrackId(findActiveResourceTrack(localePath))
  }, [localePath])

  useEffect(() => {
    return () => {
      if (closeGroupTimeoutRef.current !== null) {
        window.clearTimeout(closeGroupTimeoutRef.current)
      }
    }
  }, [])

  const isActive = (href: string) => localePath === href || (href !== "/" && localePath.startsWith(href))
  const darkHeroRoutes = ["/about", "/case-studies"]
  const isArticleVariant = variant === "article"
  const isOnDarkHero = !isArticleVariant && !scrolled && darkHeroRoutes.some((route) => localePath.startsWith(route))

  const navTextClass = isArticleVariant
    ? isDark
      ? "text-warm-light-gray/80"
      : "text-warm-charcoal/75"
    : isOnDarkHero
      ? "text-white/90"
      : isDark
        ? "text-warm-gray/70"
        : "text-warm-gray"

  const navTextActiveClass = isArticleVariant
    ? "text-foreground"
    : isOnDarkHero
      ? "text-white"
      : isDark
        ? "text-white"
        : "text-warm-charcoal"

  const handleRouteClick = (label: string, href: string, groupId: string) => {
    trackLeafClick(label, href, groupId)
    setMobileOpen(false)
    setOpenGroupId(null)
  }

  const handleOpenGroup = (groupId: (typeof navigationGroups)[number]["id"], trigger: "hover" | "click" | "focus") => {
    if (closeGroupTimeoutRef.current !== null) {
      window.clearTimeout(closeGroupTimeoutRef.current)
      closeGroupTimeoutRef.current = null
    }

    setOpenGroupId((current) => (trigger === "click" && current === groupId ? null : groupId))
    trackGroupOpen(groupId, trigger)
  }

  const handleDesktopNavEnter = () => {
    if (closeGroupTimeoutRef.current !== null) {
      window.clearTimeout(closeGroupTimeoutRef.current)
      closeGroupTimeoutRef.current = null
    }
  }

  const handleDesktopNavLeave = () => {
    if (closeGroupTimeoutRef.current !== null) {
      window.clearTimeout(closeGroupTimeoutRef.current)
    }

    closeGroupTimeoutRef.current = window.setTimeout(() => {
      setOpenGroupId(null)
      closeGroupTimeoutRef.current = null
    }, 180)
  }

  const handleResourceTrackChange = (trackId: (typeof resourceTracks)[number]["id"], trigger: "hover" | "click" | "focus") => {
    setActiveResourceTrackId(trackId)
    trackResourceTrack(trackId, trigger)
  }

  return (
    <header role="banner">
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isArticleVariant
            ? scrolled
              ? "border-b border-border/70 bg-background/92 shadow-sm backdrop-blur-xl"
              : "border-b border-border/55 bg-background/76 backdrop-blur-xl"
            : scrolled
              ? "border-b bg-background/84 shadow-sm backdrop-blur-xl"
              : isOnDarkHero
                ? "border-b border-transparent bg-linear-to-b from-black/45 to-transparent"
                : "border-b border-transparent bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`navbar-ambient-orb navbar-ambient-orb--amber absolute -left-14 top-[-2.75rem] h-28 w-28 transition-opacity duration-500 ${
              scrolled ? "opacity-45" : isOnDarkHero ? "opacity-35" : "opacity-20"
            }`}
          />
          <div
            className={`navbar-ambient-orb navbar-ambient-orb--sage absolute right-[-2.5rem] top-[-1.75rem] h-24 w-24 transition-opacity duration-500 ${
              scrolled ? "opacity-40" : isOnDarkHero ? "opacity-28" : "opacity-16"
            }`}
          />
          <div
            className={`absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-warm-amber/40 to-transparent transition-opacity duration-500 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-8 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
          <div className="relative z-10 flex h-14 items-center justify-between gap-4">
            <Link
              href={localHref("/")}
              onClick={() => handleRouteClick("home", "/", "brand")}
              className="flex shrink-0 items-center gap-2"
              aria-label="RCT Ecosystem Home"
            >
              <Image
                src={LOGO_MARK}
                alt="RCT"
                width={32}
                height={32}
                className={`h-8 w-8 object-contain object-left sm:hidden ${isDark ? "brightness-0 invert" : ""}`}
                priority
              />
              <Image
                src={LOGO_HORIZONTAL}
                alt="RCT — Reverse Component Thinking"
                width={144}
                height={32}
                className={`hidden h-8 w-36 object-contain object-left sm:block ${isDark ? "brightness-0 invert" : ""}`}
                priority
              />
            </Link>

            <DesktopNav
              locale={locale}
              groups={navigationGroups}
              openGroupId={openGroupId}
              onOpenGroup={handleOpenGroup}
              onNavEnter={handleDesktopNavEnter}
              onNavLeave={handleDesktopNavLeave}
              localHref={localHref}
              isActivePath={isActive}
              onNavigate={handleRouteClick}
              navTextClass={navTextClass}
              navTextActiveClass={navTextActiveClass}
              isDark={isDark}
            />

            <div className="flex items-center gap-2 shrink-0">
              <UtilityActions
                mode="desktop"
                onOpenSearch={openSearch}
                onTrackedAction={trackUtility}
                isOnDarkHero={isOnDarkHero}
              />

              <button
                type="button"
                onClick={() => setMobileOpen((current) => !current)}
                className={`lg:hidden flex min-h-11 min-w-11 items-center justify-center rounded-full transition-colors ${
                  isDark ? "text-white hover:bg-white/8" : "text-warm-charcoal hover:bg-warm-sand/55"
                }`}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        <MobileNavDrawer
          isOpen={mobileOpen}
          locale={locale}
          groups={navigationGroups}
          resourceTracks={resourceTracks}
          activeResourceTrackId={activeResourceTrackId}
          localHref={localHref}
          isActivePath={isActive}
          onNavigate={handleRouteClick}
          onOpenSearch={openSearch}
          onClose={() => setMobileOpen(false)}
          onResourceTrackChange={handleResourceTrackChange}
          onTrackedUtility={trackUtility}
          isDark={isDark}
        />
      </nav>

      <SearchModal isOpen={searchOpen} onClose={closeSearch} searchData={searchData} />
      <KeyboardShortcutsDialog onOpenSearch={openSearch} />
    </header>
  )
}