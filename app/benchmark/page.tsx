import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
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
  return <BenchmarkClient />
}
