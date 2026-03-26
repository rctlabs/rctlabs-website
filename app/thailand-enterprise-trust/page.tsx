import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Thailand Enterprise Trust Layer — Thai Institutional Context for AI Governance and Adoption",
    "Thailand Enterprise Trust Layer — บริบทสถาบันไทยสำหรับ AI Governance และการนำไปใช้ระดับองค์กร",
    "A Thailand trust layer page connecting enterprise AI adoption to Thai institutional context, digital standards, promotion pathways, and financial-sector innovation signals using public official sources.",
    "หน้าบริบทความน่าเชื่อถือสำหรับประเทศไทย เชื่อมโยงการนำ AI ไปใช้ระดับองค์กรกับมาตรฐานดิจิทัล การส่งเสริมเศรษฐกิจดิจิทัล และสัญญาณด้านนวัตกรรมการเงินจากแหล่งทางการ",
    "/thailand-enterprise-trust",
    ["Thailand AI governance", "Thailand enterprise AI", "Thailand digital trust"]
  )
}

const sourceCards = [
  {
    name: "ETDA",
    href: "https://www.etda.or.th/en/",
    supportingHref: "https://www.etda.or.th/en/Our-Service/Standard.aspx",
    summary: "Electronic Transactions Development Agency pages describing digital trusted services, infrastructure, standards, and certification-oriented service areas.",
  },
  {
    name: "depa",
    href: "https://www.depa.or.th/en/home",
    supportingHref: "https://www.depa.or.th/en/",
    summary: "Digital Economy Promotion Agency pages showing digital-economy promotion, service pathways, and visible AI transformation activity in Thailand.",
  },
  {
    name: "Bank of Thailand",
    href: "https://www.bot.or.th/en/home.html",
    supportingHref: "https://www.bot.or.th/en/financial-innovation/financial-landscape.html",
    summary: "Bank of Thailand materials outlining financial innovation, digital economy transition, risk management, resiliency, and supervisory thinking relevant to high-trust AI adoption.",
  },
]

export default async function ThailandEnterpriseTrustPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Thailand Enterprise Trust Layer", url: `https://rctlabs.co${localePrefix}/thailand-enterprise-trust` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: isTh ? "หน้านี้คือเอกสารกฎหมายหรือ compliance advice หรือไม่" : "Is this page legal or compliance advice?",
      answer: isTh
        ? "ไม่ใช่ หน้านี้เป็น public-facing trust layer ที่เชื่อมโยงแหล่งทางการของไทยเข้ากับการอธิบายแนวทางประเมินระบบ AI ระดับองค์กร"
        : "No. This is a public-facing trust layer that connects Thai official sources with enterprise AI evaluation framing.",
    },
    {
      question: isTh ? "ทำไมต้องมีหน้าเฉพาะสำหรับประเทศไทย" : "Why create a Thailand-specific trust page?",
      answer: isTh
        ? "เพราะการตัดสินใจระดับองค์กรในไทยมักต้องอาศัยบริบทด้านมาตรฐานดิจิทัล หน่วยงานรัฐ การส่งเสริมเศรษฐกิจดิจิทัล และสัญญาณด้านความเสี่ยงจากภาคการเงินร่วมกัน"
        : "Because enterprise adoption in Thailand often depends on a combination of digital standards, public-institution context, digital-economy promotion, and risk signals from financial-sector thinking.",
    },
  ])

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-accent">{isTh ? "Regional trust layer" : "Regional trust layer"}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">{isTh ? "Thailand Enterprise Trust Layer" : "Thailand Enterprise Trust Layer"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh
              ? "หน้ากลางสำหรับอธิบายว่าการประเมิน AI ระดับองค์กรในไทยควรเชื่อมกับบริบทของหน่วยงานสาธารณะ มาตรฐานดิจิทัล การส่งเสริมเศรษฐกิจดิจิทัล และความคิดเชิงกำกับดูแลอย่างไร"
              : "A regional trust page showing how enterprise AI evaluation in Thailand can be grounded in public-institution context, digital standards, digital-economy promotion, and supervisory thinking."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {sourceCards.map((card) => (
            <div key={card.name} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-foreground">{card.name}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.summary}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a href={card.href} target="_blank" rel="noreferrer" className="font-medium text-accent hover:underline">{isTh ? "Official page" : "Official page"}</a>
                <a href={card.supportingHref} target="_blank" rel="noreferrer" className="font-medium text-accent hover:underline">{isTh ? "Supporting source" : "Supporting source"}</a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold text-foreground">{isTh ? "วิธีใช้ trust layer นี้" : "How to use this trust layer"}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {isTh
                ? "ใช้หน้านี้เพื่อช่วยให้ buyer หรือทีม architecture ในไทยเห็นว่าระบบ AI ควรถูกอธิบายเชื่อมกับมาตรฐาน สถาบัน และบริบทภายในประเทศ ไม่ใช่เพียงอ้าง framework ระดับโลกอย่างเดียว"
                : "Use this page to show buyers and architecture teams in Thailand that AI systems should be explained in relation to local institutions, standards, and adoption context rather than global frameworks alone."}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold text-foreground">{isTh ? "สิ่งที่หน้าเว็บควรเชื่อมต่อ" : "What the public site should connect"}</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
              <li>{isTh ? "global governance framework ไปสู่ Thailand deployment reality" : "Global governance frameworks to Thailand deployment reality"}</li>
              <li>{isTh ? "bilingual operation ไปสู่ risk and meaning preservation" : "Bilingual operation to risk and meaning preservation"}</li>
              <li>{isTh ? "buyer evaluation ไปสู่ procurement and contact path" : "Buyer evaluation to procurement and contact paths"}</li>
              <li>{isTh ? "research language ไปสู่ roadmap, benchmark, และ release maturity" : "Research language to roadmap, benchmark, and release maturity"}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "อ่านต่อในบริบทไทย" : "Continue in Thailand context"}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`${localePrefix}/blog/constitutional-ai-thailand-enterprise-guide`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "Thailand constitutional AI guide" : "Thailand constitutional AI guide"}</Link>
            <Link href={`${localePrefix}/methodology`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Methodology</Link>
            <Link href={`${localePrefix}/evaluation`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Evaluation Hub</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}