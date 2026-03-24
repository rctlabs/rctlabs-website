"use client"

/*
 * Navbar — Mega-menu navigation with grouped dropdowns
 * Adapted from manus-frontend-design; Next.js-compatible
 * Desktop (md+): grouped dropdown menus | Mobile: slide-out accordion
 */
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe, ChevronDown, Moon, Sun, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import Image from "next/image"
import SearchModal, { useSearchModal } from "@/components/search/search-modal"
import { UserProfileMenu } from "@/components/user-profile-menu"
import { NotificationBell } from "@/components/notification-bell"
import { KeyboardShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"

const SEARCH_DATA = [
  { title: "Solutions Overview",           description: "AI solutions for enterprise",                      href: "/solutions",                              category: "Solutions" },
  { title: "AI Hallucination Prevention",  description: "Prevent hallucinations with FDIA equation",        href: "/solutions/ai-hallucination-prevention",  category: "Solutions" },
  { title: "Enterprise AI Memory",         description: "8-dimensional universal memory system",            href: "/solutions/enterprise-ai-memory",          category: "Solutions" },
  { title: "Dynamic AI Routing",           description: "Intelligent routing for AI systems",               href: "/solutions/dynamic-ai-routing",            category: "Solutions" },
  { title: "Products Overview",            description: "Discover our AI products and platforms",          href: "/products",                               category: "Products" },
  { title: "RCT Labs",                     description: "AI development platform",                         href: "/products/rctlabs",                       category: "Products" },
  { title: "ARTENT AI",                    description: "Autonomous reasoning technology",                  href: "/products/artent-ai",                     category: "Products" },
  { title: "Signed AI",                    description: "Cryptographically signed AI execution",            href: "/products/signed-ai",                     category: "Products" },
  { title: "Pricing",                      description: "Flexible pricing plans for all needs",             href: "/pricing",                                category: "Products" },
  { title: "System Architecture",          description: "10-layer constitutional AI architecture",          href: "/architecture",                           category: "Technology" },
  { title: "7 Genome System",              description: "Seven specialized AI genomes",                     href: "/genome",                                 category: "Technology" },
  { title: "41 Algorithms",                description: "Production-ready AI algorithms",                  href: "/algorithms",                             category: "Technology" },
  { title: "Hexa Core Benchmark",          description: "6-dimensional performance metrics",                href: "/benchmark",                              category: "Technology" },
  { title: "Protocols Overview",           description: "Open protocols and standards",                    href: "/protocols",                              category: "Protocols" },
  { title: "JITNA RFC-001",                description: "Just-In-Time Neural Adaptation protocol",         href: "/protocols/jitna-rfc-001",               category: "Protocols" },
  { title: "FDIA Equation",                description: "Falsifiability-Driven Iterative Approach",        href: "/protocols/fdia-equation",               category: "Protocols" },
  { title: "FDIA Interactive Demo",        description: "Try FDIA equation live",                          href: "/demo/fdia",                              category: "Protocols" },
  { title: "RCT-7 Mental Model",           description: "7-step reasoning framework",                      href: "/protocols/rct-7-mental-model",           category: "Protocols" },
  { title: "Whitepaper",                   description: "Complete technical documentation",                href: "/whitepaper",                             category: "Resources" },
  { title: "Blog",                         description: "Latest insights and updates",                     href: "/blog",                                   category: "Resources" },
  { title: "Use Cases",                    description: "Real-world applications",                         href: "/use-cases",                              category: "Resources" },
  { title: "Integration Guide",            description: "API and SDK documentation",                       href: "/integration",                            category: "Resources" },
  { title: "Changelog",                    description: "Version history and updates",                     href: "/changelog",                              category: "Resources" },
  { title: "Research",                     description: "Academic research and papers",                    href: "/research",                               category: "Resources" },
  { title: "Community",                    description: "Join the RCT community",                          href: "/community",                              category: "Resources" },
  { title: "About Us",                     description: "Our mission and story",                           href: "/about",                                  category: "Resources" },
  { title: "FAQ",                          description: "Frequently asked questions",                      href: "/faq",                                    category: "Resources" },
]

const LOGO_HORIZONTAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/Logo-horizontal-600x200-transparent_7bebf81e.png"
const LOGO_MARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/Logo-mark-256x256-transparent_27abc2a3.png"

interface NavItem {
  key: string
  href: string
  group: string
  isHub?: boolean
}

const navItems: NavItem[] = [
  // Solutions
  { key: "nav.solutions",    href: "/solutions",                              group: "solutions",  isHub: true },
  { key: "nav.hallucination",href: "/solutions/ai-hallucination-prevention",  group: "solutions" },
  { key: "nav.memory",       href: "/solutions/enterprise-ai-memory",         group: "solutions" },
  { key: "nav.routing",      href: "/solutions/dynamic-ai-routing",           group: "solutions" },
  // Products
  { key: "nav.products",     href: "/products",       group: "products", isHub: true },
  { key: "nav.rctlabs",      href: "/products/rctlabs",    group: "products" },
  { key: "nav.artentai",     href: "/products/artent-ai",  group: "products" },
  { key: "nav.signedai",     href: "/products/signed-ai",  group: "products" },
  { key: "nav.pricing",      href: "/pricing",             group: "products" },
  // Technology
  { key: "nav.architecture", href: "/architecture", group: "technology" },
  { key: "nav.genome",       href: "/genome",         group: "technology" },
  { key: "nav.algorithms",   href: "/algorithms",     group: "technology" },
  { key: "nav.benchmark",    href: "/benchmark",      group: "technology" },
  // Protocols
  { key: "nav.protocols",    href: "/protocols",                     group: "protocols", isHub: true },
  { key: "nav.jitna_rfc",    href: "/protocols/jitna-rfc-001",      group: "protocols" },
  { key: "nav.fdia_eq",      href: "/protocols/fdia-equation",      group: "protocols" },
  { key: "nav.rct7",         href: "/protocols/rct-7-mental-model", group: "protocols" },
  { key: "nav.fdia_demo",    href: "/demo/fdia",                     group: "protocols" },
  // Resources
  { key: "nav.whitepaper",   href: "/whitepaper",  group: "resources" },
  { key: "nav.blog",         href: "/blog",         group: "resources" },
  { key: "nav.usecases",     href: "/use-cases",    group: "resources" },
  { key: "nav.integration",  href: "/integration",  group: "resources" },
  { key: "nav.research",     href: "/research",     group: "resources" },
  { key: "nav.community",    href: "/community",    group: "resources" },
  { key: "nav.changelog",    href: "/changelog",    group: "resources" },
  { key: "nav.about",        href: "/about",         group: "resources" },
  { key: "nav.faq",          href: "/faq",           group: "resources" },
]

const navGroups = [
  { id: "solutions",  labelEn: "Solutions",  labelTh: "โซลูชัน" },
  { id: "products",   labelEn: "Products",   labelTh: "ผลิตภัณฑ์" },
  { id: "technology", labelEn: "Technology", labelTh: "เทคโนโลยี" },
  { id: "protocols",  labelEn: "Protocols",  labelTh: "โปรโตคอล" },
  { id: "resources",  labelEn: "Resources",  labelTh: "ทรัพยากร" },
]

// Nav item labels not covered by global translation dict
const navLabels: Record<string, { en: string; th: string }> = {
  "nav.hallucination": { en: "AI Hallucination Prevention", th: "ป้องกัน AI Hallucination" },
  "nav.memory":       { en: "Enterprise AI Memory",        th: "AI Memory ระดับ Enterprise" },
  "nav.routing":      { en: "Dynamic AI Routing",          th: "Dynamic AI Routing" },
  "nav.rctlabs":      { en: "RCT Labs Platform",           th: "RCT Labs Platform" },
  "nav.artentai":     { en: "ARTENT AI",                   th: "ARTENT AI" },
  "nav.signedai":     { en: "Signed AI",                   th: "Signed AI" },
  "nav.pricing":      { en: "Pricing",                     th: "ราคา" },
  "nav.genome":       { en: "7 Genome System",             th: "7 Genome System" },
  "nav.algorithms":   { en: "41 Algorithms",               th: "41 Algorithms" },
  "nav.benchmark":    { en: "Benchmark",                   th: "Benchmark" },
  "nav.jitna_rfc":    { en: "JITNA RFC-001",               th: "JITNA RFC-001" },
  "nav.fdia_eq":      { en: "FDIA Equation",               th: "FDIA Equation" },
  "nav.rct7":         { en: "RCT-7 Mental Model",          th: "RCT-7 Mental Model" },
  "nav.fdia_demo":    { en: "FDIA Live Demo",               th: "FDIA Demo (live)" },
  "nav.whitepaper":   { en: "Whitepaper",                  th: "Whitepaper" },
  "nav.usecases":     { en: "Use Cases",                   th: "กรณีศึกษา" },
  "nav.integration":  { en: "Integration Guide",           th: "Integration Guide" },
  "nav.research":     { en: "Research",                    th: "งานวิจัย" },
  "nav.community":    { en: "Community",                   th: "ชุมชน" },
  "nav.changelog":    { en: "Changelog",                   th: "บันทึกการเปลี่ยนแปลง" },
}

export function Navbar() {
  const { language, toggleLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["solutions"])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { isOpen: searchOpen, open: openSearch, close: closeSearch } = useSearchModal()

  const isDark = theme === "dark"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const handleRouteClick = () => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    )
  }

  // Strip locale prefix for active-state matching
  const localePath = pathname?.replace(/^\/(en|th)/, "") || "/"
  const isActive  = (href: string) => localePath === href || (href !== "/" && localePath.startsWith(href))
  const isGroupActive = (groupId: string) => navItems.some(i => i.group === groupId && isActive(i.href))

  const darkHeroRoutes = ["/about", "/case-studies"]
  const isOnDarkHero   = !scrolled && darkHeroRoutes.some(r => localePath.startsWith(r))

  const navTextClass       = isOnDarkHero ? "text-white/90" : isDark ? "text-warm-gray/70" : "text-warm-gray"
  const navTextActiveClass = isOnDarkHero ? "text-white" : isDark ? "text-white" : "text-warm-charcoal"

  const localePrefix = language === "th" ? "/th" : "/en"
  const localHref = (href: string) => `${localePrefix}${href}`

  const getLabel = (key: string) =>
    navLabels[key]?.[language as "en" | "th"] ?? t(key)

  return (
    <header role="banner">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? "bg-warm-charcoal/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.3)] border-b border-[#333]"
              : "bg-white/92 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border-b border-warm-light-gray/60"
            : isOnDarkHero
              ? "bg-linear-to-b from-black/30 to-transparent"
              : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href={localHref("/")}
              onClick={handleRouteClick}
              className="flex items-center gap-2 group shrink-0"
              aria-label="RCT Ecosystem — Home"
            >
              <Image
                src={LOGO_MARK}
                alt="RCT"
                width={32} height={32}
                className={`h-8 w-8 md:hidden object-contain ${isDark ? "brightness-0 invert" : ""}`}
                priority
              />
              <Image
                src={LOGO_HORIZONTAL}
                alt="RCT — Reverse Component Thinking"
                width={160} height={32}
                className={`hidden md:block h-8 w-40 object-contain ${isDark ? "brightness-0 invert" : ""}`}
                priority
              />
            </Link>

            {/* Desktop nav — grouped dropdowns */}
            <div className="hidden md:flex items-center gap-0.5" ref={dropdownRef}>
              {navGroups.map((group) => {
                const groupItems = navItems.filter(i => i.group === group.id)
                const groupActive = isGroupActive(group.id)
                const isOpen = openDropdown === group.id

                return (
                  <div key={group.id} className="relative">
                    <button
                      onClick={() => setOpenDropdown(isOpen ? null : group.id)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={`relative flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-amber/50 ${
                        groupActive ? navTextActiveClass : `${navTextClass} hover:text-warm-charcoal dark:hover:text-white`
                      }`}
                    >
                      {language === "en" ? group.labelEn : group.labelTh}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                      {groupActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-warm-amber rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          role="menu"
                          className={`absolute top-full left-0 mt-1 py-1.5 rounded-xl shadow-lg border min-w-55 z-50 ${
                            isDark ? "bg-[#222] border-[#333]" : "bg-white border-warm-light-gray"
                          }`}
                        >
                          {groupItems.map((item) => {
                            const active = isActive(item.href)
                            return (
                              <Link
                                key={item.href}
                                href={localHref(item.href)}
                                onClick={handleRouteClick}
                                role="menuitem"
                                className={`block px-4 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-amber/50 focus-visible:ring-inset ${
                                  item.isHub
                                    ? `font-semibold border-b mb-1 pb-2.5 ${isDark ? "border-[#333]" : "border-warm-light-gray"}`
                                    : ""
                                } ${
                                  active
                                    ? isDark ? "text-white bg-white/5 font-medium" : "text-warm-charcoal bg-warm-sand/50 font-medium"
                                    : isDark ? "text-warm-gray/70 hover:text-white hover:bg-white/5" : "text-warm-gray hover:text-warm-charcoal hover:bg-warm-sand/50"
                                }`}
                              >
                                {getLabel(item.key)}
                                {item.isHub && (
                                  <span className={`ml-2 text-[10px] ${isDark ? "text-[#666]" : "text-warm-gray/70"}`}>→</span>
                                )}
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <button
                onClick={openSearch}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all ${
                  isDark ? "text-warm-gray/70 hover:text-white hover:bg-white/5" : "text-warm-gray hover:text-warm-charcoal hover:bg-warm-sand/50"
                }`}
                aria-label="Search (Ctrl+K)"
              >
                <Search size={15} />
                <span className="hidden lg:inline">Search</span>
                <kbd className={`hidden lg:inline px-1.5 py-0.5 text-[10px] rounded border ${
                  isDark ? "border-[#444] text-warm-gray/50" : "border-warm-light-gray text-warm-gray/60"
                }`}>⌘K</kbd>
              </button>

              {/* Theme toggle */}
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={`hidden md:flex p-2 rounded-lg transition-all ${
                  isOnDarkHero
                    ? "text-white/90 hover:text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    : isDark
                      ? "text-warm-amber hover:bg-white/5"
                      : "text-warm-gray hover:text-warm-charcoal hover:bg-warm-sand/50"
                }`}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun size={18} />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Language switcher */}
              <button
                onClick={toggleLanguage}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all group ${
                  isDark ? "text-warm-gray/70 hover:text-white hover:bg-white/5" : "text-warm-gray hover:text-warm-charcoal hover:bg-warm-sand/50"
                }`}
                aria-label={language === "en" ? "Switch to Thai" : "Switch to English"}
              >
                <Globe size={15} className="group-hover:rotate-180 transition-transform duration-500" />
                <span>{language === "en" ? "TH" : "EN"}</span>
              </button>

              {/* Notification + Auth */}
              <div className="hidden md:flex items-center gap-2">
                <NotificationBell />
                <UserProfileMenu />
              </div>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  isDark ? "text-white hover:bg-white/5" : "text-warm-charcoal hover:bg-warm-sand/50"
                }`}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={`md:hidden border-t overflow-hidden ${
                isDark ? "bg-warm-charcoal/98 backdrop-blur-xl border-[#333]" : "bg-white/95 backdrop-blur-xl border-warm-light-gray/60"
              }`}
            >
              <div className="px-4 py-3 space-y-2 max-h-[60vh] overflow-y-auto">
                {/* Mobile controls row */}
                <div className="flex items-center gap-2 mb-3">
                  <button
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all flex-1 border ${
                      isDark ? "text-white bg-white/5 hover:bg-white/10 border-[#333]" : "text-warm-charcoal bg-warm-sand/50 hover:bg-warm-sand border-warm-light-gray"
                    }`}
                  >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    <span className="text-xs">{isDark ? (language === "en" ? "Light" : "สว่าง") : (language === "en" ? "Dark" : "มืด")}</span>
                  </button>
                  <button
                    onClick={toggleLanguage}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all flex-1 border ${
                      isDark ? "text-white bg-white/5 hover:bg-white/10 border-[#333]" : "text-warm-charcoal bg-warm-sand/50 hover:bg-warm-sand border-warm-light-gray"
                    }`}
                  >
                    <Globe size={16} />
                    <span className="text-xs">{language === "en" ? "ภาษาไทย" : "English"}</span>
                  </button>
                </div>

                {/* Grouped accordion */}
                {navGroups.map((group) => {
                  const groupItems = navItems.filter(i => i.group === group.id)
                  const isExpanded = expandedGroups.includes(group.id)
                  return (
                    <div key={group.id}>
                      <button
                        onClick={() => toggleGroup(group.id)}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                          isDark ? "text-white hover:bg-white/5" : "text-warm-charcoal hover:bg-warm-sand/50"
                        }`}
                      >
                        <span>{language === "en" ? group.labelEn : group.labelTh}</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3"
                          >
                            {groupItems.map((item) => {
                              const active = isActive(item.href)
                              return (
                                <Link
                                  key={item.href}
                                  href={localHref(item.href)}
                                  onClick={handleRouteClick}
                                  className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                                    active
                                      ? isDark ? "text-white font-medium" : "text-warm-charcoal font-medium bg-warm-sand/50"
                                      : isDark ? "text-warm-gray/70 hover:text-white" : "text-warm-gray hover:text-warm-charcoal"
                                  } ${item.isHub ? "font-semibold" : ""}`}
                                >
                                  {getLabel(item.key)}
                                </Link>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}

                {/* Mobile auth */}
                <div className="pt-2 border-t border-warm-light-gray dark:border-[#333]">
                  <UserProfileMenu />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchModal isOpen={searchOpen} onClose={closeSearch} searchData={SEARCH_DATA} />
      <KeyboardShortcutsDialog onOpenSearch={openSearch} />
    </header>
  )
}
