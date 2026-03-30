"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { localizeCopy, type ResourceTrack } from "@/lib/navigation"

interface ResourcesPanelProps {
  locale: Locale
  tracks: ResourceTrack[]
  activeTrackId: ResourceTrack["id"]
  onTrackChange: (trackId: ResourceTrack["id"], trigger: "hover" | "click" | "focus") => void
  localHref: (href: string) => string
  isActivePath: (href: string) => boolean
  onNavigate: (label: string, href: string, groupId: string) => void
  isDark: boolean
}

export function ResourcesPanel({
  locale,
  tracks,
  activeTrackId,
  onTrackChange,
  localHref,
  isActivePath,
  onNavigate,
  isDark,
}: ResourcesPanelProps) {
  const activeTrack = tracks.find((track) => track.id === activeTrackId) ?? tracks[0]
  const primaryItems = activeTrack.items.slice(0, 2)

  return (
    <div
      className={`grid gap-0 overflow-hidden ${isDark ? "bg-[#111111]" : "bg-warm-cream"}`}
      style={{
        gridTemplateColumns: `160px minmax(0, 1fr)`,
        maxHeight: "380px",
      }}
    >
      <div className={`px-5 py-5 ${isDark ? "border-r border-white/10" : "border-r border-warm-light-gray"}`}>
        <div>
          <div className={`text-[11px] font-medium uppercase tracking-[0.18em] ${isDark ? "text-white/48" : "text-warm-gray/80"}`}>
            Resource Tasks
          </div>
          <p className={`mt-2 line-clamp-3 text-[13px] leading-6 ${isDark ? "text-white/56" : "text-warm-gray"}`}>
            {locale === "th"
              ? "เลือกเส้นทางตามงานที่ต้องทำจริง แล้วค่อยดูรายการเนื้อหาในบริบทนั้น"
              : "Pick the task first, then scan only the resource set that supports that job."}
          </p>
        </div>
        <div className="mt-4 space-y-1">
          {tracks.map((track) => {
            const isSelected = track.id === activeTrack.id
            return (
              <button
                key={track.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`resource-panel-${track.id}`}
                onMouseEnter={() => onTrackChange(track.id, "hover")}
                onFocus={() => onTrackChange(track.id, "focus")}
                onClick={() => onTrackChange(track.id, "click")}
                className={`w-full border-b px-0 py-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-amber/50 ${
                  isDark ? "border-white/10" : "border-warm-light-gray"
                } ${
                  isSelected
                    ? isDark
                      ? "text-white"
                      : "text-warm-charcoal"
                    : isDark
                      ? "text-white/64 hover:text-white"
                      : "text-warm-gray hover:text-warm-charcoal"
                }`}
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-warm-amber">
                  {localizeCopy(track.label, locale)}
                </div>
                <div className="mt-1 line-clamp-2 text-[14px] font-medium leading-6">
                  {localizeCopy(track.summary, locale)}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div
        id={`resource-panel-${activeTrack.id}`}
        role="tabpanel"
        className={`px-5 py-5 ${isDark ? "border-r border-white/10 bg-[#111111]" : "border-r border-warm-light-gray bg-warm-cream"}`}
      >
        <div className={`pb-4 ${isDark ? "border-b border-white/10" : "border-b border-warm-light-gray"}`}>
          <div className="max-w-2xl">
            <div className={`text-[11px] font-medium uppercase tracking-[0.18em] ${isDark ? "text-white/48" : "text-warm-gray/80"}`}>
              {localizeCopy(activeTrack.label, locale)}
            </div>
            <h3 className={`mt-2 line-clamp-2 text-[1.55rem] font-medium leading-[1.12] tracking-tight ${isDark ? "text-white" : "text-warm-charcoal"}`}>
              {localizeCopy(activeTrack.summary, locale)}
            </h3>
            <p className={`mt-2 line-clamp-2 max-w-xl text-[14px] leading-6 ${isDark ? "text-white/60" : "text-warm-gray"}`}>
              {localizeCopy(activeTrack.overview, locale)}
            </p>
          </div>
        </div>

        <div className="mt-1">
          {primaryItems.map((item) => {
            const active = isActivePath(item.href)
            return (
              <Link
                key={item.id}
                href={localHref(item.href)}
                onClick={() => onNavigate(localizeCopy(item.label, locale), item.href, "resources")}
                className={`group block border-b px-0 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-amber/50 ${
                  isDark ? "border-white/10" : "border-warm-light-gray"
                } ${
                  active
                    ? isDark
                      ? "text-white"
                      : "text-warm-charcoal"
                    : isDark
                      ? "text-white/72 hover:text-white"
                      : "text-warm-charcoal hover:text-warm-amber"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-medium leading-6">{localizeCopy(item.label, locale)}</span>
                    {item.badge ? (
                      <span className="inline-flex items-center rounded-full bg-warm-amber/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-warm-amber">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                    <p className={`mt-1 line-clamp-2 max-w-sm text-sm leading-6 ${isDark ? "text-white/52" : "text-warm-gray"}`}>
                      {localizeCopy(item.description, locale)}
                    </p>
                  </div>
                  <ArrowRight className={`mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${isDark ? "text-white/42" : "text-warm-gray/70"}`} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

    </div>
  )
}