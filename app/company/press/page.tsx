import type { Metadata } from "next"
import Link from "next/link"
import { headers } from "next/headers"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight, ExternalLink, FileText, Mail, Mic, ShieldCheck } from "lucide-react"
import { createBilingualMetadata, type Locale } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getFAQSchema, getOrganizationSchema } from "@/lib/schema"

function getLocale(value: string | null): Locale {
  return value === "th" ? "th" : "en"
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale((await headers()).get("x-locale"))

  return createBilingualMetadata(
    locale,
    "Press & Media",
    "ข่าวสารและสื่อ",
    "Press resources, company facts, validation references, and media contact information for journalists, analysts, and ecosystem partners evaluating RCT Labs.",
    "ศูนย์รวมข้อมูลสื่อ ข่าวสาร ข้อเท็จจริงของบริษัท เอกสารอ้างอิงการตรวจสอบ และช่องทางติดต่อสำหรับสื่อ นักวิเคราะห์ และพันธมิตรที่ต้องการประเมิน RCT Labs",
    "/company/press",
    ["RCT Labs press", "AI company press kit", "constitutional AI media", "enterprise AI research", "RCT Labs company facts"]
  )
}

export default async function PressPage() {
  const locale = getLocale((await headers()).get("x-locale"))
  const localePrefix = locale === "th" ? "/th" : "/en"

  const releases = [
    {
      date: "November 9, 2025",
      title: "RCT Labs Releases Intent OS Open Protocol",
      excerpt:
        "Launching open-source protocol for intent-driven application development, advancing AI alignment research.",
      category: "Product Launch",
    },
    {
      date: "November 2, 2025",
      title: "RCT Labs Publishes FDIA Formula Research",
      excerpt:
        "Peer-reviewed paper on F=(D^I)×A framework accepted by top AI conference, gaining international recognition.",
      category: "Research",
    },
    {
      date: "October 28, 2025",
      title: "Community Milestone: 5,000+ Members",
      excerpt:
        "RCT Labs community reaches 5,000 members across Discord, GitHub, and forums, growing intent-driven AI movement.",
      category: "Community",
    },
    {
      date: "October 15, 2025",
      title: "RCT-7 Process Implementation Guide Published",
      excerpt: "Free comprehensive guide for organizations implementing intent-driven systems using RCT methodology.",
      category: "Education",
    },
  ]

  const mediaResources = locale === "th"
    ? [
        { title: "Company Facts", desc: "ภาพรวมภารกิจ ผลิตภัณฑ์ และตัวเลขอ้างอิงหลักสำหรับผู้สื่อข่าว" },
        { title: "Research & Protocol Links", desc: "ลิงก์ตรงไปยัง FDIA, JITNA และ benchmark pages" },
        { title: "Brand Usage Requests", desc: "ขอไฟล์โลโก้และ asset pack ผ่านทีมงานโดยตรง" },
        { title: "Interview Requests", desc: "ช่องทางติดต่อสำหรับ analyst briefings และสื่อ" },
      ]
    : [
        { title: "Company Facts", desc: "Mission, product overview, and key validation stats for journalists and analysts." },
        { title: "Research & Protocol Links", desc: "Direct references to FDIA, JITNA, and benchmark pages." },
        { title: "Brand Usage Requests", desc: "Request logos and asset packages directly from the team." },
        { title: "Interview Requests", desc: "Contact path for analyst briefings and media conversations." },
      ]

  const faqItems = locale === "th"
    ? [
        {
          question: "สื่อควรเริ่มอ่านจากหน้าไหนก่อน",
          answer:
            "ควรเริ่มจาก company facts ด้านล่าง จากนั้นอ่าน Open Protocols, Benchmark และ Stardew Valley case study เพื่อเข้าใจทั้งแนวคิด ผลการตรวจสอบ และตัวอย่างการใช้งานจริง",
        },
        {
          question: "RCT Labs มีหลักฐานเชิงเทคนิคอะไรสำหรับการอ้างอิง",
          answer:
            "มี protocol pages, benchmark page, architecture page และ case study เชิงเทคนิคที่ช่วยอธิบาย system design, validation metrics และ deployment logic ของแพลตฟอร์ม",
        },
      ]
    : [
        {
          question: "Where should media or analysts start?",
          answer:
            "Start with the company facts below, then review the Open Protocols, Benchmark, and Stardew Valley case study pages to understand the concepts, validation claims, and technical application of the platform.",
        },
        {
          question: "What technical evidence does RCT Labs provide for reference?",
          answer:
            "RCT Labs publishes protocol pages, benchmark results, architecture documentation, and technical case studies to explain the system design, validation metrics, and deployment logic behind the platform.",
        },
      ]

  const companyFacts = [
    { label: "Core Positioning", value: "Constitutional AI Operating System" },
    { label: "Architecture", value: "10 Layers" },
    { label: "Algorithms", value: "41 production algorithms" },
    { label: "Validation Coverage", value: "3,765 tests" },
    { label: "Hallucination Benchmark", value: "0.3%" },
    { label: "Uptime", value: "99.98%" },
  ]

  const referenceLinks = locale === "th"
    ? [
        { href: `${localePrefix}/protocols`, title: "Open Protocols", desc: "อ่าน FDIA, JITNA และแนวคิดหลักของ RCT" },
        { href: `${localePrefix}/benchmark`, title: "Benchmark", desc: "ดูตัวเลขเปรียบเทียบด้าน accuracy, latency และ hallucination" },
        { href: `${localePrefix}/architecture`, title: "Architecture", desc: "ดู 10-layer platform architecture" },
        { href: `${localePrefix}/case-studies/stardew-valley`, title: "Case Study", desc: "ดูตัวอย่าง integration เชิงเทคนิคแบบ server-rendered" },
      ]
    : [
        { href: `${localePrefix}/protocols`, title: "Open Protocols", desc: "Review FDIA, JITNA, and the conceptual foundation of RCT." },
        { href: `${localePrefix}/benchmark`, title: "Benchmark", desc: "Inspect accuracy, latency, and hallucination comparisons." },
        { href: `${localePrefix}/architecture`, title: "Architecture", desc: "See the 10-layer platform architecture." },
        { href: `${localePrefix}/case-studies/stardew-valley`, title: "Case Study", desc: "Inspect a server-rendered technical integration example." },
      ]

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Company", url: `https://rctlabs.co${localePrefix}/company` },
    { name: "Press", url: `https://rctlabs.co${localePrefix}/company/press` },
  ])
  const faqSchema = getFAQSchema(faqItems)
  const organizationSchema = getOrganizationSchema(locale)

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
          <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 text-sm font-medium text-accent">
                <FileText className="w-4 h-4" />
                <span>{locale === "th" ? "Press & Media Center" : "Press & Media Center"}</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
                  {locale === "th" ? "ข่าวสาร ข้อมูลอ้างอิง และช่องทางสื่อของ RCT Labs" : "Press Resources, Company Facts, and Media References for RCT Labs"}
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  {locale === "th"
                    ? "หน้านี้รวบรวมข้อมูลที่สื่อ นักวิเคราะห์ และพันธมิตรใช้ประเมิน RCT Labs ได้เร็วขึ้น ทั้ง company facts, technical references, benchmark links และช่องทางติดต่อสำหรับ press briefings"
                    : "This page gives journalists, analysts, and ecosystem partners a faster path to evaluate RCT Labs through company facts, technical references, benchmark links, and media contact details."}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href={`${localePrefix}/contact`}>
                    {locale === "th" ? "ติดต่อทีมสื่อ" : "Contact the Press Team"} <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`${localePrefix}/benchmark`}>
                    {locale === "th" ? "ดู Benchmark" : "View Benchmark"}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-semibold text-foreground">
                  {locale === "th" ? "Company Facts Snapshot" : "Company Facts Snapshot"}
                </h2>
              </div>
              <div className="space-y-3">
                {companyFacts.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-background/70 px-4 py-3">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-semibold text-foreground text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-24">
          <div className="mb-12 max-w-3xl space-y-3">
            <h2 className="text-4xl font-bold text-foreground">{locale === "th" ? "Recent Releases" : "Recent Releases"}</h2>
            <p className="text-muted-foreground">
              {locale === "th"
                ? "รายการข่าวนี้ช่วยให้ผู้สื่อข่าวเห็น chronology ของงานวิจัย การเปิดตัว protocol และ community milestones ของ RCT Labs"
                : "This release list gives media and analysts a quick chronology of RCT Labs research, protocol launches, and ecosystem milestones."}
            </p>
          </div>
          <div className="space-y-6">
            {releases.map((release) => (
              <div key={`${release.date}-${release.title}`} className="group rounded-lg border border-border bg-card p-8 transition hover:border-accent/50 hover:shadow-lg">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">{release.category}</span>
                      <span className="text-xs text-muted-foreground">{release.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight text-foreground transition group-hover:text-accent">{release.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{release.excerpt}</p>
                    <div className="flex items-center gap-2 pt-2 font-semibold text-accent">
                      <span>{locale === "th" ? "Request details" : "Request details"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl rounded-lg bg-linear-to-r from-accent/5 to-secondary/5 px-4 py-24">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">{locale === "th" ? "Media Resources" : "Media Resources"}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {locale === "th"
                  ? "แหล่งข้อมูลหลักสำหรับ brand usage, company facts, references และการประสานงานกับทีมสื่อ"
                  : "Primary resources for brand usage, company facts, references, and press coordination."}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {mediaResources.map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-background p-6 transition hover:border-accent/50">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{item.desc}</p>
                  <Button variant="outline" size="sm" asChild className="gap-2 bg-transparent">
                    <Link href={`${localePrefix}/contact`}>
                      <Mail className="w-4 h-4" />
                      {locale === "th" ? "Request via Contact" : "Request via Contact"}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-24">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 flex items-center gap-3">
                <Mic className="w-5 h-5 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">{locale === "th" ? "FAQ สำหรับสื่อและนักวิเคราะห์" : "FAQ for Media and Analysts"}</h2>
              </div>
              <div className="space-y-3">
                {faqItems.map((faq) => (
                  <details key={faq.question} className="rounded-xl border border-border bg-background/70 p-4">
                    <summary className="list-none cursor-pointer font-semibold text-foreground">{faq.question}</summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">{locale === "th" ? "Technical Reference Links" : "Technical Reference Links"}</h2>
              <div className="space-y-3">
                {referenceLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="block rounded-xl border border-border bg-background/70 p-4 transition-colors hover:border-accent/40 hover:bg-accent/5">
                    <div className="text-sm font-semibold text-foreground">{item.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{item.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-24">
          <div className="rounded-lg bg-primary p-12 text-center text-primary-foreground md:p-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">{locale === "th" ? "ต้องการนัดคุยกับทีมสื่อหรือไม่" : "Need a Media or Analyst Briefing?"}</h2>
              <p className="mx-auto max-w-2xl text-lg opacity-90">
                {locale === "th"
                  ? "สำหรับ press inquiry, interview request, analyst briefing หรือการขอข้อมูลอ้างอิงเพิ่มเติม สามารถติดต่อทีมงานได้โดยตรงผ่าน contact flow"
                  : "For press inquiries, interview requests, analyst briefings, or additional reference requests, contact the team directly through the main contact flow."}
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href={`${localePrefix}/contact`} className="gap-2">
                  {locale === "th" ? "ติดต่อทีมสื่อ" : "Contact Press Team"} <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
