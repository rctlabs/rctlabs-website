import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getDefinedTermSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
import CoreSystemsClient from "./CoreSystemsClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Core Systems — HexaCore, Intent Loop, Analysearch, Delta Memory",
    "Core Systems — HexaCore, Intent Loop, Analysearch, Delta Memory",
    "A public-safe overview of the four core systems behind RCT: model routing, intent continuity, multi-depth analysis, and enterprise memory.",
    "ภาพรวมแบบ public-safe ของ 4 ระบบหลักเบื้องหลัง RCT: model routing, intent continuity, multi-depth analysis และ enterprise memory",
    "/core-systems",
    ["HexaCore", "Intent Loop", "Analysearch", "Delta Memory", "enterprise AI systems"]
  )
}

export default async function Page() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/en` },
    { name: "Core Systems", url: `${SITE_URL}/en/core-systems` },
  ])

  const definedTermSchema = getDefinedTermSchema(
    "RCT Kernel",
    "The RCT Kernel is the constitutional AI operating core of RCT Labs, comprising four primary systems: HexaCore (multi-model routing), Intent Loop (intent continuity), Analysearch (multi-depth analysis), and Delta Memory (enterprise AI memory).",
    `${SITE_URL}/en/core-systems`
  )

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <CoreSystemsClient />
    </>
  )
}
