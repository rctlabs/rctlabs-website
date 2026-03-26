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
    "Evaluation Hub — Compare Governance, Memory, Routing, and Enterprise Readiness",
    "Evaluation Hub — เปรียบเทียบ Governance, Memory, Routing และความพร้อมระดับองค์กร",
    "Evaluation hub for enterprise teams comparing AI governance, memory systems, routing patterns, context handling, and buyer-side evaluation paths before procurement.",
    "ศูนย์กลางสำหรับทีมองค์กรที่ต้องการเปรียบเทียบ AI governance, memory systems, routing patterns, context handling และเส้นทางการประเมินก่อน procurement",
    "/evaluation",
    ["enterprise AI evaluation", "AI platform comparison", "AI procurement checklist"]
  )
}

export default async function EvaluationPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isTh ? "หน้าแรก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: isTh ? "ศูนย์กลางการประเมิน" : "Evaluation", url: `https://rctlabs.co${localePrefix}/evaluation` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: isTh ? "หน้า Evaluation มีไว้สำหรับใคร" : "Who is the evaluation page for?",
      answer: isTh
        ? "สำหรับ buyer, architecture team, security team และผู้ที่ต้องการประเมิน AI platform ก่อนตัดสินใจ"
        : "It is for buyers, architecture teams, security reviewers, and enterprise evaluators assessing an AI platform before commitment.",
    },
    {
      question: isTh ? "ควรอ่านหน้าใดต่อจากหน้านี้" : "What should readers visit after this page?",
      answer: isTh
        ? "โดยทั่วไปควรต่อไปยัง methodology, benchmark summary, roadmap, pricing และ contact เพื่อเปลี่ยนจาก comparison ไปสู่ evaluation ที่เป็นรูปธรรม"
        : "Most teams should continue into methodology, benchmark summary, roadmap, pricing, and contact to move from comparison into practical evaluation.",
    },
  ])

  const comparisons = [
    {
      title: "Enterprise AI governance vs generic copilots",
      titleTh: "Enterprise AI governance vs generic copilots",
      text: "Governance-oriented platforms are evaluated on policy, routing, evidence, rollback, and auditability. Generic copilots are often evaluated mainly on surface productivity.",
      textTh: "แพลตฟอร์มที่เน้น governance ต้องถูกประเมินด้าน policy, routing, evidence, rollback และ auditability ขณะที่ generic copilots มักถูกวัดแค่ productivity ที่ผิวหน้า",
      href: "/evaluation/enterprise-ai-governance-vs-generic-copilots",
    },
    {
      title: "Enterprise AI memory vs large context windows",
      titleTh: "Enterprise AI memory vs large context windows",
      text: "A larger context window increases capacity. A memory system governs what is retained, reused, validated, expired, and explained over time.",
      textTh: "context window ที่ใหญ่ขึ้นคือความจุ แต่ memory system คือวินัยในการเก็บ ใช้ ตรวจสอบ หมดอายุ และอธิบายบริบทในระยะยาว",
      href: "/evaluation/enterprise-ai-memory-vs-large-context-windows",
    },
    {
      title: "Dynamic AI routing vs static orchestration",
      titleTh: "Dynamic AI routing vs static orchestration",
      text: "Routing lets teams vary cost, latency, and risk handling by workload type instead of forcing one path for every request.",
      textTh: "routing ช่วยให้ทีมปรับต้นทุน latency และการจัดการความเสี่ยงตามชนิดงาน แทนการบังคับให้ทุกคำขอผ่าน path เดียวกัน",
      href: "/evaluation/dynamic-ai-routing-vs-static-orchestration",
    },
    {
      title: "Build vs buy for governed AI systems",
      titleTh: "Build vs buy for governed AI systems",
      text: "The real question is not build versus buy in isolation, but which layers you want to own: governance, routing, memory, verification, and ongoing release discipline.",
      textTh: "คำถามจริงไม่ใช่ build หรือ buy แบบโดด ๆ แต่คือองค์กรต้องการถือครองชั้นไหนเองบ้าง เช่น governance, routing, memory, verification และ release discipline",
      href: "/evaluation/build-vs-buy-governed-ai-systems",
    },
    {
      title: "Enterprise AI platform evaluation checklist",
      titleTh: "Enterprise AI platform evaluation checklist",
      text: "A buyer-side checklist should move beyond demos into governance, memory, routing, benchmarks, disclosure boundaries, and operational maturity.",
      textTh: "เช็กลิสต์สำหรับ buyer ควรพาออกจากการดู demo ไปสู่คำถามด้าน governance, memory, routing, benchmark, disclosure boundary และ operational maturity",
      href: "/evaluation/enterprise-ai-platform-evaluation-checklist",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-accent">{isTh ? "เครื่องมือช่วยตัดสินใจฝั่งผู้ซื้อ" : "Buyer-side decision support"}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">{isTh ? "ศูนย์กลางการประเมิน" : "Evaluation Hub"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh ? "พื้นที่กลางสำหรับหน้า comparison และ buyer evaluation path ของระบบ AI แบบ Ecosystem / OS" : "A central comparison and buyer-evaluation hub for enterprise AI systems presented as an ecosystem or operating system."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {comparisons.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-foreground">{isTh ? item.titleTh : item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{isTh ? item.textTh : item.text}</p>
              {item.href ? (
                <Link href={`${localePrefix}${item.href}`} className="mt-4 inline-flex text-sm font-medium text-accent hover:underline">
                  {isTh ? "อ่านหน้าเปรียบเทียบฉบับเต็ม" : "Read the full comparison"}
                </Link>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "เส้นทางการประเมินที่แนะนำ" : "Recommended evaluation path"}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <Link href={`${localePrefix}/methodology`} className="rounded-xl border border-border/70 bg-background/60 p-5 transition hover:border-accent/50"><div className="font-semibold text-foreground">{isTh ? "วิธีวิทยา" : "Methodology"}</div></Link>
            <Link href={`${localePrefix}/benchmark-summary`} className="rounded-xl border border-border/70 bg-background/60 p-5 transition hover:border-accent/50"><div className="font-semibold text-foreground">{isTh ? "สรุป Benchmark" : "Benchmark Summary"}</div></Link>
            <Link href={`${localePrefix}/pricing`} className="rounded-xl border border-border/70 bg-background/60 p-5 transition hover:border-accent/50"><div className="font-semibold text-foreground">{isTh ? "ราคา" : "Pricing"}</div></Link>
            <Link href={`${localePrefix}/contact`} className="rounded-xl border border-border/70 bg-background/60 p-5 transition hover:border-accent/50"><div className="font-semibold text-foreground">{isTh ? "ติดต่อทีมงาน" : "Contact"}</div></Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}