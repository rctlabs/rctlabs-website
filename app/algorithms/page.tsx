import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import AlgorithmsClient from "./AlgorithmsClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "41 Proprietary Algorithms",
    "41 อัลกอริทึมเฉพาะ",
    "RCT Labs 41 proprietary algorithms across 9 tiers: from foundation processing to meta-cognitive orchestration. Public references describe a 41-algorithm framework with benchmark-backed validation evidence.",
    "อัลกอริทึมเฉพาะ 41 ตัวของ RCT Labs ใน 9 Tiers: จากการประมวลผลพื้นฐานถึง Meta-cognitive Orchestration ผ่านการทดสอบใน 62,205+ Test Cases",
    "/algorithms",
    ["41 algorithms", "AI algorithms", "9-tier algorithm", "production AI algorithms", "AI orchestration algorithms"]
  )
}

export default function AlgorithmsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Algorithms", url: "https://rctlabs.co/en/algorithms" },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "How are the RCT Labs algorithms organized?",
      answer:
        "The 41 proprietary algorithms are grouped into 9 tiers covering foundation processing, analysis, reasoning, orchestration, verification, memory, adaptation, synthesis, and autonomy.",
    },
    {
      question: "What is Analysearch on the algorithms page?",
      answer:
        "Analysearch is RCT Labs' hybrid analysis-and-research runtime that exposes multiple execution modes for traceable reasoning and research-grade synthesis.",
    },
  ])

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RCT Labs 41 Algorithms",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tier 1 Foundation", url: "https://rctlabs.co/en/algorithms#tier-1" },
      { "@type": "ListItem", position: 2, name: "Tier 2 Analysis", url: "https://rctlabs.co/en/algorithms#tier-2" },
      { "@type": "ListItem", position: 3, name: "Tier 3 Reasoning", url: "https://rctlabs.co/en/algorithms#tier-3" },
      { "@type": "ListItem", position: 4, name: "Tier 4 Orchestration", url: "https://rctlabs.co/en/algorithms#tier-4" },
      { "@type": "ListItem", position: 5, name: "Tier 5 Verification", url: "https://rctlabs.co/en/algorithms#tier-5" },
      { "@type": "ListItem", position: 6, name: "Tier 6 Memory", url: "https://rctlabs.co/en/algorithms#tier-6" },
      { "@type": "ListItem", position: 7, name: "Tier 7 Adaptation", url: "https://rctlabs.co/en/algorithms#tier-7" },
      { "@type": "ListItem", position: 8, name: "Tier 8 Synthesis", url: "https://rctlabs.co/en/algorithms#tier-8" },
      { "@type": "ListItem", position: 9, name: "Tier 9 Autonomy", url: "https://rctlabs.co/en/algorithms#tier-9" },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <AlgorithmsClient />
    </>
  )
}
