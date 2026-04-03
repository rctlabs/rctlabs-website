import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import HallucinationPreventionPage from "./HallucinationPreventionClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "AI Hallucination Prevention — 99.7% Accuracy with Multi-LLM Consensus",
    "ป้องกัน AI Hallucination — ความแม่นยำ 99.7% ด้วย Multi-LLM Consensus",
    "Reduce AI hallucination from 15% to 0.3% with SignedAI multi-LLM consensus verification. Cryptographic signing, complete audit trails, and enterprise-grade accuracy for regulated industries.",
    "ลด AI Hallucination จาก 15% เหลือ 0.3% ด้วย SignedAI Multi-LLM Consensus Cryptographic Signing และ Audit Trails สำหรับอุตสาหกรรมที่มีการกำกับดูแล",
    "/solutions/ai-hallucination-prevention",
    ["reduce AI hallucination", "multi-LLM consensus", "SignedAI verification", "AI accuracy", "cryptographic AI signing"]
  )
}

export default async function Page() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : ""

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: locale === "th" ? "โซลูชั่น" : "Solutions", url: `https://rctlabs.co${localePrefix}/solutions` },
    { name: locale === "th" ? "ป้องกัน AI Hallucination" : "AI Hallucination Prevention", url: `https://rctlabs.co${localePrefix}/solutions/ai-hallucination-prevention` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "What is AI hallucination and why does it happen?",
      answer: "AI hallucination occurs when a language model generates plausible-sounding but factually incorrect content. It happens due to statistical pattern matching without ground-truth verification.",
    },
    {
      question: "How does RCT Labs reduce hallucination to 0.3%?",
      answer: "RCT's SignedAI uses multi-LLM consensus — multiple models independently process the same query, and results are cryptographically signed only when consensus exceeds threshold across 8 quality dimensions.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HallucinationPreventionPage />
    </>
  )
}
