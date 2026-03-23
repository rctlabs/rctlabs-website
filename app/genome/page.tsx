import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import GenomeClient from "./GenomeClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "7 Genome System",
    "ระบบ Genome 7 ชั้น",
    "The RCT 7 Genome System: WHY, WHAT, HOW, WHO, WHEN, WHERE, and IMPROVEMENT — a cognitive architecture that gives AI systems purpose, identity, and the ability to self-evolve.",
    "ระบบ Genome 7 ชั้นของ RCT: WHY, WHAT, HOW, WHO, WHEN, WHERE และ IMPROVEMENT — สถาปัตยกรรมทางปัญญาที่ให้ AI มีเป้าหมาย ตัวตน และความสามารถในการพัฒนาตนเอง",
    "/genome",
    ["7 genome AI", "AI cognitive architecture", "WHY genome", "HOW genome", "self-evolving AI", "AI personality"]
  )
}

export default function GenomePage() {
  return <GenomeClient />
}
