import { Metadata } from "next"
import { headers } from "next/headers"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema } from "@/lib/schema"
import type { Locale } from "@/lib/i18n"
import Rct7ThinkingClient from "./Rct7ThinkingClient"

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale
  return createBilingualMetadata(
    locale,
    "RCT-7 Thinking — The 7-Step Cognitive Reasoning Protocol",
    "RCT-7 Thinking — Cognitive Reasoning Protocol 7 ขั้นตอน",
    "RCT-7 Thinking is the 7-step metacognitive protocol (Observe → Analyze → Deconstruct → Reverse Reasoning → Identify Core Intent → Reconstruct → Compare with Intent) that RCT-7 Mental OS uses before executing any complex task.",
    "RCT-7 Thinking คือ Metacognitive Protocol 7 ขั้นตอน (Observe → Analyze → Deconstruct → Reverse Reasoning → Identify Core Intent → Reconstruct → Compare with Intent) ที่ RCT-7 Mental OS ใช้ก่อน Execute Task ที่ซับซ้อน",
    "/technology/rct-7-thinking",
    ["RCT-7 Thinking", "cognitive reasoning protocol", "metacognitive AI", "7-step reasoning", "AI planning", "reverse reasoning AI"]
  )
}

export default async function Page() {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale
  const localePrefix = locale === "th" ? "/th" : ""

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: locale === "th" ? "เทคโนโลยี" : "Technology", url: `https://rctlabs.co${localePrefix}/technology/rct-7-thinking` },
    { name: "RCT-7 Thinking", url: `https://rctlabs.co${localePrefix}/technology/rct-7-thinking` },
  ])

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: locale === "th"
      ? "RCT-7 Thinking — Cognitive Reasoning Protocol 7 ขั้นตอน"
      : "RCT-7 Thinking — The 7-Step Cognitive Reasoning Protocol",
    description: locale === "th"
      ? "RCT-7 Thinking คือ Metacognitive Protocol 7 ขั้นตอนที่ RCT-7 Mental OS ใช้ก่อน Execute Task ที่ซับซ้อน"
      : "RCT-7 Thinking is the 7-step metacognitive reasoning protocol used by RCT-7 Mental OS before executing any complex task.",
    author: { "@type": "Organization", name: "RCT Labs" },
    publisher: {
      "@type": "Organization",
      name: "RCT Labs",
      logo: { "@type": "ImageObject", url: "https://rctlabs.co/RCTLogo-horizontal.svg" },
    },
    url: `https://rctlabs.co${localePrefix}/technology/rct-7-thinking`,
    inLanguage: locale,
    keywords: "RCT-7 Thinking, cognitive reasoning protocol, metacognitive AI, 7-step reasoning, reverse reasoning, Observe Analyze Deconstruct Reconstruct",
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <Rct7ThinkingClient locale={locale} />
    </>
  )
}
