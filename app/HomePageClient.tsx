"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { useState, type CSSProperties } from "react"
import { motion, useMotionTemplate, useReducedMotion, useSpring } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getLocalePrefix } from "@/lib/i18n"
import HeroSection from "@/components/sections/hero-section"
import { MainPageOrchestrator } from "@/components/main-page/main-page-orchestrator"
import { MainPageSection } from "@/components/main-page/main-page-section"
import { pixelIcons } from "@/lib/pixel-icons"
import { useCardSpotlight } from "@/hooks/use-card-spotlight"

const OverviewSection = dynamic(() => import("@/components/sections/overview-section"))
const FDIASection = dynamic(() => import("@/components/sections/fdia-section"))
const EvidenceSection = dynamic(() => import("@/components/sections/evidence-section"))

type PillarCardProps = {
  locale: "en" | "th"
  pillar: {
    stat: string
    title: string
    desc: string
    color: string
    bg: string
    darkBg: string
    iconSrc: string
    href: string
  }
}

function PillarCard({ locale, pillar }: PillarCardProps) {
  const [hovered, setHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const cardSpotlight = useCardSpotlight<HTMLAnchorElement>()
  const glowX = useSpring(82, { stiffness: 180, damping: 22, mass: 0.4 })
  const glowY = useSpring(16, { stiffness: 180, damping: 22, mass: 0.4 })
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(212,168,83,0.16), transparent 38%)`
  const iconSurfaceStyle = {
    "--pillar-icon-bg": pillar.bg,
    "--pillar-icon-bg-dark": pillar.darkBg,
  } as CSSProperties

  const handleMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    cardSpotlight.onPointerMove(event)
    const bounds = event.currentTarget.getBoundingClientRect()
    glowX.set(((event.clientX - bounds.left) / bounds.width) * 100)
    glowY.set(((event.clientY - bounds.top) / bounds.height) * 100)
  }

  const handleLeave = (event: React.PointerEvent<HTMLAnchorElement>) => {
    cardSpotlight.onPointerLeave(event)
    setHovered(false)
  }

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.007 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.7 }}
      className="h-full"
    >
      <Link
        href={pillar.href}
        style={cardSpotlight.style}
        onFocus={cardSpotlight.onFocus}
        onBlur={cardSpotlight.onBlur}
        onPointerMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onPointerLeave={handleLeave}
        onMouseLeave={() => setHovered(false)}
        className="main-page-reactive-card group relative flex min-h-40 h-full overflow-hidden rounded-[28px] border border-border bg-white/90 px-4 py-4 sm:min-h-44 sm:px-5 sm:py-5 transition-[transform,border-color,box-shadow,background-color] duration-300 hover:border-warm-amber/40 hover:bg-white dark:bg-card/90 dark:hover:bg-card"
      >
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ backgroundImage: glow }} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,248,240,0.12))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,248,240,0.01))]" />

      <div className="pointer-events-none absolute right-4 top-4 z-10 flex flex-col items-center gap-4 sm:right-5 sm:top-5 sm:gap-5">
        <div
          className="flex h-[3.7rem] w-[3.7rem] items-center justify-center rounded-[1.25rem] border bg-(--pillar-icon-bg) shadow-[0_10px_24px_rgba(84,61,31,0.08)] transition-[transform,box-shadow] duration-300 group-hover:scale-[1.04] group-hover:shadow-[0_14px_28px_rgba(84,61,31,0.12)] dark:bg-(--pillar-icon-bg-dark) sm:h-[4.4rem] sm:w-[4.4rem]"
          style={iconSurfaceStyle}
        >
          <Image
            src={pillar.iconSrc}
            alt=""
            width={35}
            height={35}
            className="object-contain sm:h-10.5 sm:w-10.5"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        <div className="inline-flex h-10 min-w-[4.45rem] items-center justify-center gap-1 rounded-full border border-warm-amber/18 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-warm-amber shadow-[0_8px_18px_rgba(84,61,31,0.06)] backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5 dark:bg-background/75 sm:min-w-19">
          <span>{locale === "en" ? "Open" : "ดู"}</span>
          <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-300 ${hovered ? "translate-x-0.5" : ""}`} />
        </div>
      </div>

      <div className="relative z-10 flex min-h-full flex-1 flex-col pr-28 sm:pr-[8.2rem]">
        <div className="min-w-0 flex-1">
          <div>
            <div
              className={`mb-2 text-[28px] font-bold leading-none sm:text-[33px] ${locale === "th" ? "font-thai" : "font-display"}`}
              style={{ color: pillar.color }}
            >
              {pillar.stat}
            </div>
            <div className="mb-2 text-[15px] font-semibold leading-tight text-foreground transition-colors duration-200 group-hover:text-warm-amber sm:text-[17px]">
              {pillar.title}
            </div>
            <p className={`max-w-[28ch] text-[13px] leading-[1.72] text-muted-foreground sm:max-w-[30ch] sm:text-[14px] ${locale === "th" ? "subtitle-th" : ""}`}>
              {pillar.desc}
            </p>
          </div>
        </div>
      </div>
      </Link>
    </motion.div>
  )
}

type HomePageClientProps = {
  locale: "en" | "th"
}

export default function HomePage({ locale }: HomePageClientProps) {
  const localePrefix = getLocalePrefix(locale)

  return (
    <MainPageOrchestrator>
      <main id="main-content" className="relative min-h-screen overflow-hidden bg-(--rct-bg-primary) transition-colors duration-300">
        <Navbar locale={locale} />
        <div className="homepage-global-backdrop" aria-hidden="true">
          <div className="homepage-global-backdrop__mesh" />
          <div className="homepage-global-backdrop__orb homepage-global-backdrop__orb--amber" />
          <div className="homepage-global-backdrop__orb homepage-global-backdrop__orb--sage" />
          <div className="homepage-global-backdrop__orb homepage-global-backdrop__orb--terra" />
        </div>
        <HeroSection locale={locale} />

        <h1 className="sr-only">
          {locale === "en"
            ? "RCT Ecosystem - Intent-Centric AI Operating System"
            : "RCT Ecosystem - ระบบปฏิบัติการ AI ที่เน้น Intent"}
        </h1>

        {/* ── Phase A4: ภาพรวม RCT Ecosystem ขึ้นมาก่อน ──────────── */}
        <MainPageSection sectionId="overview" tone="base">
          <OverviewSection locale={locale} />
        </MainPageSection>

        {/* ── Phase B3: Core Intelligence Pillars (2×2 grid, Kanit, Pixel icons) ── */}
        <MainPageSection sectionId="core-pillars" tone="raised" continuityMode="dense">
          <section
            id="core-pillars"
            className="relative overflow-hidden border-y border-border bg-transparent py-14 md:py-20 transition-colors duration-300"
          >
            <div className="homepage-ambient-layer absolute inset-0">
              <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute -left-24 top-8 h-60 w-60 rounded-full" />
              <div className="homepage-ambient-orb homepage-ambient-orb--sage homepage-ambient-orb--slow absolute -right-20 bottom-6 h-72 w-72 rounded-full" />
              <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#fbf7f2]/42 to-transparent dark:from-white/6" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,241,235,0.22),transparent_24%,rgba(212,168,83,0.04)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,rgba(212,168,83,0.028)_100%)]" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mb-9 text-center">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-warm-amber">
                  {locale === "en" ? "Core Intelligence Pillars" : "เสาหลักปัญญาประดิษฐ์"}
                </p>
                <h2 className={`text-2xl font-bold text-foreground sm:text-3xl ${locale === "th" ? "font-thai" : "font-display"}`}>
                  {locale === "en" ? "Four Engines. One Unified System." : "4 เครื่องยนต์. ระบบเดียวที่สมบูรณ์."}
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                {[
              {
                stat: locale === "en" ? "7 Models" : "7 โมเดล",
                title: "HexaCore AI Engine",
                desc: locale === "en"
                  ? "Western, Eastern, and Typhoon (Thai) LLMs — each task routed to the optimal model automatically."
                  : "LLM Western, Eastern และ Typhoon ภาษาไทย — เลือกโมเดลที่เหมาะกับแต่ละงานอัตโนมัติ",
                color: "#D4A853",
                bg: "#FEF3C7",
                darkBg: "#3D2E0A",
                iconSrc: pixelIcons.brain,
                href: `${localePrefix}/core-systems`,
              },
              {
                stat: "1,500×",
                title: "Intent Loop Engine",
                desc: locale === "en"
                  ? "7-state pipeline. Cold start 3–5s → warm recall <50ms. Memory-first routing cuts cost 60–75%."
                  : "Pipeline 7 สถานะ: cold start 3–5 วินาที → warm recall <50ms ลดต้นทุน 60–75% ด้วย memory-first routing",
                color: "#7B9E87",
                bg: "#D1FAE5",
                darkBg: "#0D2B1E",
                iconSrc: pixelIcons.cpu,
                href: `${localePrefix}/core-systems`,
              },
              {
                stat: locale === "en" ? "4 Modes" : "4 โหมด",
                title: "Analysearch Intent",
                desc: locale === "en"
                  ? "Quick, Standard, Deep, Mirror — GIGO protection and cross-disciplinary synthesis on every query."
                  : "Quick, Standard, Deep, Mirror — GIGO Protection และ Cross-disciplinary Synthesis ทุก query",
                color: "#89B4C8",
                bg: "#DBEAFE",
                darkBg: "#0D1F2D",
                iconSrc: pixelIcons.network,
                href: `${localePrefix}/core-systems`,
              },
              {
                stat: "74% less",
                title: "Delta Memory Engine",
                desc: locale === "en"
                  ? "Stores only state changes, not full snapshots. 74% compression with <1ms state reconstruction."
                  : "บันทึกเฉพาะสิ่งที่เปลี่ยนแปลง ลดหน่วยความจำ 74% พร้อม reconstruction <1ms",
                color: "#C4745B",
                bg: "#FEE2E2",
                darkBg: "#2D0E0A",
                iconSrc: pixelIcons.database,
                href: `${localePrefix}/core-systems`,
              },
            ].map((pillar) => (
              <PillarCard key={pillar.title} locale={locale} pillar={pillar} />
            ))}
              </div>

              <div className="mt-6 text-center">
                <Link
                  href={`${localePrefix}/core-systems`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-warm-amber hover:underline transition-colors"
                >
                  {locale === "en" ? "Explore all core systems" : "สำรวจระบบหลักทั้งหมด"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </MainPageSection>

        <MainPageSection sectionId="fdia" tone="raised" continuityMode="dense">
          <FDIASection />
        </MainPageSection>

        {/* ── Phase A5: EvidenceSection กลับมา Main Page ───────────── */}
        <MainPageSection sectionId="evidence" tone="base">
          <EvidenceSection />
        </MainPageSection>

        <MainPageSection sectionId="cta" tone="settle" continuityMode="settle">
          <section className="relative overflow-hidden py-16 md:py-24">
            <div className="homepage-ambient-layer absolute inset-0">
              <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute left-[8%] top-6 h-56 w-56 rounded-full" />
              <div className="homepage-ambient-orb homepage-ambient-orb--terra homepage-ambient-orb--slow absolute right-[6%] bottom-0 h-64 w-64 rounded-full" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4">
            <motion.div
              whileHover={{ y: -4, scale: 1.004 }}
              transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.9 }}
              className="main-page-reactive-card main-page-reactive-surface relative overflow-hidden rounded-2xl border border-border bg-white/90 p-10 md:p-16 dark:bg-card/90"
            >
              <div className="absolute inset-0 grid-background opacity-30" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,241,235,0.2),transparent_32%,rgba(212,168,83,0.04)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_32%,rgba(212,168,83,0.03)_100%)]" />
              <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
                <h2 className={`text-foreground ${locale === "th" ? "font-thai" : ""}`}>
                  {locale === "en" ? "Ready to Build with Intent?" : "พร้อมเริ่มต้นสร้างระบบ AI ที่ขับเคลื่อนด้วยเจตนาหรือยัง?"}
                </h2>
                <p className={`text-muted-foreground ${locale === "th" ? "subtitle-th" : ""}`}>
                  {locale === "en"
                    ? "Explore the architecture, read the protocols, or experience the live demo to see how RCT assembles intelligence around purpose."
                    : "สำรวจสถาปัตยกรรม อ่านโปรโตคอล หรือทดลองเดโม เพื่อดูว่า RCT เชื่อมข้อมูล เจตนา และการตัดสินใจเข้าด้วยกันอย่างไรในบริบทระดับองค์กร"}
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href={`${localePrefix}/whitepaper`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 font-medium text-white transition-colors hover:bg-[#C49A48]"
                  >
                    {locale === "en" ? "Read the Whitepaper" : "อ่านเอกสาร Whitepaper"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`${localePrefix}/contact`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {locale === "en" ? "Contact Us" : "ติดต่อทีมงาน"}
                  </Link>
                </div>
              </div>
            </motion.div>
            </div>
          </section>
        </MainPageSection>

        <Footer locale={locale} />
      </main>
    </MainPageOrchestrator>
  )
}
