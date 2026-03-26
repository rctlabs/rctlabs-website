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
    "Enterprise AI Governance vs Generic Copilots — What Buyers Should Compare",
    "Enterprise AI Governance vs Generic Copilots — ทีมจัดซื้อควรเปรียบเทียบอะไร",
    "A buyer-side comparison page explaining how enterprise AI governance platforms differ from generic copilots across policy control, routing, auditability, and deployment discipline.",
    "หน้าเปรียบเทียบสำหรับฝั่งผู้ซื้อ อธิบายว่าแพลตฟอร์ม enterprise AI governance ต่างจาก generic copilots อย่างไรในด้าน policy control, routing, auditability และวินัยการ deploy",
    "/evaluation/enterprise-ai-governance-vs-generic-copilots",
    ["enterprise ai governance vs copilots", "generic copilots comparison", "enterprise ai governance buyers"]
  )
}

export default async function GovernanceVsCopilotsPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Evaluation", url: `https://rctlabs.co${localePrefix}/evaluation` },
    { name: "Enterprise AI Governance vs Generic Copilots", url: `https://rctlabs.co${localePrefix}/evaluation/enterprise-ai-governance-vs-generic-copilots` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: isTh ? "หน้าเปรียบเทียบนี้เหมาะกับใคร" : "Who is this comparison for?",
      answer: isTh
        ? "เหมาะกับทีมจัดซื้อ ฝ่าย architecture ฝ่าย security และผู้บริหารที่กำลังเทียบระบบ AI สำหรับงานระดับองค์กรกับ generic copilots"
        : "It is designed for procurement teams, architects, security reviewers, and executives comparing enterprise AI systems with generic copilots.",
    },
    {
      question: isTh ? "จุดต่างที่สำคัญที่สุดคืออะไร" : "What is the most important difference?",
      answer: isTh
        ? "generic copilots มักเน้น productivity ที่ผิวหน้า ขณะที่ enterprise AI governance ต้องถูกประเมินที่ policy control, routing, evidence, auditability และ release discipline"
        : "Generic copilots are usually judged on surface productivity, while enterprise AI governance systems must be evaluated on policy control, routing, evidence, auditability, and release discipline.",
    },
  ])

  const comparisonPoints = [
    {
      title: isTh ? "Policy control" : "Policy control",
      left: isTh ? "ระบบระดับองค์กรต้องกำหนดข้อบังคับ เงื่อนไขการปฏิเสธ การอนุมัติ และเส้นทาง escalation ได้ชัดเจน" : "Enterprise systems should define policy boundaries, refusal conditions, approval gates, and escalation paths explicitly.",
      right: isTh ? "generic copilots มักแสดงพฤติกรรมระดับผู้ช่วยทั่วไปโดยไม่มี governance layer ที่ลึกพอ" : "Generic copilots usually behave like general-purpose assistants without a deep governance layer.",
    },
    {
      title: isTh ? "Auditability" : "Auditability",
      left: isTh ? "ควรย้อนดูได้ว่า output เกิดจาก rule, route, source, หรือ review loop ใด" : "Teams should be able to trace which rules, routes, sources, or review loops shaped an output.",
      right: isTh ? "หลายระบบแสดงผลลัพธ์ได้ดี แต่ไม่ช่วยอธิบายเหตุผลหรือการควบคุมเบื้องหลัง" : "Many systems produce useful answers but provide weak visibility into the control logic behind them.",
    },
    {
      title: isTh ? "Deployment discipline" : "Deployment discipline",
      left: isTh ? "buyer ควรมอง versioning, changelog, reviewed content, benchmark framing และ rollout discipline ร่วมกัน" : "Buyers should inspect versioning, changelog quality, reviewed content, benchmark framing, and rollout discipline together.",
      right: isTh ? "เครื่องมือทั่วไปจำนวนมากเน้น feature velocity มากกว่าความโปร่งใสระดับระบบ" : "Many generic tools emphasize feature velocity more than system-level transparency.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-accent">{isTh ? "Keyword-targeted comparison" : "Keyword-targeted comparison"}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">{isTh ? "Enterprise AI Governance vs Generic Copilots" : "Enterprise AI Governance vs Generic Copilots"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh
              ? "ถ้าทีมของคุณกำลังเทียบแพลตฟอร์ม AI ระดับองค์กรกับ generic copilots จุดตัดสินใจไม่ควรอยู่แค่ความเร็วในการตอบหรือ UI ที่ใช้ง่าย แต่ต้องมอง governance layer ที่อยู่ข้างหลังด้วย"
              : "If your team is comparing an enterprise AI platform with generic copilots, the decision should not rest only on answer speed or ease of use. The governance layer behind the system matters."}
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {comparisonPoints.map((point) => (
            <div key={point.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground">{point.title}</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
                  <div className="text-sm font-medium text-accent">{isTh ? "Enterprise AI governance" : "Enterprise AI governance"}</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{point.left}</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background/60 p-5">
                  <div className="text-sm font-medium text-foreground">{isTh ? "Generic copilots" : "Generic copilots"}</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{point.right}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "หน้าที่ควรดูต่อ" : "Where to go next"}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`${localePrefix}/methodology`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Methodology</Link>
            <Link href={`${localePrefix}/editorial-policy`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Editorial Policy</Link>
            <Link href={`${localePrefix}/contact`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "คุยกับทีมประเมิน" : "Talk to the evaluation team"}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}