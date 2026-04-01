import type { Metadata } from "next"
import BenchmarkSummaryClient from "./BenchmarkSummaryClient"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Benchmark Summary — 0.3% Hallucination, 0.92 FDIA Accuracy",
    "สรุป Benchmark — Hallucination 0.3%, FDIA Accuracy 0.92",
    "Detailed explanation of RCT Labs benchmark methodology: 0.3% hallucination rate, 0.92 FDIA accuracy, 4,849/0/0 test results. Includes caveats, test conditions, and honest limitations.",
    "คำอธิบายรายละเอียดของ benchmark methodology จาก RCT Labs: hallucination rate 0.3%, FDIA accuracy 0.92 และผลทดสอบ 4,849/0/0 พร้อม caveats เงื่อนไขการทดสอบ และข้อจำกัดอย่างตรงไปตรงมา",
    "/benchmark-summary",
    ["AI benchmark summary", "FDIA accuracy", "hallucination benchmark", "enterprise AI evaluation"]
  )
}

const BENCHMARK_FAQS = [
  {
    question: "What is RCT Labs' hallucination rate?",
    answer: "RCT Labs measures a 0.3% hallucination rate on controlled enterprise workloads, compared to an industry average of 12–15%. This is achieved through SignedAI multi-model consensus verification and the FDIA constitutional gating system. The measurement methodology is: content verification across controlled test workloads, cross-referenced against SignedAI consensus disagreement logs and manual validation sample (n=500).",
  },
  {
    question: "What is the FDIA accuracy score of 0.92?",
    answer: "The FDIA accuracy score of 0.92 measures how accurately the FDIA equation predicts output quality versus human-evaluated ground truth, measured on a factual question-answering benchmark (n=1,000). The industry baseline of approximately 0.65 is an approximation based on standard LLM accuracy measurements across comparable enterprise workloads.",
  },
  {
    question: "What does the 4,849/0/0 test result mean?",
    answer: "4,849 tests passed, 0 failed, 0 errors — measured on RCT Ecosystem v5.4.5 (March 21, 2026). Tests run across 8 levels: Unit, Integration, Service, Contract, Performance, Security, Chaos, and Property-based tests. The test suite runs on GitHub Actions CI/CD pipeline on every commit.",
  },
  {
    question: "What is warm recall and how fast is it?",
    answer: "Warm recall is when the Delta Engine serves a response from its hot-zone semantic cache (similarity threshold 0.95) instead of calling an LLM. Measured from request receipt to response delivery, warm recall achieves under 50 milliseconds. Novel queries always take the cold start path (3–5 seconds). Hot zone capacity is finite; entries migrate to slower zones based on frequency.",
  },
  {
    question: "How does the Delta Engine achieve 74% memory compression?",
    answer: "The Delta Engine stores only incremental state changes (deltas) rather than full state snapshots. The 74% compression rate was measured as the average reduction versus full-state storage across 10,000 sequential query sessions. Compression is lossless — full state can be reconstructed with sub-1ms overhead. Short or highly novel sessions may show lower compression ratios.",
  },
  {
    question: "How does the 3.74x cost reduction work?",
    answer: "The RCT HexaCore router uses intelligent routing to select the most cost-efficient model appropriate for each task rather than always routing to a premium model like Claude Opus. The 3.74x figure was measured by comparing HexaCore routing versus always routing to Claude Opus across a 10,000-query production-equivalent mixed workload. Actual savings depend on query mix — complex workloads requiring premium models will show lower savings.",
  },
]

export default async function BenchmarkSummaryPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Benchmark Summary", url: `https://rctlabs.co${localePrefix}/benchmark-summary` },
  ])
  const faq = getFAQSchema(BENCHMARK_FAQS)

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <BenchmarkSummaryClient />
    </>
  )
}