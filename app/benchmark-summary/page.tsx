import type { Metadata } from "next"
import BenchmarkSummaryClient from "./BenchmarkSummaryClient"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Benchmark Summary — RCT Labs | 0.3% Hallucination, 0.92 FDIA Accuracy",
  description: "Detailed explanation of RCT Labs benchmark methodology: 0.3% hallucination rate, 0.92 FDIA accuracy, 4,849/0/0 test results. Includes caveats, test conditions, and honest limitations.",
  alternates: { canonical: "https://rctlabs.co/en/benchmark-summary" },
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

const metrics = [
  {
    label: "Hallucination Rate",
    value: "0.3%",
    industry: "12–15%",
    improvement: "95% reduction",
    method: "Content verification across controlled test workloads; cross-referenced against SignedAI consensus disagreement logs and manual validation sample (n=500).",
    caveat: "Measured on controlled workloads. Real-world rates may vary based on query domain, input quality, and tier selection.",
    color: "text-green-400",
    bgColor: "bg-green-400/8 border-green-400/20",
  },
  {
    label: "FDIA Accuracy Score",
    value: "0.92",
    industry: "~0.65",
    improvement: "+41.5%",
    method: "Accuracy of the FDIA equation in predicting output quality vs. human-evaluated ground truth. Measured on factual question-answering benchmark (n=1,000).",
    caveat: "Industry baseline ~0.65 is an approximation. Direct comparative benchmarking with specific competitor products has not been conducted.",
    color: "text-warm-amber",
    bgColor: "bg-warm-amber/8 border-warm-amber/20",
  },
  {
    label: "Test Suite",
    value: "4,849 / 0 / 0",
    industry: "N/A",
    improvement: "0 failures, 0 errors",
    method: "Automated tests across 8 levels (Unit, Integration, Service, Contract, Performance, Security, Chaos, Property). Run on v5.4.5, March 21, 2026.",
    caveat: "Point-in-time result (v5.4.5). Test count grows with platform scope as new features are added.",
    color: "text-blue-400",
    bgColor: "bg-blue-400/8 border-blue-400/20",
  },
  {
    label: "Warm Recall Latency",
    value: "<50ms",
    industry: "N/A",
    improvement: "vs 3–5s cold start",
    method: "Delta Engine semantic cache with similarity threshold 0.95. Measured from request receipt to response delivery on hot-zone cache hits.",
    caveat: "Novel queries always take the cold start path (3–5s). Hot zone capacity is finite; entries migrate to slower zones based on frequency.",
    color: "text-purple-400",
    bgColor: "bg-purple-400/8 border-purple-400/20",
  },
  {
    label: "Memory Compression",
    value: "74%",
    industry: "N/A",
    improvement: "lossless (O(n) vs O(n²))",
    method: "Delta Engine stores only state changes. 74% measured as average reduction vs full-state storage across 10,000 sequential query sessions.",
    caveat: "Short or highly novel sessions may show lower compression ratios.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/8 border-cyan-400/20",
  },
  {
    label: "Cost Reduction",
    value: "3.74x",
    industry: "N/A",
    improvement: "vs always using Claude Opus",
    method: "HexaCore intelligent routing vs. always routing to Claude Opus 4.6. Measured over 10,000 production-equivalent mixed query workload.",
    caveat: "Actual savings depend on query mix. Complex workloads requiring premium models will show lower savings.",
    color: "text-orange-400",
    bgColor: "bg-orange-400/8 border-orange-400/20",
  },
]

export default async function BenchmarkSummaryPage() {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Benchmark Summary", url: "https://rctlabs.co/en/benchmark-summary" },
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