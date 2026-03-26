import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Enterprise AI Platform Evaluation Checklist — Buyer Questions Before Procurement",
    "Enterprise AI Platform Evaluation Checklist — คำถามที่ buyer ควรถามก่อน procurement",
    "A procurement-oriented evaluation checklist for enterprise AI platforms covering governance, memory, routing, evidence, benchmarks, disclosure boundaries, and operational maturity.",
    "เช็กลิสต์สำหรับการประเมิน enterprise AI platform ก่อน procurement ครอบคลุม governance, memory, routing, evidence, benchmarks, disclosure boundaries และความพร้อมเชิงปฏิบัติการ",
    "/evaluation/enterprise-ai-platform-evaluation-checklist",
    ["enterprise ai platform evaluation checklist", "ai procurement checklist", "enterprise ai buyer checklist"]
  )
}

export default async function EnterpriseAiChecklistPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Evaluation", url: `https://rctlabs.co${localePrefix}/evaluation` },
    { name: "Enterprise AI Platform Evaluation Checklist", url: `https://rctlabs.co${localePrefix}/evaluation/enterprise-ai-platform-evaluation-checklist` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: isTh ? "หน้า checklist นี้ควรใช้เมื่อไร" : "When should teams use this checklist?",
      answer: isTh
        ? "ใช้เมื่อองค์กรกำลังเปรียบเทียบ vendor หลายราย หรือกำลังเตรียม internal evaluation ก่อน proof of concept, procurement, หรือ executive review"
        : "Use it when comparing multiple vendors or preparing an internal evaluation before proof of concept, procurement, or executive review.",
    },
    {
      question: isTh ? "หน้า checklist นี้แทน detailed technical due diligence ได้หรือไม่" : "Does this replace detailed technical due diligence?",
      answer: isTh
        ? "ไม่ได้ หน้านี้ช่วยจัดกรอบคำถามและลำดับการประเมิน แต่ยังไม่แทน security review, legal review หรือ architecture validation เชิงลึก"
        : "No. It structures the questions and sequence of evaluation but does not replace deep security, legal, or architecture reviews.",
    },
  ])

  const checklist = [
    isTh ? "vendor อธิบาย governance layer ชัดเจนหรือไม่" : "Does the vendor clearly explain the governance layer?",
    isTh ? "มีระบบ memory, retention และ expiry ที่อธิบายได้หรือไม่" : "Are memory, retention, and expiry behavior explained?",
    isTh ? "มี routing logic หรือทุกคำขอใช้ path เดียวกัน" : "Is there routing logic, or does every request take the same path?",
    isTh ? "มี evidence, references หรือ benchmark framing ที่ตรวจสอบได้จริงหรือไม่" : "Are evidence, references, or benchmark framing publicly checkable?",
    isTh ? "มี changelog, roadmap หรือ reviewed content ที่บ่งชี้ operational maturity หรือไม่" : "Do changelog, roadmap, or reviewed content signals indicate operational maturity?",
    isTh ? "vendor อธิบาย disclosure boundary และสิ่งที่ไม่เปิดเผยบน public web หรือไม่" : "Does the vendor explain disclosure boundaries and what is intentionally withheld from the public web?",
  ]

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-accent">{isTh ? "Buyer checklist" : "Buyer checklist"}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">{isTh ? "Enterprise AI Platform Evaluation Checklist" : "Enterprise AI Platform Evaluation Checklist"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh
              ? "หน้า checklist นี้ออกแบบมาสำหรับ buyer และทีมประเมินภายในที่ต้องการเปลี่ยนการดู demo ให้กลายเป็นการประเมินเชิงระบบที่มีกรอบชัดเจน"
              : "This checklist is designed for buyers and internal evaluators who want to move from watching a demo to conducting a structured system-level assessment."}
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <ol className="space-y-3 text-sm leading-7 text-muted-foreground">
            {checklist.map((item) => (
              <li key={item} className="rounded-xl border border-border/70 bg-background/60 px-4 py-3">{item}</li>
            ))}
          </ol>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "Pages to pair with this checklist" : "Pages to pair with this checklist"}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`${localePrefix}/methodology`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Methodology</Link>
            <Link href={`${localePrefix}/benchmark-summary`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Benchmark Summary</Link>
            <Link href={`${localePrefix}/thailand-enterprise-trust`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Thailand Trust</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}