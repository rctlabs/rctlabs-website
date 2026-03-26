import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
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

export default function ContactPage() {
  return <ContactPageClient />
}
