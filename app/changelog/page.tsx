import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getSoftwareApplicationSchema } from "@/lib/schema"
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
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Changelog", url: "https://rctlabs.co/en/changelog" },
  ])

  const softwareSchema = {
    ...getSoftwareApplicationSchema("en"),
    releaseNotes: "https://rctlabs.co/en/changelog",
    softwareHelp: "https://rctlabs.co/en/docs",
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <ChangelogClient />
    </>
  )
}
