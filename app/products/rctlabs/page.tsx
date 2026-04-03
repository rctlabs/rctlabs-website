import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import RCTLabsPage from "./RCTLabsClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "RCTLabs — AI Testing Platform with 62,205+ Test Cases",
    "RCTLabs — แพลตฟอร์มทดสอบ AI กว่า 62,205 Test Cases",
    "Integrated AI testing platform with 62,205+ automated test cases across 9 tiers. Validate, benchmark, and certify AI models with unit testing, integration testing, and regression analysis.",
    "แพลตฟอร์มทดสอบ AI แบบบูรณาการกว่า 62,205 Test Cases ครอบคลุม 9 Tiers ตรวจสอบ Benchmark และรับรอง AI Models ด้วย Unit Testing, Integration Testing และ Regression Analysis",
    "/products/rctlabs",
    ["AI testing platform", "62205 test cases", "9-tier validation", "AI benchmarking", "regression testing AI"]
  )
}

export default async function Page() {
  return <RCTLabsPage />
}
