import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Building2, 
  Code2, 
  Briefcase,
  ArrowRight, 
  CheckCircle,
  Shield,
  Zap,
  Lock,
  Users
} from "lucide-react"

export const metadata: Metadata = {
  title: "Solutions - RCT Labs",
  description: "RCT Ecosystem v2.5.0 solutions for Enterprise, Developers, and SMEs. 10-Layer architecture, 0.3% hallucination, 99.98% uptime.",
}

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background dark">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-background opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">Solutions</p>
            <h1 className="text-foreground">Built for Your Scale</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From startups to enterprises, RCT Ecosystem v2.5.0 provides Constitutional AI infrastructure with 0.3% hallucination rate, 99.98% uptime, and 8 regional markets.
            </p>
          </div>
        </div>
      </section>

      {/* Enterprise */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-accent/10">
                <Building2 className="w-6 h-6 text-accent" />
              </div>
              <span className="text-xs font-mono text-accent">Enterprise</span>
            </div>
            <h2 className="text-foreground">For Enterprise</h2>
            <p className="text-muted-foreground leading-relaxed">
              Deploy AI with confidence. Full audit trails, compliance frameworks, and enterprise-grade security.
            </p>
            <ul className="space-y-3">
              {[
                { icon: Shield, text: "0.3% hallucination rate with SignedAI multi-LLM consensus" },
                { icon: Lock, text: "ED25519 signed execution + JWT RS256 + RBAC" },
                { icon: Users, text: "99.98% uptime SLA with dedicated support" },
                { icon: Zap, text: "33 Docker containers + 57 Kubernetes resources" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <item.icon className="w-4 h-4 text-accent shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
            <Button asChild>
              <Link href="/contact">Contact Enterprise Sales</Link>
            </Button>
          </div>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Enterprise Features</h3>
            <div className="space-y-4">
              {[
                "10-Layer architecture with Enterprise Hardening (Layer 10)",
                "RCTDB v2.0 — 8D universal memory with 74% compression",
                "8 regional markets with compliance (PDPA, APPI, PIPA, PIPL)",
                "Prometheus + Grafana real-time monitoring",
                "OpenAPI 3.1.0 with 14 endpoints",
                "13 Universal Adapters (Home Assistant, Terraform, n8n, etc.)",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developers */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-card border border-border rounded-lg p-6">
              <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
{`import { RCT } from '@rctlabs/sdk';

const client = new RCT({
  apiKey: process.env.RCT_API_KEY
});

// JITNA Protocol: I/D/Delta/A/R/M
const result = await client.execute({
  I: "analyze",
  D: documentData,
  A: "summarize",
  verify: true  // SignedAI consensus
});

console.log(result.signature);
// { algo: "ED25519", verified: true,
//   consensus: ["GPT-4", "Claude", "Gemini"] }`}
              </pre>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Code2 className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs font-mono text-accent">Developers</span>
              </div>
              <h2 className="text-foreground">For Developers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Build intent-driven applications with our SDK. TypeScript-first, fully typed, and designed for modern workflows.
              </p>
              <ul className="space-y-3">
                {[
                  "TypeScript SDK + OpenAPI 3.1.0 (14 endpoints)",
                  "JITNA Protocol RFC-001 v2.0 wire schema",
                  "6 Kernel RFCs + comprehensive docs",
                  "41 production algorithms across 9 tiers",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SMEs */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-accent/10">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <span className="text-xs font-mono text-accent">SMEs</span>
            </div>
            <h2 className="text-foreground">For SMEs</h2>
            <p className="text-muted-foreground leading-relaxed">
              Enterprise-grade AI without enterprise costs. Pay only for what you use with our Loop Intent Memory system.
            </p>
            <ul className="space-y-3">
              {[
                "Usage-based pricing",
                "No minimum commitments",
                "Self-serve onboarding",
                "Community support",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/docs">
                Start Free <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Cost Savings</h3>
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Traditional AI APIs</span>
                <span className="text-xl font-mono text-muted-foreground line-through">$0.12/query</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-foreground font-semibold">With Loop Intent Memory</span>
                <span className="text-2xl font-mono text-success">$0.003/query</span>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  3.74x cost reduction through RCTDB compression and intelligent caching.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="bg-card border border-border rounded-lg p-12 text-center space-y-6">
          <h2 className="text-foreground">Find Your Solution</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Not sure which plan is right for you? Talk to our team and we will help you find the perfect fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
