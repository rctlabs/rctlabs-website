import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
import ArtentAIPage from "./ArtentAIClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Artent AI — Personal Agent OS | WF00-META 7-Phase Protocol | RCTDB 8-Dimensional",
    "Artent AI — Personal Agent OS — WF00-META 7-Phase Protocol",
    "Personal Agent OS with L1-L5 intelligence levels, RCTDB 8-Dimensional memory, and WF00-META 7-phase protocol. FDIA Constitutional Scoring, Sovereignty Vault, and Analysearch Mirror Mode integration.",
    "Personal Agent OS พร้อมระดับปัญญา L1-L5, RCTDB 8-Dimensional Memory และ WF00-META Pipeline 7 ขั้นตอน — FDIA Constitutional Scoring, Sovereignty Vault และ Analysearch Integration",
    "/products/artent-ai",
    ["personal agent OS", "WF00-META protocol", "RCTDB 8-dimensional", "FDIA constitutional AI", "L1-L5 intelligence"]
  )
}

export default async function Page() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `/products` },
    { name: "Artent AI", url: `/products/artent-ai` },
  ])
  const productSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Artent AI Personal Agent OS", "applicationCategory": "BusinessApplication", "operatingSystem": "Any", "description": "Personal Agent OS with 7-phase WF00-META protocol, RCTDB 8-Dimensional memory, L1-L5 intelligence levels, and FDIA Constitutional Scoring.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "featureList": "L1-L5 Intelligence Ladder, FDIA Constitutional Scoring, Sovereignty Vault, Analysearch Integration, WF00-META 7-Phase Protocol, RCTDB 8-Dimensional", "url": `/products/artent-ai`, "publisher": { "@type": "Organization", "name": "RCT Labs", "url": SITE_URL } }
  return (
    <>
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <ArtentAIPage />
    </>
  )
}
