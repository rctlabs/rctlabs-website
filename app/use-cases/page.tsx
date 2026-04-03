import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import UseCasesClient from "./UseCasesClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Use Cases",
    "กรณีการใช้งาน",
    "Real-world AI use cases powered by RCT Labs: fintech compliance, healthcare AI, legal document analysis, creative automation, and enterprise workflow intelligence. Proven across 11 industries.",
    "กรณีการใช้งาน AI จาก RCT Labs: การเงิน สุขภาพ กฎหมาย ครีเอทีฟ และกระบวนการทำงานระดับองค์กร ผ่านการพิสูจน์ใน 11 อุตสาหกรรม",
    "/use-cases",
    ["AI use cases", "fintech AI", "healthcare AI", "legal AI", "enterprise automation", "AI compliance"]
  )
}

export default async function UseCasesPage() {
  return <UseCasesClient />
}
