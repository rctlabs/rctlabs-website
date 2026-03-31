import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import EvaluationClient from "@/app/evaluation/EvaluationClient"
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

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <EvaluationClient localePrefix={localePrefix} isTh={isTh} />
      <Footer />
    </main>
  )
}