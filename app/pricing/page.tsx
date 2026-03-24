import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import PricingClient from "./PricingClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "Pricing",
    "ราคา",
    "Transparent enterprise pricing for RCT Labs. RCTLabs testing platform, ARTENT AI, and Signed AI — custom enterprise plans with no hidden fees. Contact sales for quotes.",
    "ราคาสำหรับองค์กรที่โปร่งใส RCTLabs, ARTENT AI และ Signed AI — แผนสำหรับองค์กรแบบกำหนดเอง ไม่มีค่าใช้จ่ายซ่อนเร้น",
    "/pricing",
    ["enterprise pricing", "AI platform pricing", "RCTLabs pricing", "contact sales", "AI subscription"]
  )
}

export default function PricingPage() {
  return <PricingClient />
}
