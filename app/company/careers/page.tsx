import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GENERAL_CONTACT_EMAIL, GENERAL_CONTACT_MAILTO } from "@/lib/contact"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { ArrowRight, Handshake, Lightbulb, Mail, ShieldCheck, Users } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Collaboration — Work With RCT Labs",
    "Collaboration — ร่วมงานกับ RCT Labs",
    "Collaboration pathways for advisory, research, implementation, and future opportunities with RCT Labs as a solo-built constitutional AI platform.",
    "ช่องทางความร่วมมือด้าน advisory, research, implementation และ future opportunities กับ RCT Labs ในฐานะแพลตฟอร์ม constitutional AI ที่สร้างโดยผู้ก่อตั้งเพียงคนเดียว",
    "/company/careers",
    ["RCT Labs collaboration", "AI advisory", "research partnership", "future opportunities"]
  )
}

export default async function CareersPage() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"

  const breadcrumb = getBreadcrumbSchema([
    { name: isTh ? "หน้าหลัก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: isTh ? "บริษัท" : "Company", url: `https://rctlabs.co${localePrefix}/company` },
    { name: isTh ? "Collaboration" : "Collaboration", url: `https://rctlabs.co${localePrefix}/company/careers` },
  ])
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isTh ? "Collaboration — ร่วมงานกับ RCT Labs" : "Collaboration — Work With RCT Labs",
    description: "Collaboration pathways for advisory, research, implementation, and future opportunities with RCT Labs.",
    url: `https://rctlabs.co${localePrefix}/company/careers`,
  }

  const collaborationTracks = [
    {
      icon: Handshake,
      title: isTh ? "Implementation Collaboration" : "Implementation Collaboration",
      description: isTh
        ? "สำหรับทีมที่ต้องการวาง architecture, verification path, integration plan หรือ enterprise rollout ร่วมกับผู้สร้างระบบโดยตรง"
        : "For teams that need help shaping architecture, verification paths, integration plans, or enterprise rollout with the system creator directly.",
    },
    {
      icon: Lightbulb,
      title: isTh ? "Research & Advisory" : "Research & Advisory",
      description: isTh
        ? "เหมาะกับองค์กร สถาบัน หรือ partner ที่ต้องการคุยเรื่อง constitutional AI, protocol design, trust controls และ publication strategy"
        : "For organizations, institutions, or partners discussing constitutional AI, protocol design, trust controls, and publication strategy.",
    },
    {
      icon: Users,
      title: isTh ? "Future Opportunities" : "Future Opportunities",
      description: isTh
        ? "ยังไม่มีการเปิดรับหลายตำแหน่งแบบ full-scale ในปัจจุบัน แต่สามารถแสดงความสนใจสำหรับอนาคตได้หากเชี่ยวชาญด้าน platform engineering, research, หรือ enterprise delivery"
        : "There is no multi-role hiring board at the current stage, but future-interest conversations are welcome from people with strong platform engineering, research, or enterprise delivery experience.",
    },
  ]

  const expectations = isTh
    ? [
        "เข้าใจว่าปัจจุบัน RCT Labs เป็นแพลตฟอร์มที่สร้างโดยผู้ก่อตั้งเพียงคนเดียว ไม่ใช่องค์กรขนาดใหญ่",
        "สนใจทำงานที่ต้องพิสูจน์ได้ มี evidence และรับผิดชอบต่อ claim ที่เผยแพร่สาธารณะ",
        "สื่อสารเชิงระบบได้ทั้งระดับ architecture, product, trust, และ deployment",
      ]
    : [
        "Understands that RCT Labs is currently a solo-built platform, not a large operating company.",
        "Values verifiable work, evidence-backed claims, and disciplined public communication.",
        "Can think across architecture, product, trust, and deployment rather than in a narrow feature silo.",
      ]

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <main className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-warm-amber/25 bg-warm-amber/8 px-4 py-1.5 text-sm font-medium text-warm-amber">
            <ShieldCheck className="h-4 w-4" />
            <span>{isTh ? "Collaboration & Future Opportunities" : "Collaboration & Future Opportunities"}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
            {isTh ? "ร่วมงานกับ RCT Labs อย่างตรงกับความจริงของบริษัท" : "Work With RCT Labs in a Way That Matches the Company Reality"}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance">
            {isTh
              ? "หน้านี้ไม่ใช่ job board สำหรับองค์กรขนาดใหญ่ แต่เป็นจุดเริ่มต้นสำหรับ advisory, implementation, research partnership และ future-interest conversations กับแพลตฟอร์มที่สร้างโดยผู้ก่อตั้งเพียงคนเดียว"
              : "This is not a large-company hiring board. It is the starting point for advisory, implementation, research partnership, and future-interest conversations with a solo-built platform."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collaborationTracks.map((track) => {
            const Icon = track.icon
            return (
              <div key={track.title} className="rounded-2xl border border-border bg-card p-6 text-center space-y-4 shadow-[0_12px_32px_rgba(0,0,0,0.04)]">
                <div className="w-16 h-16 bg-warm-amber/10 rounded-lg flex items-center justify-center mx-auto">
                  <Icon className="w-8 h-8 text-warm-amber" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">{track.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{track.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {isTh ? "ความคาดหวังสำหรับการร่วมงาน" : "What A Good Collaboration Fit Looks Like"}
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              {expectations.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-warm-amber" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-background/70 p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {isTh ? "ข้อเท็จจริงปัจจุบัน" : "Current Reality"}
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                {isTh
                  ? "RCT Labs ยังอยู่ใน stage ที่ขับเคลื่อนโดยผู้ก่อตั้งเพียงคนเดียว ดังนั้นหน้า collaboration นี้ถูกออกแบบให้ตรงกับสภาพจริง ไม่ใช่สร้างภาพว่ามีทีมขนาดใหญ่หรือเปิดรับหลายตำแหน่งพร้อมกัน"
                  : "RCT Labs is still in a founder-led, solo-built stage. This page is intentionally scoped to that reality instead of implying a large operating team or a broad active hiring pipeline."}
              </p>
              <p>
                {isTh
                  ? "หากสถานะการจ้างงานเปลี่ยนในอนาคต หน้านี้จะถูกอัปเดตด้วยวันที่และขอบเขตที่ชัดเจน"
                  : "If hiring status changes in the future, this page will be updated with dated, explicit scope rather than vague team-language."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="rounded-3xl border border-border bg-linear-to-r from-accent/6 to-secondary/6 p-12 text-center space-y-6 md:p-16">
          <h2 className="text-4xl font-bold text-foreground">
            {isTh ? "อยากเริ่มคุยเรื่อง collaboration หรือ future opportunity?" : "Want to Start a Collaboration or Future-Opportunity Conversation?"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isTh
              ? "ใช้หน้า contact หรืออีเมลเพื่ออธิบายบริบทของคุณให้ชัดเจน เช่น architecture review, advisory, research partnership, enterprise implementation หรือการแสดงความสนใจล่วงหน้าสำหรับการร่วมงานในอนาคต"
              : "Use the contact page or email to explain your context clearly: architecture review, advisory, research partnership, enterprise implementation, or future-interest outreach."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href={`${localePrefix}/contact`}>
                {isTh ? "เปิดหน้าติดต่อ" : "Open Contact Page"}
              </Link>
            </Button>
            <a
              href={GENERAL_CONTACT_MAILTO}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-warm-amber/40 hover:text-warm-amber"
            >
              <Mail className="h-4 w-4" />
              {GENERAL_CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: isTh ? "สำหรับทีมองค์กร" : "For Enterprise Teams",
              desc: isTh ? "คุยเรื่อง evaluation path, integration design, governance, และ deployment planning" : "Discuss evaluation paths, integration design, governance, and deployment planning.",
            },
            {
              title: isTh ? "สำหรับนักวิจัยและผู้เชี่ยวชาญ" : "For Researchers and Specialists",
              desc: isTh ? "คุยเรื่อง advisory, paper review, protocol critique, และ publication collaboration" : "Discuss advisory work, paper review, protocol critique, and publication collaboration.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-6 space-y-2">
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}
