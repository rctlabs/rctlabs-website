import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowDown } from "lucide-react"
import { getLocalePrefix } from "@/lib/i18n"
import { SITE_ALGORITHM_COUNT, SITE_LAYER_COUNT, SITE_HEXACORE_COUNT, SITE_UPTIME } from "@/lib/site-config"

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/rct-hero-human-v2-JuuABknjMqUydZ7t62H8ez.webp"

type HeroServerProps = {
  locale: "en" | "th"
}

export function HeroServer({ locale }: HeroServerProps) {
  const localePrefix = getLocalePrefix(locale)
  const isThai = locale === "th"
  const copy = isThai
    ? {
        badge: "Reverse Component Thinking",
        titleLine1: "RCT: ระบบปฏิบัติการ AI",
        titleLine2: "Intent-Centric",
        titleLine3: "อันดับ 1 ของโลก",
        subtitle:
          "โครงการสถาปัตยกรรม AI ระดับองค์กรที่สร้างบนโมเดล 10 ชั้น กรอบอัลกอริทึม 41 รายการ 7 Genome Subsystems สมการ FDIA และ JITNA Protocol",
        ctaExplore: "สำรวจสถาปัตยกรรม",
        ctaDemo: "ดู Live Demo",
        statAlgorithms: "Algorithms",
        statLayers: "Layers",
        statGenomes: "Genomes",
        statUptime: "Uptime",
        scroll: "เลื่อนเพื่อสำรวจ",
      }
    : {
        badge: "Reverse Component Thinking",
        titleLine1: "RCT: The World's 1st",
        titleLine2: "Intent-Centric",
        titleLine3: "AI Operating System",
        subtitle:
          "Enterprise AI architecture program built around a 10-layer model, a 41-algorithm framework, 7 Genome subsystems, the FDIA equation, and the JITNA Protocol.",
        ctaExplore: "Explore Architecture",
        ctaDemo: "View Live Demo",
        statAlgorithms: "Algorithms",
        statLayers: "Layers",
        statGenomes: "Genomes",
        statUptime: "Uptime",
        scroll: "Scroll to explore",
      }

  const stats = [
    { value: String(SITE_ALGORITHM_COUNT), label: copy.statAlgorithms },
    { value: String(SITE_LAYER_COUNT), label: copy.statLayers },
    { value: String(SITE_HEXACORE_COUNT), label: copy.statGenomes },
    { value: SITE_UPTIME.replace(" SLA", "") + " SLA", label: copy.statUptime },
  ]

  return (
    <section id="hero" data-main-section="hero" aria-label="Hero" className="relative flex min-h-[max(42rem,100svh)] items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_BG}
          alt="RCT Ecosystem Hero Background"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover scale-[1.02] opacity-[0.22] dark:opacity-[0.12]"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-[#f7f1eb]/90 via-[#f7f1eb]/78 to-[#f7f1eb]/44 dark:from-[#0D0D0D]/95 dark:via-[#0D0D0D]/86 dark:to-[#0D0D0D]/58" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-3 h-48 bg-[linear-gradient(180deg,transparent_0%,rgba(247,241,235,0.6)_68%,#f7f1eb_100%)] dark:bg-[linear-gradient(180deg,transparent_0%,rgba(13,13,13,0.46)_68%,#0D0D0D_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-300 px-4 pt-20 pb-14 sm:px-6 lg:px-8 lg:pt-24 lg:pb-18">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] lg:gap-10">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#e6ddd0] bg-white/95 px-3 py-1.5 shadow-sm dark:border-border dark:bg-card/78">
              <Image src="/RCTicon-lightVer.svg" alt="RCT Ecosystem Logo" width={20} height={20} className="h-5 w-5 object-contain dark:hidden" />
              <Image src="/RCTicon.svg" alt="RCT Ecosystem Logo" width={20} height={20} className="hidden h-5 w-5 object-contain dark:block" />
              <span className="text-xs font-medium text-warm-gray dark:text-warm-muted">{copy.badge}</span>
              <div className="h-1.5 w-1.5 rounded-full bg-warm-sage" />
            </div>

            <div className="space-y-4">
              <h1
                className={`text-4xl font-bold tracking-[-0.03em] leading-[1.12] sm:text-5xl lg:text-[56px] xl:text-[58px] ${isThai ? "font-thai" : ""} text-warm-charcoal dark:text-warm-light-gray`}
                style={isThai ? { fontSynthesis: "none" } : undefined}
              >
                {copy.titleLine1}
                <br />
                <span className="font-semibold text-warm-amber">{copy.titleLine2}</span>
                <br />
                {copy.titleLine3}
              </h1>

              <p
                className={`max-w-xl text-lg leading-relaxed sm:text-xl ${isThai ? "subtitle-th" : ""} text-warm-charcoal/72 dark:text-warm-pale/82`}
                style={isThai ? { fontSynthesis: "none" } : undefined}
              >
                {copy.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href="#overview"
                className="group inline-flex items-center gap-2 rounded-xl bg-warm-charcoal px-6 py-3 text-sm font-medium text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#333333] hover:shadow-lg dark:bg-warm-amber dark:text-dark-900 dark:hover:bg-[#E0B96A]"
              >
                {copy.ctaExplore}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href={`${localePrefix}/demo/fdia`}
                className="inline-flex items-center gap-2 rounded-xl border border-[#e6ddd0] bg-white px-6 py-3 text-sm font-medium text-warm-charcoal transition-[background-color,box-shadow] duration-200 hover:bg-[#fffdfa] hover:shadow-sm dark:border-border dark:bg-card/78 dark:text-warm-pale dark:hover:bg-secondary"
              >
                {copy.ctaDemo}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-5 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[#e6ddd0] bg-white px-3 py-3 dark:border-border dark:bg-card/72">
                  <div className="text-lg font-bold leading-none text-warm-charcoal dark:text-warm-light-gray">{stat.value}</div>
                  <div className="mt-1 text-[11px] font-medium text-warm-secondary dark:text-warm-dim">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-105 rounded-4xl border border-[#e6ddd0] bg-white/76 p-5 shadow-[0_20px_48px_rgba(84,61,31,0.08)] dark:border-border dark:bg-card/45">
            <div className="rounded-3xl border border-warm-amber/20 bg-[linear-gradient(165deg,#fff9f0_0%,#f5ece1_52%,#fff_100%)] p-5 dark:border-warm-amber/25 dark:bg-[linear-gradient(165deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_60%,rgba(255,255,255,0.01)_100%)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-warm-amber">Constitutional AI Stack</p>
              <div className="mt-4 space-y-3 text-sm text-warm-charcoal/80 dark:text-warm-pale/78">
                <div className="rounded-xl border border-[#e8dcc7] bg-white/88 px-3 py-2 dark:border-border dark:bg-card/65">FDIA Equation and JITNA Protocol</div>
                <div className="rounded-xl border border-[#e8dcc7] bg-white/88 px-3 py-2 dark:border-border dark:bg-card/65">HexaCore multi-model verification</div>
                <div className="rounded-xl border border-[#e8dcc7] bg-white/88 px-3 py-2 dark:border-border dark:bg-card/65">10-layer architecture with RCTDB memory</div>
                <div className="rounded-xl border border-[#e8dcc7] bg-white/88 px-3 py-2 dark:border-border dark:bg-card/65">Benchmark-governed enterprise reliability</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 flex justify-center lg:mt-10">
          <a
            href="#overview"
            className="group flex flex-col items-center gap-2 rounded-full px-4 py-3 text-warm-gray transition-colors hover:text-warm-charcoal dark:text-warm-subtle dark:hover:text-warm-pale"
          >
            <span className="text-xs font-medium uppercase tracking-widest">{copy.scroll}</span>
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}