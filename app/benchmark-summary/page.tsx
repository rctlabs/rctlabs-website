import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getBreadcrumbSchema } from "@/lib/schema"
import { BarChart3, AlertTriangle, CheckCircle, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Benchmark Summary — RCT Labs | 0.3% Hallucination, 0.92 FDIA Accuracy",
  description: "Detailed explanation of RCT Labs benchmark methodology: 0.3% hallucination rate, 0.92 FDIA accuracy, 4,849/0/0 test results. Includes caveats, test conditions, and honest limitations.",
  alternates: { canonical: "https://rctlabs.co/en/benchmark-summary" },
}

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

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(191,160,110,0.07),transparent_60%)] pointer-events-none" />
          <div className="mx-auto max-w-4xl px-4 py-24 md:py-32">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-amber/30 bg-warm-amber/8 text-warm-amber text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" /> Performance Benchmarks
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-warm-light-gray leading-tight mb-4">
              Benchmark Summary
            </h1>
            <p className="text-xl text-warm-dim max-w-2xl mb-6">
              Methodology, test conditions, and honest caveats for every performance claim.
            </p>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-warm-amber/20 bg-warm-amber/5">
              <Info className="w-5 h-5 text-warm-amber shrink-0 mt-0.5" />
              <p className="text-warm-dim text-sm">
                Every metric below includes the method used to measure it <strong className="text-warm-light-gray">and</strong> the limitations of that measurement. If a claim cannot be substantiated with a methodology, we do not make it.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-8 space-y-6">
          {metrics.map((m) => (
            <div key={m.label} className={`rounded-2xl border ${m.bgColor} p-8`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div>
                  <p className="text-warm-dim text-sm font-medium mb-1">{m.label}</p>
                  <p className={`text-4xl font-bold ${m.color}`}>{m.value}</p>
                </div>
                <div className="sm:ml-auto text-sm sm:text-right">
                  <p className="text-warm-dim">Industry: <span className="text-warm-light-gray font-semibold">{m.industry}</span></p>
                  <p className={`font-bold ${m.color}`}>{m.improvement}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-warm-light-gray text-sm leading-relaxed">{m.method}</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-warm-amber/70 shrink-0 mt-0.5" />
                  <p className="text-warm-dim text-sm leading-relaxed"><strong className="text-warm-dim">Caveat:</strong> {m.caveat}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="rounded-2xl border border-white/10 bg-warm-charcoal/30 p-8">
            <h2 className="text-xl font-bold text-warm-light-gray mb-4">Test Environment</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              {[["Version", "v5.4.5"], ["Test Date", "March 21, 2026"], ["OS", "Linux x86_64"], ["Node.js", "22.x LTS"], ["Test Runner", "pytest + Hypothesis"], ["CI/CD", "GitHub Actions"]].map(([k, v]) => (
                <div key={k} className="bg-white/3 border border-white/8 rounded-lg p-3">
                  <p className="text-warm-dim text-xs mb-0.5">{k}</p>
                  <p className="font-semibold text-warm-light-gray">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}