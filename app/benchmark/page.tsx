import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import BenchmarkClient from "./BenchmarkClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "AI Benchmark Results",
    "ผลลัพธ์ Benchmark AI",
    "Independent benchmark results: RCT Labs vs LangChain vs LlamaIndex vs AutoGen. RCT achieves 99.7% accuracy, 0.3% hallucination rate, and 47ms average latency at enterprise scale.",
    "ผลลัพธ์ Benchmark อิสระ: RCT Labs เทียบกับ LangChain, LlamaIndex, AutoGen ความแม่นยำ 99.7%, อัตรา Hallucination 0.3% และ Latency เฉลี่ย 47ms",
    "/benchmark",
    ["AI benchmark", "LangChain vs RCT", "LlamaIndex comparison", "hallucination benchmark", "AI accuracy benchmark", "enterprise AI performance"]
  )
}

export default async function BenchmarkPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"

  const benchmarkSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "RCT Labs AI Reliability Benchmark — 2025 Results",
    "description": "4,849 test cases across 9 validation tiers comparing RCT Labs Constitutional AI against LangChain, LlamaIndex, and AutoGen. Metrics: hallucination rate, accuracy, and latency at enterprise scale.",
    "url": `https://rctlabs.co${localePrefix}/benchmark`,
    "creator": { "@type": "Organization", "name": "RCT Labs", "url": "https://rctlabs.co" },
    "license": "https://www.apache.org/licenses/LICENSE-2.0",
    "variableMeasured": [
      { "@type": "PropertyValue", "name": "Hallucination Rate", "value": "0.3%", "unitText": "percent" },
      { "@type": "PropertyValue", "name": "Test Cases", "value": 4849, "unitText": "count" },
      { "@type": "PropertyValue", "name": "Validation Tiers", "value": 9, "unitText": "count" }
    ]
  }

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Benchmark", url: `https://rctlabs.co${localePrefix}/benchmark` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(benchmarkSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <BenchmarkClient />
    </>
  )
}
