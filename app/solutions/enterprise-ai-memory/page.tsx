import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import EnterpriseAIMemoryPage from "./EnterpriseMemoryClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "Enterprise AI Memory — RCTDB v2.0 with 8D Schema & 79% Compression",
    "Enterprise AI Memory — RCTDB v2.0 Schema 8 มิติ และ Compression 79%",
    "Overcome context window limits with RCTDB v2.0 — hybrid 3-layer database (Vector, Graph, SQL) with 8-dimensional schema, 79% delta compression, and infinite session persistence.",
    "ก้าวข้าม Context Window ด้วย RCTDB v2.0 ฐานข้อมูล Hybrid 3 ชั้น (Vector, Graph, SQL) Schema 8 มิติ Delta Compression 79% และ Session Persistence อนันต์",
    "/solutions/enterprise-ai-memory",
    ["enterprise AI memory", "RCTDB", "vector database", "AI context window", "8-dimensional schema", "delta compression"]
  )
}

export default function Page() {
  return <EnterpriseAIMemoryPage />
}
