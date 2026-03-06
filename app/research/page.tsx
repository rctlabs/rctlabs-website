"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Brain, Zap, ArrowRight, Shield, Globe, Server, Layers, GitBranch, Key, Activity, Container } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ResearchPage() {
  const papers = [
    {
      slug: "v250-infrastructure-layer",
      title: "v2.5.0: Infrastructure Layer — Docker, Kubernetes, API Gateway & Monitoring",
      description:
        "Phase 5-11 complete: 33 Docker containers, 57 Kubernetes resources, Bun+Hono API Gateway (JWT RS256, RBAC), Prometheus+Grafana monitoring, Locust/k6 load testing, OWASP security, Chaos & E2E scenarios.",
      category: "Infrastructure",
      badge: "v2.5.0",
      authors: "RCT Core Team",
      date: "March 4, 2026",
      icon: Container,
    },
    {
      slug: "v240-analysearch-41-algorithms",
      title: "v2.4.0: Analysearch Intent Engine & 41 Production Algorithms",
      description:
        "41 algorithms across 9 tiers: Foundation (15), Intelligence (14), Consciousness (12). Includes Genesis Engine, ITSR, The Crystallizer, Planning Depth Expander, and Constraint Satisfaction Solver.",
      category: "Algorithms",
      badge: "v2.4.0",
      authors: "RCT Core Team",
      date: "March 4, 2026",
      icon: GitBranch,
    },
    {
      slug: "v231-enterprise-hardening",
      title: "v2.3.1: Enterprise Hardening — Security, Validation & Resilience",
      description:
        "Layer 10 with 10 hardening modules: SecurityManager, InputValidator, XSSProtector, PathTraversalGuard, SchemaValidator, ConnectionPoolManager, CacheManager, CircuitBreaker, BulkheadPattern, RetryWithBackoff.",
      category: "Security",
      badge: "v2.3.1",
      authors: "RCT Core Team",
      date: "March 2, 2026",
      icon: Shield,
    },
    {
      slug: "v230-control-plane",
      title: "v2.3.0: Control Plane — JITNA Wire Schema, ED25519 Signing & Replay",
      description:
        "Layer 9 with JITNAPacket (sequence numbering, expiry, Pydantic v2 validation), ED25519 signed execution (RFC 8032), and Deterministic Replay Engine (SHA-256 checkpoints, non-determinism detection).",
      category: "Architecture",
      badge: "v2.3.0",
      authors: "RCT Core Team",
      date: "February 28, 2026",
      icon: Key,
    },
    {
      slug: "v220-regional-language",
      title: "v2.2.0: Multi-Language & Regional LLM — 8 Markets Active",
      description:
        "Regional Language Adapter with 8 language-region pairs (JP, KR, CN, TW, TH, VN, ID, US), LanguageDetector (Unicode script analysis), RegionalModelRouter (4-level resolution + LRU cache), and compliance (PDPA, APPI, PIPA, PIPL).",
      category: "Regional",
      badge: "v2.2.0",
      authors: "RCT Core Team",
      date: "February 28, 2026",
      icon: Globe,
    },
    {
      slug: "v215-os-primitives",
      title: "v2.1.5: OS Primitives — Kernel v1.4.0 with 6 RFCs",
      description:
        "Process Model, Scheduler, IPC, Syscall Interface, Fault Isolation, and Resource Manager. 7 Genome System: Architect, ARTENT, JITNA, Codex, SignedAI, Vault-1010, RCT-7 with SHA256 proof-of-lineage.",
      category: "Kernel",
      badge: "v2.1.5",
      authors: "RCT Core Team",
      date: "February 27, 2026",
      icon: Layers,
    },
    {
      slug: "signedai-consensus",
      title: "SignedAI: Multi-LLM Attestation with 0.3% Hallucination Rate",
      description:
        "Constitutional AI consensus verification using GPT-4, Claude 3.5, and Gemini Pro. Achieves 0.3% hallucination rate (vs industry 12-15%) through multi-tier voting with ED25519 cryptographic signatures.",
      category: "AI Safety",
      badge: "Core",
      authors: "RCT Core Team",
      date: "2026",
      icon: Brain,
    },
    {
      slug: "rctdb-8d-memory",
      title: "RCTDB v2.0: 8-Dimensional Universal Memory Schema",
      description:
        "Universal memory architecture with Registry (Identity & Discovery), Vault (Infinite Storage), and Governance (Rules & Evolution) zones. 74% lossless compression with pgvector HNSW + Apache AGE graph.",
      category: "Database",
      badge: "Core",
      authors: "RCT Core Team",
      date: "2026",
      icon: Activity,
    },
    {
      slug: "jitna-rfc001",
      title: "JITNA Protocol RFC-001 v2.0: The HTTP of Agentic AI",
      description:
        "Formal specification for AI-to-AI communication. Intent specification (I/D/Delta/A/R/M), negotiation lifecycle (PROPOSE→COUNTER→ACCEPT/REJECT), wire schema, and 13 Universal Adapters.",
      category: "Protocol",
      badge: "RFC-001",
      authors: "RCT Core Team",
      date: "2026",
      icon: FileText,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <p className="text-sm font-mono text-accent uppercase tracking-wider">Research & Releases</p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">RCT Ecosystem v2.5.0</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Version history, architecture papers, and technical specifications for the Constitutional AI Operating System
          </p>
        </div>
      </section>

      {/* Featured Papers */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {papers.map((paper) => {
            const Icon = paper.icon
            return (
              <Link key={paper.slug} href={`/research/${paper.slug}`}>
                <div className="group h-full p-8 rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition bg-card">
                  <div className="space-y-4 h-full flex flex-col">
                    <div className="flex items-start justify-between">
                      <Icon className="w-10 h-10 text-accent" />
                      <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                        {paper.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-accent transition leading-tight">
                        {paper.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{paper.description}</p>
                    </div>
                    <div className="flex-1" />
                    <div className="space-y-2 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">{paper.authors}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{paper.date}</span>
                        <div className="flex items-center text-accent opacity-0 group-hover:opacity-100 transition">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "Tests Passing", value: "2,210" },
            { label: "Production Algorithms", value: "41" },
            { label: "Architecture Layers", value: "10" },
            { label: "Regional Markets", value: "8" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-lg">
        <div className="space-y-6 text-center">
          <h2 className="text-4xl font-bold text-foreground">Explore the Architecture</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive deep into the 10-layer architecture, 41 production algorithms, and Constitutional AI framework.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
