"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, m } from "framer-motion"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  GitCompareArrows,
  Layers,
  Search,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react"

const exampleQueries = {
  en: [
    "How does FDIA equation improve AI accuracy?",
    "Compare RCT architecture with LangChain",
    "What is the JITNA Protocol?",
    "Analyze the cost efficiency of RCT vs OpenAI",
    "Design a knowledge management system",
    "How to reduce AI hallucination rate?",
  ],
  th: [
    "สมการ FDIA ช่วยปรับปรุงความแม่นยำของ AI อย่างไร?",
    "เปรียบเทียบ RCT Architecture กับ LangChain",
    "JITNA Protocol คืออะไร?",
    "วิเคราะห์ต้นทุนของ RCT เทียบกับ OpenAI",
    "ออกแบบระบบจัดการความรู้",
    "ลด Hallucination Rate ของ AI ได้อย่างไร?",
  ],
} as const

const modes = {
  en: [
    {
      id: "quick",
      name: "Quick Mode",
      icon: Zap,
      color: "#D4A853",
      bg: "#FEF3C7",
      speed: "< 200ms",
      depth: "Surface",
      steps: ["Parse Intent", "Pattern Match", "Cache Lookup", "Direct Answer"],
    },
    {
      id: "standard",
      name: "Standard Mode",
      icon: Search,
      color: "#7B9E87",
      bg: "#D1FAE5",
      speed: "2-5s",
      depth: "Moderate",
      steps: ["Parse Intent", "Multi-Source Search", "Evidence Grading", "Structured Output"],
    },
    {
      id: "deep",
      name: "Deep Mode",
      icon: Layers,
      color: "#89B4C8",
      bg: "#DBEAFE",
      speed: "10-30s",
      depth: "Comprehensive",
      steps: ["Parse Intent", "Cross-Domain Analysis", "Hypothesis Generation", "Synthesis Canvas"],
    },
    {
      id: "mirror",
      name: "Mirror Mode",
      icon: GitCompareArrows,
      color: "#B8A9C9",
      bg: "#EDE9FE",
      speed: "15-45s",
      depth: "Reflective",
      steps: ["Parse Intent", "JITNA Packet Build", "Socratic Challenge", "Consensus Merge"],
    },
  ],
  th: [
    {
      id: "quick",
      name: "Quick Mode",
      icon: Zap,
      color: "#D4A853",
      bg: "#FEF3C7",
      speed: "< 200ms",
      depth: "ผิวเผิน",
      steps: ["Parse Intent", "Pattern Match", "Cache Lookup", "Direct Answer"],
    },
    {
      id: "standard",
      name: "Standard Mode",
      icon: Search,
      color: "#7B9E87",
      bg: "#D1FAE5",
      speed: "2-5 วินาที",
      depth: "ปานกลาง",
      steps: ["Parse Intent", "Multi-Source Search", "Evidence Grading", "Structured Output"],
    },
    {
      id: "deep",
      name: "Deep Mode",
      icon: Layers,
      color: "#89B4C8",
      bg: "#DBEAFE",
      speed: "10-30 วินาที",
      depth: "ครอบคลุม",
      steps: ["Parse Intent", "Cross-Domain Analysis", "Hypothesis Generation", "Synthesis Canvas"],
    },
    {
      id: "mirror",
      name: "Mirror Mode",
      icon: GitCompareArrows,
      color: "#B8A9C9",
      bg: "#EDE9FE",
      speed: "15-45 วินาที",
      depth: "สะท้อนความคิด",
      steps: ["Parse Intent", "JITNA Packet Build", "Socratic Challenge", "Consensus Merge"],
    },
  ],
} as const

function getSimulatedResult(query: string, modeId: string, language: "en" | "th") {
  const results = {
    en: {
      quick: {
        answer: `Quick analysis: "${query}" — the system identifies key patterns and returns a direct response with an intent entropy score of 0.82.`,
        confidence: 87,
        sources: 2,
        tokens: 340,
      },
      standard: {
        answer: `Standard research on "${query}" — multi-source analysis completed across 8 knowledge domains with evidence grading and structured synthesis.`,
        confidence: 93,
        sources: 8,
        tokens: 1250,
      },
      deep: {
        answer: `Deep synthesis of "${query}" — cross-disciplinary analysis connected 4 domains, generated a synthesis canvas, and surfaced novel hypotheses.`,
        confidence: 96,
        sources: 15,
        tokens: 3800,
      },
      mirror: {
        answer: `Mirror reflection on "${query}" — JITNA negotiation ran 3 rounds, challenged assumptions, and converged on a verified consensus output.`,
        confidence: 98,
        sources: 12,
        tokens: 5200,
      },
    },
    th: {
      quick: {
        answer: `Quick Analysis: "${query}" — ระบบระบุ pattern หลักและตอบกลับอย่างกระชับพร้อม intent entropy score 0.82`,
        confidence: 87,
        sources: 2,
        tokens: 340,
      },
      standard: {
        answer: `Standard Research: "${query}" — วิเคราะห์จาก 8 knowledge domains พร้อม evidence grading และการสรุปผลแบบมีโครงสร้าง`,
        confidence: 93,
        sources: 8,
        tokens: 1250,
      },
      deep: {
        answer: `Deep Synthesis: "${query}" — วิเคราะห์เชิงลึกข้ามโดเมน สร้าง synthesis canvas และเสนอสมมติฐานใหม่พร้อมเหตุผลรองรับ`,
        confidence: 96,
        sources: 15,
        tokens: 3800,
      },
      mirror: {
        answer: `Mirror Reflection: "${query}" — รันการเจรจาแบบ JITNA หลายรอบ ตรวจ blind spots และรวมผลเป็น consensus ที่ตรวจสอบได้`,
        confidence: 98,
        sources: 12,
        tokens: 5200,
      },
    },
  } as const

  return results[language][modeId as keyof (typeof results)[typeof language]]
}

export default function AnalysearchDemo({ language = "en" }: { language?: "en" | "th" }) {
  const [query, setQuery] = useState("")
  const [selectedMode, setSelectedMode] = useState("quick")
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [showResult, setShowResult] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const currentModes = useMemo(() => modes[language], [language])
  const activeMode = currentModes.find((mode) => mode.id === selectedMode) ?? currentModes[0]

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const runDemo = useCallback(() => {
    if (!query.trim()) return
    setIsProcessing(true)
    setCurrentStep(-1)
    setShowResult(false)

    const stepCount = activeMode.steps.length
    const baseDelay = selectedMode === "quick" ? 280 : selectedMode === "standard" ? 420 : selectedMode === "deep" ? 560 : 520

    for (let index = 0; index < stepCount; index += 1) {
      setTimeout(() => setCurrentStep(index), baseDelay * (index + 1))
    }

    setTimeout(() => {
      setIsProcessing(false)
      setShowResult(true)
    }, baseDelay * (stepCount + 1))
  }, [activeMode.steps.length, query, selectedMode])

  const result = showResult ? getSimulatedResult(query, selectedMode, language) : null

  return (
    <div className="space-y-5">
      <div className="relative">
        <div className="flex items-center gap-3 rounded-2xl border-2 border-warm-light-gray bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-colors focus-within:border-warm-amber/60 dark:border-white/10 dark:bg-white/5">
          <Search size={20} className="shrink-0 text-warm-amber" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setShowResult(false)
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setShowSuggestions(false)
                runDemo()
              }
            }}
            placeholder={language === "en" ? "Type your intent or question..." : "พิมพ์ intent หรือคำถามของคุณ..."}
            className="flex-1 bg-transparent text-sm text-warm-charcoal outline-none placeholder:text-warm-warm-light dark:text-white dark:placeholder:text-white/30"
          />
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 border-r border-warm-light-gray pr-3 sm:flex dark:border-white/10">
              {currentModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  className="h-2.5 w-2.5 rounded-full transition-transform"
                  style={{ backgroundColor: mode.color, transform: selectedMode === mode.id ? "scale(1.4)" : "scale(1)" }}
                  onClick={() => {
                    setSelectedMode(mode.id)
                    setShowResult(false)
                  }}
                  aria-label={mode.name}
                  title={mode.name}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setShowSuggestions(false)
                runDemo()
              }}
              disabled={!query.trim() || isProcessing}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all disabled:opacity-40"
              style={{ backgroundColor: activeMode.color }}
            >
              {isProcessing ? (language === "en" ? "Processing..." : "กำลังประมวลผล...") : language === "en" ? "Analyze" : "วิเคราะห์"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showSuggestions && !isProcessing && (
            <m.div
              ref={suggestionsRef}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-warm-light-gray bg-white shadow-lg dark:border-white/10 dark:bg-warm-charcoal"
            >
              <div className="border-b border-warm-light-gray/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-warm-muted dark:border-white/10 dark:text-white/40">
                {language === "en" ? "Try these examples" : "ลองตัวอย่างเหล่านี้"}
              </div>
              {exampleQueries[language].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setQuery(suggestion)
                    setShowSuggestions(false)
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-warm-secondary transition-colors hover:bg-warm-cream dark:text-white/70 dark:hover:bg-white/5"
                >
                  <Search size={12} className="shrink-0 text-warm-warm-light" />
                  {suggestion}
                </button>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {currentModes.map((mode) => {
          const ModeIcon = mode.icon
          const isActive = selectedMode === mode.id

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => {
                setSelectedMode(mode.id)
                setShowResult(false)
                setCurrentStep(-1)
              }}
              className={`relative rounded-xl border p-3 text-left transition-all duration-300 ${
                isActive
                  ? "-translate-y-0.5 border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                  : "border-warm-light-gray bg-white hover:border-warm-warm-light dark:border-white/10 dark:bg-white/5"
              }`}
              style={isActive ? { backgroundColor: mode.bg } : undefined}
            >
              <div className="mb-1.5 flex items-center gap-2">
                <ModeIcon size={16} style={{ color: mode.color }} />
                <span className="text-xs font-bold" style={{ color: isActive ? mode.color : "#1A1A1A" }}>
                  {mode.name}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-warm-gray dark:text-white/50">
                <span className="flex items-center gap-1"><Clock size={10} /> {mode.speed}</span>
                <span>{mode.depth}</span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="rounded-2xl border border-warm-light-gray bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-dark-950">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Sparkles size={14} style={{ color: activeMode.color }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: activeMode.color }}>
                {language === "en" ? "Execution Trace" : "ลำดับการประมวลผล"}
              </span>
            </div>
            <h4 className="text-base font-bold text-warm-charcoal dark:text-warm-light-gray">{activeMode.name}</h4>
          </div>
          <div className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${activeMode.color}15`, color: activeMode.color }}>
            {language === "en" ? "Intent-Centric Runtime" : "Intent-Centric Runtime"}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {activeMode.steps.map((step, index) => {
            const stepActive = currentStep >= index
            return (
              <div key={step} className="relative rounded-xl border border-warm-light-gray/70 bg-warm-cream/60 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-lg px-2 py-1 text-[10px] font-bold" style={{ backgroundColor: `${activeMode.color}15`, color: activeMode.color }}>
                    {index + 1}
                  </span>
                  {stepActive ? <CheckCircle2 size={14} style={{ color: activeMode.color }} /> : <div className="h-3.5 w-3.5 rounded-full border border-warm-light-gray dark:border-white/20" />}
                </div>
                <div className="text-sm font-semibold text-warm-charcoal dark:text-warm-light-gray">{step}</div>
                {index < activeMode.steps.length - 1 && (
                  <ArrowRight size={14} className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-warm-muted md:block" />
                )}
              </div>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <m.div
              key={`${selectedMode}-${query}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-5 rounded-2xl border border-warm-light-gray/80 bg-white p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {[{ label: language === "en" ? "Confidence" : "ความมั่นใจ", value: `${result.confidence}%`, icon: Shield }, { label: language === "en" ? "Sources" : "แหล่งข้อมูล", value: `${result.sources}`, icon: Search }, { label: language === "en" ? "Tokens" : "โทเคน", value: `${result.tokens}`, icon: Layers }].map((metric) => {
                  const MetricIcon = metric.icon
                  return (
                    <span key={metric.label} className="inline-flex items-center gap-1.5 rounded-full bg-warm-cream px-3 py-1 text-xs text-warm-secondary dark:bg-dark-900 dark:text-warm-muted">
                      <MetricIcon size={12} />
                      {metric.label}: <strong className="text-warm-charcoal dark:text-warm-light-gray">{metric.value}</strong>
                    </span>
                  )
                })}
              </div>
              <p className="text-sm leading-relaxed text-warm-secondary dark:text-warm-dim">{result.answer}</p>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}