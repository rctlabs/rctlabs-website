"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { localizeCopy, type NavGroup } from "@/lib/navigation"

interface DesktopNavProps {
  locale: Locale
  groups: NavGroup[]
  openGroupId: NavGroup["id"] | null
  onOpenGroup: (groupId: NavGroup["id"], trigger: "hover" | "click" | "focus") => void
  onNavEnter: () => void
  onNavLeave: () => void
  localHref: (href: string) => string
  isActivePath: (href: string) => boolean
  onNavigate: (label: string, href: string, groupId: string) => void
  navTextClass: string
  navTextActiveClass: string
  isDark: boolean
}

export function DesktopNav({
  locale,
  groups,
  openGroupId,
  onOpenGroup,
  onNavEnter,
  onNavLeave,
  localHref,
  isActivePath,
  onNavigate,
  navTextClass,
  navTextActiveClass,
  isDark,
}: DesktopNavProps) {
  return (
    <div
      className="relative hidden lg:flex items-center gap-0.5"
      onMouseEnter={onNavEnter}
      onMouseLeave={onNavLeave}
    >
      {groups.map((group) => {
        const groupActive =
          group.desktopColumns.some((col) => col.items.some((item) => isActivePath(item.href))) ||
          Boolean(group.feature && isActivePath(group.feature.href))
        const isOpen = openGroupId === group.id

        return (
          <div key={group.id} className="relative">
            <button
              type="button"
              onMouseEnter={() => onOpenGroup(group.id, "hover")}
              onFocus={() => onOpenGroup(group.id, "focus")}
              onClick={() => onOpenGroup(group.id, "click")}
              aria-expanded={isOpen}
              aria-haspopup="true"
              className={`group relative flex min-h-11 items-center gap-1 px-2.5 py-2 text-[13px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-amber/50 ${
                groupActive
                  ? navTextActiveClass
                  : `${navTextClass} hover:text-warm-charcoal dark:hover:text-white`
              }`}
            >
              {localizeCopy(group.label, locale)}
              <ChevronDown
                size={11}
                className={`opacity-40 group-hover:opacity-70 transition-all duration-200 ${isOpen ? "rotate-180 opacity-70" : ""}`}
              />
              {groupActive ? (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-warm-amber"
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                />
              ) : null}
            </button>

            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
                  onMouseEnter={onNavEnter}
                  onMouseLeave={onNavLeave}
                  className={`absolute top-full z-50 mt-1 overflow-hidden rounded-2xl border shadow-[0_24px_72px_rgba(0,0,0,0.14)] ${
                    group.dropdownAlign === "right" ? "right-0" : "left-0"
                  } ${isDark ? "border-white/10 bg-[#111111]" : "border-warm-light-gray bg-warm-cream"}`}
                  role="menu"
                >
                  {/* amber accent notch */}
                  <div className="absolute left-5 top-0 h-0.5 w-10 bg-warm-amber" aria-hidden="true" />

                  <div className={`flex divide-x ${isDark ? "divide-white/8" : "divide-warm-light-gray"}`}>
                    {group.desktopColumns.map((col) => (
                      <div
                        key={col.header.en}
                        className="flex flex-col gap-1 px-5 py-5"
                        style={{
                          minWidth: col.style === "primary" ? 240 : 196,
                          maxWidth: col.style === "primary" ? 300 : 240,
                        }}
                      >
                        <div
                          className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                            isDark ? "text-white/38" : "text-warm-gray/60"
                          }`}
                        >
                          {localizeCopy(col.header, locale)}
                        </div>

                        {col.style === "primary"
                          ? col.items.map((item) => {
                              const active = isActivePath(item.href)
                              return (
                                <Link
                                  key={item.id}
                                  href={localHref(item.href)}
                                  onClick={() => onNavigate(localizeCopy(item.label, locale), item.href, group.id)}
                                  role="menuitem"
                                  className={`group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-amber/50 ${
                                    active
                                      ? isDark
                                        ? "bg-white/6 text-white"
                                        : "bg-warm-sand/55 text-warm-charcoal"
                                      : isDark
                                        ? "text-white/80 hover:bg-white/6 hover:text-white"
                                        : "text-warm-charcoal hover:bg-warm-sand/40"
                                  }`}
                                >
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[13px] font-semibold leading-5">
                                        {localizeCopy(item.label, locale)}
                                      </span>
                                      {item.badge ? (
                                        <span className="inline-flex items-center rounded-full bg-warm-amber/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-warm-amber">
                                          {item.badge}
                                        </span>
                                      ) : null}
                                    </div>
                                    <p
                                      className={`mt-0.5 line-clamp-1 text-[12px] leading-5 ${
                                        isDark ? "text-white/52" : "text-warm-gray"
                                      }`}
                                    >
                                      {localizeCopy(item.description, locale)}
                                    </p>
                                  </div>
                                  <ArrowRight
                                    size={12}
                                    className={`mt-1 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60 ${
                                      isDark ? "text-white" : "text-warm-charcoal"
                                    }`}
                                  />
                                </Link>
                              )
                            })
                          : col.items.map((item) => {
                              const active = isActivePath(item.href)
                              return (
                                <Link
                                  key={item.id}
                                  href={localHref(item.href)}
                                  onClick={() => onNavigate(localizeCopy(item.label, locale), item.href, group.id)}
                                  role="menuitem"
                                  className={`group flex items-center justify-between rounded-lg px-3 py-2 text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-amber/50 ${
                                    active
                                      ? isDark
                                        ? "bg-white/6 font-medium text-white"
                                        : "bg-warm-sand/55 font-medium text-warm-charcoal"
                                      : isDark
                                        ? "text-white/70 hover:bg-white/6 hover:text-white"
                                        : "text-warm-gray hover:bg-warm-sand/40 hover:text-warm-charcoal"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {localizeCopy(item.label, locale)}
                                    {item.badge ? (
                                      <span className="inline-flex items-center rounded-full bg-warm-amber/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-warm-amber">
                                        {item.badge}
                                      </span>
                                    ) : null}
                                  </div>
                                  <ArrowRight size={11} className="opacity-0 transition-opacity group-hover:opacity-50" />
                                </Link>
                              )
                            })}

                        {col.viewAll ? (
                          <Link
                            href={localHref(col.viewAll.href)}
                            onClick={() =>
                              onNavigate(localizeCopy(col.viewAll!.label, locale), col.viewAll!.href, group.id)
                            }
                            className="group mt-1 inline-flex items-center gap-1.5 px-3 text-[12px] font-medium text-warm-amber transition-opacity hover:opacity-80"
                          >
                            {localizeCopy(col.viewAll.label, locale)}
                            <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
