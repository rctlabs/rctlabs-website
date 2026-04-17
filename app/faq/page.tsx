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
  {
    question: "What is the RCT HexaCore 7-model architecture?",
    answer: "HexaCore is the 7-model AI infrastructure of the RCT Ecosystem: 3 Western LLMs + 3 Eastern LLMs + 1 Thai regional model (Typhoon v2). All 7 models run in parallel for critical queries through the HexaCore Consensus mechanism, which requires constitutional agreement thresholds (50–100% depending on tier) before releasing output. This delivers 3.74x cost reduction vs single-model deployments while reducing hallucination to 0.3%.",
  },
  {
    question: "How does SignedAI reduce hallucination to 0.3%?",
    answer: "SignedAI routes each critical query through 4–8 models simultaneously and applies a constitutional consensus threshold: Tier 4 requires 50% agreement, Tier 6 requires 67%, Tier 8 requires 75%, and Tier S (sovereign) requires 100%. If consensus is not reached, the query is escalated rather than releasing an unverified output. The industry average hallucination rate is 12–15%; RCT achieves 0.3% through this multi-LLM verification layer.",
  },
  {
    question: "What is the Delta Engine's 74% compression capability?",
    answer: "The Delta Engine is RCT's memory compression system that stores only incremental state changes (deltas) rather than full state snapshots. It achieves an average of 74% lossless compression, enabling warm recall in under 50ms vs a full cold-start LLM call of 3–5 seconds. Sub-1ms delta reconstruction means the performance overhead is negligible. This is how RCT maintains deep context across long sessions without proportional memory cost.",
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
