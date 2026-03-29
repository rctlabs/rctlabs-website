import type { Metadata } from "next"
import CompareClient from "./CompareClient"

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

export default function ComparePage() {
  return <CompareClient />
}
