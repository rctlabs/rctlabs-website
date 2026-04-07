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
    "JITNA — Just-in-Time Neural Architecture Protocol",
    "JITNA — Just-in-Time Neural Architecture Protocol",
    "JITNA RFC-001 v2.0 — the open routing protocol that selects the optimal LLM, algorithm tier, and voting method for every task in real-time.",
    "JITNA RFC-001 v2.0 — โปรโตคอล Routing แบบเปิดที่เลือก LLM, Algorithm Tier และ Voting Method ที่เหมาะสมที่สุดสำหรับทุก Task",
    "/technology/jitna",
    ["JITNA", "Just-in-Time Neural Architecture", "AI routing protocol", "multi-LLM routing", "open protocol"]
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
      ? "JITNA — Just-in-Time Neural Architecture Protocol"
      : "JITNA — Just-in-Time Neural Architecture Protocol",
    description: locale === "th"
      ? "JITNA RFC-001 v2.0 — โปรโตคอล Routing แบบเปิดที่เลือก LLM, Algorithm Tier และ Voting Method ที่เหมาะสมที่สุดสำหรับทุก Task"
      : "JITNA RFC-001 v2.0 — the open routing protocol that selects the optimal LLM, algorithm tier, and voting method for every task in real-time.",
    author: { "@type": "Organization", name: "RCT Labs" },
    publisher: { "@type": "Organization", name: "RCT Labs", logo: { "@type": "ImageObject", url: "https://rctlabs.co/RCTLogo-horizontal.svg" } },
    url: `https://rctlabs.co${localePrefix}/technology/jitna`,
    inLanguage: locale,
    keywords: "JITNA, Just-in-Time Neural Architecture, AI routing, multi-LLM routing, open protocol",
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <JitnaClient locale={locale} />
    </>
  )
}
