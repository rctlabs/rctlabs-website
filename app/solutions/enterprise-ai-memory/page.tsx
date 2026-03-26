import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import EnterpriseAIMemoryPage from "./EnterpriseMemoryClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "Enterprise AI Memory — Persistent Context with 74% Compression",
    "Enterprise AI Memory — Persistent Context พร้อม Compression 74%",
    "Extend enterprise AI beyond the context window with persistent memory, hybrid storage, governed recall, and 74% delta compression.",
    "ขยาย AI องค์กรให้เกินข้อจำกัดของ context window ด้วย persistent memory, hybrid storage, governed recall และ delta compression 74%",
    "/solutions/enterprise-ai-memory",
    ["enterprise AI memory", "RCTDB", "vector database", "AI context window", "8-dimensional schema", "delta compression"]
  )
}

export default function Page() {
  return <EnterpriseAIMemoryPage />
}
