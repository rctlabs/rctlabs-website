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
  Terminal
} from "lucide-react"

export const metadata: Metadata = {
  title: "Platform - RCT Labs",
  description: "Enterprise AI Infrastructure built on the FDIA Protocol. SignedAI, RCTDB, JITNA, and Specialist Studio.",
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
            <h1 className="text-foreground">Enterprise AI Infrastructure</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Built on the FDIA Protocol. Kernel-level consensus, zero-cost scaling, and absolute data sovereignty.
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

      {/* Core Engine Section */}
      <section id="kernel" className="mx-auto max-w-6xl px-4 py-24">
        <div className="space-y-12">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">Core Engine</p>
            <h2 className="text-foreground">9-Tier Kernel Architecture</h2>
            <p className="text-muted-foreground">
              Hierarchical processing system that ensures accuracy, consensus, and auditability at every layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tier: "Tier 1-3", name: "Perception", desc: "Input processing, context extraction, intent parsing", icon: Layers },
              { tier: "Tier 4-6", name: "Reasoning", desc: "Multi-model consensus, fact verification, logic validation", icon: GitBranch },
              { tier: "Tier 7-9", name: "Execution", desc: "Action orchestration, output signing, audit logging", icon: Terminal },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accent">{item.tier}</span>
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
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
                Multi-tier consensus verification system. Every output is verified through S/4/6/8 tier voting mechanisms, 
                ensuring truth through cryptographic signatures and audit trails.
              </p>
              <ul className="space-y-3">
                {[
                  "Multi-model consensus voting",
                  "Cryptographic output signing",
                  "Real-time hallucination detection",
                  "Complete audit trail coverage",
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
  "timestamp": "2025-03-06T12:00:00Z"
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
            <h2 className="text-foreground">RCTDB</h2>
            <p className="text-muted-foreground leading-relaxed">
              3-layer memory system that unifies Vector, Graph, and SQL databases into a single query interface. 
              Optimized for intent-driven AI workloads with sub-millisecond latency.
            </p>
            <ul className="space-y-3">
              {[
                "Hybrid storage architecture",
                "74% compression ratio",
                "Sub-millisecond retrieval",
                "Automatic data tiering",
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

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="bg-card border border-border rounded-lg p-12 text-center space-y-6">
          <h2 className="text-foreground">Ready to Build?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start building with RCT infrastructure today. Full documentation, SDKs, and enterprise support available.
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
