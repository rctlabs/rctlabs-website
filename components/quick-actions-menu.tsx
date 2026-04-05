"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, m } from "framer-motion"
import { Menu, Search, FileText, Mail, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

interface QuickActionItem {
  label: string
  href?: string
  icon: typeof Search
  onClick?: () => void
}

export default function QuickActionsMenu() {
  const [open, setOpen] = useState(false)
  const { language } = useLanguage()
  const pathname = usePathname()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  const actions = useMemo<QuickActionItem[]>(() => [
    {
      label: language === "th" ? "ค้นหา" : "Search",
      icon: Search,
      onClick: () => {
        window.dispatchEvent(new CustomEvent("rct-open-search"))
        setOpen(false)
      },
    },
    {
      label: language === "th" ? "อ่าน Whitepaper" : "Read Whitepaper",
      href: `${localePrefix}/whitepaper`,
      icon: FileText,
    },
    {
      label: language === "th" ? "ติดต่อทีม" : "Contact Team",
      href: `${localePrefix}/contact`,
      icon: Mail,
    },
    {
      label: language === "th" ? "ลอง FDIA Demo" : "Try FDIA Demo",
      href: `${localePrefix}/demo/fdia`,
      icon: Sparkles,
    },
  ], [language, localePrefix])

  return (
    <div className="fixed bottom-36 right-4 z-41 sm:bottom-40 sm:right-6">
      <AnimatePresence>
        {open ? (
          <m.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="mb-3 flex w-56 flex-col gap-2 rounded-2xl border border-border bg-background/95 p-3 shadow-2xl backdrop-blur-xl"
          >
            {actions.map((action) => {
              const Icon = action.icon
              if (action.href) {
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{action.label}</span>
                  </Link>
                )
              }

              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  <span>{action.label}</span>
                </button>
              )
            })}
          </m.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={language === "th" ? "เมนูลัด" : "Quick actions"}
        className="floating-element flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/95 text-foreground shadow-xl transition-colors hover:bg-accent"
      >
        <Menu className="h-5 w-5" />
      </button>
    </div>
  )
}
