"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, m } from "framer-motion"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { localizeCopy, type NavGroup, type ResourceTrack } from "@/lib/navigation"
import { UtilityActions } from "@/components/navigation/utility-actions"
import dynamic from "next/dynamic"

const UserProfileMenu = dynamic(
  () => import("@/components/user-profile-menu").then(m => ({ default: m.UserProfileMenu })),
  { ssr: false }
)

type MobileView =
  | { level: "root" }
  | { level: "group"; groupId: Exclude<NavGroup["id"], "resources"> }
  | { level: "resources"; trackId: ResourceTrack["id"] }

interface MobileNavDrawerProps {
  isOpen: boolean
  locale: Locale
  groups: NavGroup[]
  resourceTracks: ResourceTrack[]
  activeResourceTrackId: ResourceTrack["id"]
  localHref: (href: string) => string
  isActivePath: (href: string) => boolean
  onNavigate: (label: string, href: string, groupId: string) => void
  onOpenSearch: () => void
  onClose: () => void
  onResourceTrackChange: (trackId: ResourceTrack["id"], trigger: "hover" | "click" | "focus") => void
  onTrackedUtility: (action: string, surface: "desktop" | "mobile") => void
  isDark: boolean
}

export function MobileNavDrawer({
  isOpen,
  locale,
  groups,
  resourceTracks,
  activeResourceTrackId,
  localHref,
  isActivePath,
  onNavigate,
  onOpenSearch,
  onClose,
  onResourceTrackChange,
  onTrackedUtility,
  isDark,
}: MobileNavDrawerProps) {
  const [view, setView] = useState<MobileView>({ level: "root" })

  const activeGroup = useMemo(
    () => (view.level === "group" ? groups.find((group) => group.id === view.groupId) ?? null : null),
    [groups, view]
  )
  const activeTrack = useMemo(
    () => resourceTracks.find((track) => track.id === (view.level === "resources" ? view.trackId : activeResourceTrackId)) ?? resourceTracks[0],
    [activeResourceTrackId, resourceTracks, view]
  )
  const activeFeature = activeGroup?.feature ?? null

  return (
    <AnimatePresence>
      {isOpen ? (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
          className={`lg:hidden overflow-hidden border-t ${isDark ? "border-white/10 bg-[#121212]" : "border-warm-light-gray bg-[#fcfaf7]"}`}
        >
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4">
            <UtilityActions
              mode="mobile"
              onOpenSearch={() => {
                onOpenSearch()
                onClose()
              }}
              onTrackedAction={onTrackedUtility}
            />

            {view.level !== "root" ? (
              <button
                type="button"
                onClick={() => setView({ level: "root" })}
                className={`mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${isDark ? "text-white/72 hover:bg-white/6 hover:text-white" : "text-warm-gray hover:bg-white hover:text-warm-charcoal"}`}
              >
                <ArrowLeft className="h-4 w-4" />
                {locale === "th" ? "กลับไปเมนูหลัก" : "Back to main navigation"}
              </button>
            ) : null}

            {view.level === "root" ? (
              <div className="mt-4 space-y-2">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => {
                      if (group.id === "resources") {
                        setView({ level: "resources", trackId: activeResourceTrackId })
                        return
                      }

                      setView({ level: "group", groupId: group.id })
                    }}
                    className={`flex w-full items-start justify-between gap-4 rounded-[20px] border px-4 py-5 text-left transition-colors ${isDark ? "border-white/12 bg-[#1a1a1a] text-white hover:bg-[#202020]" : "border-warm-light-gray bg-white text-warm-charcoal hover:bg-warm-sand/25"}`}
                  >
                    <div>
                      <div className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${isDark ? "text-warm-amber" : "text-warm-amber"}`}>
                        {localizeCopy(group.label, locale)}
                      </div>
                      <div className={`mt-2 text-sm leading-6 ${isDark ? "text-white/72" : "text-warm-gray"}`}>{localizeCopy(group.summary, locale)}</div>
                    </div>
                    <ChevronRight className={`mt-1 h-4 w-4 shrink-0 ${isDark ? "text-white/45" : "text-warm-gray/60"}`} />
                  </button>
                ))}
              </div>
            ) : null}

            {view.level === "group" && activeGroup ? (
              <div className="mt-4 space-y-3">
                {activeFeature ? (
                  <Link
                    href={localHref(activeFeature.href)}
                    onClick={() => {
                      onNavigate(localizeCopy(activeFeature.title, locale), activeFeature.href, activeGroup.id)
                      onClose()
                    }}
                    className={`block rounded-[20px] border px-4 py-4 ${isDark ? "border-warm-amber/20 bg-[#201b12] text-white" : "border-warm-amber/20 bg-warm-sand/35 text-warm-charcoal"}`}
                  >
                    <div className={`text-[11px] font-medium uppercase tracking-[0.18em] ${isDark ? "text-white/48" : "text-warm-gray/80"}`}>
                      {localizeCopy(activeFeature.eyebrow, locale)}
                    </div>
                    <div className="mt-2 text-xl font-medium tracking-tight">
                      {localizeCopy(activeFeature.title, locale)}
                    </div>
                    <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/62" : "text-warm-gray"}`}>
                      {localizeCopy(activeFeature.description, locale)}
                    </p>
                  </Link>
                ) : null}

                {activeGroup.items.map((item) => (
                  <Link
                    key={item.id}
                    href={localHref(item.href)}
                    onClick={() => {
                      onNavigate(localizeCopy(item.label, locale), item.href, activeGroup.id)
                      onClose()
                    }}
                    className={`block rounded-[18px] border px-4 py-5 transition-colors ${
                      isActivePath(item.href)
                        ? isDark
                          ? "border-warm-amber/40 bg-[#201b12] text-white"
                          : "border-warm-amber/40 bg-warm-sand/55 text-warm-charcoal"
                        : isDark
                          ? "border-white/10 bg-[#161616] text-white/76 hover:bg-[#1d1d1d]"
                          : "border-warm-light-gray bg-white text-warm-gray hover:bg-warm-sand/25 hover:text-warm-charcoal"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{localizeCopy(item.label, locale)}</div>
                        <p className={`mt-1 text-sm leading-6 ${isDark ? "text-white/60" : "text-warm-gray"}`}>
                          {localizeCopy(item.description, locale)}
                        </p>
                      </div>
                      <ArrowRight className={`mt-1 h-4 w-4 shrink-0 ${isDark ? "text-white/45" : "text-warm-gray/60"}`} />
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}

            {view.level === "resources" ? (
              <div className="mt-4 space-y-4">
                <div className={`rounded-[20px] border px-4 py-4 ${isDark ? "border-warm-amber/20 bg-[#201b12]" : "border-warm-amber/20 bg-warm-sand/35"}`}>
                  <div className={`text-[11px] font-medium uppercase tracking-[0.18em] ${isDark ? "text-white/48" : "text-warm-gray/80"}`}>
                    {locale === "th" ? "Resource Tasks" : "Resource Tasks"}
                  </div>
                  <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/62" : "text-warm-gray"}`}>
                    {locale === "th"
                      ? "เริ่มจากงานที่ต้องทำก่อน แล้วค่อยเลือกลิงก์ภายในกลุ่มนั้น"
                      : "Start with the job you are doing, then choose the resource inside that path."}
                  </p>
                </div>

                <div className="space-y-2">
                  {resourceTracks.map((track) => {
                    const selected = track.id === activeTrack.id
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => {
                          onResourceTrackChange(track.id, "click")
                          setView({ level: "resources", trackId: track.id })
                        }}
                        className={`w-full rounded-[18px] border px-4 py-3 text-left transition-colors ${
                          selected
                            ? isDark
                              ? "border-warm-amber/45 bg-[#2a2317] text-white"
                              : "border-warm-amber/40 bg-warm-sand/60 text-warm-charcoal"
                            : isDark
                              ? "border-white/10 bg-[#161616] text-white/74 hover:bg-[#1d1d1d]"
                              : "border-warm-light-gray bg-white text-warm-gray hover:bg-warm-sand/25 hover:text-warm-charcoal"
                        }`}
                      >
                        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-amber">
                          {localizeCopy(track.label, locale)}
                        </div>
                        <div className={`mt-1.5 text-sm leading-6 ${selected ? (isDark ? "text-white" : "text-warm-charcoal") : (isDark ? "text-white/70" : "text-warm-gray")}`}>{localizeCopy(track.summary, locale)}</div>
                      </button>
                    )
                  })}
                </div>

                <div className={`rounded-[20px] border px-4 py-4 ${isDark ? "border-white/10 bg-[#171717]" : "border-warm-light-gray bg-white"}`}>
                  <div className={`text-[11px] font-medium uppercase tracking-[0.18em] ${isDark ? "text-white/48" : "text-warm-gray/80"}`}>
                    {localizeCopy(activeTrack.label, locale)}
                  </div>
                  <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/62" : "text-warm-gray"}`}>
                    {localizeCopy(activeTrack.overview, locale)}
                  </p>
                  <div className="mt-4 space-y-2">
                    {activeTrack.items.map((item) => (
                      <Link
                        key={item.id}
                        href={localHref(item.href)}
                        onClick={() => {
                          onNavigate(localizeCopy(item.label, locale), item.href, "resources")
                          onClose()
                        }}
                        className={`block rounded-[18px] border px-4 py-3 ${
                          isActivePath(item.href)
                            ? isDark
                              ? "border-warm-amber/40 bg-white/7 text-white"
                              : "border-warm-amber/40 bg-warm-sand/55 text-warm-charcoal"
                            : isDark
                              ? "border-white/10 bg-white/4 text-white/76"
                              : "border-warm-light-gray bg-warm-sand/15 text-warm-gray"
                        }`}
                      >
                        <div className="text-sm font-semibold">{localizeCopy(item.label, locale)}</div>
                        <p className={`mt-1 text-sm leading-6 ${isDark ? "text-white/60" : "text-warm-gray"}`}>
                          {localizeCopy(item.description, locale)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-4 border-t border-border/70 pt-4">
              <UserProfileMenu />
            </div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  )
}