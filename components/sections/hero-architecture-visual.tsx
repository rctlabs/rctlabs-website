"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo, useState, type CSSProperties } from "react"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { useMounted } from "@/hooks/use-mounted"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

const orbitNodes = [
  { id: "intent", en: "Intent", th: "Intent", short: "I", positionClass: "left-1/2 top-[17%] sm:top-[16%]", accent: "#D4A853", target: "#overview" },
  { id: "verify", en: "Verify", th: "Verify", short: "V", positionClass: "left-[79%] top-1/2 sm:left-[84%]", accent: "#fd9b6b", target: "#fdia" },
  { id: "memory", en: "Memory", th: "Memory", short: "M", positionClass: "left-1/2 top-[78%] sm:top-[82%]", accent: "#89B4C8", target: "#core-pillars" },
  { id: "kernel", en: "Kernel", th: "Kernel", short: "K", positionClass: "left-[21%] top-1/2 sm:left-[16%]", accent: "#7B9E87", target: "#evidence" },
] as const

const microBadges = [
  { id: "algorithms", label: "41A", positionClass: "left-[11%] top-[24%] sm:left-[12%] sm:top-[20%]", accent: "#D4A853", href: "/algorithms" },
  { id: "layers", label: "L10", positionClass: "right-[10%] top-[16%] sm:top-[14%]", accent: "#7B9E87", href: "/architecture" },
  { id: "genomes", label: "G7", positionClass: "bottom-[24%] right-[10%] sm:bottom-[21%] sm:right-[12%]", accent: "#89B4C8", href: "/genome" },
] as const

const metrics = [
  { en: "Algorithms", th: "Algorithms", value: "41", accent: "text-warm-amber" },
  { en: "Layers", th: "Layers", value: "10", accent: "text-warm-sage" },
  { en: "Genomes", th: "Genomes", value: "7", accent: "text-warm-sky" },
] as const

export default function HeroArchitectureVisual() {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"
  const isTH = language === "th"
  const locale = resolveLocale(pathname, language)
  const localePrefix = getLocalePrefix(locale)
  const defaultPointer = { x: 72, y: 24, rx: 0, ry: 0, sx: 0, sy: 0 }
  const [pointer, setPointer] = useState(defaultPointer)

  const panelStyle = useMemo(
    () =>
      ({
        ["--hero-pointer-x" as string]: `${pointer.x}%`,
        ["--hero-pointer-y" as string]: `${pointer.y}%`,
        ["--hero-rotate-x" as string]: `${pointer.rx}deg`,
        ["--hero-rotate-y" as string]: `${pointer.ry}deg`,
        ["--hero-shift-x" as string]: `${pointer.sx}px`,
        ["--hero-shift-y" as string]: `${pointer.sy}px`,
      }) as CSSProperties,
    [pointer],
  )

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const ratioX = (event.clientX - bounds.left) / bounds.width
    const ratioY = (event.clientY - bounds.top) / bounds.height
    const offsetX = ratioX - 0.5
    const offsetY = ratioY - 0.5

    setPointer({
      x: ratioX * 100,
      y: ratioY * 100,
      rx: Number((-offsetY * 4.5).toFixed(2)),
      ry: Number((offsetX * 5.5).toFixed(2)),
      sx: Number((offsetX * 8).toFixed(2)),
      sy: Number((offsetY * 6).toFixed(2)),
    })
  }

  const handlePointerLeave = () => {
    setPointer(defaultPointer)
  }

  return (
    <div className="mx-auto w-full max-w-105 sm:max-w-115 lg:ml-auto lg:max-w-121">
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={panelStyle}
        className={`relative aspect-[1/1.04] overflow-hidden rounded-4xl border shadow-[0_20px_48px_rgba(84,61,31,0.12)] sm:aspect-5/4 sm:rounded-4xl sm:shadow-[0_24px_60px_rgba(84,61,31,0.12)] ${
          isDark ? "border-border bg-card/78" : "border-[#eadfce] bg-white/48"
        } hero-architecture-panel cursor-default backdrop-blur-xl`}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="hero-architecture-glow absolute inset-0" />
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-[radial-gradient(circle_at_50%_30%,rgba(212,168,83,0.14),transparent_44%),radial-gradient(circle_at_20%_80%,rgba(123,158,135,0.10),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.08))]"
                : "bg-[radial-gradient(circle_at_50%_30%,rgba(212,168,83,0.18),transparent_44%),radial-gradient(circle_at_20%_80%,rgba(123,158,135,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.56),rgba(255,248,240,0.24))]"
            }`}
          />
          <div className={`absolute inset-[7%] rounded-[26px] border sm:inset-[8%] sm:rounded-[30px] ${isDark ? "border-white/8" : "border-white/70"}`} />
          <div className={`absolute inset-x-[12%] top-[22%] h-px sm:inset-x-[14%] sm:top-[23%] ${isDark ? "bg-white/10" : "bg-[#eadfce]"}`} />
          <div className={`absolute inset-x-[14%] bottom-[26%] h-px sm:inset-x-[16%] sm:bottom-[24%] ${isDark ? "bg-white/10" : "bg-[#eadfce]"}`} />
        </div>

        <div className="relative z-10 flex h-full flex-col p-3.5 sm:p-5">
          <div className="flex items-center justify-between gap-2.5 sm:gap-3">
            <div className={`text-[9px] font-medium sm:text-[10px] ${isDark ? "text-warm-subtle" : "text-warm-gray"}`}>
              Architecture Signal
            </div>
            <div className="flex items-center gap-1 rounded-full border border-warm-amber/20 bg-warm-amber/8 px-2 py-1 text-[8px] font-medium text-warm-amber sm:gap-1.5 sm:text-[9px]">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-warm-amber" />
              {isTH ? "แผนที่นำทาง" : "Navigation Map"}
            </div>
          </div>

          <div className="relative flex-1">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="hero-architecture-cluster relative h-[74%] w-[74%] max-h-72 max-w-72 sm:h-[78%] sm:w-[78%] sm:max-h-88 sm:max-w-88">
                <div className={`absolute inset-[11%] rounded-full border sm:inset-[12%] ${isDark ? "border-white/8" : "border-[#eadfce]"}`} />
                <div className={`absolute inset-[24%] rounded-full border ${isDark ? "border-white/8" : "border-[#eadfce]"}`} />
                <div className={`absolute left-1/2 top-[12%] h-[76%] w-px -translate-x-1/2 sm:top-[10%] sm:h-[80%] ${isDark ? "bg-white/8" : "bg-[#eadfce]"}`} />
                <div className={`absolute left-[12%] top-1/2 h-px w-[76%] -translate-y-1/2 sm:left-[10%] sm:w-[80%] ${isDark ? "bg-white/8" : "bg-[#eadfce]"}`} />

                <div
                  className="hero-architecture-aura absolute inset-[31%] rounded-full"
                  style={{
                    background: isDark
                      ? "radial-gradient(circle, rgba(212,168,83,0.18), rgba(212,168,83,0.02) 62%, transparent 78%)"
                      : "radial-gradient(circle, rgba(212,168,83,0.24), rgba(212,168,83,0.04) 62%, transparent 78%)",
                  }}
                />

                <Link
                  href={`${localePrefix}/fdia`}
                  className={`absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border sm:h-32 sm:w-32 ${
                    isDark ? "border-warm-amber/25 bg-[#161616]/88" : "border-white/80 bg-white/78"
                  } hero-architecture-core z-20 overflow-hidden shadow-[0_0_34px_rgba(212,168,83,0.18)] backdrop-blur-md outline-none transition-colors hover:border-warm-amber/45`}
                >
                  <div className="hero-architecture-core__body flex h-full w-full flex-col items-center justify-center">
                    <div className={`text-[9px] font-medium sm:text-[10px] ${isDark ? "text-warm-subtle" : "text-warm-gray"}`}>FDIA</div>
                    <div className={`mt-1 font-mono text-[13px] font-bold sm:text-sm ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                      D<sup className="text-[10px] text-warm-terracotta">I</sup> x A
                    </div>
                    <div className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-warm-amber sm:mt-2 sm:text-[9px] sm:tracking-[0.14em]">
                      {isTH ? "เปิดสมการ" : "Open Formula"}
                    </div>
                  </div>
                </Link>

                {orbitNodes.map((node, index) => (
                  <div
                    key={node.id}
                    className={`hero-architecture-node hero-architecture-node--${(index % 3) + 1} absolute -translate-x-1/2 -translate-y-1/2 ${node.positionClass}`}
                  >
                    <Link
                      href={`${localePrefix}#${node.target.replace(/^#/, "")}`}
                      className="hero-architecture-node__body flex flex-col items-center gap-1 outline-none sm:gap-1.5"
                    >
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-full border text-[10px] font-bold font-mono shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:scale-105 sm:h-11 sm:w-11 sm:text-[11px]"
                        style={{
                          color: node.accent,
                          borderColor: `${node.accent}33`,
                          backgroundColor: isDark ? `${node.accent}1A` : `${node.accent}16`,
                        }}
                      >
                        {node.short}
                      </div>
                      <span className={`text-[9px] font-medium sm:text-[10px] ${isDark ? "text-warm-pale/85" : "text-warm-charcoal"}`}>
                        {isTH ? node.th : node.en}
                      </span>
                    </Link>
                  </div>
                ))}

                {microBadges.map((badge, index) => (
                  <div
                    key={badge.id}
                    className={`hero-architecture-badge hero-architecture-badge--${(index % 3) + 1} absolute ${badge.positionClass}`}
                  >
                    <Link
                      href={`${localePrefix}${badge.href}`}
                      className="hero-architecture-badge__body block outline-none"
                    >
                      <div
                        className="rounded-full border px-2 py-1 font-mono text-[9px] font-semibold shadow-[0_8px_18px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-0.5 sm:px-2.5 sm:text-[10px]"
                        style={{
                          color: badge.accent,
                          borderColor: `${badge.accent}2F`,
                          backgroundColor: isDark ? "rgba(22,22,22,0.78)" : "rgba(255,255,255,0.76)",
                        }}
                      >
                        {badge.label}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`hero-architecture-metrics grid grid-cols-3 gap-1.5 rounded-[1.15rem] border px-2.5 py-2 sm:gap-2 sm:rounded-2xl sm:px-3 sm:py-2.5 ${isDark ? "border-white/8 bg-black/16" : "border-white/70 bg-white/52"}`}
          >
            {metrics.map((metric, index) => (
              <div
                key={metric.en}
                className={`hero-architecture-metric hero-architecture-metric--${(index % 3) + 1} text-center`}
              >
                <div className={`text-[15px] font-bold font-mono sm:text-base ${metric.accent}`}>{metric.value}</div>
                <div className={`text-[9px] sm:text-[10px] ${isDark ? "text-warm-subtle" : "text-warm-gray"}`}>{isTH ? metric.th : metric.en}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}