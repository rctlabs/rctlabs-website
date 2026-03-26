import type { Metadata } from "next"
import { headers } from "next/headers"
import { createBilingualMetadata, type Locale } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getFAQSchema, getOrganizationSchema } from "@/lib/schema"
import CompanyClient from "./CompanyClient"

function getLocale(value: string | null): Locale {
  return value === "th" ? "th" : "en"
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale((await headers()).get("x-locale"))

  return createBilingualMetadata(
    locale,
    "Company",
    "บริษัท",
    "About RCT Labs: company mission, research direction, public values, authority references, and the organizational context behind the constitutional AI platform.",
    "เกี่ยวกับ RCT Labs: ภารกิจของบริษัท ทิศทางงานวิจัย ค่านิยมสาธารณะ และบริบทขององค์กรที่อยู่เบื้องหลังแพลตฟอร์ม constitutional AI",
    "/company",
    ["RCT Labs company", "constitutional AI company", "about RCT Labs", "AI research company", "intent operating system company"]
  )
}

export default async function CompanyPage() {
  const locale = getLocale((await headers()).get("x-locale"))
  const localePrefix = locale === "th" ? "/th" : "/en"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Company", url: `https://rctlabs.co${localePrefix}/company` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: locale === "th" ? "RCT Labs คือองค์กรประเภทใด" : "What kind of organization is RCT Labs?",
      answer:
        locale === "th"
          ? "RCT Labs เป็นองค์กรที่พัฒนา constitutional AI operating system, open protocols และ infrastructure สำหรับ enterprise AI ที่ต้องการความน่าเชื่อถือ การกำกับดูแล และความสามารถในการตรวจสอบย้อนหลัง"
          : "RCT Labs builds a constitutional AI operating system, open protocols, and supporting infrastructure for enterprise AI deployments that need trust, governance, and auditability.",
    },
    {
      question: locale === "th" ? "ควรอ่านหน้า Company นี้ทำไม" : "Why does the Company page matter?",
      answer:
        locale === "th"
          ? "เพราะหน้านี้ให้บริบทขององค์กร ภารกิจ และหลักคิดที่อยู่เบื้องหลัง platform pages, protocol pages, benchmark claims และ press resources ทั้งหมด"
          : "Because it provides the organizational context, mission, and research direction behind the platform pages, protocol pages, benchmark claims, and press resources.",
    },
  ])

  const organizationSchema = getOrganizationSchema(locale)

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <CompanyClient />
    </>
  )
}
