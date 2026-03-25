"use client"

import React, { useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronDown, Image as ImageIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import OptimizedImage from "@/components/ui/optimized-image"
import { LazyFDIACalculatorPanel, LazyFDIAFlowchart } from "@/components/diagrams/lazy-diagram-wrapper"
import SectionHeading from "@/components/section-heading"

const PIXEL_BRAIN =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-brain-icon-YV3hZvbAaJBXWEMr6T2Tnc.webp"

function InfographicAccordion({ language }: { language: string }) {
  return (
    <div className="mb-6">
      <details className="group rounded-xl border bg-card border-border overflow-hidden shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors duration-200">
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
      className="py-16 md:py-24 bg-card/30 border-y border-border transition-colors duration-300"
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={language === "en" ? "Core Equation" : "สมการหลัก"}
          tagColor="gold"
          title={language === "en" ? "The FDIA Equation" : "สมการ FDIA"}
          italicWord="FDIA"
          description={
            language === "en"
              ? "Future = Data^Intent × Architect — the exponential formula that drives intent-centric AI."
              : "Future = Data^Intent × Architect — สูตร Exponential ที่ขับเคลื่อน AI ที่เน้น Intent"
          }
          pixelIcon={PIXEL_BRAIN}
        />

        {/* FDIA Pipeline Cards — desktop row */}
        <div className="hidden lg:flex items-center gap-0 mb-8">
          {stages.map((stage, i) => (
            <React.Fragment key={stage.letter}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? undefined : { duration: 0.3, delay: i * 0.04 }}
                className="flex-1 p-4 rounded-xl border bg-card border-border hover:shadow-md transition-[box-shadow,transform] duration-200 group"
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

        {/* Mobile: stacked grid */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-8 lg:hidden">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.letter}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? undefined : { duration: 0.3, delay: i * 0.04 }}
              className="p-4 rounded-xl border bg-card border-border hover:shadow-md transition-[box-shadow,transform] duration-200 group"
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

        {/* Interactive FDIA Flowchart */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? undefined : { duration: 0.35 }}
          className="mb-6"
        >
          <LazyFDIAFlowchart />
        </motion.div>

        {/* FDIA Infographic — Collapsible */}
        <InfographicAccordion language={language} />

        {/* Key Insight Banner */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? undefined : { duration: 0.3 }}
          className="mb-5 p-4 rounded-xl border shadow-sm bg-card border-border"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-warm-amber/10">
              <span className="text-lg font-bold font-mono text-warm-amber">!</span>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-1.5 text-foreground">
                {language === "en"
                  ? "Why A = Architect, not Analyze?"
                  : "ทำไม A = Architect ไม่ใช่ Analyze?"}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
                {language === "en"
                  ? "In the FDIA equation, F = Future — the outcome that is created, not predicted. D = Data, I = Intent (the exponential amplifier), and A = Architect (Human-in-the-Loop). This is a deliberate design choice: AI should never operate without human oversight."
                  : "ในสมการ FDIA: F = Future (อนาคต/ผลลัพธ์ที่ถูกสร้างขึ้น), D = Data (ข้อมูล), I = Intent (เจตนา — ตัวขยายแบบ Exponential), A = Architect (มนุษย์ผู้กำกับ Human-in-the-Loop) AI ไม่ควรทำงานโดยปราศจากการกำกับดูแลของมนุษย์"}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Equation Display */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? undefined : { duration: 0.35 }}
            className="rounded-xl border p-5 shadow-sm bg-card border-border"
          >
            <div className="text-center mb-4">
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 text-muted-foreground">
                {language === "en" ? "The Core Equation" : "สมการหลัก"}
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

            {/* Variable Legend */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                {
                  letter: "F",
                  label: "Future",
                  color: "#D4A853",
                  desc: language === "en" ? "The Outcome" : "อนาคต/ผลลัพธ์",
                },
                {
                  letter: "D",
                  label: "Data",
                  color: "#89B4C8",
                  desc: language === "en" ? "Input Quality" : "คุณภาพข้อมูล",
                },
                {
                  letter: "I",
                  label: "Intent",
                  color: "#C4745B",
                  desc: language === "en" ? "Exponential" : "ตัวคูณทวีคูณ",
                },
                {
                  letter: "A",
                  label: "Architect",
                  color: "#7B9E87",
                  desc:
                    language === "en"
                      ? "Human-in-the-Loop"
                      : "มนุษย์ผู้กำกับ",
                },
              ].map((v) => (
                <div
                  key={v.letter}
                  className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50"
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

            <div className="p-4 rounded-xl border bg-secondary/30 border-border">
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
      </div>
    </section>
  )
}
