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
      "RCT Open Protocol",
      "โปรโตคอลเปิดของ RCT",
      "Open protocol standards for intent-driven systems, workflow negotiation, and auditable AI runtime design.",
      "มาตรฐานโปรโตคอลเปิดสำหรับระบบที่ขับเคลื่อนด้วยเจตนา การเจรจา workflow และการออกแบบ runtime ของ AI ที่ตรวจสอบย้อนหลังได้",
      "/open-protocol",
      ["open protocol", "RCT protocol", "intent-driven protocol"]
    ),
  }
}

export default async function OpenProtocolLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Open Protocol", url: "https://rctlabs.co/en/open-protocol" },
  ])
  const techArticle = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    name: "RCT Open Protocol",
    headline: "RCT Open Protocol: Standards for Intent-Driven AI Runtime Interoperability",
    description: "Open protocol standards defining how intent-driven AI systems negotiate workflows, exchange structured data, and maintain auditable runtime contracts across enterprise deployments.",
    url: "https://rctlabs.co/en/open-protocol",
    author: { "@type": "Person", name: "Ittirit Saengow", url: "https://rctlabs.co/en/authors/ittirit-saengow" },
    publisher: { "@type": "Organization", name: "RCT Labs", url: "https://rctlabs.co" },
    keywords: "open protocol, RCT protocol, intent-driven AI, workflow negotiation, auditable AI runtime",
  }
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }} />
      {children}
    </>
  )
}