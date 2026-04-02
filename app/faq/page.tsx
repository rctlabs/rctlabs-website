import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/schema"
import { FAQClient } from "./FAQClient"

const faqSchemaData = [
  {
    question: "What is the RCT Ecosystem?",
    answer: "RCT is a sovereign AI governance framework built around the FDIA equation, JITNA protocol, 10-layer architecture, 41 algorithms, and 7 genome subsystems.",
  },
  {
    question: "How does the JITNA Protocol work?",
    answer: "JITNA operates in five phases: Intent Capture, Data Enrichment, Delta Synthesis, Architect Review, and Response Delivery, with quality gates across each stage.",
  },
  {
    question: "What infrastructure does RCT require?",
    answer: "RCT runs on Docker-based infrastructure with PostgreSQL, Redis, and optional local LLM inference, and can scale to Kubernetes for enterprise deployment.",
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Frequently Asked Questions — RCT Labs Enterprise AI FAQ",
    "คำถามที่พบบ่อย — FAQ สำหรับระบบ AI ระดับองค์กรของ RCT Labs",
    "Answers about FDIA, JITNA, deployment, pricing, integrations, and the architecture behind the RCT Labs constitutional AI platform.",
    "คำตอบเกี่ยวกับ FDIA, JITNA, การ deploy, ราคา, integration และสถาปัตยกรรมเบื้องหลังแพลตฟอร์ม Constitutional AI ของ RCT Labs",
    "/faq",
    ["enterprise AI FAQ", "FDIA questions", "JITNA FAQ", "constitutional AI FAQ"]
  )
}

export default async function FAQPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: locale === "th" ? "คำถามที่พบบ่อย" : "FAQ", url: `https://rctlabs.co${localePrefix}/faq` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqSchemaData)) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FAQClient locale={locale} />
    </>
  )
}
