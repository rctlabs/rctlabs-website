import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getDefinedTermSchema, getFAQSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
import FdiaClient from "./FdiaClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "FDIA Equation — F = (D^I) × A",
    "สมการ FDIA — F = (D^I) × A",
    "Deep-dive into the FDIA equation: Future = (Data raised to the power of Intent) multiplied by Architect. The governing principle behind RCT Labs' constitutional AI operating system.",
    "ลงลึกสมการ FDIA: Future = (Data ยกกำลัง Intent) คูณ Architect หลักการกำกับดูแลเบื้องหลังระบบปฏิบัติการ AI แบบ constitutional ของ RCT Labs",
    "/fdia",
    ["FDIA equation", "constitutional AI", "intent amplification", "F = (D^I) × A", "AI governance framework"]
  )
}

export default async function FdiaPage() {
  const locale = await getRequestLocale()
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Protocols", url: `${SITE_URL}/${locale}/protocols` },
    { name: "FDIA Equation", url: `${SITE_URL}/${locale}/fdia` },
  ])

  const definedTermSchema = getDefinedTermSchema(
    "FDIA Equation",
    "Future = (Data raised to the power of Intent) multiplied by Architect. A constitutional AI framework equation expressing how structured intent exponentially amplifies data value, with human oversight as the final governance multiplier.",
    `${SITE_URL}/${locale}/fdia`
  )

  const faqSchema = getFAQSchema([
    {
      question: "What does FDIA stand for?",
      answer:
        "FDIA stands for Future, Data, Intent, Architect. The equation F = (D^I) × A expresses how a designed future outcome is produced by data raised to the power of intent, then multiplied by human architectural oversight.",
    },
    {
      question: "Why is Intent the exponent in the FDIA equation?",
      answer:
        "Intent is the exponent because clarity of purpose multiplies the value of available data exponentially — not linearly. A small increase in intent clarity produces a disproportionately large improvement in outcomes, mirroring how exponential growth works.",
    },
    {
      question: "How does FDIA prevent AI hallucination?",
      answer:
        "The Architect (A) term in FDIA represents human-in-the-loop governance. By requiring explicit human oversight as a multiplier on every AI computation, the equation structurally prevents unchecked output propagation that leads to hallucination.",
    },
    {
      question: "สมการ FDIA คืออะไร?",
      answer:
        "FDIA ย่อมาจาก Future, Data, Intent, Architect สมการ F = (D^I) × A แสดงให้เห็นว่าผลลัพธ์ในอนาคตถูกสร้างขึ้นจากข้อมูลที่ยกกำลังด้วย Intent แล้วคูณด้วยการกำกับดูแลจากสถาปนิกมนุษย์",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FdiaClient />
    </>
  )
}
