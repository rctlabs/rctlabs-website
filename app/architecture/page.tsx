import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
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
  return <ArchitectureClient />
}
