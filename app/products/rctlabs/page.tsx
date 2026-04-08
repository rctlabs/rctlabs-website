import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
import RCTLabsPage from "./RCTLabsClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "RCTLabs — Constitutional AI Operating Environment | 4,849 Verified Tests",
    "RCTLabs — Constitutional AI Operating Environment | 4,849 Tests ผ่าน",
    "Constitutional AI operating environment powering the 7-Genome RCT Ecosystem. 4,849 verified passing tests with 0 failures across 41 production algorithms and 62 microservices. FDIA constitutional scoring on every inference.",
    "Constitutional AI Operating Environment ขับเคลื่อน RCT 7-Genome Ecosystem 4,849 Tests ผ่าน / 0 ล้มเหลว ครอบคลุม 41 Production Algorithms และ 62 Microservices — FDIA ควบคุมทุก Inference",
    "/products/rctlabs",
    ["constitutional AI OS", "4849 verified tests", "FDIA equation", "7 genome system", "AI operating environment"]
  )
}

export default async function Page() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `/products` },
    { name: "RCTLabs Testing Platform", url: `/products/rctlabs` },
  ])
  const productSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "RCTLabs Constitutional AI Operating Environment", "applicationCategory": "DeveloperApplication", "operatingSystem": "Any", "description": "Constitutional AI operating environment with 4,849 verified tests, 41 production algorithms, FDIA scoring, and 7 Genome System.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "featureList": "4849 Verified Tests, 41 Production Algorithms, FDIA Constitutional Scoring, Intent Loop Engine, 7 Genome System, JITNA Protocol RFC-001", "url": `/products/rctlabs`, "publisher": { "@type": "Organization", "name": "RCT Labs", "url": SITE_URL } }
  return (
    <>
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <RCTLabsPage />
    </>
  )
}
