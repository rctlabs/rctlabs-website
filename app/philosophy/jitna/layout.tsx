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
      "JITNA Language",
      "ภาษา JITNA",
      "The JITNA model for precise intent specification, assembly, and auditable workflow execution.",
      "โมเดล JITNA สำหรับการระบุเจตนาอย่างแม่นยำ การประกอบระบบ และการรัน workflow ที่ตรวจสอบย้อนหลังได้",
      "/philosophy/jitna",
      ["JITNA language", "intent specification language", "JITNA model"]
    ),
  }
}

export default async function JITNALayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Philosophy", url: "https://rctlabs.co/en/philosophy" },
    { name: "JITNA Language", url: "https://rctlabs.co/en/philosophy/jitna" },
  ])
  const techArticle = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    name: "JITNA Language",
    headline: "JITNA: The Intent Specification Language for Auditable AI Workflows",
    description: "JITNA is a formal language for precise intent specification, nodal assembly, and auditable workflow execution in enterprise AI systems built on the RCT constitutional architecture.",
    url: "https://rctlabs.co/en/philosophy/jitna",
    author: { "@type": "Person", name: "Ittirit Saengow", url: "https://rctlabs.co/en/authors/ittirit-saengow" },
    publisher: { "@type": "Organization", name: "RCT Labs", url: "https://rctlabs.co" },
    keywords: "JITNA, intent specification, auditable AI, workflow execution, RCT Labs",
  }
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }} />
      {children}
    </>
  )
}