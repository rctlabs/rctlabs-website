import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
import IntegrationClient from "./IntegrationClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Integration Guide",
    "คู่มือการเชื่อมต่อ",
    "Integrate RCT Labs with your stack: Notion, Slack, GitHub, file systems, databases, and 20+ enterprise tools via MCP (Model Context Protocol). Step-by-step integration guides.",
    "เชื่อมต่อ RCT Labs กับระบบของคุณ: Notion, Slack, GitHub, ระบบไฟล์, ฐานข้อมูล และเครื่องมือองค์กร 20+ ผ่าน MCP",
    "/integration",
    ["MCP integration", "Notion AI integration", "Slack AI", "GitHub AI", "enterprise integration", "Model Context Protocol"]
  )
}

export default async function IntegrationPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Integration Guide", url: `${SITE_URL}/integration` },
  ])
  const techDocSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "RCT Labs Integration Guide — MCP, Notion, Slack, GitHub",
    "description": "Integrate RCT Labs with 20+ enterprise tools via MCP (Model Context Protocol). Step-by-step guides for Notion, Slack, GitHub, databases.",
    "url": `${SITE_URL}/integration`,
    "publisher": { "@type": "Organization", "name": "RCT Labs", "url": SITE_URL },
    "inLanguage": "en",
  }
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(techDocSchema) }} />
      <IntegrationClient />
    </>
  )
}
