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
    "RCTLabs — AI Testing Platform with 62,205+ Test Cases",
    "RCTLabs — แพลตฟอร์มทดสอบ AI กว่า 62,205 Test Cases",
    "Integrated AI testing platform with 62,205+ automated test cases across 9 tiers. Validate, benchmark, and certify AI models with unit testing, integration testing, and regression analysis.",
    "แพลตฟอร์มทดสอบ AI แบบบูรณาการกว่า 62,205 Test Cases ครอบคลุม 9 Tiers ตรวจสอบ Benchmark และรับรอง AI Models ด้วย Unit Testing, Integration Testing และ Regression Analysis",
    "/products/rctlabs",
    ["AI testing platform", "62205 test cases", "9-tier validation", "AI benchmarking", "regression testing AI"]
  )
}

export default async function Page() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `/products` },
    { name: "RCTLabs Testing Platform", url: `/products/rctlabs` },
  ])
  const productSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "RCTLabs AI Testing Platform", "applicationCategory": "DeveloperApplication", "operatingSystem": "Any", "description": "Integrated AI testing platform with 62,205+ automated test cases across 9 tiers.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "featureList": "62,205+ Test Cases, 9-Tier Validation, Unit Testing, Integration Testing, Regression Analysis", "url": `/products/rctlabs`, "publisher": { "@type": "Organization", "name": "RCT Labs", "url": SITE_URL } }
  return (
    <>
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <RCTLabsPage />
    </>
  )
}
