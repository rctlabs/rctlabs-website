import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import EnterpriseAIMemoryPage from "./EnterpriseMemoryClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Enterprise AI Memory — Persistent Context with 74% Compression",
    "Enterprise AI Memory — Persistent Context พร้อม Compression 74%",
    "Extend enterprise AI beyond the context window with persistent memory, hybrid storage, governed recall, and 74% delta compression.",
    "ขยาย AI องค์กรให้เกินข้อจำกัดของ context window ด้วย persistent memory, hybrid storage, governed recall และ delta compression 74%",
    "/solutions/enterprise-ai-memory",
    ["enterprise AI memory", "RCTDB", "vector database", "AI context window", "8-dimensional schema", "delta compression"]
  )
}

export default async function Page() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : ""

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: locale === "th" ? "โซลูชั่น" : "Solutions", url: `https://rctlabs.co${localePrefix}/solutions` },
    { name: locale === "th" ? "Enterprise AI Memory" : "Enterprise AI Memory", url: `https://rctlabs.co${localePrefix}/solutions/enterprise-ai-memory` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <EnterpriseAIMemoryPage />
    </>
  )
}
