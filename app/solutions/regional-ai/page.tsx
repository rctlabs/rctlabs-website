import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import RegionalAIClient from "./RegionalAIClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Regional AI — Sovereign LLM Integration for Local Languages",
    "Regional AI — การรวม LLM ภูมิภาคสำหรับภาษาท้องถิ่น",
    "How RCT Ecosystem integrates Typhoon and other regional LLMs to deliver sovereign AI for Thai, Japanese, Korean, Vietnamese, and other local languages.",
    "วิธีที่ RCT Ecosystem รวม Typhoon และ LLM ภูมิภาคอื่นๆ เพื่อมอบ Sovereign AI สำหรับภาษาไทย ญี่ปุ่น เกาหลี เวียดนาม และภาษาท้องถิ่นอื่นๆ",
    "/solutions/regional-ai",
    ["regional AI", "Typhoon AI", "Thai LLM", "sovereign AI", "local language models", "SCB10X"]
  )
}

export default async function Page() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : ""

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: locale === "th" ? "โซลูชั่น" : "Solutions", url: `https://rctlabs.co${localePrefix}/solutions` },
    { name: locale === "th" ? "Regional AI" : "Regional AI", url: `https://rctlabs.co${localePrefix}/solutions/regional-ai` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "Which regional languages does RCT Regional AI support?",
      answer: "RCT Regional AI integrates Typhoon G38 from SCB10X for Thai language, along with models optimized for Japanese, Korean, Vietnamese, and other Southeast Asian languages through the 7-model HexaCore architecture.",
    },
    {
      question: "How does RCT ensure AI data sovereignty for regional enterprise deployments?",
      answer: "RCT's constitutional architecture processes all data on-premises or in sovereign cloud with no mandatory cross-border transfers, ensuring compliance with Thailand's PDPA, Japan's APPI, and similar Southeast Asian data residency requirements.",
    },
    {
      question: "Why use regional LLMs instead of only Western AI models for Thai enterprise use cases?",
      answer: "Regional LLMs like Typhoon G38 are trained on Thai-language data and understand local regulatory context, cultural nuance, and domain-specific terminology. Western models frequently miss Thai legal terminology, Thai name formats, and PDPA-specific compliance language.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RegionalAIClient />
    </>
  )
}
