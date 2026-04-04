import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
import { GENERAL_CONTACT_EMAIL } from "@/lib/contact"
import ContactPageClient from "./contact-page-client"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Contact RCT Labs — Enterprise AI Partnership & Technical Support",
    "ติดต่อ RCT Labs — พันธมิตร AI ระดับองค์กร และการสนับสนุนทางเทคนิค",
    "Contact RCT Labs for enterprise AI partnerships, technical inquiries, and collaboration opportunities. Get in touch with our team building Constitutional AI with 41 algorithms and 0.3% hallucination rate.",
    "ติดต่อ RCT Labs สำหรับพันธมิตรทาง AI ระดับองค์กร สอบถามข้อมูลทางเทคนิค และโอกาสความร่วมมือ ทีมผู้สร้าง Constitutional AI พร้อม 41 อัลกอริทึม และอัตราหลอน 0.3%",
    "/contact",
    ["contact RCT Labs", "enterprise AI partnership", "AI technical support"]
  )
}

export default async function ContactPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact RCT Labs",
    "url": `${SITE_URL}${localePrefix}/contact`,
    "description": "Contact RCT Labs for enterprise AI partnerships, technical inquiries, and collaboration opportunities.",
    "mainEntity": {
      "@type": "Organization",
      "name": "RCT Labs",
      "email": GENERAL_CONTACT_EMAIL,
      "url": SITE_URL
    }
  }

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}${localePrefix}` },
    { name: "Contact", url: `${SITE_URL}${localePrefix}/contact` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ContactPageClient />
    </>
  )
}
