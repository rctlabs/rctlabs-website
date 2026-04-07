import { Metadata } from "next"
import { headers } from "next/headers"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema } from "@/lib/schema"
import type { Locale } from "@/lib/i18n"
import ConstitutionalAIClient from "./ConstitutionalAIClient"

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale
  return createBilingualMetadata(
    locale,
    "Constitutional AI — The A=0 Principle",
    "Constitutional AI — หลักการ A=0",
    "RCT's Constitutional AI framework with the FDIA equation F=(D^I)×A — when Authorizaton A=0, output collapses to zero regardless of capability.",
    "Framework Constitutional AI ของ RCT ด้วยสมการ FDIA F=(D^I)×A — เมื่อ Authorization A=0 Output จะเป็น 0 โดยไม่คำนึงถึงความสามารถ",
    "/technology/constitutional-ai",
    ["Constitutional AI", "FDIA equation", "AI safety", "authorization zero", "sovereign AI", "A=0"]
  )
}

export default async function Page() {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale
  const localePrefix = locale === "th" ? "/th" : ""

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: locale === "th" ? "เทคโนโลยี" : "Technology", url: `https://rctlabs.co${localePrefix}/technology/constitutional-ai` },
    { name: "Constitutional AI", url: `https://rctlabs.co${localePrefix}/technology/constitutional-ai` },
  ])

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: locale === "th" ? "Constitutional AI — หลักการ A=0" : "Constitutional AI — The A=0 Principle",
    description: locale === "th"
      ? "Framework Constitutional AI ของ RCT ด้วยสมการ FDIA F=(D^I)×A — เมื่อ Authorization A=0 Output จะเป็น 0 โดยไม่คำนึงถึงความสามารถ"
      : "RCT's Constitutional AI framework with the FDIA equation F=(D^I)×A — when Authorization A=0, output collapses to zero regardless of capability.",
    author: { "@type": "Organization", name: "RCT Labs" },
    publisher: { "@type": "Organization", name: "RCT Labs", logo: { "@type": "ImageObject", url: "https://rctlabs.co/RCTLogo-horizontal.svg" } },
    url: `https://rctlabs.co${localePrefix}/technology/constitutional-ai`,
    inLanguage: locale,
    keywords: "Constitutional AI, FDIA equation, A=0 principle, AI safety, sovereign AI, authorization control",
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <ConstitutionalAIClient locale={locale} />
    </>
  )
}
