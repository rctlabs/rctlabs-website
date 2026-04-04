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
      "Intent Operating System",
      "ระบบปฏิบัติการแห่งเจตนา",
      "The intent operating system model behind RCT Labs and its approach to auditable enterprise AI.",
      "โมเดล intent operating system ที่อยู่เบื้องหลัง RCT Labs และแนวทางต่อ AI ระดับองค์กรที่ตรวจสอบย้อนหลังได้",
      "/philosophy/intent-os",
      ["intent operating system", "intent OS", "enterprise AI operating system"]
    ),
  }
}

export default async function IntentOsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Philosophy", url: "https://rctlabs.co/en/philosophy" },
    { name: "Intent Operating System", url: "https://rctlabs.co/en/philosophy/intent-os" },
  ])
  const techArticle = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    name: "Intent Operating System",
    headline: "Intent OS: The Operating System Layer for Auditable Enterprise AI",
    description: "The Intent Operating System model positions intent as the core primitive above the LLM layer, enabling constitutional AI governance, auditable workflows, and structured human oversight at enterprise scale.",
    url: "https://rctlabs.co/en/philosophy/intent-os",
    author: { "@type": "Person", name: "Ittirit Saengow", url: "https://rctlabs.co/en/authors/ittirit-saengow" },
    publisher: { "@type": "Organization", name: "RCT Labs", url: "https://rctlabs.co" },
    keywords: "intent OS, intent operating system, enterprise AI governance, constitutional AI, auditable AI",
  }
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }} />
      {children}
    </>
  )
}