"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingAI } from "@/components/floating-ai"
import { FDIAEquation } from "@/components/fdia-equation"
import { ArrowRight, BookOpen, Users, Lightbulb, Github, Zap, Shield, Database, Cpu, FileCode, Activity, Globe, Layers, Lock, Terminal, GitBranch, CheckCircle, Server, Container, Network } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname, loadTranslations, type Locale } from "@/lib/i18n"
import { useState, useEffect } from "react"

interface Translations {
  home: Record<string, string>
  common: Record<string, string>
}

export default function HomePage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname) || 'en'
  const [t, setT] = useState<Translations>({ home: {}, common: {} })

  useEffect(() => {
    const load = async () => {
      const translations = await loadTranslations(locale as Locale)
      setT(translations as unknown as Translations)
    }
    load()
  }, [locale])

  const h = (key: string) => t.home[key] || key
  const c = (key: string) => t.common[key] || key
  return (
    <main className="min-h-screen bg-background dark">
      <Navbar />

      {/* ========== HERO SECTION - Scientific Dark Mode ========== */}
      <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden">
        {/* Drifting Grid Background */}
        <div className="absolute inset-0 grid-background animate-grid-drift opacity-50" />
        
        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="space-y-8 text-center">
            
            {/* The Signature Equation - Interactive with Tooltips */}
            <div className="mb-6">
              <FDIAEquation />
            </div>

            {/* Headline */}
            <div className="space-y-4 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <h1 className="text-foreground text-balance">
                {h("title")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
                {h("subtitle")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <Button size="lg" asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/docs">
                  {h("cta_primary")} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-border hover:bg-secondary">
                <Link href="/platform">
                  {h("cta_secondary")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRUST METRICS BAR ========== */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: h("trust_tests"), value: "2,210/2,210", icon: Shield },
              { label: h("trust_layers"), value: "10-Layer", icon: Layers },
              { label: h("trust_hallucination"), value: "0.3%", icon: Activity },
              { label: h("trust_uptime"), value: "99.98%", icon: Server },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 animate-fade-in-up"
                style={{ animationDelay: `${0.7 + i * 0.1}s` }}
              >
                <stat.icon className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <div className="text-xl md:text-2xl font-mono font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ARCHITECTURE VISUALIZATION ========== */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">Architecture</p>
            <h2 className="text-foreground">{h("architecture_title")}</h2>
            <p className="text-muted-foreground">{h("architecture_subtitle")}</p>
          </div>

          {/* Architecture Flow Diagram */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: BookOpen, title: locale === 'th' ? "การรับรู้" : "Perception", subtitle: locale === 'th' ? "ข้อมูลนำเข้า" : "Data Input", desc: locale === 'th' ? "สังเกตและรวบรวมข้อมูลเชิงบริบท" : "Observe and collect contextual data" },
                { icon: Database, title: locale === 'th' ? "หน่วยความจำ" : "Memory", subtitle: "RCTDB", desc: locale === 'th' ? "ที่เก็บข้อมูลแบบ Vector + Graph + SQL Hybrid" : "Vector + Graph + SQL hybrid storage" },
                { icon: Shield, title: locale === 'th' ? "ฉันทามติ" : "Consensus", subtitle: "SignedAI", desc: locale === 'th' ? "การตรวจสอบความถูกต้องแบบ Multi-tier" : "Multi-tier truth verification" },
                { icon: Zap, title: locale === 'th' ? "การกระทำ" : "Action", subtitle: locale === 'th' ? "ผลลัพธ์" : "Output", desc: locale === 'th' ? "การดำเนินการที่สอดคล้องกับเจตนา" : "Intent-aligned execution" },
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div className="bg-card border border-border rounded-lg p-5 space-y-3 h-full hover:border-accent/50 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-accent/10">
                        <step.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                        <p className="text-xs font-mono text-accent">{step.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-accent/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== BENTO GRID - PRODUCT FEATURES ========== */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">{locale === 'th' ? 'โครงสร้างพื้นฐาน AI ระดับ Enterprise' : 'Platform'}</p>
            <h2 className="text-foreground">{locale === 'th' ? 'โครงสร้างพื้นฐาน AI ระดับ Enterprise' : 'Enterprise AI Infrastructure'}</h2>
            <p className="text-muted-foreground">{locale === 'th' ? 'ส่วนประกอบแบบ Modular สำหรับระบบที่ขับเคลื่อนด้วยเจตนา' : 'Modular components for intent-driven systems'}</p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Large Feature - SignedAI */}
            <Link
              href="/platform#signedai"
              className="group md:col-span-2 bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs font-mono text-success bg-success/10 px-2 py-1 rounded">Verified</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition">{h("bento_signedai_title")}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {h("bento_signedai_desc")}
                </p>
              </div>
              <div className="flex items-center text-xs text-accent opacity-0 group-hover:opacity-100 transition">
                {locale === 'th' ? 'สำรวจ SignedAI' : 'Explore SignedAI'} <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </Link>

            {/* RCTDB */}
            <Link
              href="/platform#rctdb"
              className="group bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 space-y-4"
            >
              <div className="p-3 rounded-lg bg-accent/10 w-fit">
                <Database className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition">{h("bento_rctdb_title")}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {h("bento_rctdb_desc")}
                </p>
              </div>
            </Link>

            {/* JITNA */}
            <Link
              href="/philosophy/jitna"
              className="group bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 space-y-4"
            >
              <div className="p-3 rounded-lg bg-accent/10 w-fit">
                <FileCode className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition">{h("bento_jitna_title")}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {h("bento_jitna_desc")}
                </p>
              </div>
              <code className="block text-xs font-mono bg-secondary/50 p-2 rounded text-muted-foreground">
                {"{ I: 'analyze', D: data, A: action }"}
              </code>
            </Link>

            {/* Specialist Studio */}
            <Link
              href="/platform#studio"
              className="group md:col-span-2 lg:col-span-1 bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 space-y-4"
            >
              <div className="p-3 rounded-lg bg-accent/10 w-fit">
                <Cpu className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition">{h("bento_studio_title")}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {h("bento_studio_desc")}
                </p>
              </div>
            </Link>

            {/* 41 Algorithms */}
            <Link
              href="/platform"
              className="group bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-accent/10">
                  <GitBranch className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">41 Algos</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition">{h("bento_algos_title")}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {h("bento_algos_desc")}
                </p>
              </div>
            </Link>

            {/* Regional Language */}
            <Link
              href="/solutions"
              className="group bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs font-mono text-success bg-success/10 px-2 py-1 rounded">8 Markets</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition">{h("bento_regional_title")}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {h("bento_regional_desc")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== PERFORMANCE METRICS ========== */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="space-y-10">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <p className="text-sm font-mono text-accent uppercase tracking-wider">{locale === 'th' ? 'ประสิทธิภาพ' : 'Performance'}</p>
              <h2 className="text-foreground">{h("performance_title")}</h2>
              <p className="text-muted-foreground">{locale === 'th' ? 'ตัวเลขที่ได้รับการยืนยันจาก RCT Ecosystem v3.3.1' : 'Verified benchmarks from RCT Ecosystem v3.3.1'}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: locale === 'th' ? 'อัตราการหลอกลวง' : "Hallucination Rate", value: "0.3%", sub: locale === 'th' ? 'เทียบกับอุตสาหกรรม 12-15%' : "vs industry 12-15%", highlight: true },
                { label: locale === 'th' ? 'การบีบอัดบริบท' : "Context Compression", value: "74%", sub: locale === 'th' ? 'ไม่สูญเสีย ประหยัด 3.74x' : "lossless, 3.74x savings", highlight: false },
                { label: locale === 'th' ? 'ความหน่วงการตอบสนอง' : "Response Latency", value: "0.07-1.5s", sub: locale === 'th' ? 'เทียบกับอุตสาหกรรม 2-5 วินาที' : "vs industry 2-5s", highlight: false },
                { label: locale === 'th' ? 'ประสิทธิภาพต้นทุน' : "Cost Efficiency", value: "3.74x", sub: locale === 'th' ? 'ลดลงจากค่าเริ่มต้น' : "reduction vs baseline", highlight: true },
              ].map((metric, i) => (
                <div
                  key={i}
                  className={`bg-card border rounded-lg p-5 text-center space-y-2 ${
                    metric.highlight ? "border-accent/30" : "border-border"
                  }`}
                >
                  <div className="text-2xl md:text-3xl font-mono font-bold text-foreground">{metric.value}</div>
                  <p className="text-sm font-medium text-foreground">{metric.label}</p>
                  <p className="text-xs text-muted-foreground">{metric.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Server, label: locale === 'th' ? 'โครงสร้างพื้นฐาน' : "Infrastructure", items: locale === 'th' ? ["48+ Microservices", "33 Docker Containers", "Kubernetes (57 resources)"] : ["48+ Microservices", "33 Docker Containers", "Kubernetes (57 resources)"] },
                { icon: Lock, label: locale === 'th' ? 'ความปลอดภัย' : "Security", items: locale === 'th' ? ["ED25519 Signed Execution", "JWT RS256 + RBAC", "Constitutional AI Guardrails"] : ["ED25519 Signed Execution", "JWT RS256 + RBAC", "Constitutional AI Guardrails"] },
                { icon: Terminal, label: locale === 'th' ? 'ประสบการณ์นักพัฒนา' : "Developer Experience", items: locale === 'th' ? ["OpenAPI 3.1.0 (14 endpoints)", "6 Kernel RFCs", "13 Universal Adapters"] : ["OpenAPI 3.1.0 (14 endpoints)", "6 Kernel RFCs", "13 Universal Adapters"] },
              ].map((col, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <col.icon className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-foreground">{col.label}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {col.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-success shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== THE ARCHITECT PHILOSOPHY ========== */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-sm font-mono text-accent uppercase tracking-wider">{locale === 'th' ? 'ปรัชญา' : 'Philosophy'}</p>
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed">
                "{h("philosophy_quote")}"
              </blockquote>
              <p className="text-muted-foreground">{h("philosophy_author")}</p>
              <Button variant="outline" asChild>
                <Link href="/about">{locale === 'th' ? 'อ่านเรื่องราวต้นกำเนิด' : 'Read the Origin Story'}</Link>
              </Button>
            </div>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-5 space-y-2">
                <h4 className="font-semibold text-foreground">{locale === 'th' ? 'Human-in-the-Loop' : 'Human-in-the-Loop'}</h4>
                <p className="text-sm text-muted-foreground">{locale === 'th' ? 'AI เสริมการตัดสินใจของมนุษย์ ไม่ใช่แทนที่' : 'AI augments human decision-making, never replaces it.'}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5 space-y-2">
                <h4 className="font-semibold text-foreground">{locale === 'th' ? 'อธิปไตยข้อมูล' : 'Data Sovereignty'}</h4>
                <p className="text-sm text-muted-foreground">{locale === 'th' ? 'ข้อมูลของคุณ โมเดลของคุณ โครงสร้างพื้นฐานของคุณ' : 'Your data, your models, your infrastructure.'}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5 space-y-2">
                <h4 className="font-semibold text-foreground">{locale === 'th' ? 'ความจริงที่ได้รับการตรวจสอบ' : 'Verified Truth'}</h4>
                <p className="text-sm text-muted-foreground">{locale === 'th' ? 'ทุกผลลัพธ์มีลายเซ็นและสามารถตรวจสอบได้ผ่าน SignedAI' : 'Every output signed and auditable via SignedAI.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== RESEARCH HIGHLIGHTS ========== */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-mono text-accent uppercase tracking-wider">{locale === 'th' ? 'งานวิจัย' : 'Research'}</p>
              <h2 className="text-foreground">{h("research_title")}</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/research">{locale === 'th' ? 'ดูงานวิจัยทั้งหมด' : 'View All Research'}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { badge: "v2.5.0", title: "Infrastructure Layer: Docker, K8s, API Gateway & Monitoring", authors: "RCT Core Team", date: "Mar 2026" },
              { badge: "v2.3.1", title: "Enterprise Hardening: Security, Validation & Resilience", authors: "RCT Core Team", date: "Mar 2026" },
              { badge: "v2.2.0", title: "Multi-Language & Regional LLM — 8 Markets Active", authors: "RCT Core Team", date: "Feb 2026" },
            ].map((paper, i) => (
              <Link
                key={i}
                href="/research"
                className="group bg-card border border-border rounded-lg p-5 hover:border-accent/50 transition-all duration-300 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accent">{paper.badge}</span>
                  <span className="text-xs text-muted-foreground">{paper.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition leading-tight">
                  {paper.title}
                </h3>
                <p className="text-xs text-muted-foreground">{paper.authors}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="relative overflow-hidden bg-card border border-border rounded-lg p-10 md:p-16">
          {/* Subtle grid background */}
          <div className="absolute inset-0 grid-background opacity-30" />
          
          <div className="relative z-10 text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-foreground">{h("cta_title")}</h2>
            <p className="text-muted-foreground">
              {h("cta_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/docs">
                  {locale === 'th' ? 'อ่านเอกสาร' : 'Read Documentation'} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">{locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Floating AI Assistant */}
      <FloatingAI />
    </main>
  )
}
