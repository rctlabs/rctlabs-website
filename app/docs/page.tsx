import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  BookOpen, 
  FileText, 
  ArrowRight, 
  Layers, 
  Shield, 
  Database, 
  Globe, 
  Terminal, 
  Server,
  GitBranch,
  Key,
  Workflow,
  CheckCircle,
  ExternalLink
} from "lucide-react"

export const metadata: Metadata = {
  title: "Documentation - RCT Labs",
  description: "RCT Ecosystem v3.4.0 documentation — Architecture, APIs, RFCs, and deployment guides.",
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background dark">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-background opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">Documentation</p>
            <h1 className="text-foreground">RCT Ecosystem v3.4.0</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Complete technical documentation for the Constitutional AI Operating System. Architecture, APIs, RFCs, and deployment guides.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">v3.4.0</span>
              <span className="text-xs font-mono text-muted-foreground">3,765 tests passing</span>
              <span className="text-xs font-mono text-muted-foreground">•</span>
              <span className="text-xs font-mono text-muted-foreground">10-Layer Architecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Terminal, title: "Quick Start", desc: "Get up and running with RCT Ecosystem in minutes", href: "#quickstart" },
            { icon: Layers, title: "Architecture", desc: "10-Layer system architecture deep dive", href: "#architecture" },
            { icon: FileText, title: "API Reference", desc: "OpenAPI 3.1.0 with 14 endpoints", href: "#api" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 space-y-3"
            >
              <item.icon className="w-6 h-6 text-accent" />
              <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Architecture Overview */}
      <section id="architecture" className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="space-y-10">
            <div className="space-y-3">
              <p className="text-sm font-mono text-accent uppercase tracking-wider">Architecture</p>
              <h2 className="text-foreground">10-Layer System Overview</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { layer: "L10", name: "Enterprise Hardening", icon: Shield, desc: "Security, Validation, Performance, Resilience" },
                { layer: "L9", name: "Control Plane", icon: Key, desc: "JITNA Wire, ED25519 Signing, Replay Engine" },
                { layer: "L8", name: "Regional Language", icon: Globe, desc: "8 markets, compliance frameworks" },
                { layer: "L7", name: "Universal Adapters", icon: Workflow, desc: "13 adapters: Home Assistant, Terraform, n8n..." },
                { layer: "L6", name: "JITNA Protocol", icon: FileText, desc: "RFC-001 v2.0, AI-to-AI communication" },
                { layer: "L5", name: "SignedAI", icon: CheckCircle, desc: "Multi-LLM consensus, 0.3% hallucination" },
                { layer: "L4", name: "RCTDB v2.0", icon: Database, desc: "8D memory, Registry/Vault/Governance" },
                { layer: "L3", name: "41 Algorithms", icon: GitBranch, desc: "9 tiers: Foundation, Intelligence, Consciousness" },
                { layer: "L2", name: "OS Primitives", icon: Terminal, desc: "Process Model, Scheduler, IPC, 6 RFCs" },
                { layer: "L1", name: "7 Genome System", icon: Layers, desc: "Architect, ARTENT, JITNA, Codex, SignedAI, Vault, RCT-7" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-card border border-border rounded-lg p-4 hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-accent w-8">{item.layer}</span>
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kernel RFCs */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-10">
          <div className="space-y-3">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">Specifications</p>
            <h2 className="text-foreground">Kernel RFCs</h2>
            <p className="text-muted-foreground">Formal specifications governing the RCT Ecosystem kernel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { rfc: "RFC-001", title: "JITNA Protocol v2.0", desc: "Intent specification, negotiation lifecycle, wire schema" },
              { rfc: "RFC-002", title: "Process Model", desc: "Process lifecycle, state management, resource allocation" },
              { rfc: "RFC-003", title: "Scheduler", desc: "Priority scheduling, preemption, fairness guarantees" },
              { rfc: "RFC-004", title: "IPC", desc: "Inter-process communication, message passing, shared memory" },
              { rfc: "RFC-005", title: "Syscall Interface", desc: "System call specification, error handling, permissions" },
              { rfc: "RFC-006", title: "Fault Isolation", desc: "Process isolation, error boundaries, recovery protocols" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 space-y-2 hover:border-accent/30 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accent">{item.rfc}</span>
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="space-y-10">
            <div className="space-y-3">
              <p className="text-sm font-mono text-accent uppercase tracking-wider">API Reference</p>
              <h2 className="text-foreground">OpenAPI 3.1.0 — 14 Endpoints</h2>
              <p className="text-muted-foreground">RESTful API with JWT RS256 authentication and RBAC authorization.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">Method</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">Endpoint</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { method: "POST", endpoint: "/rctlabs/assistant/chat", desc: "Main chat with SignedAI consensus" },
                    { method: "POST", endpoint: "/rctlabs/assistant/chat/stream", desc: "SSE streaming for real-time tokens" },
                    { method: "GET", endpoint: "/health", desc: "Health check with model chain info" },
                    { method: "GET", endpoint: "/metrics", desc: "Analytics + cache statistics" },
                    { method: "GET", endpoint: "/algorithms", desc: "41 algorithm registry + tier breakdown" },
                    { method: "GET", endpoint: "/algorithms/status", desc: "Live service health check" },
                    { method: "GET", endpoint: "/models", desc: "LLM configuration + client stats" },
                    { method: "GET", endpoint: "/cache/stats", desc: "Cache hit/miss rates" },
                    { method: "POST", endpoint: "/cache/clear", desc: "Cache invalidation" },
                    { method: "GET", endpoint: "/context", desc: "Dynamic LLM context builder" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                      <td className="py-2.5 px-4">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                          row.method === "POST" ? "text-warning bg-warning/10" : "text-success bg-success/10"
                        }`}>
                          {row.method}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs text-foreground">{row.endpoint}</td>
                      <td className="py-2.5 px-4 text-xs text-muted-foreground">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-10">
          <div className="space-y-3">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">Deployment</p>
            <h2 className="text-foreground">Infrastructure Guide</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Docker Compose", desc: "31+ services, health checks, 736-line config. Run with docker-compose up.", stat: "33 containers" },
              { title: "Kubernetes", desc: "57 resources: HPA, PDB, NetworkPolicy, ArgoCD GitOps, Backup CronJobs.", stat: "57 resources" },
              { title: "API Gateway", desc: "Bun + Hono TypeScript gateway: JWT RS256 auth, RBAC, rate limiting, 10 routes.", stat: "10 routes" },
              { title: "Monitoring", desc: "Prometheus scrape configs + Grafana dashboards: health, RPS, latency, errors.", stat: "Real-time" },
              { title: "Testing", desc: "Locust + k6 load testing, OWASP security, Chaos (9 scenarios), E2E (7 flows).", stat: "3,765 tests" },
              { title: "Documentation", desc: "C4 Architecture diagrams, Deployment Guide, Runbooks, OpenAPI spec.", stat: "14 endpoints" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <span className="text-xs font-mono text-accent">{item.stat}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quickstart" className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="space-y-10">
            <div className="space-y-3">
              <p className="text-sm font-mono text-accent uppercase tracking-wider">Getting Started</p>
              <h2 className="text-foreground">Quick Start</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">1. Docker Deployment</h3>
                <div className="bg-card border border-border rounded-lg p-4">
                  <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
{`# Clone the repository
git clone https://github.com/rctlabs/ecosystem.git
cd ecosystem

# Start all services
docker-compose up -d

# Verify health
curl http://localhost:8003/health`}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">2. SDK Usage</h3>
                <div className="bg-card border border-border rounded-lg p-4">
                  <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
{`import { RCT } from '@rctlabs/sdk';

const client = new RCT({
  apiKey: process.env.RCT_API_KEY
});

// JITNA Protocol: I/D/Delta/A/R/M
const result = await client.execute({
  I: "analyze",
  D: data,
  A: "summarize",
  verify: true  // SignedAI consensus
});`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="bg-card border border-border rounded-lg p-12 text-center space-y-6">
          <h2 className="text-foreground">Need Help?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore the full architecture, review the RFCs, or contact our team for enterprise support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/platform">
                View Platform <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
