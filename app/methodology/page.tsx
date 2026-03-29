import type { Metadata } from "next"
import MethodologyClient from "./MethodologyClient"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Methodology — How RCT Labs Uses Frameworks, Testing, and Disclosure Controls",
    "Methodology — วิธีที่ RCT Labs ใช้กรอบภายนอก การทดสอบ และขอบเขตการเปิดเผยข้อมูล",
    "Methodology page describing how RCT Labs uses external governance frameworks, internal testing, disclosure boundaries, and review loops across public research and platform claims.",
    "หน้า methodology ที่อธิบายว่า RCT Labs ใช้กรอบกำกับดูแลภายนอก การทดสอบภายใน ขอบเขตการเปิดเผยข้อมูล และวงรอบการตรวจทานอย่างไร",
    "/methodology",
    ["AI methodology", "enterprise AI evaluation methodology", "RCT Labs methodology"]
  )
}

export default async function MethodologyPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isTh ? "หน้าแรก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: isTh ? "วิธีวิทยา" : "Methodology", url: `https://rctlabs.co${localePrefix}/methodology` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: isTh ? "หน้า Methodology มีไว้เพื่ออะไร" : "What is the methodology page for?",
      answer: isTh
        ? "เพื่ออธิบายว่าการอ้างอิง การทดสอบ การเปิดเผยข้อมูล และการตรวจทานบนเว็บไซต์ RCT Labs มีกรอบและขอบเขตอย่างไร"
        : "It explains the framework behind how RCT Labs handles references, testing, disclosure, and review across the public site.",
    },
    {
      question: isTh ? "Methodology นี้เท่ากับเอกสาร compliance หรือไม่" : "Is this methodology the same as compliance documentation?",
      answer: isTh
        ? "ไม่ใช่ เอกสารนี้เป็น public-facing explanation ของวิธีทำงานและการกำกับคุณภาพ ไม่ใช่เอกสาร compliance เต็มรูปแบบ"
        : "No. It is a public-facing explanation of quality controls and evidence practices, not a full compliance dossier.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MethodologyClient />
    </>
  )
}