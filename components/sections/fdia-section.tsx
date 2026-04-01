"use client"

import React, { useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronDown, Image as ImageIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import OptimizedImage from "@/components/ui/optimized-image"
import { LazyFDIACalculatorPanel, LazyFDIAFlowchart } from "@/components/diagrams/lazy-diagram-wrapper"
import SectionHeading from "@/components/section-heading"
import { pixelIcons } from "@/lib/pixel-icons"
import { useCardSpotlight } from "@/hooks/use-card-spotlight"

const PIXEL_BRAIN = pixelIcons.brain

function InfographicAccordion({ language }: { language: string }) {
  const cardSpotlight = useCardSpotlight<HTMLDetailsElement>()

  return (
    <div className="mb-6">
      <details {...cardSpotlight} className="main-page-reactive-surface group overflow-hidden rounded-xl border border-border bg-white/90 shadow-sm dark:bg-card/90">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 transition-colors duration-200 hover:bg-[#fffdfa] dark:hover:bg-secondary/50">
          <div className="flex items-center gap-3">
            <ImageIcon size={18} className="text-warm-amber" />
            <span className="text-sm font-semibold text-foreground">
              {language === "en"
                ? "FDIA Equation Infographic Blueprint"
                : "แผนผัง Infographic สมการ FDIA"}
            </span>
          </div>
          <ChevronDown size={18} className="text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="overflow-hidden">
          <OptimizedImage
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/rct-fdia-infographic-FHTXCU98beP8sw6khaiZR4.webp"
            alt="FDIA Equation Infographic — F = D^I × A Blueprint"
            containerClassName="w-full"
            objectFit="contain"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      </details>
    </div>
  )
}

export default function FDIASection() {
  const { language } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const cardSpotlight = useCardSpotlight<HTMLDivElement>()
  const isEn = language === "en"

  const intentImpact = useMemo(() => {
    const baseData = 85
    const architectMultiplier = 1.5
    const low = Math.pow(baseData, 1) * architectMultiplier
    const high = Math.pow(baseData, 10) * architectMultiplier
    if (high === 0 || low === 0) return "N/A"
    const ratio = high / low
    if (ratio > 1e12) return "> 1 Trillion x"
    if (ratio > 1e9) return `${(ratio / 1e9).toFixed(0)}B x`
    if (ratio > 1e6) return `${(ratio / 1e6).toFixed(0)}M x`
    return `${ratio.toFixed(0)}x`
  }, [])

  const signalCards = [
    {
      eyebrow: isEn ? "Outcome" : "ผลลัพธ์",
      title: isEn ? "Future is constructed" : "Future คือสิ่งที่ถูกสร้าง",
      body: isEn
        ? "The section should read as a systems blueprint: every visual choice needs to reinforce that F is produced by the full pipeline."
        : "section นี้ควรถูกอ่านเหมือน systems blueprint เพื่อย้ำว่า F เป็นผลลัพธ์ที่เกิดจากทั้ง pipeline",
    },
    {
      eyebrow: isEn ? "Exponent" : "ยกกำลัง",
      title: isEn ? "Intent changes the curve" : "Intent เปลี่ยนเส้นโค้งของผลลัพธ์",
      body: isEn
        ? "Intent is the dramatic lever, so the visual hierarchy now lifts it physically and chromatically above the system."
        : "Intent เป็นคันโยกสำคัญที่สุด จึงถูกยกสถานะขึ้นทั้งทางตำแหน่งและโทนสีในเลย์เอาต์ใหม่",
    },
    {
      eyebrow: isEn ? "Governance" : "การกำกับดูแล",
      title: isEn ? "Architect stays human" : "Architect ยังคงเป็นมนุษย์",
      body: isEn
        ? "Architect is no longer a decorative label. It is the governance multiplier that keeps AI outputs accountable."
        : "Architect ไม่ใช่ label เชิงตกแต่งอีกต่อไป แต่เป็น governance multiplier ที่ทำให้ผลลัพธ์ AI รับผิดชอบได้",
    },
  ]

  const equationLegend = [
    {
      letter: "F",
      label: isEn ? "Future" : "Future",
      color: "#D4A853",
      desc: isEn ? "Strategic outcome" : "ผลลัพธ์เชิงกลยุทธ์",
    },
    {
      letter: "D",
      label: isEn ? "Data" : "Data",
      color: "#89B4C8",
      desc: isEn ? "Verified inputs" : "ข้อมูลที่ผ่านการตรวจสอบ",
    },
    {
      letter: "I",
      label: isEn ? "Intent" : "Intent",
      color: "#C4745B",
      desc: isEn ? "Exponential lift" : "แรงยกแบบ exponent",
    },
    {
      letter: "A",
      label: isEn ? "Architect" : "Architect",
      color: "#7B9E87",
      desc: isEn ? "Human oversight" : "มนุษย์กำกับดูแล",
    },
  ]

  const stages = [
    {
      letter: "F",
      name: language === "en" ? "Future" : "Future (อนาคต)",
      desc:
        language === "en"
          ? "The ultimate outcome — the Future that is created and shaped by the entire FDIA pipeline."
          : "ผลลัพธ์สุดท้าย — Future ที่ถูกสร้างและกำหนดโดย FDIA Pipeline ทั้งหมด",
      color: "#D4A853",
      toneClass: "bg-amber-100 text-[#D4A853] dark:bg-[#3A2E15]",
    },
    {
      letter: "D",
      name: language === "en" ? "Data" : "Data (ข้อมูล)",
      desc:
        language === "en"
          ? "Raw data ingestion, validation, and quality scoring — the essential inputs."
          : "การรับข้อมูลดิบ ตรวจสอบ และให้คะแนนคุณภาพ — Input ที่จำเป็น",
      color: "#89B4C8",
      toneClass: "bg-sky-100 text-[#89B4C8] dark:bg-[#152A3A]",
    },
    {
      letter: "I",
      name: language === "en" ? "Intent" : "Intent (เจตนา)",
      desc:
        language === "en"
          ? "The exponential amplifier — clarity of purpose that multiplies Data's power."
          : "ตัวขยายแบบ Exponential — ความชัดเจนของเป้าหมายที่ขยายพลัง Data",
      color: "#C4745B",
      toneClass: "bg-rose-100 text-[#C4745B] dark:bg-[#3A1E15]",
    },
    {
      letter: "A",
      name: language === "en" ? "Architect" : "Architect (สถาปนิก)",
      desc:
        language === "en"
          ? "The Human-in-the-Loop — ensuring ethical, strategic application of AI."
          : "Human-in-the-Loop — ผู้กำกับดูแลการใช้ AI อย่างมีจริยธรรม",
      color: "#7B9E87",
      toneClass: "bg-emerald-100 text-[#7B9E87] dark:bg-[#1E3A25]",
    },
  ]

  return (
    <section
      id="fdia"
      aria-label="FDIA Equation"
      className="relative overflow-hidden border-y border-border bg-transparent py-16 md:py-24 transition-colors duration-300"
    >
      <div className="homepage-ambient-layer absolute inset-0">
        <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute -left-20 top-10 h-64 w-64 rounded-full" />
        <div className="homepage-ambient-orb homepage-ambient-orb--blue homepage-ambient-orb--slow absolute right-[6%] bottom-10 h-72 w-72 rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_24%,rgba(137,180,200,0.04)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,rgba(137,180,200,0.03)_100%)]" />
      </div>

      <div className="relative max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={language === "en" ? "Core Equation" : "สมการหลัก"}
          tagColor="gold"
          title={language === "en" ? "The FDIA Equation" : "สมการ FDIA"}
          italicWord="FDIA"
          description={
            language === "en"
              ? "Future = Data^Intent × Architect. This section has been rebuilt as a live system blueprint so it matches the current homepage language, density, and dark-mode finish."
              : "Future = Data^Intent × Architect. ส่วนนี้ถูกจัดใหม่เป็น blueprint แบบโต้ตอบเพื่อให้สอดคล้องกับภาษาดีไซน์ล่าสุดของหน้าแรกทั้งเรื่องความหนาแน่น จังหวะ และ dark mode"
          }
          pixelIcon={PIXEL_BRAIN}
        />

        <div className="mb-7 grid gap-3 md:grid-cols-3 lg:mb-8">
          {signalCards.map((card, index) => (
            <motion.div
              key={card.title}
              {...cardSpotlight}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.004 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? undefined : { duration: 0.28, delay: index * 0.04 }}
              className="main-page-reactive-surface rounded-[20px] border border-[rgba(176,150,111,0.14)] bg-[linear-gradient(180deg,rgba(255,251,245,0.72),rgba(250,244,235,0.56))] p-4 dark:bg-[linear-gradient(180deg,rgba(32,28,25,0.92),rgba(24,22,21,0.94))]"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-amber">{card.eyebrow}</div>
              <h3 className="mt-2 text-base font-semibold text-foreground sm:text-lg">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[14px]">{card.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-0 mb-8">
          {stages.map((stage, i) => (
            <React.Fragment key={stage.letter}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                {...cardSpotlight}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? undefined : { duration: 0.3, delay: i * 0.04 }}
                className="main-page-reactive-card group flex-1 rounded-[20px] border border-[rgba(176,150,111,0.14)] bg-[linear-gradient(180deg,rgba(255,251,245,0.72),rgba(250,244,235,0.56))] p-3.5 transition-[box-shadow,transform,background-color] duration-200 hover:bg-[rgba(255,251,245,0.84)] dark:bg-[linear-gradient(180deg,rgba(32,28,25,0.92),rgba(24,22,21,0.94))] dark:hover:bg-[linear-gradient(180deg,rgba(38,32,28,0.96),rgba(27,24,22,0.98))]"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-base transition-transform duration-200 group-hover:scale-105 ${stage.toneClass}`}>
                    {stage.letter}
                  </div>
                  <div className="text-sm font-bold text-foreground">
                    {stage.name}
                  </div>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {stage.desc}
                </p>
              </motion.div>
              {i < 3 && (
                <div className="flex items-center justify-center shrink-0 px-2">
                  <span className="text-warm-amber text-xl font-bold">→</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-8 lg:hidden">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.letter}
              {...cardSpotlight}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? undefined : { duration: 0.3, delay: i * 0.04 }}
              className="main-page-reactive-card group rounded-[20px] border border-[rgba(176,150,111,0.14)] bg-[linear-gradient(180deg,rgba(255,251,245,0.72),rgba(250,244,235,0.56))] p-3.5 transition-[box-shadow,transform,background-color] duration-200 hover:bg-[rgba(255,251,245,0.84)] dark:bg-[linear-gradient(180deg,rgba(32,28,25,0.92),rgba(24,22,21,0.94))] dark:hover:bg-[linear-gradient(180deg,rgba(38,32,28,0.96),rgba(27,24,22,0.98))]"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-base transition-transform duration-200 group-hover:scale-105 ${stage.toneClass}`}>
                  {stage.letter}
                </div>
                <div className="text-sm font-bold text-foreground">
                  {stage.name}
                </div>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {stage.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? undefined : { duration: 0.35 }}
          className="mb-8"
        >
          <LazyFDIAFlowchart />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          {...cardSpotlight}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.003 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? undefined : { duration: 0.3 }}
          className="main-page-reactive-surface mb-5 rounded-3xl border border-[rgba(176,150,111,0.14)] bg-[linear-gradient(180deg,rgba(255,251,245,0.74),rgba(250,244,235,0.58))] p-4.5 shadow-sm dark:bg-[linear-gradient(180deg,rgba(32,28,25,0.92),rgba(24,22,21,0.94))]"
        >
          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-warm-amber/15 bg-[#fff7ef] dark:bg-[#2b2118]">
              <span className="text-lg font-bold font-mono text-warm-amber">!</span>
            </div>
            <div>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-amber">
                {isEn ? "Design Rationale" : "เหตุผลของดีไซน์"}
              </div>
              <h3 className="text-sm font-bold mb-1.5 text-foreground sm:text-base">
                {language === "en"
                  ? "Why A = Architect, not Analyze?"
                  : "ทำไม A = Architect ไม่ใช่ Analyze?"}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
                {language === "en"
                  ? "The old art treated A as another decorative node. The redesigned section makes Architect an explicit governance layer so the whole section now speaks the same enterprise language as the rest of the homepage."
                  : "visual เดิมทำให้ A ดูเหมือน node เชิงตกแต่งอีกตัวหนึ่ง แต่เวอร์ชันใหม่ยกระดับ Architect ให้เป็น governance layer อย่างชัดเจน เพื่อให้ทั้ง section พูดภาษาดีไซน์แบบ enterprise เดียวกับส่วนอื่นของหน้าแรก"}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
            {...cardSpotlight}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.004 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? undefined : { duration: 0.35 }}
            className="main-page-reactive-surface rounded-3xl border border-[rgba(176,150,111,0.14)] bg-[linear-gradient(180deg,rgba(255,251,245,0.76),rgba(250,244,235,0.6))] p-4.5 shadow-sm dark:bg-[linear-gradient(180deg,rgba(32,28,25,0.92),rgba(24,22,21,0.94))]"
          >
            <div className="text-center mb-4">
              <div className="text-[11px] sm:text-sm font-semibold uppercase tracking-[0.2em] mb-2 text-muted-foreground">
                {language === "en" ? "Operational Readout" : "ภาพอ่านค่าของระบบ"}
              </div>
              <div className="font-mono text-3xl md:text-4xl font-bold tracking-wider py-2">
                <span className="text-warm-amber">F</span>
                <span className="mx-3 text-muted-foreground">=</span>
                <span style={{ color: "#89B4C8" }}>D</span>
                <sup className="text-3xl md:text-4xl" style={{ color: "#C4745B" }}>
                  I
                </sup>
                <span className="mx-3 text-muted-foreground">&times;</span>
                <span style={{ color: "#7B9E87" }}>A</span>
              </div>
              <div className="text-sm mt-2 font-medium text-muted-foreground">
                Future = Data ^ Intent × Architect
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {equationLegend.map((v) => (
                <div
                  key={v.letter}
                  className="flex items-center gap-2 rounded-[18px] border border-[#eee2d6] bg-[#fffaf6] p-3 dark:border-white/10 dark:bg-white/5"
                >
                  <span
                    className="font-mono font-bold text-lg"
                    style={{ color: v.color }}
                  >
                    {v.letter}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {v.label}
                    </div>
                    <div className="text-xs text-muted-foreground">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[20px] border border-[#eee2d6] bg-[#fffaf6] p-4 dark:border-white/10 dark:bg-[rgba(255,255,255,0.04)]">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-warm-amber">
                  {language === "en" ? "Key Insight:" : "ข้อมูลสำคัญ:"}
                </span>{" "}
                {language === "en"
                  ? "When Intent increases from 1 to 10, the result changes by "
                  : "เมื่อ Intent เพิ่มจาก 1 เป็น 10 ผลลัพธ์เปลี่ยนไป "}
                <span
                  className="font-mono font-bold"
                  style={{ color: "#C4745B" }}
                >
                  {intentImpact}
                </span>
                {language === "en"
                  ? " — this is the power of Exponential Thinking."
                  : " — นี่คือพลังของ Exponential Thinking"}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? undefined : { duration: 0.35, delay: 0.08 }}
          >
            <LazyFDIACalculatorPanel language={language} />
          </motion.div>
        </div>

        <div className="mt-6">
          <InfographicAccordion language={language} />
        </div>
      </div>
    </section>
  )
}
