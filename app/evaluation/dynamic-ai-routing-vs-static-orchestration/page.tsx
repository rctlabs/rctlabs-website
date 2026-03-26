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
    "Dynamic AI Routing vs Static Orchestration — Cost, Risk, and Quality Tradeoffs",
    "Dynamic AI Routing vs Static Orchestration — จุดแลกเปลี่ยนด้านต้นทุน ความเสี่ยง และคุณภาพ",
    "A comparison page explaining why dynamic AI routing differs from static single-model orchestration across cost control, latency handling, risk segmentation, and workload fit.",
    "หน้าเปรียบเทียบที่อธิบายว่า dynamic AI routing ต่างจาก static single-model orchestration อย่างไรในด้านต้นทุน latency การแบ่งระดับความเสี่ยง และความเหมาะสมกับ workload",
    "/evaluation/dynamic-ai-routing-vs-static-orchestration",
    ["dynamic ai routing vs static orchestration", "ai routing comparison", "single model orchestration buyers"]
  )
}

export default async function DynamicRoutingVsStaticPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Evaluation", url: `https://rctlabs.co${localePrefix}/evaluation` },
    { name: "Dynamic AI Routing vs Static Orchestration", url: `https://rctlabs.co${localePrefix}/evaluation/dynamic-ai-routing-vs-static-orchestration` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: isTh ? "routing จำเป็นเมื่อไร" : "When is routing necessary?",
      answer: isTh
        ? "routing สำคัญเมื่อ workload มีหลายระดับความเสี่ยง หลายระดับความซับซ้อน หรือต้องบริหารต้นทุนและ latency ให้แตกต่างกันตามชนิดงาน"
        : "Routing matters when workloads vary in risk, complexity, or the cost-latency profile required for each request type.",
    },
    {
      question: isTh ? "static orchestration ใช้งานไม่ได้หรือ" : "Is static orchestration unusable?",
      answer: isTh
        ? "ไม่ใช่ static orchestration อาจเพียงพอในบางกรณี แต่จะเริ่มตึงเมื่อระบบต้องรองรับหลายชนิดงานและหลายระดับการควบคุมพร้อมกัน"
        : "No. Static orchestration can be sufficient in some cases, but it becomes limiting when the system must support many workload types and control levels simultaneously.",
    },
  ])

  const tradeoffs = [
    {
      label: isTh ? "Cost shaping" : "Cost shaping",
      dynamicText: isTh ? "เลือก path ที่เหมาะกับแต่ละคำขอ ลดการใช้โมเดลแพงเกินจำเป็น" : "Selects a path per request so expensive models are reserved for the jobs that actually need them.",
      staticText: isTh ? "ต้นทุนมีแนวโน้มคงที่หรือสูงเกินไปเพราะทุกงานผ่าน path เดียว" : "Cost tends to stay flat or unnecessarily high because every task flows through the same path.",
    },
    {
      label: isTh ? "Risk segmentation" : "Risk segmentation",
      dynamicText: isTh ? "แยกงาน low-risk, medium-risk, high-risk ไปคนละ route ได้" : "Can segment low-risk, medium-risk, and high-risk work into different routes.",
      staticText: isTh ? "ต้องพยายามยัดทุกงานให้อยู่ภายใต้ชุดกฎเดียวกัน" : "Forces every workload into one common policy and execution model.",
    },
    {
      label: isTh ? "Latency control" : "Latency control",
      dynamicText: isTh ? "งานที่ต้องเร็วสามารถวิ่ง path สั้นกว่า ส่วนงานที่สำคัญสามารถใช้ verification path ได้" : "Time-sensitive work can take a shorter path while higher-stakes tasks use verification-heavy routes.",
      staticText: isTh ? "latency มักถูกกำหนดโดย path ที่หนักที่สุด" : "Latency is often determined by the heaviest common path.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-accent">{isTh ? "Routing evaluation" : "Routing evaluation"}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">{isTh ? "Dynamic AI Routing vs Static Orchestration" : "Dynamic AI Routing vs Static Orchestration"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh
              ? "ระบบ AI สำหรับองค์กรไม่ควรถูกประเมินแค่จากโมเดลที่ใช้ แต่ควรถูกประเมินจากความสามารถในการ route งานแต่ละชนิดให้เหมาะกับความเสี่ยง ต้นทุน และ SLA"
              : "Enterprise AI systems should not be judged only by the model they use. They should also be judged by how well they route each job to the right cost, risk, and SLA profile."}
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {tradeoffs.map((tradeoff) => (
            <div key={tradeoff.label} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground">{tradeoff.label}</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
                  <div className="text-sm font-medium text-accent">{isTh ? "Dynamic routing" : "Dynamic routing"}</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{tradeoff.dynamicText}</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background/60 p-5">
                  <div className="text-sm font-medium text-foreground">{isTh ? "Static orchestration" : "Static orchestration"}</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{tradeoff.staticText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "เส้นทางต่อเนื่อง" : "Continue evaluating"}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`${localePrefix}/solutions/dynamic-ai-routing`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "ดู dynamic routing solution" : "Explore dynamic routing solution"}</Link>
            <Link href={`${localePrefix}/architecture`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Architecture</Link>
            <Link href={`${localePrefix}/contact`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Contact</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}