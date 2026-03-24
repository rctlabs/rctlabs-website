import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import IntegrationClient from "./IntegrationClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "Integration Guide",
    "คู่มือการเชื่อมต่อ",
    "Integrate RCT Labs with your stack: Notion, Slack, GitHub, file systems, databases, and 20+ enterprise tools via MCP (Model Context Protocol). Step-by-step integration guides.",
    "เชื่อมต่อ RCT Labs กับระบบของคุณ: Notion, Slack, GitHub, ระบบไฟล์, ฐานข้อมูล และเครื่องมือองค์กร 20+ ผ่าน MCP คู่มือการ Integration แบบ Step-by-Step",
    "/integration",
    ["MCP integration", "Notion AI integration", "Slack AI", "GitHub AI", "enterprise integration", "Model Context Protocol"]
  )
}

export default function IntegrationPage() {
  return <IntegrationClient />
}
