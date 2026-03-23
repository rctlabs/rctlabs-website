import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import ProductsClient from "./ProductsClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "Products",
    "ผลิตภัณฑ์",
    "RCT Labs products: RCTLabs testing platform, ARTENT AI creative engine, and Signed AI verification system. Enterprise AI solutions built on constitutional AI principles.",
    "ผลิตภัณฑ์ RCT Labs: แพลตฟอร์มทดสอบ RCTLabs, ARTENT AI และระบบตรวจสอบ Signed AI สำหรับองค์กร",
    "/products",
    ["RCTLabs platform", "ARTENT AI", "Signed AI", "AI verification", "AI testing platform"]
  )
}

export default function ProductsPage() {
  return <ProductsClient />
}
