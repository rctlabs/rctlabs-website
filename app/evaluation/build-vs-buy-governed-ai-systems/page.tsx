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
    "Build vs Buy for Governed AI Systems — Which Layers Should You Own?",
    "Build vs Buy for Governed AI Systems — องค์กรควรถือครองชั้นไหนเอง",
    "A keyword-targeted comparison page explaining how enterprise teams should think about build vs buy decisions for governed AI systems across governance, routing, memory, verification, and release operations.",
    "หน้าเปรียบเทียบแบบ keyword-targeted อธิบายว่าองค์กรควรคิดเรื่อง build vs buy สำหรับ governed AI systems อย่างไรในชั้น governance, routing, memory, verification และ release operations",
    "/evaluation/build-vs-buy-governed-ai-systems",
    ["build vs buy governed ai systems", "enterprise ai build vs buy", "governed ai platform decision"]
  )
}

export default async function BuildVsBuyGovernedAiPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Evaluation", url: `https://rctlabs.co${localePrefix}/evaluation` },
    { name: "Build vs Buy for Governed AI Systems", url: `https://rctlabs.co${localePrefix}/evaluation/build-vs-buy-governed-ai-systems` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: isTh ? "คำถาม build vs buy ควรถามแบบไหน" : "How should teams frame the build vs buy question?",
      answer: isTh
        ? "อย่าถามเพียงว่าจะสร้างเองหรือซื้อทั้งหมด แต่ให้ถามว่าองค์กรต้องการถือครอง layer ใดเอง เช่น governance, routing, memory, verification หรือ release control"
        : "Do not ask only whether to build everything or buy everything. Ask which layers the organization wants to own, such as governance, routing, memory, verification, or release control.",
    },
    {
      question: isTh ? "อะไรคือความเสี่ยงของการซื้อแบบ black box" : "What is the risk of buying a black-box system?",
      answer: isTh
        ? "องค์กรอาจได้ความเร็วในการเริ่มต้น แต่สูญเสียความสามารถในการ audit, tune, explain และปรับระบบให้เข้ากับ risk model ของตนเอง"
        : "Teams may gain initial speed but lose the ability to audit, tune, explain, and adapt the system to their own risk model.",
    },
  ])

  const layers = [
    {
      title: isTh ? "Governance layer" : "Governance layer",
      body: isTh ? "ถ้าองค์กรมีข้อกำหนดเฉพาะด้าน policy, refusal, approval หรือ escalation ก็มักต้องการสิทธิ์ควบคุม layer นี้สูงกว่าปกติ" : "If the organization has specific requirements around policy, refusal, approval, or escalation, it usually needs stronger control over this layer.",
    },
    {
      title: isTh ? "Routing and model selection" : "Routing and model selection",
      body: isTh ? "องค์กรบางแห่งยอมซื้อ platform สำเร็จรูปได้ แต่ยังต้องคุม routing logic เองเพื่อให้เข้ากับ cost, risk, และ SLA ของตน" : "Some teams can buy a platform but still need to own routing logic so it aligns with their cost, risk, and SLA model.",
    },
    {
      title: isTh ? "Memory and data controls" : "Memory and data controls",
      body: isTh ? "นี่คือชั้นที่มักผูกกับ data boundary, retention, audit และ enterprise trust โดยตรง จึงไม่ควรถูกตัดสินด้วยราคาเพียงอย่างเดียว" : "This layer often ties directly to data boundaries, retention, auditability, and enterprise trust, so it should not be decided on price alone.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-accent">{isTh ? "Procurement framing" : "Procurement framing"}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">{isTh ? "Build vs Buy for Governed AI Systems" : "Build vs Buy for Governed AI Systems"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh
              ? "คำถาม build vs buy สำหรับ AI ระดับองค์กรไม่ใช่คำถาม binary. สิ่งที่ buyer ต้องการจริงคือความชัดเจนว่า layer ไหนควรซื้อเพื่อความเร็ว และ layer ไหนควรถือครองเองเพื่อความเสี่ยงและความโปร่งใส"
              : "Build versus buy is not a binary question for enterprise AI. Buyers need clarity on which layers should be purchased for speed and which should be owned for risk control and transparency."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {layers.map((layer) => (
            <div key={layer.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-foreground">{layer.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{layer.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "Recommended next steps" : "Recommended next steps"}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`${localePrefix}/evaluation/enterprise-ai-governance-vs-generic-copilots`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "ดู governance comparison" : "Review governance comparison"}</Link>
            <Link href={`${localePrefix}/pricing`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Pricing</Link>
            <Link href={`${localePrefix}/contact`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Contact</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}