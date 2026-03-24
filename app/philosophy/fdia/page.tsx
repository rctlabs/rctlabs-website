"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FDIACalculator } from "@/components/fdia-calculator"

const translations = {
  en: {
    breadcrumb: "Philosophy",
    title: "FDIA Formula",
    subtitle: "F = (D^I) × A: The mathematical foundation of intent-driven AI systems",
    formula_desc: "Intent Operating System = (Data raised to Intent power) multiplied by Action",
    d_title: "Data",
    d_desc: "The raw material of understanding. All observable patterns, contexts, and historical information that informs decision-making.",
    d_details: ["Contextual information", "Historical patterns", "Environmental signals", "User interactions"],
    i_title: "Intent",
    i_desc: "The exponential multiplier of understanding. Intent transforms raw data into purposeful knowledge by defining what truly matters.",
    i_details: ["Goal identification", "Value alignment", "Priority setting", "Objective clarity"],
    a_title: "Action",
    a_desc: "The actualization layer. The tangible output that manifests intention in the real world, guided by the Data-Intent relationship.",
    a_details: ["Decision execution", "Output generation", "System response", "Real-world impact"],
    why_title: "Why This Matters",
    why_1_title: "Exponential Amplification",
    why_1_desc: "The exponent in the formula (D^I) represents how intent exponentially amplifies the value of data. Without clear intent, data is just noise. With precise intent, data becomes pure signal.",
    why_2_title: "Scalable Understanding",
    why_2_desc: "This formula scales from individual tasks to complex organizational systems. Whether optimizing a single decision or orchestrating an entire intelligence ecosystem, FDIA provides the mathematical foundation.",
    why_3_title: "Measurable Alignment",
    why_3_desc: "By quantifying the relationship between data, intent, and action, we can measure and optimize for true alignment between AI systems and human values.",
    next_title: "Next Concept",
    next_concept: "RCT-7 Process",
    next_desc: "Discover how to implement FDIA principles through our seven-step methodology for building intent-driven systems.",
    next_cta: "Explore RCT-7"
  },
  th: {
    breadcrumb: "ปรัชญา",
    title: "สูตร FDIA",
    subtitle: "F = (D^I) × A: รากฐานทางคณิตศาสตร์ของระบบ AI ที่ขับเคลื่อนด้วยเจตนา",
    formula_desc: "Intent Operating System = (Data ยกกำลัง Intent) คูณ Action",
    d_title: "ข้อมูล",
    d_desc: "วัตถุดิบของความเข้าใจ รูปแบบที่สังเกตได้ บริบท และข้อมูลประวัติทั้งหมดที่แจ้งการตัดสินใจ",
    d_details: ["ข้อมูลบริบท", "รูปแบบประวัติ", "สัญญาณสิ่งแวดล้อม", "การโต้ตอบผู้ใช้"],
    i_title: "เจตนา",
    i_desc: "ตัวคูณเลขชี้กำลังของความเข้าใจ เจตนาเปลี่ยนข้อมูลดิบให้เป็นความรู้ที่มีจุดประสงค์โดยกำหนดสิ่งที่สำคัญจริงๆ",
    i_details: ["การระบุเป้าหมาย", "การจัดสอดคล้องกับคุณค่า", "การตั้งลำดับความสำคัญ", "ความชัดเจนของวัตถุประสงค์"],
    a_title: "การกระทำ",
    a_desc: "ชั้นการทำให้เป็นจริง ผลลัพธ์ที่จับต้องได้ซึ่งแสดงเจตนาในโลกจริง นำทางด้วยความสัมพันธ์ระหว่างข้อมูลและเจตนา",
    a_details: ["การดำเนินการตัดสินใจ", "การสร้างผลลัพธ์", "การตอบสนองของระบบ", "ผลกระทบในโลกจริง"],
    why_title: "ทำไมจึงสำคัญ",
    why_1_title: "การขยายแบบเลขชี้กำลัง",
    why_1_desc: "เลขชี้กำลังในสูตร (D^I) แสดงว่าเจตนาขยายคุณค่าของข้อมูลแบบเลขชี้กำลัง โดยไม่มีเจตนาที่ชัดเจน ข้อมูลเป็นแค่สัญญาณรบกวน แต่เมื่อมีเจตนาที่แม่นยำ ข้อมูลกลายเป็นสัญญาณที่บริสุทธิ์",
    why_2_title: "ความเข้าใจที่ขยายขนาดได้",
    why_2_desc: "สูตรนี้ขยายจากงานเดี่ยวไปสู่ระบบองค์กรที่ซับซ้อน ไม่ว่าจะเป็นการตัดสินใจเดียวหรือการประสานงานระบบ AI ทั้งหมด FDIA ให้รากฐานทางคณิตศาสตร์",
    why_3_title: "การวัดความสอดคล้อง",
    why_3_desc: "ด้วยการวัดความสัมพันธ์ระหว่างข้อมูล เจตนา และการกระทำ เราสามารถวัดและปรับปรุงความสอดคล้องที่แท้จริงระหว่างระบบ AI และคุณค่าของมนุษย์",
    next_title: "แนวคิดถัดไป",
    next_concept: "กระบวนการ RCT-7",
    next_desc: "ค้นพบวิธีนำหลักการ FDIA ไปใช้ผ่านวิธีการ 7 ขั้นตอนสำหรับการสร้างระบบที่ขับเคลื่อนด้วยเจตนา",
    next_cta: "สำรวจ RCT-7"
  }
}

export default function FDIAPage() {
  const { language } = useLanguage()
  const t = translations[language] || translations.en

  const components = [
    { letter: "D", title: t.d_title, description: t.d_desc, details: t.d_details },
    { letter: "I", title: t.i_title, description: t.i_desc, details: t.i_details },
    { letter: "A", title: t.a_title, description: t.a_desc, details: t.a_details },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <section className="mx-auto max-w-7xl px-4 py-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={`/${language}/philosophy`} className="hover:text-foreground transition flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> {t.breadcrumb}
        </Link>
        <span>/</span>
        <span className="text-foreground font-semibold">{t.title}</span>
      </section>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">{t.title}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              {t.subtitle}
            </p>
          </div>

          {/* Formula Visualization */}
          <div className="bg-card border border-border rounded-lg p-12 my-12">
            <div className="text-center space-y-4">
              <div className="text-6xl md:text-7xl font-bold text-accent font-mono">
                F = (D<sup>I</sup>) × A
              </div>
              <p className="text-muted-foreground text-lg">
                {t.formula_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {components.map((component, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-8 space-y-4 hover:border-accent/50 transition"
            >
              <div className="text-5xl font-bold text-accent mb-4">{component.letter}</div>
              <h3 className="text-2xl font-bold text-foreground">{component.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{component.description}</p>
              <ul className="space-y-2 pt-4">
                {component.details.map((detail, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Formula Visualization */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <FDIACalculator />
      </section>

      {/* Why It Matters */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-lg">
        <div className="space-y-8 max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground">{t.why_title}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t.why_1_title}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.why_1_desc}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t.why_2_title}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.why_2_desc}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t.why_3_title}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.why_3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Concept */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 flex-1">
            <p className="text-sm text-accent font-semibold uppercase tracking-wide">{t.next_title}</p>
            <h2 className="text-3xl font-bold text-foreground">{t.next_concept}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.next_desc}</p>
            <Button asChild className="mt-4">
              <Link href={`/${language}/philosophy/rct-7`} className="gap-2">
                {t.next_cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
