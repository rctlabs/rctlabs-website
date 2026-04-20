import { Metadata } from "next"
import { headers } from "next/headers"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema } from "@/lib/schema"
import type { Locale } from "@/lib/i18n"
import JitnaClient from "./JitnaClient"

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale
  return createBilingualMetadata(
    locale,
    "JITNA — Just In Time Nodal Assembly",
    "JITNA — Just In Time Nodal Assembly",
    "JITNA RFC-001 v2.0 — The HTTP of Agentic AI. Open communication protocol for AI agents to discover, negotiate, and execute tasks without permanent hierarchy. Ed25519 secured, Apache 2.0.",
    "JITNA RFC-001 v2.0 — HTTP ของ Agentic AI โปรโตคอลการสื่อสารแบบเปิดสำหรับ AI Agent ในการค้นหา, เจรจา และดำเนินงานร่วมกันโดยไม่มีลำดับชั้นถาวร",
    "/technology/jitna",
    ["JITNA", "Just In Time Nodal Assembly", "AI agent protocol", "agentic AI", "open protocol", "RFC-001", "multi-agent system"]
  )
}

export default async function Page() {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale
  const localePrefix = locale === "th" ? "/th" : ""

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: locale === "th" ? "เทคโนโลยี" : "Technology", url: `https://rctlabs.co${localePrefix}/technology/jitna` },
    { name: "JITNA Protocol", url: `https://rctlabs.co${localePrefix}/technology/jitna` },
  ])

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: locale === "th"
      ? "JITNA — Just In Time Nodal Assembly"
      : "JITNA — Just In Time Nodal Assembly",
    description: locale === "th"
      ? "JITNA RFC-001 v2.0 — HTTP ของ Agentic AI โปรโตคอลการสื่อสารแบบเปิดสำหรับ AI Agent"
      : "JITNA RFC-001 v2.0 — The HTTP of Agentic AI. Open communication protocol for AI agents.",
    author: { "@type": "Organization", name: "RCT Labs" },
    publisher: { "@type": "Organization", name: "RCT Labs", logo: { "@type": "ImageObject", url: "https://rctlabs.co/RCTLogo-horizontal.svg" } },
    url: `https://rctlabs.co${localePrefix}/technology/jitna`,
    inLanguage: locale,
    keywords: "JITNA, Just In Time Nodal Assembly, AI agent protocol, agentic AI, RFC-001, open protocol",
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <JitnaClient locale={locale} />
    </>
  )
}
