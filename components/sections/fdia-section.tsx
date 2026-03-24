"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, Image as ImageIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import OptimizedImage from "@/components/ui/optimized-image"
import { LazyFDIAFlowchart } from "@/components/diagrams/lazy-diagram-wrapper"
import SectionHeading from "@/components/section-heading"
import { useMounted } from "@/hooks/use-mounted"

const PIXEL_BRAIN =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-brain-icon-YV3hZvbAaJBXWEMr6T2Tnc.webp"

/* Collapsible Infographic Accordion */
function InfographicAccordion({
  isDark,
  language,
}: {
  isDark: boolean
  language: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-6"
    >
      <div className="rounded-xl border bg-card border-border overflow-hidden shadow-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors duration-200"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            <ImageIcon size={18} className="text-warm-amber" />
            <span className="text-sm font-semibold text-foreground">
              {language === "en"
                ? "FDIA Equation Infographic Blueprint"
                : "แผนผัง Infographic สมการ FDIA"}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={18} className="text-muted-foreground" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <OptimizedImage
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/rct-fdia-infographic-FHTXCU98beP8sw6khaiZR4.webp"
                alt="FDIA Equation Infographic — F = D^I × A Blueprint"
                containerClassName="w-full"
                objectFit="contain"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function FDIASection() {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"
  const { language } = useLanguage()

  const [dataVal, setDataVal] = useState(85)
  const [intentVal, setIntentVal] = useState(7)
  const [architectVal, setArchitectVal] = useState(1.5)

  const result = useMemo(
    () => Math.pow(dataVal, intentVal) * architectVal,
    [dataVal, intentVal, architectVal]
  )

  const formatResult = (n: number) => {
    if (n >= 1e15) return n.toExponential(2)
    if (n >= 1e12) return `${(n / 1e12).toFixed(1)}T`
    if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
    return n.toFixed(1)
  }

  const intentImpact = useMemo(() => {
    const low = Math.pow(dataVal, 1) * architectVal
    const high = Math.pow(dataVal, 10) * architectVal
    if (high === 0 || low === 0) return "N/A"
    const ratio = high / low
    if (ratio > 1e12) return "> 1 Trillion x"
    if (ratio > 1e9) return `${(ratio / 1e9).toFixed(0)}B x`
    if (ratio > 1e6) return `${(ratio / 1e6).toFixed(0)}M x`
    return `${ratio.toFixed(0)}x`
  }, [dataVal, architectVal])

  const stages = [
    {
      letter: "F",
      name: language === "en" ? "Future" : "Future (อนาคต)",
      desc:
        language === "en"
          ? "The ultimate outcome — the Future that is created and shaped by the entire FDIA pipeline."
          : "ผลลัพธ์สุดท้าย — Future ที่ถูกสร้างและกำหนดโดย FDIA Pipeline ทั้งหมด",
      color: "#D4A853",
      bg: "#FEF3C7",
      darkBg: "#3A2E15",
    },
    {
      letter: "D",
      name: language === "en" ? "Data" : "Data (ข้อมูล)",
      desc:
        language === "en"
          ? "Raw data ingestion, validation, and quality scoring — the essential inputs."
          : "การรับข้อมูลดิบ ตรวจสอบ และให้คะแนนคุณภาพ — Input ที่จำเป็น",
      color: "#89B4C8",
      bg: "#DBEAFE",
      darkBg: "#152A3A",
    },
    {
      letter: "I",
      name: language === "en" ? "Intent" : "Intent (เจตนา)",
      desc:
        language === "en"
          ? "The exponential amplifier — clarity of purpose that multiplies Data's power."
          : "ตัวขยายแบบ Exponential — ความชัดเจนของเป้าหมายที่ขยายพลัง Data",
      color: "#C4745B",
      bg: "#FEE2E2",
      darkBg: "#3A1E15",
    },
    {
      letter: "A",
      name: language === "en" ? "Architect" : "Architect (สถาปนิก)",
      desc:
        language === "en"
          ? "The Human-in-the-Loop — ensuring ethical, strategic application of AI."
          : "Human-in-the-Loop — ผู้กำกับดูแลการใช้ AI อย่างมีจริยธรรม",
      color: "#7B9E87",
      bg: "#D1FAE5",
      darkBg: "#1E3A25",
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex-1 p-4 rounded-xl border bg-card border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-base group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: isDark ? stage.darkBg : stage.bg,
                      color: stage.color,
                    }}
                  >
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-4 rounded-xl border bg-card border-border hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-base group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: isDark ? stage.darkBg : stage.bg,
                    color: stage.color,
                  }}
                >
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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <LazyFDIAFlowchart />
        </motion.div>

        {/* FDIA Infographic — Collapsible */}
        <InfographicAccordion isDark={isDark} language={language} />

        {/* Key Insight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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

            {/* Key Insight */}
            <div className="p-4 rounded-xl border bg-secondary/30 border-border">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-warm-amber">
                  {language === "en" ? "Key Insight:" : "ข้อมูลสำคัญ:"}
                </span>{" "}
                {language === "en"
                  ? `When Intent increases from 1 to 10, the result changes by `
                  : `เมื่อ Intent เพิ่มจาก 1 เป็น 10 ผลลัพธ์เปลี่ยนไป `}
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

          {/* Interactive Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-xl border p-5 shadow-sm bg-card border-border"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-warm-amber" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {language === "en" ? "FDIA Calculator" : "เครื่องคำนวณ FDIA"}
              </h3>
            </div>

            {/* Live equation display */}
            <div className="p-4 rounded-xl border mb-4 bg-secondary/30 border-border">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-center py-2">
                <span className="text-warm-amber">F</span>
                <span className="mx-2 text-muted-foreground">=</span>
                <span style={{ color: "#89B4C8" }}>{dataVal}</span>
                <sup className="text-xl" style={{ color: "#C4745B" }}>
                  {intentVal}
                </sup>
                <span className="mx-2 text-muted-foreground">&times;</span>
                <span style={{ color: "#7B9E87" }}>
                  {architectVal.toFixed(1)}
                </span>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-muted-foreground">
                  {language === "en" ? "Result:" : "ผลลัพธ์:"}
                </span>{" "}
                <span className="font-mono text-xl font-bold text-warm-amber">
                  {formatResult(result)}
                </span>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-3">
              {/* Data slider */}
              <div className="p-3 rounded-lg border bg-secondary/30 border-border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span
                      className="text-sm font-semibold font-mono"
                      style={{ color: "#89B4C8" }}
                    >
                      D — Data Quality
                    </span>
                    <p className="text-xs sm:text-sm mt-0.5 text-muted-foreground">
                      {language === "en"
                        ? "Quality of input data (0-100)"
                        : "คุณภาพข้อมูล Input (0-100)"}
                    </p>
                  </div>
                  <span
                    className="font-mono text-lg font-bold"
                    style={{ color: "#89B4C8" }}
                  >
                    {dataVal}
                  </span>
                </div>
                <Slider
                  value={[dataVal]}
                  onValueChange={([v]) => setDataVal(v)}
                  min={1}
                  max={100}
                  step={1}
                />
              </div>

              {/* Intent slider */}
              <div className="p-3 rounded-lg border bg-secondary/30 border-border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span
                      className="text-sm font-semibold font-mono"
                      style={{ color: "#C4745B" }}
                    >
                      I — Intent Clarity
                    </span>
                    <p className="text-xs sm:text-sm mt-0.5 text-muted-foreground">
                      {language === "en"
                        ? "Clarity of purpose (1-10)"
                        : "ความชัดเจนของเจตนา (1-10)"}{" "}
                      <span
                        className="font-semibold"
                        style={{ color: "#C4745B" }}
                      >
                        Exponential!
                      </span>
                    </p>
                  </div>
                  <span
                    className="font-mono text-lg font-bold"
                    style={{ color: "#C4745B" }}
                  >
                    {intentVal}
                  </span>
                </div>
                <Slider
                  value={[intentVal]}
                  onValueChange={([v]) => setIntentVal(v)}
                  min={1}
                  max={10}
                  step={1}
                />
              </div>

              {/* Architect slider */}
              <div className="p-3 rounded-lg border bg-secondary/30 border-border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span
                      className="text-sm font-semibold font-mono"
                      style={{ color: "#7B9E87" }}
                    >
                      A — Architect (Human)
                    </span>
                    <p className="text-xs sm:text-sm mt-0.5 text-muted-foreground">
                      {language === "en"
                        ? "Human-in-the-Loop oversight (0.8-2.5)"
                        : "ปัจจัย Human-in-the-Loop (0.8-2.5)"}
                    </p>
                  </div>
                  <span
                    className="font-mono text-lg font-bold"
                    style={{ color: "#7B9E87" }}
                  >
                    {architectVal.toFixed(1)}
                  </span>
                </div>
                <Slider
                  value={[Math.round(architectVal * 10)]}
                  onValueChange={([v]) => setArchitectVal(v / 10)}
                  min={8}
                  max={25}
                  step={1}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
