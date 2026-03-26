"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Briefcase, FileText, Users, ArrowRight, Building2, Star, Globe, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export default function CompanyClient() {
  const { language } = useLanguage()
  const isTh = language === "th"
  const localePrefix = isTh ? "/th" : "/en"

  const sections = [
    {
      icon: Briefcase,
      title: isTh ? "Careers" : "Careers",
      description: isTh
        ? "ร่วมงานกับทีมที่กำลังสร้าง intent-driven AI infrastructure"
        : "Join the team shaping intent-driven AI infrastructure.",
      href: `${localePrefix}/company/careers`,
    },
    {
      icon: FileText,
      title: isTh ? "Press" : "Press",
      description: isTh
        ? "ดูข่าวสาร company facts และ media references ของ RCT Labs"
        : "Review news, company facts, and media references about RCT Labs.",
      href: `${localePrefix}/company/press`,
    },
    {
      icon: Users,
      title: isTh ? "Partners" : "Partners",
      description: isTh
        ? "สำรวจโอกาสด้าน partnership และ ecosystem collaboration"
        : "Explore partnership opportunities and ecosystem collaboration.",
      href: `${localePrefix}/company/partners`,
    },
  ]

  const faqs = isTh
    ? [
        {
          question: "หน้า Company นี้ควรใช้ร่วมกับหน้าใด",
          answer:
            "ควรใช้ร่วมกับหน้า Platform, Protocols, Benchmark และ Press เพื่อเห็นทั้งมุม mission, technical architecture, validation และ authority signals ขององค์กร",
        },
        {
          question: "หน้านี้ช่วยเรื่อง E-E-A-T อย่างไร",
          answer:
            "หน้านี้ทำหน้าที่เชื่อมตัวตนขององค์กร ค่านิยม และ public mission เข้ากับ technical claims บนหน้าอื่น ทำให้ข้อมูลเชิงเทคนิคมีบริบทของผู้สร้างและทิศทางที่ชัดขึ้น",
        },
      ]
    : [
        {
          question: "Which pages should readers pair with this Company page?",
          answer:
            "Readers should pair it with the Platform, Protocols, Benchmark, and Press pages to understand the mission, technical architecture, validation, and authority signals behind RCT Labs.",
        },
        {
          question: "How does this page support E-E-A-T?",
          answer:
            "It connects the organization, mission, and public values behind the technical claims made elsewhere on the site, giving those claims stronger context and credibility.",
        },
      ]

  const relatedResources = [
    {
      href: `${localePrefix}/platform`,
      title: isTh ? "ดู Platform" : "Explore the Platform",
      description: isTh ? "เชื่อม mission ของบริษัทกับ architecture ของระบบ" : "Connect the company mission to the system architecture.",
    },
    {
      href: `${localePrefix}/benchmark`,
      title: isTh ? "ดู Benchmark" : "Review Benchmark",
      description: isTh ? "ดูว่าคำอ้างอิงด้าน performance และ reliability ถูกสนับสนุนอย่างไร" : "See how performance and reliability claims are supported.",
    },
    {
      href: `${localePrefix}/company/press`,
      title: isTh ? "ดู Press & Media" : "Open Press & Media",
      description: isTh ? "ดู company facts และ reference links สำหรับสื่อและ analyst" : "Review company facts and reference links for media and analysts.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 text-sm font-medium text-accent">
            <ShieldCheck className="h-4 w-4" />
            <span>Company Overview</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight text-balance text-foreground md:text-6xl">RCT Labs</h1>
          <p className="mx-auto max-w-3xl text-xl text-balance text-muted-foreground md:text-2xl">
            {isTh
              ? "องค์กรที่กำลังสร้าง Intent Operating System และ constitutional AI infrastructure สำหรับงานระดับองค์กรที่ต้องการ trust, auditability และ deployment discipline"
              : "The organization building the Intent Operating System and constitutional AI infrastructure for enterprise environments that require trust, auditability, and deployment discipline."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="rounded-3xl border border-border bg-card p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Answer-First Summary</div>
              <h2 className="mt-3 text-3xl font-bold text-foreground">
                {isTh ? "สรุปสั้นที่สุด: RCT Labs คืออะไร" : "Short Answer: What RCT Labs Is"}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {isTh
                  ? "RCT Labs คือองค์กรที่พัฒนา AI platform, open protocols และ trust infrastructure โดยมอง AI เป็น operating-system problem มากกว่าการต่อ model แบบแยกจุด จึงให้ความสำคัญกับ architecture, governance, memory และ verification พร้อมกัน"
                  : "RCT Labs builds AI platforms, open protocols, and trust infrastructure by treating AI as an operating-system problem rather than a set of isolated model integrations. That is why the company focuses on architecture, governance, memory, and verification together."}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">{isTh ? "Authority Signals" : "Authority Signals"}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>{isTh ? "เชื่อม company mission กับ protocol และ benchmark pages" : "Connects company mission to protocol and benchmark pages."}</li>
                <li>{isTh ? "ให้บริบทสำหรับ technical claims ทั่วทั้งเว็บ" : "Provides context for technical claims across the site."}</li>
                <li>{isTh ? "ช่วยเสริม E-E-A-T ก่อนการ deploy จริง" : "Strengthens E-E-A-T before deployment."}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl rounded-lg bg-linear-to-r from-accent/5 to-secondary/5 px-4 py-24">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">{isTh ? "ภารกิจของเรา" : "Our Mission"}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {isTh
                ? "ยกระดับวิธีที่มนุษย์และ AI ทำงานร่วมกัน ด้วยระบบที่เข้าใจ intent ได้จริง ตรวจสอบย้อนหลังได้ และเปิดทางให้ deploy AI ได้อย่างรับผิดชอบในโลกธุรกิจจริง"
                : "To improve how humans and AI work together by building systems that understand intent, remain auditable, and make responsible AI deployment practical in real business environments."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-3">
            {[
              { title: isTh ? "Open Science" : "Open Science", description: isTh ? "เผยแพร่แนวคิดและ protocol เพื่อให้ตรวจสอบได้" : "Publish concepts and protocols openly for scrutiny and adoption." },
              { title: isTh ? "Public Infrastructure" : "Public Infrastructure", description: isTh ? "สร้างฐานรากที่ใช้ได้ทั้งภายในองค์กรและ ecosystem" : "Build foundations that support both enterprises and the wider ecosystem." },
              { title: isTh ? "Trust by Design" : "Trust by Design", description: isTh ? "ให้ governance, verification และ memory เป็นส่วนหนึ่งของระบบตั้งแต่ต้น" : "Treat governance, verification, and memory as core system design concerns." },
            ].map((value) => (
              <div key={value.title} className="space-y-2">
                <h3 className="font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
          {[
            { label: isTh ? "Architecture Layers" : "Architecture Layers", value: "10" },
            { label: isTh ? "Production Algorithms" : "Production Algorithms", value: "41" },
            { label: isTh ? "Validation Tests" : "Validation Tests", value: "4,849" },
            { label: isTh ? "Hallucination Rate" : "Hallucination Rate", value: "0.3%" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-4xl font-bold text-accent">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="mb-12 text-center text-4xl font-bold text-foreground">{isTh ? "Explore" : "Explore"}</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link key={section.href} href={section.href}>
                <div className="group h-full rounded-lg border border-border bg-card p-8 transition hover:border-accent/50 hover:shadow-lg">
                  <Icon className="mb-4 h-12 w-12 text-accent" />
                  <h3 className="mb-3 text-2xl font-bold text-foreground transition group-hover:text-accent">{section.title}</h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground">{section.description}</p>
                  <div className="flex items-center font-semibold text-accent opacity-0 transition group-hover:opacity-100">
                    {isTh ? "อ่านต่อ" : "Learn More"} <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[
            {
              icon: Building2,
              title: isTh ? "Scientific Rigor" : "Scientific Rigor",
              description: isTh
                ? "ใช้กรอบคิดแบบวิทยาศาสตร์ในการออกแบบ ทดสอบ และอธิบายระบบ"
                : "Approach system design, testing, and explanation with scientific discipline.",
            },
            {
              icon: Star,
              title: isTh ? "Execution Quality" : "Execution Quality",
              description: isTh
                ? "ให้ความสำคัญกับคุณภาพของ research, code และ deployment behavior"
                : "Maintain high standards in research, code, and deployment behavior.",
            },
            {
              icon: Globe,
              title: isTh ? "Openness" : "Openness",
              description: isTh
                ? "เปิดเผย protocol และหลักคิดเพื่อให้ตรวจสอบและต่อยอดได้"
                : "Publish protocols and concepts to support scrutiny and extension.",
            },
            {
              icon: Users,
              title: isTh ? "Collaboration" : "Collaboration",
              description: isTh
                ? "ทำงานร่วมกับนักวิจัย วิศวกร และองค์กรที่ต้องการ AI ที่ deploy ได้จริง"
                : "Collaborate with researchers, engineers, and organizations pursuing deployable AI.",
            },
          ].map((value) => {
            const Icon = value.icon
            return (
              <div key={value.title} className="rounded-lg border border-border bg-card p-8">
                <Icon className="mb-4 h-10 w-10 text-accent" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">FAQ</div>
            <h2 className="mt-3 text-2xl font-bold text-foreground">{isTh ? "คำถามที่ควรถามเกี่ยวกับองค์กรนี้" : "Questions Readers Should Ask About the Organization"}</h2>
            <div className="mt-4 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-border bg-background/70 p-4">
                  <summary className="list-none cursor-pointer font-semibold text-foreground">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Related Resources</div>
            <h2 className="mt-3 text-2xl font-bold text-foreground">{isTh ? "อ่านต่อในหน้าที่เกี่ยวข้อง" : "Continue Into the Related Pages"}</h2>
            <div className="mt-4 space-y-3">
              {relatedResources.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-xl border border-border bg-background/70 p-4 transition-colors hover:border-accent/40 hover:bg-accent/5">
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="rounded-lg bg-primary p-12 text-primary-foreground md:p-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">{isTh ? "สนใจ RCT Labs มากขึ้นหรือไม่" : "Interested in RCT Labs?"}</h2>
            <p className="max-w-2xl text-lg opacity-90">
              {isTh
                ? "หากคุณต้องการประเมินระบบ พูดคุยด้าน partnership หรือทำความเข้าใจ technical direction ของทีมเพิ่มเติม สามารถติดต่อเราได้โดยตรง"
                : "If you want to evaluate the system, discuss partnership opportunities, or understand the technical direction of the team in more depth, contact us directly."}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href={`${localePrefix}/contact`} className="gap-2">
                {isTh ? "ติดต่อทีมงาน" : "Get in Touch"} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
