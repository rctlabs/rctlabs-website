import { Metadata } from "next"
import { headers } from "next/headers"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema } from "@/lib/schema"
import type { Locale } from "@/lib/i18n"
import Rct7Client from "./Rct7Client"

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale
  return createBilingualMetadata(
    locale,
    "RCT-7 Mental OS — The 7-State IntentLoop",
    "RCT-7 Mental OS — IntentLoop 7 สถานะ",
    "Deep dive into RCT-7 Mental OS — the self-evolving orchestration genome that runs the 7-state IntentLoop (IDLE → RECEIVE → PARSE → ROUTE → EXECUTE → VERIFY → ADAPT).",
    "Deep dive สู่ RCT-7 Mental OS — Genome Orchestration ที่ Self-Evolving ขับเคลื่อน IntentLoop 7 สถานะ",
    "/technology/rct-7",
    ["RCT-7", "Mental OS", "IntentLoop", "self-evolving AI", "AI orchestration"]
  )
}

export default async function Page() {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale
  const localePrefix = locale === "th" ? "/th" : ""

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: locale === "th" ? "เทคโนโลยี" : "Technology", url: `https://rctlabs.co${localePrefix}/technology/rct-7` },
    { name: "RCT-7 Mental OS", url: `https://rctlabs.co${localePrefix}/technology/rct-7` },
  ])

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: locale === "th" ? "RCT-7 Mental OS — IntentLoop 7 สถานะ" : "RCT-7 Mental OS — The 7-State IntentLoop",
    description: locale === "th"
      ? "Deep dive สู่ RCT-7 Mental OS — Genome Orchestration ที่ Self-Evolving ขับเคลื่อน IntentLoop 7 สถานะ"
      : "Deep dive into RCT-7 Mental OS — the self-evolving orchestration genome that runs the 7-state IntentLoop.",
    author: { "@type": "Organization", name: "RCT Labs" },
    publisher: { "@type": "Organization", name: "RCT Labs", logo: { "@type": "ImageObject", url: "https://rctlabs.co/logo-horizontal.svg" } },
    url: `https://rctlabs.co${localePrefix}/technology/rct-7`,
    inLanguage: locale,
    keywords: "RCT-7, Mental OS, IntentLoop, self-evolving AI, AI orchestration, IDLE RECEIVE PARSE ROUTE EXECUTE VERIFY ADAPT",
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <Rct7Client locale={locale} />
    </>
  )
}
