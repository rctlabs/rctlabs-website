import type { Metadata } from "next"
export const dynamic = "force-dynamic"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/schema"
import { FAQClient } from "./FAQClient"

const faqSchemaData = [
  {
    question: "What is the RCT Ecosystem?",
    answer: "RCT is a constitutional AI operating system built by a solo developer in Bangkok, Thailand — 62 microservices, 41 algorithms, 7 HexaCore AI models, and 4,849 automated tests passing at 0 failures. It combines the FDIA equation (F=D^I×A), JITNA Protocol (RFC-001), 10-layer architecture, and 7 genome subsystems.",
  },
  {
    question: "How does the JITNA Protocol work?",
    answer: "JITNA (Just-In-Time Nodal Assembly) operates in 5 phases: Intent Capture → Data Enrichment → Delta Synthesis → Architect Review → Response Delivery, each with quality gates. It is published as RFC-001 v2.0 under Apache 2.0 license and is designed as the open communication standard for multi-LLM AI agents.",
  },
  {
    question: "What infrastructure does RCT require?",
    answer: "RCT runs on a 62-microservice architecture with PostgreSQL, Redis, and optional Ollama for local LLM inference, validated by 4,849 passing tests across 8 test levels. It scales from Docker Compose (33 containers) to Kubernetes (57 resources with HPA, PDB, NetworkPolicy, ArgoCD).",
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
