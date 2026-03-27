import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import SolutionsClient from "./SolutionsClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "AI Solutions",
    "โซลูชัน AI",
    "Enterprise AI solutions by RCT Labs: AI Hallucination Prevention (99.7% accuracy), Enterprise AI Memory, and Dynamic AI Routing. Constitutional AI pathways for regulated industries with public-safe evaluation framing.",
    "โซลูชัน AI สำหรับองค์กรจาก RCT Labs: การป้องกัน AI Hallucination (ความแม่นยำ 99.7%), AI Memory ระดับองค์กร และ Dynamic AI Routing",
    "/solutions",
    ["AI hallucination prevention", "enterprise AI memory", "dynamic AI routing", "constitutional AI", "regulated industries AI"]
  )
}

export default function SolutionsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Solutions", url: "https://rctlabs.co/en/solutions" },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "What problems do the RCT Labs solutions solve?",
      answer:
        "RCT Labs solutions address enterprise AI hallucination, context loss, intent drift, and inefficient single-model routing by combining SignedAI verification, RCTDB memory, and multi-tier orchestration.",
    },
    {
      question: "Which solution should an enterprise evaluate first?",
      answer:
        "Teams with trust and compliance risk should start with AI Hallucination Prevention. Teams struggling with long context or repeated workflows should evaluate Enterprise AI Memory. Teams optimizing performance and cost should evaluate Dynamic AI Routing.",
    },
  ])

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RCT Labs Enterprise AI Solutions",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "AI Hallucination Prevention", url: "https://rctlabs.co/en/solutions/ai-hallucination-prevention" },
      { "@type": "ListItem", position: 2, name: "Enterprise AI Memory", url: "https://rctlabs.co/en/solutions/enterprise-ai-memory" },
      { "@type": "ListItem", position: 3, name: "Dynamic AI Routing", url: "https://rctlabs.co/en/solutions/dynamic-ai-routing" },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <SolutionsClient />
    </>
  )
}
