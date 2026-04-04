import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return {
    ...createBilingualMetadata(
      locale,
      "RCT-7 Process",
      "กระบวนการ RCT-7",
      "The RCT-7 process for implementing intent-driven systems with structured human oversight.",
      "กระบวนการ RCT-7 สำหรับการสร้างระบบที่ขับเคลื่อนด้วยเจตนาและมีการกำกับดูแลโดยมนุษย์อย่างเป็นระบบ",
      "/philosophy/rct-7",
      ["RCT-7 process", "intent process", "AI governance process"]
    ),
  }
}

export default async function RCT7Layout({ children }: { children: React.ReactNode }) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Philosophy", url: "https://rctlabs.co/en/philosophy" },
    { name: "RCT-7 Process", url: "https://rctlabs.co/en/philosophy/rct-7" },
  ])
  const techArticle = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    name: "RCT-7 Process",
    headline: "RCT-7: Seven-Step Intent-Driven AI Governance Framework",
    description: "The RCT-7 process defines a 7-step framework for implementing intent-driven AI with structured human oversight: Observe, Analyze, Deconstruct, Reverse Reasoning, Identify Intent, Reconstruct, and Compare with Intent.",
    url: "https://rctlabs.co/en/philosophy/rct-7",
    author: { "@type": "Person", name: "Ittirit Saengow", url: "https://rctlabs.co/en/authors/ittirit-saengow" },
    publisher: { "@type": "Organization", name: "RCT Labs", url: "https://rctlabs.co" },
    keywords: "RCT-7, intent-driven AI, AI governance, human oversight, structured AI process",
  }
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }} />
      {children}
    </>
  )
}