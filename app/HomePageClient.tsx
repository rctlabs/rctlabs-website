"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingAI } from "@/components/floating-ai"
import { FDIAEquation } from "@/components/fdia-equation"
import { ArrowRight, BookOpen, Users, Lightbulb, Github, Zap, Shield, Database, Cpu, FileCode } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
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
                The Operating System for Intent-Driven Intelligence
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
                Redefining AI architecture with Kernel-level consensus, zero-cost scaling, and absolute sovereignty.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <Button size="lg" asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/docs">
                  Read the Whitepaper <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-border hover:bg-secondary">
                <Link href="/platform">
                  Initialize Platform
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
              { label: "Unit Tests Passed", value: "395/395", icon: Shield },
              { label: "Kernel Architecture", value: "Tier-9", icon: Cpu },
              { label: "Accuracy Rate", value: "96.1%", icon: Database },
              { label: "Audit Coverage", value: "100%", icon: FileCode },
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
            <h2 className="text-foreground">Built on the FDIA Protocol</h2>
            <p className="text-muted-foreground">Where intent meets verification</p>
          </div>

          {/* Architecture Flow Diagram */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: BookOpen, title: "Perception", subtitle: "Data Input", desc: "Observe and collect contextual data" },
                { icon: Database, title: "Memory", subtitle: "RCTDB", desc: "Vector + Graph + SQL hybrid storage" },
                { icon: Shield, title: "Consensus", subtitle: "SignedAI", desc: "Multi-tier truth verification" },
                { icon: Zap, title: "Action", subtitle: "Output", desc: "Intent-aligned execution" },
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
            <p className="text-sm font-mono text-accent uppercase tracking-wider">Platform</p>
            <h2 className="text-foreground">Enterprise AI Infrastructure</h2>
            <p className="text-muted-foreground">Modular components for intent-driven systems</p>
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
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition">SignedAI</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Multi-tier consensus verification system. S/4/6/8 tiers ensure truth through AI voting mechanisms.
                </p>
              </div>
              <div className="flex items-center text-xs text-accent opacity-0 group-hover:opacity-100 transition">
                Explore SignedAI <ArrowRight className="w-3 h-3 ml-1" />
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
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition">RCTDB</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  3-layer memory system: Vector, Graph, and SQL unified.
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
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition">JITNA Language</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Intent specification: I/D/Delta/A/R/M structure.
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
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition">Specialist Studio</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Create domain-specific modules: Legal, Medical, Finance.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== THE ARCHITECT PHILOSOPHY ========== */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-sm font-mono text-accent uppercase tracking-wider">Philosophy</p>
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed">
                "We believe that intelligence should be an asset you own, not a service you rent."
              </blockquote>
              <p className="text-muted-foreground">— The Architect</p>
              <Button variant="outline" asChild>
                <Link href="/about">Read the Origin Story</Link>
              </Button>
            </div>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-5 space-y-2">
                <h4 className="font-semibold text-foreground">Human-in-the-Loop</h4>
                <p className="text-sm text-muted-foreground">AI augments human decision-making, never replaces it.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5 space-y-2">
                <h4 className="font-semibold text-foreground">Data Sovereignty</h4>
                <p className="text-sm text-muted-foreground">Your data, your models, your infrastructure.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5 space-y-2">
                <h4 className="font-semibold text-foreground">Verified Truth</h4>
                <p className="text-sm text-muted-foreground">Every output signed and auditable via SignedAI.</p>
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
              <p className="text-sm font-mono text-accent uppercase tracking-wider">Research</p>
              <h2 className="text-foreground">Latest Publications</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/research">View All Research</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { badge: "Mathematics", title: "Intent Optimization in Neural Networks", authors: "RCT Research Team", date: "2025" },
              { badge: "Ethics", title: "Ethical Frameworks for Intent-Driven AI", authors: "RCT Research Team", date: "2025" },
              { badge: "Systems", title: "Scalable Intent Operating Systems", authors: "RCT Research Team", date: "2025" },
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
            <h2 className="text-foreground">Ready to Initialize?</h2>
            <p className="text-muted-foreground">
              Join the next generation of AI infrastructure. Thailand as AI Producer, not just Consumer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/docs">
                  Read Documentation <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
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
