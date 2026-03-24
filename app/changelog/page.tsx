import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import ChangelogClient from "./ChangelogClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "Changelog",
    "บันทึกการเปลี่ยนแปลง",
    "RCT Labs product changelog: version history, feature releases, performance improvements, and breaking changes across all RCT products and protocols.",
    "บันทึกการเปลี่ยนแปลงผลิตภัณฑ์ RCT Labs: ประวัติเวอร์ชัน การเปิดตัวฟีเจอร์ การปรับปรุงประสิทธิภาพ และการเปลี่ยนแปลงสำคัญ",
    "/changelog",
    ["RCT Labs changelog", "version history", "release notes", "product updates", "AI platform updates"]
  )
}

export default function ChangelogPage() {
  return <ChangelogClient />
}
