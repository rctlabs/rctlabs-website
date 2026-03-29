"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import {
  localizeCopy,
  type DesktopFeatureWidth,
  type DesktopPanelAlign,
  type DesktopPanelTier,
  type NavGroup,
  type ResourceTrack,
} from "@/lib/navigation"
import { ResourcesPanel } from "@/components/navigation/resources-panel"

function splitIntoColumns<T>(items: T[], columnCount: number) {
  const columns = Array.from({ length: columnCount }, () => [] as T[])

  items.forEach((item, index) => {
    columns[index % columnCount].push(item)
  })

  return columns.filter((column) => column.length > 0)
}

const tierWidthClassName: Record<DesktopPanelTier, string> = {
  S: "w-[min(72vw,720px)]",
  M: "w-[min(86vw,880px)]",
  L: "w-[min(92vw,1020px)]",
}

const alignClassName: Record<DesktopPanelAlign, string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
}

const notchClassName: Record<DesktopPanelAlign, string> = {
  start: "left-10",
  center: "left-1/2 -translate-x-1/2",
  end: "right-10",
}

const featureWidthClassName: Record<DesktopFeatureWidth, string> = {
  compact: "md:grid-cols-[minmax(0,240px)_minmax(0,1fr)]",
  standard: "md:grid-cols-[minmax(0,280px)_minmax(0,1fr)]",
}

interface DesktopNavProps {
  locale: Locale
  groups: NavGroup[]
  resourceTracks: ResourceTrack[]
  openGroupId: NavGroup["id"] | null
  activeResourceTrackId: ResourceTrack["id"]
  onOpenGroup: (groupId: NavGroup["id"], trigger: "hover" | "click" | "focus") => void
  onCloseGroup: () => void
  onNavEnter: () => void
  onNavLeave: () => void
  onResourceTrackChange: (trackId: ResourceTrack["id"], trigger: "hover" | "click" | "focus") => void
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
  resourceTracks,
  openGroupId,
  activeResourceTrackId,
  onOpenGroup,
  onCloseGroup: _onCloseGroup,
  onNavEnter,
  onNavLeave,
  onResourceTrackChange,
  localHref,
  isActivePath,
  onNavigate,
  navTextClass,
  navTextActiveClass,
  isDark,
}: DesktopNavProps) {
  const openGroup = openGroupId ? groups.find((group) => group.id === openGroupId) ?? null : null

  return (
    <div className="relative hidden lg:flex items-center gap-1" onMouseEnter={onNavEnter} onMouseLeave={onNavLeave}>
      {groups.map((group) => {
        const groupActive = group.id === "resources"
          ? resourceTracks.some((track) => track.items.some((item) => isActivePath(item.href)))
          : Boolean(group.feature && isActivePath(group.feature.href)) || group.items.some((item) => isActivePath(item.href))
        const isOpen = openGroupId === group.id

        return (
          <div key={group.id}>
            <button
              type="button"
              onMouseEnter={() => onOpenGroup(group.id, "hover")}
              onFocus={() => onOpenGroup(group.id, "focus")}
              onClick={() => onOpenGroup(group.id, "click")}
              aria-expanded={isOpen}
              aria-haspopup="true"
              className={`relative flex min-h-11 items-center gap-1 px-2.5 py-2 text-[13px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-amber/50 ${
                groupActive ? navTextActiveClass : `${navTextClass} hover:text-warm-charcoal dark:hover:text-white`
              }`}
            >
              {localizeCopy(group.label, locale)}
              <ChevronDown size={13} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              {groupActive ? (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-warm-amber"
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                />
              ) : null}
            </button>
          </div>
        )
      })}

      <AnimatePresence>
        {openGroup ? (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
            onMouseEnter={onNavEnter}
            onMouseLeave={onNavLeave}
            className={`absolute top-full z-50 mt-3 overflow-hidden border shadow-[0_24px_72px_rgba(0,0,0,0.14)] ${tierWidthClassName[openGroup.desktopPanel.tier]} ${alignClassName[openGroup.desktopPanel.align]} ${isDark ? "border-white/10 bg-[#111111]" : "border-warm-light-gray bg-warm-cream"}`}
            role="menu"
            style={{ maxHeight: `${openGroup.desktopPanel.maxHeight}px` }}
          >
            <div className={`absolute ${notchClassName[openGroup.desktopPanel.align]} top-0 h-3 w-16 -translate-y-[calc(100%-1px)] border border-b-0 ${isDark ? "border-white/10 bg-[#111111]" : "border-warm-light-gray bg-warm-cream"}`} />
            <div className="absolute inset-x-0 top-0 h-3 -translate-y-full" aria-hidden="true" />

            {openGroup.id === "resources" ? (
              <ResourcesPanel
                locale={locale}
                tracks={resourceTracks}
                activeTrackId={activeResourceTrackId}
                onTrackChange={onResourceTrackChange}
                localHref={localHref}
                isActivePath={isActivePath}
                onNavigate={onNavigate}
                isDark={isDark}
              />
            ) : (
              (() => {
                const feature = openGroup.feature
                const itemColumns = splitIntoColumns(openGroup.items, openGroup.desktopPanel.columnCount)

                return (
                  <div className={`grid h-full gap-0 overflow-hidden ${featureWidthClassName[openGroup.desktopPanel.featureWidth]}`}>
                    <div className={`border-r px-6 py-6 ${isDark ? "border-white/10" : "border-warm-light-gray"}`}>
                      <div className={`text-[11px] font-medium uppercase tracking-[0.18em] ${isDark ? "text-white/48" : "text-warm-gray/80"}`}>
                        {feature ? localizeCopy(feature.eyebrow, locale) : localizeCopy(openGroup.label, locale)}
                      </div>
                      {feature ? (
                        <Link
                          href={localHref(feature.href)}
                          onClick={() => onNavigate(localizeCopy(feature.title, locale), feature.href, openGroup.id)}
                          className="group mt-5 block"
                        >
                          <div className={`line-clamp-2 text-[2rem] font-medium leading-[1.05] tracking-tight ${isDark ? "text-white" : "text-warm-charcoal"}`}>
                            {localizeCopy(feature.title, locale)}
                          </div>
                          <p className={`mt-3 line-clamp-2 text-[15px] leading-7 ${isDark ? "text-white/60" : "text-warm-gray"}`}>
                            {localizeCopy(feature.description, locale)}
                          </p>
                          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-warm-amber">
                            {locale === "th" ? "ดูภาพรวม" : "View overview"}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </Link>
                      ) : null}
                    </div>

                    <div className={`grid overflow-y-auto ${openGroup.desktopPanel.columnCount > 1 ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
                      {itemColumns.map((column, columnIndex) => (
                        <div
                          key={`${openGroup.id}-column-${columnIndex}`}
                          className={`px-6 py-6 ${columnIndex > 0 ? (isDark ? "border-l border-white/10" : "border-l border-warm-light-gray") : ""}`}
                        >
                          <div className={`mb-5 text-[11px] font-medium uppercase tracking-[0.18em] ${isDark ? "text-white/48" : "text-warm-gray/80"}`}>
                            {columnIndex === 0
                              ? locale === "th" ? "สำรวจต่อ" : "Explore next"
                              : locale === "th" ? "เส้นทางเพิ่มเติม" : "More paths"}
                          </div>
                          <div className="space-y-1">
                            {column.map((item, rowIndex) => {
                              const active = isActivePath(item.href)
                              const itemIndex = columnIndex + rowIndex * openGroup.desktopPanel.columnCount
                              const showDescription = itemIndex < openGroup.desktopPanel.previewItemLimit
                              return (
                                <Link
                                  key={item.id}
                                  href={localHref(item.href)}
                                  onClick={() => onNavigate(localizeCopy(item.label, locale), item.href, openGroup.id)}
                                  className={`group block border-b px-0 py-3.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-amber/50 ${
                                    isDark ? "border-white/10" : "border-warm-light-gray"
                                  } ${active ? (isDark ? "text-white" : "text-warm-charcoal") : (isDark ? "text-white/78 hover:text-white" : "text-warm-charcoal hover:text-warm-amber")}`}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <div className="text-[15px] font-medium leading-6">{localizeCopy(item.label, locale)}</div>
                                      {showDescription ? (
                                        <p className={`mt-1 line-clamp-2 max-w-68 text-sm leading-6 ${isDark ? "text-white/52" : "text-warm-gray"}`}>
                                          {localizeCopy(item.description, locale)}
                                        </p>
                                      ) : null}
                                    </div>
                                    <ArrowRight className={`mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${isDark ? "text-white/42" : "text-warm-gray/70"}`} />
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}