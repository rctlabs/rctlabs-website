import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Methodology Comparisons | RCT Labs",
  description:
    "Side-by-side comparisons of Constitutional AI, RAG, verification-first methods, and more. Evidence-based analysis from RCT Labs engineers.",
  keywords: [
    "constitutional AI vs RAG",
    "RCT vs LLM APIs",
    "verification vs prompt engineering",
    "RCTdb vs vector database",
    "AI methodology comparison",
  ],
  alternates: { canonical: "https://rctlabs.co/compare" },
  openGraph: {
    title: "AI Methodology Comparisons | RCT Labs",
    description:
      "Evidence-based comparisons of AI methodologies. Constitutional AI, RAG, verification-first, and vector databases — objectively analyzed.",
    url: "https://rctlabs.co/compare",
    type: "website",
  },
}

const comparisons = [
  {
    slug: "constitutional-ai-vs-rag",
    title: "Constitutional AI vs RAG",
    description:
      "How rule-governed reasoning differs from retrieval-augmented generation — and when governance matters more than recall.",
    tags: ["Governance", "Reasoning", "Enterprise"],
  },
  {
    slug: "rct-labs-vs-llm-apis",
    title: "RCT Platform vs Generic LLM APIs",
    description:
      "Calling OpenAI directly vs building on a verification-aware AI operating system — cost, auditability, and capability gaps.",
    tags: ["Platform", "Auditability", "Cost"],
  },
  {
    slug: "verification-vs-prompt-engineering",
    title: "Verification-First vs Prompt Engineering",
    description:
      "Why structured verification layers produce more reliable outputs than fine-tuned prompt chains.",
    tags: ["Verification", "Reliability", "Truth Score"],
  },
  {
    slug: "rctdb-vs-vector-databases",
    title: "RCTdb vs Vector Databases",
    description:
      "Structured constitutional memory vs embedding-based similarity search — trade-offs for enterprise knowledge management.",
    tags: ["Memory", "Knowledge Graph", "Embeddings"],
  },
]

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <div className="mb-14 text-center">
        <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-warm-amber">
          <Scale className="h-4 w-4" />
          <span>Comparisons</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-warm-light-gray sm:text-5xl">
          AI Methodology Comparisons
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-warm-dim">
          Evidence-based, engineer-written comparisons. We evaluate methodologies against real
          deployment constraints — not vendor marketing.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {comparisons.map((comp) => (
          <Link
            key={comp.slug}
            href={`/compare/${comp.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-warm-charcoal p-6 transition-all duration-200 hover:border-warm-amber/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          >
            <h2 className="mb-2 text-lg font-bold text-warm-light-gray group-hover:text-warm-amber transition-colors duration-200">
              {comp.title}
            </h2>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-warm-dim">{comp.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {comp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-warm-amber/20 bg-warm-amber/10 px-2.5 py-0.5 text-xs font-medium text-warm-amber"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-warm-dim group-hover:text-warm-amber transition-colors duration-200" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
