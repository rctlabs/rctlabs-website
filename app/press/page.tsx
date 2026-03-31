import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getBreadcrumbSchema } from "@/lib/schema"
import Link from "next/link"
import { Mail, Linkedin, Github, ExternalLink, Building2, User, Newspaper } from "lucide-react"

export const metadata: Metadata = {
  title: "Press & Media — RCT Labs | Constitutional AI from Thailand",
  description: "Press kit, fact sheet, story angles, and media contact for RCT Labs — a constitutional AI operating system built by a solo developer in Bangkok, Thailand. 62 microservices, 4,849 passing tests, 0.3% hallucination rate.",
  alternates: { canonical: "https://rctlabs.co/en/press" },
}

const facts = [
  { label: "Founded", value: "June 25, 2025" },
  { label: "First Public Release", value: "August 11, 2025 (30 days)" },
  { label: "Current Version", value: "v5.4.5" },
  { label: "Microservices", value: "62" },
  { label: "Algorithms", value: "41 (Tier 1–9)" },
  { label: "AI Models (HexaCore)", value: "7 (3 Western + 3 Eastern + 1 Thai)" },
  { label: "Test Suite", value: "4,849 passed / 0 failed / 0 errors" },
  { label: "Hallucination Rate", value: "0.3% (industry: 12–15%)" },
  { label: "FDIA Accuracy", value: "0.92 (industry baseline: ~0.65)" },
  { label: "Memory Compression", value: "74% lossless (Delta Engine)" },
  { label: "Uptime SLA", value: "99.98%" },
  { label: "Warm Recall", value: "<50ms" },
  { label: "Budget", value: "$0 (bootstrapped)" },
  { label: "Team Size", value: "1 (sole developer)" },
  { label: "Location", value: "Bangkok, Thailand" },
  { label: "License", value: "Apache 2.0" },
]

const storyAngles = [
  {
    headline: "Thai Solo Developer Builds Enterprise Constitutional AI OS in 30 Days at Zero Cost",
    angle: "Human interest / entrepreneurship",
    hook: "While Silicon Valley needs $100M and 50 engineers, Ittirit Saengow built a production-grade AI operating system with 62 microservices from a single Android phone in Bangkok.",
  },
  {
    headline: "Constitutional AI: The Architecture That Provably Prevents Hallucination",
    angle: "Technology / AI safety",
    hook: "FDIA equation F = (D^I) × A introduces a mathematical kill switch: when A=0, no AI output is produced — regardless of model, prompt, or context. 0.3% hallucination vs 12–15% industry average.",
  },
  {
    headline: "JITNA: The Open Protocol That Could Become the 'HTTP of Agentic AI'",
    angle: "Technology / standards",
    hook: "Just In Time Nodal Assembly (JITNA RFC-001 v2.0) is the first open-standard communication protocol for AI agents. It defines how agents negotiate, execute, and verify tasks — PROPOSE → COUNTER → ACCEPT.",
  },
  {
    headline: "50–100 Billion THB: Thailand's Path to AI Infrastructure Independence",
    angle: "Business / national development",
    hook: "Thailand currently sends billions THB/year in AI API fees to foreign cloud vendors. RCT Labs proposes a constitutional AI infrastructure that generates 50–100B THB in national value by 2030.",
  },
  {
    headline: "The PDPA Compliance Crisis Hidden in Every Enterprise AI Deployment",
    angle: "Compliance / risk",
    hook: "Most Thai enterprise AI deployments have undocumented cross-border transfers, no right-to-erasure mechanism, and no Section 33 explanation capability. Constitutional AI solves this architecturally.",
  },
]

export default async function PressPage() {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Press", url: "https://rctlabs.co/en/press" },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(191,160,110,0.08),transparent_55%)] pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 py-24 md:py-32">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-amber/30 bg-warm-amber/8 text-warm-amber text-sm font-medium w-fit mb-6">
              <Newspaper className="w-4 h-4" /> Press & Media
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-warm-light-gray leading-tight mb-4">
              RCT Labs Media Kit
            </h1>
            <p className="text-xl text-warm-dim max-w-2xl mb-8">
              Fact sheet, story angles, and media contact for journalists covering AI, enterprise technology, and Thailand's technology ecosystem.
            </p>

            {/* Media contact */}
            <div className="inline-flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:press@rctlabs.co"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-warm-amber text-background font-semibold text-sm hover:bg-warm-amber/90 transition"
              >
                <Mail className="w-4 h-4" /> press@rctlabs.co
              </a>
              <a
                href="https://www.linkedin.com/in/ittirit-saengow/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-warm-dim hover:border-warm-amber/30 hover:text-warm-amber transition text-sm"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn Profile
              </a>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-warm-light-gray mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-warm-amber" /> About the Founder
          </h2>
          <div className="rounded-2xl border border-white/10 bg-warm-charcoal/40 p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-warm-amber/20 to-warm-amber/5 border border-warm-amber/30 flex items-center justify-center text-2xl font-bold text-warm-amber shrink-0">IS</div>
              <div>
                <h3 className="text-xl font-bold text-warm-light-gray mb-1">Ittirit Saengow (อิทธิฤทธิ์ แซ่โง้ว)</h3>
                <p className="text-warm-amber text-sm font-medium mb-4">Founder & Sole Developer, RCT Labs · Bangkok, Thailand</p>
                <p className="text-warm-dim leading-relaxed max-w-3xl mb-4">
                  Ittirit Saengow is the sole creator of the RCT (Reverse Component Thinking) Ecosystem — a constitutional AI operating system comprising 62 microservices, 41 algorithms, 7 HexaCore AI models, and 4,849 automated tests. Built over 30 days in June–August 2025 with zero investment capital, from Bangkok, Thailand. Before RCT Labs, Ittirit ran four businesses, studied facility management at the Faculty of Architecture (completing a 4-year program in 6.5 years), and developed the FDIA equation, JITNA protocol, and 7-Genome system as conceptual frameworks before implementing them in code.
                </p>
                <div className="flex gap-3">
                  <a href="https://github.com/ittirit720" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-warm-dim hover:text-warm-amber transition">
                    <Github className="w-4 h-4" /> github.com/ittirit720
                  </a>
                  <a href="https://www.linkedin.com/in/ittirit-saengow/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-warm-dim hover:text-warm-amber transition">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Facts */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-warm-light-gray mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-warm-amber" /> Company Fact Sheet
          </h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {facts.map((fact, i) => (
                <div key={fact.label} className={`px-6 py-4 flex items-center justify-between border-b border-white/5 ${i % 2 === 0 ? "" : "sm:border-l sm:border-white/5"}`}>
                  <span className="text-warm-dim text-sm">{fact.label}</span>
                  <span className="font-semibold text-warm-light-gray text-sm text-right">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Angles */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-warm-light-gray mb-6 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-warm-amber" /> Story Angles for Journalists
          </h2>
          <div className="space-y-4">
            {storyAngles.map((story) => (
              <div key={story.headline} className="rounded-xl border border-white/8 bg-warm-charcoal/30 p-6">
                <div className="flex items-start gap-4">
                  <span className="px-2.5 py-0.5 rounded-full border border-warm-amber/30 bg-warm-amber/10 text-warm-amber text-xs font-semibold shrink-0">{story.angle}</span>
                </div>
                <h3 className="text-lg font-bold text-warm-light-gray mt-3 mb-2">"{story.headline}"</h3>
                <p className="text-warm-dim text-sm leading-relaxed">{story.hook}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deep links */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-warm-light-gray mb-6">Research Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "FDIA Equation Explained", href: "/en/blog/fdia-equation-explained" },
              { label: "JITNA Protocol Specification", href: "/en/blog/jitna-language-release" },
              { label: "4,849 Tests Methodology", href: "/en/blog/rct-ecosystem-4849-tests-methodology" },
              { label: "Thai AI Vision 2030", href: "/en/blog/thai-ai-platform-vision-2030" },
              { label: "PDPA AI Compliance Guide", href: "/en/blog/pdpa-ai-compliance-thailand" },
              { label: "Author Profile — Ittirit Saengow", href: "/en/authors/ittirit-saengow" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="flex items-center justify-between px-5 py-3 rounded-lg border border-white/8 hover:border-warm-amber/30 hover:bg-warm-amber/5 transition group">
                <span className="text-warm-dim group-hover:text-warm-light-gray text-sm transition">{label}</span>
                <ExternalLink className="w-4 h-4 text-warm-dim group-hover:text-warm-amber transition" />
              </Link>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
