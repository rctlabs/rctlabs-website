"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { getLocaleFromPathname, getLocalePrefix } from "@/lib/i18n"
import HeroSection from "@/components/sections/hero-section"
import OverviewSection from "@/components/sections/overview-section"
import FDIASection from "@/components/sections/fdia-section"
import EvidenceSection from "@/components/sections/evidence-section"
import { MainPageOrchestrator } from "@/components/main-page/main-page-orchestrator"
import { MainPageSection } from "@/components/main-page/main-page-section"
import { pixelIcons } from "@/lib/pixel-icons"

export default function HomePage() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const locale = (getLocaleFromPathname(pathname) || language || "en") as "en" | "th"
  const localePrefix = getLocalePrefix(locale)

  return (
    <MainPageOrchestrator>
      <main id="main-content" className="min-h-screen bg-transparent">
        <Navbar />
        <HeroSection />

        <h1 className="sr-only">
          {locale === "en"
            ? "RCT Ecosystem - Intent-Centric AI Operating System"
            : "RCT Ecosystem - ระบบปฏิบัติการ AI ที่เน้น Intent"}
        </h1>

        {/* ── Phase A4: ภาพรวม RCT Ecosystem ขึ้นมาก่อน ──────────── */}
        <MainPageSection sectionId="overview" tone="base">
          <OverviewSection />
        </MainPageSection>

        {/* ── Phase B3: Core Intelligence Pillars (2×2 grid, Kanit, Pixel icons) ── */}
        <MainPageSection sectionId="core-pillars" tone="raised" continuityMode="dense">
          <section
            id="core-pillars"
            className="border-y border-border bg-transparent py-14 md:py-20 transition-colors duration-300"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-warm-amber">
                  {locale === "en" ? "Core Intelligence Pillars" : "เสาหลักปัญญาประดิษฐ์"}
                </p>
                <h2 className={`text-2xl font-bold text-foreground sm:text-3xl ${locale === "th" ? "font-thai" : "font-display"}`}>
                  {locale === "en" ? "Four Engines. One Unified System." : "4 เครื่องยนต์. ระบบเดียวที่สมบูรณ์."}
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
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
              <Link
                key={pillar.title}
                href={pillar.href}
                className="main-page-reactive-card group relative flex flex-row items-start gap-5 overflow-hidden rounded-2xl border border-border bg-[#fff8f1] p-6 transition-[transform,border-color,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:border-warm-amber/40 hover:bg-[#fffdf8] hover:shadow-[0_14px_32px_rgba(84,61,31,0.07)] dark:bg-card dark:hover:bg-card"
              >
                {/* Hover gradient overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.10),transparent_50%)]" />
                </div>

                {/* Pixel Art Icon */}
                <div
                  className="relative shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: pillar.bg }}
                >
                  <Image
                    src={pillar.iconSrc}
                    alt=""
                    width={36}
                    height={36}
                    className="object-contain"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col min-w-0 flex-1">
                  <div
                    className={`text-3xl font-bold leading-none mb-1 ${locale === "th" ? "font-thai" : "font-display"}`}
                    style={{ color: pillar.color }}
                  >
                    {pillar.stat}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-2 group-hover:text-warm-amber transition-colors duration-200">
                    {pillar.title}
                  </div>
                  <p className={`text-xs leading-relaxed text-muted-foreground ${locale === "th" ? "subtitle-th" : ""}`}>
                    {pillar.desc}
                  </p>
                </div>
              </Link>
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
          <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="main-page-reactive-card main-page-reactive-surface relative overflow-hidden rounded-2xl border border-border bg-[#fff5ec] p-10 md:p-16 dark:bg-card">
              <div className="absolute inset-0 grid-background opacity-30" />
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
            </div>
          </section>
        </MainPageSection>

        <Footer />
      </main>
    </MainPageOrchestrator>
  )
}
