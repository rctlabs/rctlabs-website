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
      "FDIA Formula",
      "สูตร FDIA",
      "The FDIA formula explains how data amplified by intent and shaped by action produces meaningful future outcomes.",
      "สูตร FDIA อธิบายว่าข้อมูลที่ถูกขยายด้วยเจตนาและกำกับด้วยการกระทำสร้างผลลัพธ์อนาคตที่มีความหมายได้อย่างไร",
      "/philosophy/fdia",
      ["FDIA formula", "F D I A", "intent formula", "data intent action"]
    ),
  }
}

export default async function FDIALayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Philosophy", url: "https://rctlabs.co/en/philosophy" },
    { name: "FDIA Formula", url: "https://rctlabs.co/en/philosophy/fdia" },
  ])
  const definedTerm = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: "FDIA",
    alternateName: "Future Data Intent Action",
    description: "F = (D^I) × A — A framework quantifying how Data amplified by Intent and shaped by Action produces verifiable future outcomes in AI systems.",
    url: "https://rctlabs.co/en/philosophy/fdia",
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "RCT Labs Glossary",
      url: "https://rctlabs.co/en/glossary",
    },
  }
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTerm) }} />
      {children}
    </>
  )
}