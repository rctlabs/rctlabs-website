import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
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

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <RegionalAIClient />
    </>
  )
}
