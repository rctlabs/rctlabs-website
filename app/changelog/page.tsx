import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getSoftwareApplicationSchema } from "@/lib/schema"
import ChangelogClient from "./ChangelogClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Changelog",
    "บันทึกการเปลี่ยนแปลง",
    "RCT Labs product changelog: version history, feature releases, performance improvements, and breaking changes across all RCT products and protocols.",
    "บันทึกการเปลี่ยนแปลงผลิตภัณฑ์ RCT Labs: ประวัติเวอร์ชัน การเปิดตัวฟีเจอร์ การปรับปรุงประสิทธิภาพ และการเปลี่ยนแปลงสำคัญ",
    "/changelog",
    ["RCT Labs changelog", "version history", "release notes", "product updates", "AI platform updates"]
  )
}

export default async function ChangelogPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Changelog", url: `https://rctlabs.co${localePrefix}/changelog` },
  ])

  const softwareSchema = {
    ...getSoftwareApplicationSchema(locale),
    releaseNotes: `https://rctlabs.co${localePrefix}/changelog`,
    softwareHelp: `https://rctlabs.co${localePrefix}/docs`,
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <ChangelogClient />
    </>
  )
}
