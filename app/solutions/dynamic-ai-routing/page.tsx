import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import DynamicAIRoutingPage from "./DynamicRoutingClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "Dynamic AI Routing — Intelligent Multi-LLM Orchestration Across 9 Tiers",
    "Dynamic AI Routing — Multi-LLM Orchestration อัจฉริยะผ่าน 9 Tiers",
    "Intelligent multi-LLM routing across 9 tiers of 41 algorithms. Sub-50ms latency, 60% cost reduction, and self-evolving orchestration for enterprise AI workloads.",
    "Routing Multi-LLM อัจฉริยะผ่าน 9 Tiers ของ 41 Algorithms Latency ต่ำกว่า 50ms ลดต้นทุน 60% และ Self-Evolving Orchestration สำหรับ Enterprise AI",
    "/solutions/dynamic-ai-routing",
    ["dynamic AI routing", "multi-LLM orchestration", "AI cost optimization", "9-tier algorithms", "self-evolving AI"]
  )
}

export default function Page() {
  return <DynamicAIRoutingPage />
}
