import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Shield, 
  Database, 
  Cpu, 
  FileCode, 
  ArrowRight, 
  Layers, 
  Lock, 
  Zap,
  CheckCircle,
  GitBranch,
  Terminal,
  Globe,
  Server,
  Activity,
  Container,
  Network,
  Key,
  Eye,
  Workflow,
  Brain
} from "lucide-react"

export const metadata: Metadata = {
  title: "Platform - RCT Labs",
  description: "RCT Ecosystem v2.5.0 — 10-Layer Constitutional AI Operating System with 41 algorithms, 2210 tests, and 99.98% uptime.",
}

export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-background dark">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-background opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">Platform</p>
            <h1 className="text-foreground">RCT Ecosystem v2.5.0</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Constitutional AI Operating System — 10-Layer architecture, 41 production algorithms, 2,210 tests passing, and 99.98% uptime SLA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/docs">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 10-Layer Architecture */}
      <section id="kernel" className="mx-auto max-w-6xl px-4 py-24">
        <div className="space-y-12">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">Architecture</p>
            <h2 className="text-foreground">10-Layer System Architecture</h2>
            <p className="text-muted-foreground">
              From cognitive kernel to enterprise hardening — every layer formally specified with 6 Kernel RFCs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { layer: "Layer 10", name: "Enterprise Hardening", desc: "Security (JWT RS256, RBAC), Validation, Performance, Resilience, LLM Intelligence", icon: Shield, badge: "NEW v2.3.1" },
              { layer: "Layer 9", name: "Control Plane", desc: "JITNA Wire Schema, ED25519 Signed Execution, Deterministic Replay Engine", icon: Key, badge: "v2.3.0" },
              { layer: "Layer 8", name: "Regional Language Adapter", desc: "8 language-region pairs (JP, KR, CN, TW, TH, VN, ID, US) with compliance", icon: Globe, badge: "8 Markets" },
              { layer: "Layer 7", name: "Universal Adapters", desc: "Home Assistant, Rotki, Blender, Terraform, n8n, Obsidian, FFmpeg + more", icon: Network, badge: "13 Adapters" },
              { layer: "Layer 6", name: "JITNA Protocol", desc: "RFC-001 v2.0 — AI-to-AI communication with PROPOSE→COUNTER→ACCEPT/REJECT", icon: Workflow, badge: "RFC-001" },
              { layer: "Layer 5", name: "SignedAI", desc: "Multi-LLM attestation: GPT-4 + Claude 3.5 + Gemini Pro consensus", icon: CheckCircle, badge: "0.3% Halluc." },
              { layer: "Layer 4", name: "RCTDB v2.0", desc: "8-dimensional universal memory: Registry, Vault, and Governance zones", icon: Database, badge: "8D Memory" },
              { layer: "Layer 3", name: "41 Production Algorithms", desc: "Tier 1-3: Foundation (15) | Tier 4-6: Intelligence (14) | Tier 7-9: Consciousness (12)", icon: GitBranch, badge: "41 Algos" },
              { layer: "Layer 2", name: "OS Primitives", desc: "Process Model, Scheduler, IPC, Syscall Interface, Fault Isolation — 6 RFCs", icon: Terminal, badge: "Kernel v1.4" },
              { layer: "Layer 1", name: "7 Genome System", desc: "Architect, ARTENT, JITNA, Codex, SignedAI, Vault-1010, RCT-7 + SHA256 proof", icon: Brain, badge: "Foundation" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 space-y-3 hover:border-accent/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-accent" />
                    <span className="text-xs font-mono text-accent">{item.layer}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">{item.badge}</span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SignedAI Section */}
      <section id="signedai" className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-success/10">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <span className="text-xs font-mono text-success bg-success/10 px-2 py-1 rounded">Verified</span>
              </div>
              <h2 className="text-foreground">SignedAI</h2>
              <p className="text-muted-foreground leading-relaxed">
                Multi-LLM attestation achieving 0.3% hallucination rate (vs industry 12-15%). GPT-4 + Claude 3.5 + Gemini Pro 
                consensus verification with ED25519 cryptographic signatures.
              </p>
              <ul className="space-y-3">
                {[
                  "0.3% hallucination rate (95% better than industry)",
                  "ED25519 cryptographic output signing (RFC 8032)",
                  "Multi-model consensus: GPT-4, Claude 3.5, Gemini Pro",
                  "Deterministic replay with SHA-256 checkpoints",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" asChild>
                <Link href="/docs/signedai">Learn More</Link>
              </Button>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
{`{
  "output": "Analysis complete",
  "signature": {
    "tier": "S-8",
    "confidence": 0.961,
    "consensus": [4, 6, 8],
    "hash": "0x7f3a...b2c1"
  },
  "verified": true,
  "timestamp": "2026-03-04T12:00:00Z"
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* RCTDB Section */}
      <section id="rctdb" className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Vector", desc: "Semantic search", color: "text-accent" },
                { name: "Graph", desc: "Relationships", color: "text-success" },
                { name: "SQL", desc: "Structured data", color: "text-warning" },
              ].map((layer, i) => (
                <div key={i} className="text-center p-4 border border-border rounded-lg">
                  <Database className={`w-6 h-6 mx-auto mb-2 ${layer.color}`} />
                  <p className="text-sm font-semibold text-foreground">{layer.name}</p>
                  <p className="text-xs text-muted-foreground">{layer.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center pt-4 border-t border-border">
              <p className="text-xs font-mono text-muted-foreground">Unified Query Interface</p>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="p-3 rounded-lg bg-accent/10 w-fit">
              <Database className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-foreground">RCTDB v2.0</h2>
            <p className="text-muted-foreground leading-relaxed">
              8-dimensional universal memory schema with infinite scalability. Three zones: Registry (Identity & Discovery), 
              Vault (Infinite Storage), and Governance (Rules & Evolution).
            </p>
            <ul className="space-y-3">
              {[
                "8-dimensional universal schema",
                "74% lossless context compression",
                "3-zone architecture (Registry, Vault, Governance)",
                "pgvector HNSW + Apache AGE graph + async batch ops",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Specialist Studio Section */}
      <section id="studio" className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="space-y-12">
            <div className="max-w-2xl space-y-4">
              <div className="p-3 rounded-lg bg-accent/10 w-fit">
                <Cpu className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-foreground">Specialist Studio</h2>
              <p className="text-muted-foreground">
                Create domain-specific AI modules with specialized knowledge and compliance requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Legal", desc: "Contract analysis, compliance checking, case research", icon: FileCode },
                { name: "Medical", desc: "Diagnostic support, research synthesis, patient data", icon: Shield },
                { name: "Finance", desc: "Risk assessment, market analysis, regulatory compliance", icon: Lock },
              ].map((module, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 space-y-4 hover:border-accent/50 transition-colors">
                  <module.icon className="w-8 h-8 text-accent" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{module.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{module.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section id="infrastructure" className="mx-auto max-w-6xl px-4 py-24">
        <div className="space-y-12">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">Infrastructure</p>
            <h2 className="text-foreground">Production-Ready Deployment</h2>
            <p className="text-muted-foreground">
              v2.5.0 Phase 5-11: Docker, Kubernetes, API Gateway, and monitoring stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Container, title: "Docker Compose", desc: "31+ services unified deployment with health checks (736 lines)", stat: "33 Containers" },
              { icon: Server, title: "Kubernetes", desc: "57 resources: HPA, PDB, NetworkPolicy, ArgoCD GitOps, Backup CronJobs", stat: "57 Resources" },
              { icon: Network, title: "API Gateway", desc: "Bun + Hono TypeScript: JWT RS256 auth, RBAC, rate limiting, 10 routes", stat: "10 Routes" },
              { icon: Activity, title: "Monitoring", desc: "Prometheus scrape configs + Grafana dashboards (health, RPS, latency, errors)", stat: "Real-time" },
              { icon: Shield, title: "Test Infrastructure", desc: "Locust + k6 load testing, OWASP security, Chaos (9 scenarios), E2E (7 flows)", stat: "2,210 Tests" },
              { icon: FileCode, title: "Documentation", desc: "OpenAPI 3.1.0 (14 endpoints), C4 Architecture, Deployment Guide, Runbooks", stat: "14 Endpoints" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 space-y-3 hover:border-accent/50 transition-colors">
                <div className="flex items-center justify-between">
                  <item.icon className="w-5 h-5 text-accent" />
                  <span className="text-xs font-mono text-accent">{item.stat}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Language Adapter */}
      <section id="regional" className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="space-y-12">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs font-mono text-accent">8 Markets Active</span>
              </div>
              <h2 className="text-foreground">Regional Language Adapter</h2>
              <p className="text-muted-foreground">
                Multi-language routing with compliance frameworks. LanguageDetector (Unicode script analysis), 
                RegionalModelRouter (4-level resolution + LRU cache), and 6 pilot tenants.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">Language</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">Region</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">Default Model</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">Compliance</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { lang: "English", region: "US", model: "Claude Opus 4.6", compliance: "—" },
                    { lang: "Thai", region: "TH", model: "DeepSeek V3.2", compliance: "PDPA" },
                    { lang: "Japanese", region: "JP", model: "Claude 3.5 Sonnet", compliance: "APPI" },
                    { lang: "Korean", region: "KR", model: "GPT-4 Turbo", compliance: "PIPA" },
                    { lang: "Chinese (Simplified)", region: "CN", model: "Qwen 2.5 72B", compliance: "PIPL" },
                    { lang: "Chinese (Traditional)", region: "TW", model: "Qwen 2.5 72B", compliance: "—" },
                    { lang: "Vietnamese", region: "VN", model: "Qwen 2.5 7B", compliance: "—" },
                    { lang: "Indonesian", region: "ID", model: "Qwen 2.5 7B", compliance: "—" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                      <td className="py-3 px-4 text-foreground">{row.lang}</td>
                      <td className="py-3 px-4 font-mono text-muted-foreground">{row.region}</td>
                      <td className="py-3 px-4 font-mono text-muted-foreground">{row.model}</td>
                      <td className="py-3 px-4">
                        {row.compliance !== "—" ? (
                          <span className="text-xs font-mono text-success bg-success/10 px-2 py-0.5 rounded">{row.compliance}</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">Performance</p>
            <h2 className="text-foreground">Verified Benchmarks</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">Metric</th>
                  <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">RCT v2.5.0</th>
                  <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">Industry Avg</th>
                  <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">Improvement</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: "Hallucination Rate", rct: "0.3%", industry: "12-15%", improvement: "95% better" },
                  { metric: "Context Compression", rct: "74% lossless", industry: "30-40%", improvement: "185% better" },
                  { metric: "Response Latency", rct: "0.07-1.5s", industry: "2-5s", improvement: "70% faster" },
                  { metric: "Uptime SLA", rct: "99.98%", industry: "99.5%", improvement: "Enterprise-grade" },
                  { metric: "Test Coverage", rct: "100% (2,210/2,210)", industry: "70-80%", improvement: "Tier-1 quality" },
                  { metric: "Cost Efficiency", rct: "3.74x reduction", industry: "1x baseline", improvement: "274% savings" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">{row.metric}</td>
                    <td className="py-3 px-4 font-mono text-accent">{row.rct}</td>
                    <td className="py-3 px-4 font-mono text-muted-foreground">{row.industry}</td>
                    <td className="py-3 px-4 text-success text-xs">{row.improvement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="bg-card border border-border rounded-lg p-12 text-center space-y-6">
          <h2 className="text-foreground">Ready to Build?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start building with RCT Ecosystem v2.5.0. Full documentation, 14 OpenAPI endpoints, and enterprise support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/docs">
                View Documentation <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
