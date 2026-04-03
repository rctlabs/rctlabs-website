import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
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
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Use Cases", url: `${SITE_URL}/use-cases` },
  ])
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "RCT Labs AI Use Cases",
    "description": "Real-world AI use cases powered by RCT Labs across 11 industries: fintech, healthcare, legal, creative, and enterprise automation.",
    "provider": { "@type": "Organization", "name": "RCT Labs", "url": SITE_URL },
    "areaServed": ["TH", "SG", "US", "GB"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Use Case Catalog",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fintech AI Compliance" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Healthcare AI" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Legal Document AI" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Creative Automation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Enterprise Workflow AI" } },
      ],
    },
  }
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <UseCasesClient />
    </>
  )
}
