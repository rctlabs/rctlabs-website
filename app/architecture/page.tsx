import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import ArchitectureClient from "./ArchitectureClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "10-Layer AI Architecture",
    "สถาปัตยกรรม AI 10 ชั้น",
    "RCT Labs 10-layer constitutional AI architecture: from hardware abstraction to self-evolving orchestration. The production AI stack powering enterprise-grade multi-LLM systems.",
    "สถาปัตยกรรม AI 10 ชั้นจาก RCT Labs: จาก Hardware Abstraction ถึง Self-Evolving Orchestration สแต็ก AI ระดับ Production สำหรับระบบ Multi-LLM ระดับองค์กร",
    "/architecture",
    ["AI architecture", "10-layer AI", "multi-LLM orchestration", "constitutional AI stack", "production AI infrastructure"]
  )
}

export default function ArchitecturePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Architecture", url: "https://rctlabs.co/en/architecture" },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "What is the RCT Labs 10-layer AI architecture?",
      answer:
        "The RCT Labs 10-layer architecture is a constitutional AI stack that spans from hardware abstraction at the base to self-evolving orchestration at the top. Each layer is designed to enforce verifiability, intent continuity, and multi-LLM consensus across the full AI lifecycle.",
    },
    {
      question: "How does the 10-layer architecture differ from standard LLM deployments?",
      answer:
        "Unlike single-model or RAG-based deployments, the RCT 10-layer architecture introduces SignedAI verification, RCTDB enterprise memory, and the JITNA protocol for intent continuity — enabling governed, auditable AI at every layer rather than relying on a single model's output.",
    },
    {
      question: "What is the role of the FDIA equation in the architecture?",
      answer:
        "The FDIA equation (F = (D^I) × A) is the governing principle of the architecture. Data (D) raised to the power of Intent (I) and multiplied by the Architect (A) captures how structured intent exponentially amplifies the value of available data, with human oversight as the final multiplier.",
    },
    {
      question: "สถาปัตยกรรม 10 ชั้นของ RCT Labs คืออะไร?",
      answer:
        "สถาปัตยกรรม 10 ชั้นของ RCT Labs คือสแต็ก AI แบบ constitutional ที่ครอบคลุมตั้งแต่ Hardware Abstraction ที่ฐาน ไปจนถึง Self-Evolving Orchestration ที่ยอด แต่ละชั้นออกแบบมาเพื่อบังคับใช้การตรวจสอบ ความต่อเนื่องของ Intent และ Multi-LLM Consensus ตลอด AI lifecycle ทั้งหมด",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArchitectureClient />
    </>
  )
}
