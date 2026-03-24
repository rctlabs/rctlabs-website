"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RCT7FlowDiagram } from "@/components/rct7-flow-diagram"

const translations = {
  en: {
    breadcrumb: "Philosophy",
    title: "RCT-7 Process",
    subtitle: "Seven-step methodology for implementing intent-driven systems",
    steps: [
      { title: "Intent Extraction", desc: "Identify and clarify the core intent behind a problem or task", details: "Extract the fundamental goal, values, and constraints that drive decision-making. What truly matters in this context?" },
      { title: "Data Analysis", desc: "Gather and understand all relevant contextual information", details: "Collect historical data, patterns, and environmental signals. Create a comprehensive picture of the situation." },
      { title: "Intent Mapping", desc: "Align data patterns with intentional outcomes", details: "Create explicit connections between available data and desired intent. Define the relationship matrix." },
      { title: "Solution Architecture", desc: "Design the system to compute F = (D^I) × A", details: "Build the computational model that transforms data through intent to generate aligned actions." },
      { title: "Implementation", desc: "Deploy the intent-driven system into production", details: "Integrate with existing systems, configure parameters, and establish feedback mechanisms." },
      { title: "Validation", desc: "Verify that outputs align with original intent", details: "Run comprehensive tests to ensure actions generated are truly aligned with stated intentions." },
      { title: "Continuous Refinement", desc: "Monitor, learn, and improve the system over time", details: "Gather feedback, adjust parameters, and evolve the system to better understand and serve intent." }
    ],
    getting_started: "Getting Started",
    individuals: "For Individuals",
    individuals_points: ["Clarify your personal or professional intent", "Map your current data resources", "Design your decision-making process", "Implement and iterate"],
    organizations: "For Organizations",
    organizations_points: ["Align stakeholders on organizational intent", "Audit existing data and systems", "Design intent-driven architecture", "Deploy organization-wide"],
    next_title: "Next Concept",
    next_concept: "JITNA Language",
    next_desc: "Learn how to specify intent precisely using our Just-In-Time Natural Action language.",
    next_cta: "Explore JITNA"
  },
  th: {
    breadcrumb: "ปรัชญา",
    title: "กระบวนการ RCT-7",
    subtitle: "วิธีการ 7 ขั้นตอนสำหรับการสร้างระบบที่ขับเคลื่อนด้วยเจตนา",
    steps: [
      { title: "การสกัดเจตนา", desc: "ระบุและชี้แจ้งเจตนาหลักเบื้องหลังปัญหาหรือภารกิจ", details: "สกัดเป้าหมายหลัก คุณค่า และข้อจำกัดที่ขับเคลื่อนการตัดสินใจ อะไรคือสิ่งที่สำคัญจริงๆ ในบริบทนี้?" },
      { title: "การวิเคราะห์ข้อมูล", desc: "รวบรวมและเข้าใจข้อมูลบริบททั้งหมดที่เกี่ยวข้อง", details: "รวบรวมข้อมูลประวัติ รูปแบบ และสัญญาณสิ่งแวดล้อม สร้างภาพรวมที่ครอบคลุมของสถานการณ์" },
      { title: "การทำแผนที่เจตนา", desc: "จัดรูปแบบข้อมูลให้สอดคล้องกับผลลัพธ์ที่ต้องการ", details: "สร้างความเชื่อมโยงที่ชัดเจนระหว่างข้อมูลที่มีอยู่กับเจตนาที่ต้องการ กำหนดเมทริกซ์ความสัมพันธ์" },
      { title: "สถาปัตยกรรมโซลูชัน", desc: "ออกแบบระบบเพื่อคำนวณ F = (D^I) × A", details: "สร้างแบบจำลองการคำนวณที่เปลี่ยนข้อมูลผ่านเจตนาเพื่อสร้างการกระทำที่สอดคล้อง" },
      { title: "การนำไปใช้", desc: "Deploy ระบบที่ขับเคลื่อนด้วยเจตนาเข้าสู่การผลิต", details: "บูรณาการกับระบบที่มีอยู่ กำหนดค่าพารามิเตอร์ และสร้างกลไกตอบกลับ" },
      { title: "การตรวจสอบ", desc: "ยืนยันว่าผลลัพธ์สอดคล้องกับเจตนาเดิม", details: "รันการทดสอบที่ครอบคลุมเพื่อให้แน่ใจว่าการกระทำที่สร้างขึ้นสอดคล้องกับเจตนาที่ระบุจริงๆ" },
      { title: "การปรับปรุงต่อเนื่อง", desc: "ติดตาม เรียนรู้ และปรับปรุงระบบตลอดเวลา", details: "รวบรวมข้อมูลป้อนกลับ ปรับพารามิเตอร์ และพัฒนาระบบให้เข้าใจและ Serv เจตนาได้ดีขึ้น" }
    ],
    getting_started: "เริ่มต้นใช้งาน",
    individuals: "สำหรับบุคคล",
    individuals_points: ["ชี้แจ้งเจตนาส่วนตัวหรือมืออาชีพของคุณ", "ทำแผนที่ทรัพยากรข้อมูลปัจจุบัน", "ออกแบบกระบวนการตัดสินใจของคุณ", "นำไปใช้และปรับปรุง"],
    organizations: "สำหรับองค์กร",
    organizations_points: ["จัดสอดคล้องผู้มีส่วนได้ส่วนเสียกับเจตนาขององค์กร", "ตรวจสอบข้อมูลและระบบที่มีอยู่", "ออกแบบสถาปัตยกรรมที่ขับเคลื่อนด้วยเจตนา", "Deploy ทั่วทั้งองค์กร"],
    next_title: "แนวคิดถัดไป",
    next_concept: "ภาษา JITNA",
    next_desc: "เรียนรู้วิธีระบุเจตนาอย่างแม่นยำด้วยภาษา Just-In-Time Natural Action ของเรา",
    next_cta: "สำรวจ JITNA"
  }
}

export default function RCT7Page() {
  const { language } = useLanguage()
  const t = translations[language] || translations.en

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
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">{t.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <RCT7FlowDiagram />
      </section>

      {/* Steps Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-6">
          {t.steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition">
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10 text-accent font-bold text-2xl">{i + 1}</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-accent font-semibold">{step.desc}</p>
                    <p className="text-muted-foreground leading-relaxed">{step.details}</p>
                  </div>
                </div>
              </div>
              {i < t.steps.length - 1 && (
                <div className="flex justify-center py-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-accent to-transparent rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-lg">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-foreground">{t.getting_started}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t.individuals}</h3>
              <ul className="space-y-3">
                {t.individuals_points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t.organizations}</h3>
              <ul className="space-y-3">
                {t.organizations_points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
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
              <Link href={`/${language}/philosophy/jitna`} className="gap-2">
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
