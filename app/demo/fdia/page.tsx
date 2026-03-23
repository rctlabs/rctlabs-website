"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

/* ─── TYPES ─── */
interface FDIAResult {
  score: number
  grade: string
  recommendation: string
  recommendationTh: string
  breakdown: { label: string; labelTh: string; value: number; color: string }[]
  suggestedPages: { title: string; titleTh: string; path: string }[]
}

/* ─── PRESETS ─── */
const PRESETS = [
  {
    nameEn: "Enterprise Chatbot", nameTh: "แชทบอทองค์กร", icon: "💬",
    future: "Deploy intelligent customer service chatbot with 99% accuracy",
    data: 85, intent: 90, architect: 75,
  },
  {
    nameEn: "Content Generation", nameTh: "สร้างคอนเทนต์", icon: "🎨",
    future: "Generate brand-consistent marketing content across channels",
    data: 70, intent: 95, architect: 80,
  },
  {
    nameEn: "Code Review AI", nameTh: "AI ตรวจสอบโค้ด", icon: "💻",
    future: "Automated code review with security vulnerability detection",
    data: 95, intent: 85, architect: 90,
  },
  {
    nameEn: "Medical Diagnosis", nameTh: "วินิจฉัยทางการแพทย์", icon: "🏥",
    future: "AI-assisted diagnostic support for radiological imaging",
    data: 98, intent: 92, architect: 95,
  },
]

/* ─── FDIA ENGINE ─── */
function calculateFDIA(data: number, intent: number, architect: number): FDIAResult {
  const dNorm = data / 100
  const iNorm = intent / 100
  const aNorm = architect / 100
  const rawScore = Math.pow(dNorm, iNorm) * aNorm
  const score = Math.round(rawScore * 100)

  let grade: string
  let recommendation: string
  let recommendationTh: string
  let suggestedPages: FDIAResult["suggestedPages"] = []

  if (score >= 85) {
    grade = "A+"
    recommendation = "Excellent! Your AI system is production-ready. The FDIA equation shows strong alignment across all dimensions. Consider SignedAI for cryptographic verification."
    recommendationTh = "ยอดเยี่ยม! ระบบ AI ของคุณพร้อมใช้งานจริง สมการ FDIA แสดงความสอดคล้องสูงในทุกมิติ แนะนำ SignedAI สำหรับการยืนยันด้วย cryptography"
    suggestedPages = [
      { title: "SignedAI", titleTh: "SignedAI", path: "/products/signed-ai" },
      { title: "Benchmark", titleTh: "Benchmark", path: "/benchmark" },
      { title: "JITNA Protocol", titleTh: "JITNA Protocol", path: "/protocols/jitna-rfc-001" },
    ]
  } else if (score >= 70) {
    grade = "A"
    recommendation = "Strong foundation. Your Data and Intent alignment is good. Focus on strengthening the Architect (human oversight) layer for production deployment."
    recommendationTh = "พื้นฐานแข็งแกร่ง Data และ Intent สอดคล้องกันดี ควรเสริมชั้น Architect (การกำกับดูแลโดยมนุษย์) สำหรับการใช้งานจริง"
    suggestedPages = [
      { title: "RCT-7 Mental Model", titleTh: "RCT-7 Mental Model", path: "/protocols/rct-7-mental-model" },
      { title: "AI Hallucination Prevention", titleTh: "ป้องกัน AI Hallucination", path: "/solutions/ai-hallucination-prevention" },
      { title: "RCTLabs", titleTh: "RCTLabs", path: "/products/rctlabs" },
    ]
  } else if (score >= 50) {
    grade = "B"
    recommendation = "Moderate readiness. The equation reveals gaps in your data quality or intent clarity. RCTLabs can help optimize your multi-LLM orchestration."
    recommendationTh = "ความพร้อมปานกลาง สมการเผยให้เห็นช่องว่างในคุณภาพข้อมูลหรือความชัดเจนของ intent RCTLabs สามารถช่วยปรับปรุง multi-LLM orchestration"
    suggestedPages = [
      { title: "RCTLabs", titleTh: "RCTLabs", path: "/products/rctlabs" },
      { title: "Enterprise AI Memory", titleTh: "AI Memory องค์กร", path: "/solutions/enterprise-ai-memory" },
      { title: "Dynamic AI Routing", titleTh: "Dynamic AI Routing", path: "/solutions/dynamic-ai-routing" },
    ]
  } else {
    grade = "C"
    recommendation = "Early stage. Significant improvements needed in data infrastructure and intent definition. Start with our architecture guide and FDIA equation deep-dive."
    recommendationTh = "ระยะเริ่มต้น ต้องปรับปรุงโครงสร้างข้อมูลและการกำหนด intent อย่างมาก เริ่มต้นด้วย architecture guide และ FDIA equation เชิงลึก"
    suggestedPages = [
      { title: "FDIA Equation", titleTh: "สมการ FDIA", path: "/protocols/fdia-equation" },
      { title: "Use Cases", titleTh: "กรณีศึกษา", path: "/use-cases" },
    ]
  }

  const breakdown = [
    { label: "Data Quality (D)", labelTh: "คุณภาพข้อมูล (D)", value: data, color: "#2DD4BF" },
    { label: "Intent Clarity (I)", labelTh: "ความชัดเจนของ Intent (I)", value: intent, color: "#D4A853" },
    { label: "Architect Oversight (A)", labelTh: "การกำกับดูแล Architect (A)", value: architect, color: "#C4745B" },
    { label: "Future Score (F)", labelTh: "คะแนน Future (F)", value: score, color: "#7B9E87" },
  ]

  return { score, grade, recommendation, recommendationTh, breakdown, suggestedPages }
}

/* ─── ANIMATED SCORE ─── */
function AnimatedScore({ value, grade, isDark }: { value: number; grade: string; isDark: boolean }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<number>(0)

  useEffect(() => {
    const start = ref.current
    const diff = value - start
    const duration = 700
    const startTime = performance.now()
    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + diff * eased))
      if (progress < 1) requestAnimationFrame(animate)
      else ref.current = value
    }
    requestAnimationFrame(animate)
  }, [value])

  const gradeColor = grade === "A+" ? "#7B9E87" : grade === "A" ? "#2DD4BF" : grade === "B" ? "#D4A853" : "#C4745B"

  return (
    <div className="flex items-end gap-3">
      <span className="text-6xl sm:text-7xl font-bold tabular-nums" style={{ color: isDark ? "#fff" : "#1a1a1a" }}>{display}</span>
      <div className="flex flex-col mb-2">
        <span className="text-sm text-muted-foreground font-mono">/100</span>
        <span className="text-2xl font-bold" style={{ color: gradeColor }}>{grade}</span>
      </div>
    </div>
  )
}

/* ─── SLIDER ─── */
function FDIASlider({
  label, labelTh, icon, value, onChange, color, description, descriptionTh, isEn, isDark,
}: {
  label: string; labelTh: string; icon: string; value: number; onChange: (v: number) => void
  color: string; description: string; descriptionTh: string; isEn: boolean; isDark: boolean
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-semibold text-sm">{isEn ? label : labelTh}</span>
        </div>
        <span className="font-mono text-sm font-bold" style={{ color }}>{value}%</span>
      </div>
      <input
        type="range" min={0} max={100} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{ background: `linear-gradient(to right, ${color} ${value}%, ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} ${value}%)` }}
      />
      <p className="text-xs text-muted-foreground">{isEn ? description : descriptionTh}</p>
    </div>
  )
}

/* ─── PAGE ─── */
export default function FDIADemoPage() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const locale = getLocaleFromPathname(pathname) ?? "en"
  const isEn = locale === "en"

  const [future, setFuture] = useState("Deploy intelligent AI system with high accuracy")
  const [data, setData] = useState(75)
  const [intent, setIntent] = useState(80)
  const [architect, setArchitect] = useState(70)
  const [result, setResult] = useState<FDIAResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [activePreset, setActivePreset] = useState<number | null>(null)

  useEffect(() => {
    setIsCalculating(true)
    const timer = setTimeout(() => {
      setResult(calculateFDIA(data, intent, architect))
      setIsCalculating(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [data, intent, architect])

  function loadPreset(idx: number) {
    const p = PRESETS[idx]
    setFuture(p.future)
    setData(p.data)
    setIntent(p.intent)
    setArchitect(p.architect)
    setActivePreset(idx)
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": isEn ? "FDIA Demo" : "เดโม FDIA",
    "description": isEn
      ? "Interactive FDIA equation demo: Calculate and visualize AI hallucination risk in real time."
      : "เดโมสมการ FDIA แบบอินเทอร์แอคทีฟ: คำนวณและดูความเสี่ยง AI Hallucination แบบเรียลไทม์",
    "url": "https://rctlabs.ai/demo/fdia",
    "applicationCategory": "CalculatorApplication",
    "operatingSystem": "Cross-platform",
    "publisher": { "@type": "Organization", "name": "RCT Labs", "url": "https://rctlabs.ai" }
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ borderColor: "#D4A853", color: "#D4A853", background: "rgba(212,168,83,0.08)" }}
            >
              {isEn ? "Interactive Playground" : "ทดลองแบบอินเทอร์แอคทีฟ"}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              {isEn ? "FDIA Equation " : "ทดลอง "}
              <span style={{ color: "#D4A853" }}>{isEn ? "Demo" : "สมการ FDIA"}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              {isEn
                ? "Adjust parameters and see real-time results. Explore how Data, Intent, and Architect oversight combine to predict AI system readiness."
                : "ปรับพารามิเตอร์และดูผลลัพธ์แบบ real-time สำรวจว่า Data, Intent และ Architect oversight รวมกันอย่างไร"}
            </motion.p>

            {/* Equation Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 sm:gap-4 px-6 py-4 rounded-2xl border"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)", background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}
            >
              <span className="text-3xl sm:text-4xl font-bold" style={{ color: "#7B9E87" }}>F</span>
              <span className="text-xl text-muted-foreground">=</span>
              <span className="text-xl text-muted-foreground">(</span>
              <span className="text-3xl sm:text-4xl font-bold" style={{ color: "#2DD4BF" }}>D</span>
              <sup className="text-lg font-bold -mt-4" style={{ color: "#D4A853" }}>I</sup>
              <span className="text-xl text-muted-foreground">)</span>
              <span className="text-xl text-muted-foreground">×</span>
              <span className="text-3xl sm:text-4xl font-bold" style={{ color: "#C4745B" }}>A</span>
            </motion.div>
            <p className="mt-3 text-xs text-muted-foreground font-mono">
              Future = (Data<sup>Intent</sup>) × Architect
            </p>
          </div>
        </section>

        {/* Main Demo */}
        <section className="px-4 pb-20">
          <div className="max-w-5xl mx-auto">

            {/* Preset Scenarios */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {isEn ? "Quick Presets" : "สถานการณ์ตัวอย่าง"}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESETS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => loadPreset(i)}
                    className="p-3 rounded-xl border text-left transition-all duration-200"
                    style={{
                      borderColor: activePreset === i ? "#D4A853" : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"),
                      background: activePreset === i ? "rgba(212,168,83,0.1)" : (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"),
                    }}
                  >
                    <span className="text-2xl block mb-1">{p.icon}</span>
                    <span className="text-xs font-semibold block">{isEn ? p.nameEn : p.nameTh}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Input Panel */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Future Goal */}
                <div
                  className="p-6 rounded-2xl border"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🔮</span>
                    <h3 className="font-semibold text-sm">
                      {isEn ? "F — Future (Goal Definition)" : "F — Future (เป้าหมาย)"}
                    </h3>
                  </div>
                  <textarea
                    value={future}
                    onChange={e => setFuture(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 border"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                      borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
                    }}
                    placeholder={isEn ? "Describe your AI system's goal..." : "อธิบายเป้าหมายของระบบ AI..."}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {isEn ? "The desired outcome that drives all AI decisions" : "ผลลัพธ์ที่ต้องการซึ่งขับเคลื่อนการตัดสินใจ AI ทั้งหมด"}
                  </p>
                </div>

                {/* D, I, A Sliders */}
                <div
                  className="p-6 rounded-2xl border space-y-6"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                >
                  <FDIASlider
                    label="D — Data Quality" labelTh="D — คุณภาพข้อมูล"
                    icon="📊" value={data} onChange={setData} color="#2DD4BF"
                    description="Quality, completeness, and relevance of training data and context"
                    descriptionTh="คุณภาพ ความสมบูรณ์ และความเกี่ยวข้องของข้อมูลฝึกสอนและบริบท"
                    isEn={isEn} isDark={isDark}
                  />
                  <div className="border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />
                  <FDIASlider
                    label="I — Intent Clarity" labelTh="I — ความชัดเจนของ Intent"
                    icon="🎯" value={intent} onChange={setIntent} color="#D4A853"
                    description="How well-defined the user's intent is — acts as the exponent amplifier"
                    descriptionTh="Intent ที่ชัดเจนทำหน้าที่เป็นตัวยกกำลัง ยิ่งชัดเจนยิ่งขยายผลลัพธ์"
                    isEn={isEn} isDark={isDark}
                  />
                  <div className="border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />
                  <FDIASlider
                    label="A — Architect (Human-in-the-Loop)" labelTh="A — Architect (มนุษย์ในวงจร)"
                    icon="👨‍💻" value={architect} onChange={setArchitect} color="#C4745B"
                    description="Level of human oversight, governance, and architectural decisions"
                    descriptionTh="ระดับการกำกับดูแลโดยมนุษย์ ธรรมาภิบาล และการตัดสินใจเชิงสถาปัตยกรรม"
                    isEn={isEn} isDark={isDark}
                  />
                </div>
              </motion.div>

              {/* Right: Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-5"
              >
                {/* Score Panel */}
                <div
                  className="p-8 rounded-2xl"
                  style={{ background: isDark ? "rgba(10,22,40,0.9)" : "rgba(15,25,45,0.95)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                    {isEn ? "Future Score" : "คะแนน Future"}
                  </h3>
                  <AnimatePresence mode="wait">
                    {result && !isCalculating ? (
                      <motion.div key={result.score} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                        <AnimatedScore value={result.score} grade={result.grade} isDark={true} />
                      </motion.div>
                    ) : (
                      <div className="h-20 flex items-center">
                        <div className="w-6 h-6 border-2 border-warm-amber border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </AnimatePresence>

                  {result && (
                    <div className="mt-6 space-y-3">
                      {result.breakdown.map((b, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-white/50">{isEn ? b.label : b.labelTh}</span>
                            <span className="font-mono" style={{ color: b.color }}>{b.value}%</span>
                          </div>
                          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: b.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${b.value}%` }}
                              transition={{ duration: 0.6, delay: i * 0.08 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recommendation */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="p-5 rounded-2xl border"
                    style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                  >
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <span>💡</span>
                      {isEn ? "AI Recommendation" : "คำแนะนำจาก AI"}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {isEn ? result.recommendation : result.recommendationTh}
                    </p>
                  </motion.div>
                )}

                {/* Suggested Pages */}
                {result && result.suggestedPages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="p-5 rounded-2xl border"
                    style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                  >
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <span>🔗</span>
                      {isEn ? "Explore Further" : "สำรวจเพิ่มเติม"}
                    </h3>
                    <div className="space-y-2">
                      {result.suggestedPages.map((page, i) => (
                        <Link
                          key={i} href={page.path}
                          className="flex items-center gap-3 p-3 rounded-xl transition-colors group"
                          style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}
                        >
                          <span className="text-sm font-medium flex-1 group-hover:text-warm-amber transition-colors">
                            {isEn ? page.title : page.titleTh}
                          </span>
                          <ArrowRight size={14} className="text-muted-foreground group-hover:text-warm-amber transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Equation Explanation */}
        <section className="px-4 py-16" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold text-center mb-12"
            >
              {isEn ? "How the FDIA Equation Works" : "สมการ FDIA ทำงานอย่างไร"}
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  letter: "F", color: "#7B9E87", icon: "🔮",
                  titleEn: "Future", titleTh: "Future (อนาคต)",
                  descEn: "The desired outcome — your AI system's goal. This is the result of the equation, not an input.",
                  descTh: "ผลลัพธ์ที่ต้องการ คือเป้าหมายของระบบ AI เป็นผลลัพธ์ของสมการ ไม่ใช่ input",
                },
                {
                  letter: "D", color: "#2DD4BF", icon: "📊",
                  titleEn: "Data", titleTh: "Data (ข้อมูล)",
                  descEn: "The foundation — quality, completeness, and relevance of all data feeding your AI system.",
                  descTh: "รากฐาน คือคุณภาพ ความสมบูรณ์ และความเกี่ยวข้องของข้อมูลทั้งหมดที่ป้อนเข้าระบบ AI",
                },
                {
                  letter: "I", color: "#D4A853", icon: "🎯",
                  titleEn: "Intent", titleTh: "Intent (เจตนา)",
                  descEn: "The exponent — intent amplifies data exponentially. Clear intent makes good data great; vague intent wastes perfect data.",
                  descTh: "ตัวยกกำลัง Intent ขยายข้อมูลแบบทวีคูณ Intent ที่ชัดเจนทำให้ข้อมูลดีกลายเป็นยอดเยี่ยม",
                },
                {
                  letter: "A", color: "#C4745B", icon: "👨‍💻",
                  titleEn: "Architect", titleTh: "Architect (สถาปนิก)",
                  descEn: "The multiplier — human-in-the-loop oversight. Without human governance, even perfect AI output is unverified.",
                  descTh: "ตัวคูณ คือการกำกับดูแลโดยมนุษย์ หากไม่มี ผลลัพธ์ AI แม้สมบูรณ์แบบก็ไม่ได้รับการยืนยัน",
                },
              ].map(item => (
                <motion.div
                  key={item.letter}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-2xl border"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}40` }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-3xl font-bold block" style={{ color: item.color }}>{item.letter}</span>
                  <span className="text-sm font-semibold block mt-1 mb-2">{isEn ? item.titleEn : item.titleTh}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{isEn ? item.descEn : item.descTh}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 text-center"
            >
              <Link
                href="/protocols/fdia-equation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all"
                style={{ borderColor: "rgba(212,168,83,0.4)", color: "#D4A853" }}
              >
                {isEn ? "Read Full FDIA Equation Docs" : "อ่านเอกสาร FDIA Equation เต็มรูปแบบ"}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
