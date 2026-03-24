"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Code2, Lock, Zap, Globe, BookOpen, Workflow, ShieldCheck, Boxes } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import SectionHeading from "@/components/section-heading"
import JITNAFlowchart from "@/components/diagrams/jitna-flowchart"
import OptimizedImage from "@/components/ui/optimized-image"

const PIXEL_PROTOCOL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-jitna-protocol.webp"

export default function ProtocolPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"

  const features = [
    {
      icon: Code2,
      title: isTh ? "Open Source" : "Open Source",
      description: isTh ? "เปิด implementation อย่างโปร่งใส ตรวจสอบ มีส่วนร่วม และนำไปใช้งานได้จริง" : "Fully open-source implementation. Review, contribute, and deploy with complete transparency.",
    },
    {
      icon: Lock,
      title: isTh ? "Secure by Default" : "Secure by Default",
      description: isTh ? "มี security primitives สำหรับ authentication, authorization และ data protection ตั้งแต่ต้น" : "Built-in security primitives for authentication, authorization, and data protection.",
    },
    {
      icon: Zap,
      title: isTh ? "High Performance" : "High Performance",
      description: isTh ? "ออกแบบให้ประมวลผล intent แบบ real-time ที่ scale ได้และ latency ต่ำ" : "Optimized for real-time intent processing at scale with minimal latency.",
    },
    {
      icon: Globe,
      title: isTh ? "Distributed" : "Distributed",
      description: isTh ? "ทำงานข้าม device, network และองค์กรได้ด้วย interoperability ที่สอดคล้องกัน" : "Works across devices, networks, and organizations with seamless interoperability.",
    },
    {
      icon: BookOpen,
      title: isTh ? "Well Documented" : "Well Documented",
      description: isTh ? "มี specification, ตัวอย่าง และคู่มือสำหรับนักพัฒนาอย่างครบถ้วน" : "Comprehensive specifications, examples, and guides for developers.",
    },
    {
      icon: Boxes,
      title: isTh ? "Language Agnostic" : "Language Agnostic",
      description: isTh ? "นำไป implement ได้ในหลายภาษาโดยคง semantics เดียวกัน" : "Implement in any programming language with consistent semantics.",
    },
  ]

  const protocolPillars = [
    {
      icon: Workflow,
      title: isTh ? "Negotiation Runtime" : "Negotiation Runtime",
      description: isTh ? "JITNA ทำให้ agent, tool และ workflow ประกอบตัวเองรอบ intent ได้แบบมีลำดับและตรวจสอบได้" : "JITNA lets agents, tools, and workflows assemble around intent with an auditable negotiation lifecycle.",
      color: "#7B9E87",
    },
    {
      icon: ShieldCheck,
      title: isTh ? "Verifiable Delivery" : "Verifiable Delivery",
      description: isTh ? "แต่ละขั้นมี quality gates, reflection และ auditability ลดความคลาดเคลื่อนก่อนส่งมอบ" : "Each stage includes quality gates, reflection, and auditability before output reaches the user.",
      color: "#D4A853",
    },
    {
      icon: Code2,
      title: isTh ? "Documentation Surface" : "Documentation Surface",
      description: isTh ? "protocol หน้าเอกสารควรไม่ใช่ static prose อย่างเดียว แต่ต้องให้เห็น structure และ flow ของระบบจริง" : "Protocol docs should not be static prose alone; they should expose the real system structure and execution flow.",
      color: "#89B4C8",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
              {isTh ? "RCT Open Protocol" : "RCT Open Protocol"}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              {isTh ? "มาตรฐานเปิดสำหรับสร้างระบบ intent-driven applications พร้อม protocol layer ที่ตรวจสอบได้และขยายต่อได้" : "Open standards for building intent-driven applications with auditable protocol layers and extensible runtime semantics."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button size="lg" asChild>
                <Link href="https://github.com" target="_blank" className="gap-2">
                  {isTh ? "ดูบน GitHub" : "View on GitHub"} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#documentation">{isTh ? "อ่านเอกสาร" : "Read Documentation"}</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="rounded-[28px] border border-warm-light-gray bg-linear-to-br from-white via-warm-cream to-[#F2EBDE] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.08)] dark:border-white/10 dark:from-dark-950 dark:via-dark-900 dark:to-[#17120f]">
              <div className="absolute right-5 top-5 h-14 w-14 opacity-80">
                <OptimizedImage src={PIXEL_PROTOCOL} alt="" pixelated containerClassName="h-full w-full" objectFit="contain" width={56} height={56} />
              </div>
              <div className="mb-4 pr-14">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-warm-sage">{isTh ? "Interactive Preview" : "Interactive Preview"}</div>
                <div className="mt-2 text-lg font-bold text-foreground">{isTh ? "JITNA protocol flow exposed" : "JITNA protocol flow exposed"}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {isTh ? "นี่ไม่ใช่เพียงหน้า docs แต่เป็น protocol surface ที่มองเห็นวงจร negotiation และคุณภาพของระบบได้ทันที" : "This is not just a docs page. It is a visible protocol surface where negotiation flow and quality gates can be inspected directly."}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {protocolPillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-2xl border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                    <pillar.icon size={16} style={{ color: pillar.color }} />
                    <div className="mt-2 text-sm font-bold text-foreground">{pillar.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{pillar.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-20">
        <SectionHeading
          tag={isTh ? "Protocol Runtime" : "Protocol Runtime"}
          tagColor="sage"
          title={isTh ? "Interactive JITNA Flow" : "Interactive JITNA Flow"}
          italicWord="JITNA"
          description={isTh ? "เพิ่ม parity ฝั่ง protocol/documentation ด้วย interactive component ที่แสดง lifecycle ของ JITNA ตั้งแต่ context capture ถึง feedback loop" : "Bring protocol/documentation parity closer to Manus with an interactive component that exposes the JITNA lifecycle from context capture to feedback loop."}
          pixelIcon={PIXEL_PROTOCOL}
        />
        <JITNAFlowchart language={isTh ? "th" : "en"} />
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">{isTh ? "Core Features" : "Core Features"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div key={i} whileHover={{ y: -4 }} className="relative overflow-hidden p-8 rounded-lg border border-border hover:border-accent/50 transition bg-card">
                <div className="pointer-events-none absolute right-4 top-4 h-10 w-10 opacity-40">
                  <OptimizedImage src={PIXEL_PROTOCOL} alt="" pixelated containerClassName="h-full w-full" objectFit="contain" width={40} height={40} />
                </div>
                <Icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Architecture */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-linear-to-r from-accent/5 to-secondary/5 rounded-lg">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Protocol Architecture</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              The RCT protocol layers enable seamless intent specification, transmission, and execution across
              distributed systems.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                layer: isTh ? "Transport Layer" : "Transport Layer",
                description: isTh ? "ส่งผ่าน intent messages อย่างปลอดภัยและมีประสิทธิภาพข้าม network และ device" : "Secure, efficient transmission of intent messages across networks and devices.",
              },
              {
                layer: isTh ? "Intent Layer" : "Intent Layer",
                description: isTh ? "ระบุและตรวจสอบ intent กับข้อจำกัดของผู้ใช้ด้วยโครงสร้างแบบ JITNA" : "JITNA-based specification and validation of user intent and constraints.",
              },
              {
                layer: isTh ? "Execution Layer" : "Execution Layer",
                description: isTh ? "distributed agents แปลความและดำเนินการตาม intent อย่างมีหลักฐานรองรับ" : "Distributed agents interpret and execute intents with provable alignment.",
              },
              {
                layer: isTh ? "Verification Layer" : "Verification Layer",
                description: isTh ? "cryptographic proofs และ audit trails ช่วยยืนยัน fidelity ของ intent" : "Cryptographic proofs and audit trails ensuring intent fidelity.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-background rounded-lg p-6 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.layer}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">{isTh ? "เริ่มต้นกับ RCT Protocol" : "Get Started with RCT Protocol"}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isTh ? "เลือกเส้นทางที่เหมาะกับบทบาทของคุณและเริ่มสร้าง intent-driven applications ได้ทันที" : "Choose your path and start building intent-driven applications today."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: isTh ? "สำหรับนักพัฒนา" : "For Developers",
                items: [
                  isTh ? "ติดตั้ง RCT SDK" : "Install the RCT SDK",
                  isTh ? "อ่าน protocol specifications" : "Review protocol specifications",
                  isTh ? "พัฒนาด้วย JITNA language" : "Build with JITNA language",
                  isTh ? "deploy สู่ production" : "Deploy to production",
                ],
              },
              {
                title: isTh ? "สำหรับนักวิจัย" : "For Researchers",
                items: [
                  isTh ? "ศึกษาการออกแบบ protocol" : "Study protocol design",
                  isTh ? "ร่วมพัฒนา improvements" : "Contribute improvements",
                  isTh ? "เผยแพร่ findings" : "Publish findings",
                  isTh ? "ทำงานร่วมกันด้าน standards" : "Collaborate on standards",
                ],
              },
              {
                title: isTh ? "สำหรับองค์กร" : "For Organizations",
                items: [
                  isTh ? "ประเมินสำหรับ enterprise" : "Evaluate for enterprise",
                  isTh ? "deploy แบบ private" : "Deploy privately",
                  isTh ? "integrate กับระบบเดิม" : "Integrate with systems",
                  isTh ? "รับการสนับสนุน" : "Get support",
                ],
              },
            ].map((path, i) => (
              <div key={i} className="rounded-lg border border-border p-8 bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-6">{path.title}</h3>
                <ul className="space-y-3">
                  {path.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section id="documentation" className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-foreground">{isTh ? "Documentation" : "Documentation"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: isTh ? "Quick Start Guide" : "Quick Start Guide",
                description: isTh ? "เริ่มต้นใช้งาน RCT protocol ได้ภายใน 5 นาที" : "Get up and running with RCT protocol in 5 minutes.",
              },
              {
                title: isTh ? "API Reference" : "API Reference",
                description: isTh ? "เอกสารอ้างอิงครบถ้วนสำหรับ protocol endpoints และ methods" : "Complete reference for all protocol endpoints and methods.",
              },
              {
                title: isTh ? "JITNA Language Guide" : "JITNA Language Guide",
                description: isTh ? "เรียนรู้การระบุ intent ด้วย syntax ของ JITNA" : "Learn how to specify intent using JITNA syntax.",
              },
              {
                title: isTh ? "Security Best Practices" : "Security Best Practices",
                description: isTh ? "แนวทางสำหรับการ implement protocol อย่างปลอดภัย" : "Guidelines for secure protocol implementation.",
              },
            ].map((doc, i) => (
              <Link key={i} href="/docs">
                <div className="group p-8 rounded-lg border border-border hover:border-accent/50 transition bg-card cursor-pointer">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition">
                    {doc.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{doc.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="bg-primary text-primary-foreground rounded-lg p-12 md:p-16 text-center space-y-6">
          <h2 className="text-4xl font-bold">{isTh ? "พร้อมจะสร้างด้วย Intent แล้วหรือยัง?" : "Ready to Build with Intent?"}</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {isTh ? "เข้าร่วมกับนักพัฒนาที่กำลังสร้าง intent-driven applications รุ่นถัดไปด้วย RCT protocol" : "Join developers building the next generation of intent-driven applications with the RCT protocol."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="https://github.com" target="_blank">
                {isTh ? "GitHub Repository" : "GitHub Repository"}
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="bg-secondary text-secondary-foreground">
              <Link href="/contact">{isTh ? "ขอความช่วยเหลือ" : "Get Support"}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
