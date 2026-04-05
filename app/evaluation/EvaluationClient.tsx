"use client"

import Link from "next/link"
import { m, useReducedMotion } from "framer-motion"
import { useCardSpotlight } from "@/hooks/use-card-spotlight"

interface EvaluationClientProps {
  localePrefix: string
  isTh: boolean
}

export default function EvaluationClient({ localePrefix, isTh }: EvaluationClientProps) {
  const prefersReducedMotion = useReducedMotion()
  const cardSpotlight = useCardSpotlight<HTMLDivElement>()
  const linkSpotlight = useCardSpotlight<HTMLAnchorElement>()

  const comparisons = [
    {
      title: "Enterprise AI governance vs generic copilots",
      titleTh: "Enterprise AI governance vs generic copilots",
      text: "Governance-oriented platforms are evaluated on policy, routing, evidence, rollback, and auditability. Generic copilots are often evaluated mainly on surface productivity.",
      textTh: "แพลตฟอร์มที่เน้น governance ต้องถูกประเมินด้าน policy, routing, evidence, rollback และ auditability ขณะที่ generic copilots มักถูกวัดแค่ productivity ที่ผิวหน้า",
      href: "/evaluation/enterprise-ai-governance-vs-generic-copilots",
    },
    {
      title: "Enterprise AI memory vs large context windows",
      titleTh: "Enterprise AI memory vs large context windows",
      text: "A larger context window increases capacity. A memory system governs what is retained, reused, validated, expired, and explained over time.",
      textTh: "context window ที่ใหญ่ขึ้นคือความจุ แต่ memory system คือวินัยในการเก็บ ใช้ ตรวจสอบ หมดอายุ และอธิบายบริบทในระยะยาว",
      href: "/evaluation/enterprise-ai-memory-vs-large-context-windows",
    },
    {
      title: "Dynamic AI routing vs static orchestration",
      titleTh: "Dynamic AI routing vs static orchestration",
      text: "Routing lets teams vary cost, latency, and risk handling by workload type instead of forcing one path for every request.",
      textTh: "routing ช่วยให้ทีมปรับต้นทุน latency และการจัดการความเสี่ยงตามชนิดงาน แทนการบังคับให้ทุกคำขอผ่าน path เดียวกัน",
      href: "/evaluation/dynamic-ai-routing-vs-static-orchestration",
    },
    {
      title: "Build vs buy for governed AI systems",
      titleTh: "Build vs buy for governed AI systems",
      text: "The real question is not build versus buy in isolation, but which layers you want to own: governance, routing, memory, verification, and ongoing release discipline.",
      textTh: "คำถามจริงไม่ใช่ build หรือ buy แบบโดด ๆ แต่คือองค์กรต้องการถือครองชั้นไหนเองบ้าง เช่น governance, routing, memory, verification และ release discipline",
      href: "/evaluation/build-vs-buy-governed-ai-systems",
    },
    {
      title: "Enterprise AI platform evaluation checklist",
      titleTh: "Enterprise AI platform evaluation checklist",
      text: "A buyer-side checklist should move beyond demos into governance, memory, routing, benchmarks, disclosure boundaries, and operational maturity.",
      textTh: "เช็กลิสต์สำหรับ buyer ควรพาออกจากการดู demo ไปสู่คำถามด้าน governance, memory, routing, benchmark, disclosure boundary และ operational maturity",
      href: "/evaluation/enterprise-ai-platform-evaluation-checklist",
    },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-accent">{isTh ? "เครื่องมือช่วยตัดสินใจฝั่งผู้ซื้อ" : "Buyer-side decision support"}</p>
        <h1 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">{isTh ? "ศูนย์กลางการประเมิน" : "Evaluation Hub"}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {isTh ? "พื้นที่กลางสำหรับหน้า comparison และ buyer evaluation path ของระบบ AI แบบ Ecosystem / OS" : "A central comparison and buyer-evaluation hub for enterprise AI systems presented as an ecosystem or operating system."}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {comparisons.map((item) => (
          <m.div
            key={item.title}
            {...cardSpotlight}
            whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.006 }}
            className="main-page-reactive-card rounded-2xl border border-[#e6ddd0] bg-white p-6 shadow-[0_12px_28px_rgba(84,61,31,0.045)] dark:border-border dark:bg-card"
          >
            <h2 className="text-xl font-semibold text-foreground">{isTh ? item.titleTh : item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{isTh ? item.textTh : item.text}</p>
            <Link href={`${localePrefix}${item.href}`} className="mt-4 inline-flex text-sm font-medium text-accent hover:underline">
              {isTh ? "อ่านหน้าเปรียบเทียบฉบับเต็ม" : "Read the full comparison"}
            </Link>
          </m.div>
        ))}
      </div>

      <div className="main-page-reactive-surface mt-10 rounded-2xl border border-[#e6ddd0] bg-white p-8 shadow-[0_16px_34px_rgba(84,61,31,0.05)] dark:border-border dark:bg-card">
        <h2 className="text-2xl font-bold text-foreground">{isTh ? "เส้นทางการประเมินที่แนะนำ" : "Recommended evaluation path"}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <Link {...linkSpotlight} href={`${localePrefix}/methodology`} className="main-page-reactive-card rounded-xl border border-[#e6ddd0] bg-[#fffaf6] p-5 transition hover:border-accent/50 dark:border-border/70 dark:bg-background/60"><div className="font-semibold text-foreground">{isTh ? "วิธีวิทยา" : "Methodology"}</div></Link>
          <Link {...linkSpotlight} href={`${localePrefix}/benchmark-summary`} className="main-page-reactive-card rounded-xl border border-[#e6ddd0] bg-[#fffaf6] p-5 transition hover:border-accent/50 dark:border-border/70 dark:bg-background/60"><div className="font-semibold text-foreground">{isTh ? "สรุป Benchmark" : "Benchmark Summary"}</div></Link>
          <Link {...linkSpotlight} href={`${localePrefix}/pricing`} className="main-page-reactive-card rounded-xl border border-[#e6ddd0] bg-[#fffaf6] p-5 transition hover:border-accent/50 dark:border-border/70 dark:bg-background/60"><div className="font-semibold text-foreground">{isTh ? "ราคา" : "Pricing"}</div></Link>
          <Link {...linkSpotlight} href={`${localePrefix}/contact`} className="main-page-reactive-card rounded-xl border border-[#e6ddd0] bg-[#fffaf6] p-5 transition hover:border-accent/50 dark:border-border/70 dark:bg-background/60"><div className="font-semibold text-foreground">{isTh ? "ติดต่อทีมงาน" : "Contact"}</div></Link>
        </div>
      </div>
    </section>
  )
}