import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import WhitepaperClient from "./WhitepaperClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "Whitepapers & Technical Documentation",
    "เอกสารทางเทคนิคและ Whitepaper",
    "Technical whitepapers from RCT Labs: RCT Operating System architecture, Constitutional AI design principles, FDIA benchmark methodology, and enterprise integration guides.",
    "เอกสารทางเทคนิคจาก RCT Labs: สถาปัตยกรรม RCT Operating System, หลักการออกแบบ Constitutional AI, ระเบียบวิธี FDIA Benchmark และคู่มือการ Integration ระดับองค์กร",
    "/whitepaper",
    ["AI whitepaper", "technical documentation", "RCT OS whitepaper", "constitutional AI paper", "FDIA methodology"]
  )
}

export default function WhitepaperPage() {
  return <WhitepaperClient />
}
