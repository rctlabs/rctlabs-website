"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Brain, ArrowRight, Shield, Globe, Layers, GitBranch, Key, Activity, Container } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ResearchClient() {
  const papers = [
    {
      slug: "v250-infrastructure-layer",
      title: "v2.5.0: Infrastructure Layer — Containerization, API Gateway & Monitoring",
      description: "Production-grade containerized infrastructure with API Gateway (authentication & RBAC), real-time monitoring, load testing, OWASP-compliant security, and chaos engineering scenarios.",
      category: "Infrastructure",
      badge: "v2.5.0",
      authors: "RCT Core Team",
      date: "March 4, 2026",
      icon: Container,
    },
    {
      slug: "v240-analysearch-41-algorithms",
      title: "v2.4.0: Analysearch Intent Engine & 41 Production Algorithms",
      description: "41 algorithms across 9 tiers: Foundation (15), Intelligence (14), Consciousness (12). Includes Genesis Engine, ITSR, The Crystallizer, Planning Depth Expander, and Constraint Satisfaction Solver.",
      category: "Algorithms",
      badge: "v2.4.0",
      authors: "RCT Core Team",
      date: "March 4, 2026",
      icon: GitBranch,
    },
    {
      slug: "v231-enterprise-hardening",
      title: "v2.3.1: Enterprise Hardening — Security, Validation & Resilience",
      description: "Layer 10 with comprehensive hardening: input validation, injection protection, schema validation, connection pooling, caching, circuit breakers, bulkhead isolation, and retry strategies.",
      category: "Security",
      badge: "v2.3.1",
      authors: "RCT Core Team",
      date: "March 2, 2026",
      icon: Shield,
    },
    {
      slug: "v230-control-plane",
      title: "v2.3.0: Control Plane — JITNA Wire Schema, Cryptographic Signing & Replay",
      description: "Layer 9 with JITNA packet protocol (sequence numbering, expiry, schema validation), cryptographic signed execution (RFC 8032), and deterministic replay engine with integrity verification.",
      category: "Architecture",
      badge: "v2.3.0",
      authors: "RCT Core Team",
      date: "February 28, 2026",
      icon: Key,
    },
    {
      slug: "v220-regional-language",
      title: "v2.2.0: Multi-Language & Regional LLM — 8 Markets Active",
      description: "Regional language adapter supporting 8 language-region pairs across Asia-Pacific and US markets, with intelligent script detection, regional model routing, and full regulatory compliance (PDPA, APPI, PIPA, PIPL).",
      category: "Regional",
      badge: "v2.2.0",
      authors: "RCT Core Team",
      date: "February 28, 2026",
      icon: Globe,
    },
    {
      slug: "v215-os-primitives",
      title: "v2.1.5: OS Primitives — Kernel v1.4.0 with 6 RFCs",
      description: "Core OS primitives: process management, scheduling, inter-process communication, syscall interface, fault isolation, and resource management. 7 Genome System with cryptographic proof-of-lineage.",
      category: "Kernel",
      badge: "v2.1.5",
      authors: "RCT Core Team",
      date: "February 27, 2026",
      icon: Layers,
    },
    {
      slug: "signedai-consensus",
      title: "SignedAI: Multi-LLM Attestation with 0.3% Hallucination Rate",
      description: "Constitutional AI consensus verification using GPT-4, Claude 3.5, and Gemini Pro. Achieves 0.3% hallucination rate (vs industry 12-15%) through multi-tier voting with ED25519 cryptographic signatures.",
      category: "AI Safety",
      badge: "Core",
      authors: "RCT Core Team",
      date: "2026",
      icon: Brain,
    },
    {
      slug: "rctdb-8d-memory",
      title: "RCTDB v2.0: 8-Dimensional Universal Memory Schema",
      description: "Universal memory architecture with Registry (Identity & Discovery), Vault (Infinite Storage), and Governance (Rules & Evolution) zones. 74% lossless compression with vector and graph storage.",
      category: "Database",
      badge: "Core",
      authors: "RCT Core Team",
      date: "2026",
      icon: Activity,
    },
    {
      slug: "jitna-rfc001",
      title: "JITNA Protocol RFC-001 v2.0: The HTTP of Agentic AI",
      description: "Formal specification for AI-to-AI communication. Intent specification (I/D/Delta/A/R/M), negotiation lifecycle (PROPOSE→COUNTER→ACCEPT/REJECT), wire schema, and 13 Universal Adapters.",
      category: "Protocol",
      badge: "RFC-001",
      authors: "RCT Core Team",
      date: "2026",
      icon: FileText,
    },
  ]

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <p className="font-mono text-sm uppercase tracking-wider text-accent">Research & Releases</p>
          <h1 className="text-5xl font-bold leading-tight text-foreground text-balance md:text-6xl">RCT Ecosystem v3.7.0</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground text-balance md:text-2xl">
            Version history, architecture papers, benchmark evidence, and technical specifications for the Constitutional AI Operating System.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link href="/whitepaper" className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
              Read Whitepapers
            </Link>
            <Link href="/architecture" className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
              Explore Architecture
            </Link>
            <Link href="/contact" className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
              Talk to the Team
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {papers.map((paper) => {
            const Icon = paper.icon
            return (
              <Link key={paper.slug} href={`/research/${paper.slug}`}>
                <div className="group flex h-full flex-col rounded-lg border border-border bg-card p-8 transition hover:border-accent/50 hover:shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Icon className="h-10 w-10 text-accent" />
                      <span className="inline-block rounded bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                        {paper.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold leading-tight text-foreground transition group-hover:text-accent">
                        {paper.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{paper.description}</p>
                    </div>
                  </div>
                  <div className="flex-1" />
                  <div className="mt-4 space-y-2 border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">{paper.authors}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{paper.date}</span>
                      <div className="flex items-center text-accent opacity-0 transition group-hover:opacity-100">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {[
            { label: "Tests Passing", value: "3,765" },
            { label: "Production Algorithms", value: "41" },
            { label: "Architecture Layers", value: "10" },
            { label: "Regional Markets", value: "8" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-2 text-center">
              <div className="text-3xl font-bold text-accent md:text-4xl">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl rounded-lg bg-gradient-to-r from-accent/5 to-secondary/5 px-4 py-24">
        <div className="space-y-6 text-center">
          <h2 className="text-4xl font-bold text-foreground">Go Deeper Into the Platform</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Continue from research into architecture, whitepapers, pricing, and solution design if you are evaluating RCT for enterprise use.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/whitepaper">Open Whitepapers</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
