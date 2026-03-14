import { Metadata } from "next"
import { createBilingualMetadata, getSoftwareApplicationSchema, type Locale } from "@/lib/seo-bilingual"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { headers } from "next/headers"
import { loadTranslations } from "@/lib/i18n"
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
import { TenLayerArchitecture } from "@/components/ten-layer-architecture"

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale

  return createBilingualMetadata(
    locale,
    "Platform - RCT Labs",
    "แพลตฟอร์ม - RCT Labs",
    "RCT Ecosystem v3.3.1 — 10-Layer Constitutional AI Operating System with 41 algorithms, 3,695 tests, and 99.98% uptime.",
    "RCT Ecosystem v3.3.1 — Constitutional AI Operating System สถาปัตยกรรม 10 ชั้นพร้อมอัลกอริทึม 41 ตัว, ทดสอบ 3,695 ข้อ และ uptime 99.98%",
    "/platform",
    ["AI platform", "Constitutional AI", "intent-driven AI", "enterprise AI", "แพลตฟอร์ม AI", "AI ระดับองค์กร"]
  )
}

export default async function PlatformPage() {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale
  const t = await loadTranslations(locale)

  const p = (key: string) => {
    const platform = (t as Record<string, unknown>)?.platform as Record<string, string> | undefined
    return platform?.[key] || key
  }

  const layers = [
    { layer: "Layer 10", name: p("layer_10_name"), desc: p("layer_10_desc"), icon: Shield, badge: "NEW v2.3.1" },
    { layer: "Layer 9", name: p("layer_9_name"), desc: p("layer_9_desc"), icon: Key, badge: "v2.3.0" },
    { layer: "Layer 8", name: p("layer_8_name"), desc: p("layer_8_desc"), icon: Globe, badge: "8 Markets" },
    { layer: "Layer 7", name: p("layer_7_name"), desc: p("layer_7_desc"), icon: Network, badge: "NEW v3.3.1" },
    { layer: "Layer 6", name: p("layer_6_name"), desc: p("layer_6_desc"), icon: Workflow, badge: "RFC-001" },
    { layer: "Layer 5", name: p("layer_5_name"), desc: p("layer_5_desc"), icon: CheckCircle, badge: "0.3% Halluc." },
    { layer: "Layer 4", name: p("layer_4_name"), desc: p("layer_4_desc"), icon: Database, badge: "8D Memory" },
    { layer: "Layer 3", name: p("layer_3_name"), desc: p("layer_3_desc"), icon: GitBranch, badge: "41 Algos" },
    { layer: "Layer 2", name: p("layer_2_name"), desc: p("layer_2_desc"), icon: Terminal, badge: "Kernel v1.4" },
    { layer: "Layer 1", name: p("layer_1_name"), desc: p("layer_1_desc"), icon: Brain, badge: "Foundation" },
  ]

  const infraItems = [
    { icon: Container, title: p("infra_docker"), desc: p("infra_docker_desc"), stat: "33 Containers" },
    { icon: Server, title: p("infra_k8s"), desc: p("infra_k8s_desc"), stat: "57 Resources" },
    { icon: Network, title: p("infra_gateway"), desc: p("infra_gateway_desc"), stat: "10 Routes" },
    { icon: Activity, title: p("infra_monitoring"), desc: p("infra_monitoring_desc"), stat: "Real-time" },
    { icon: Shield, title: p("infra_test"), desc: p("infra_test_desc"), stat: "2,210 Tests" },
    { icon: FileCode, title: p("infra_docs"), desc: p("infra_docs_desc"), stat: "14 Endpoints" },
  ]

  const performanceMetrics = [
    { metric: p("metric_hallucination"), rct: "0.3%", industry: "12-15%", improvement: "95% better" },
    { metric: p("metric_compression"), rct: "74% lossless", industry: "30-40%", improvement: "185% better" },
    { metric: p("metric_latency"), rct: "0.07-1.5s", industry: "2-5s", improvement: "70% faster" },
    { metric: p("metric_uptime"), rct: "99.98%", industry: "99.5%", improvement: "Enterprise-grade" },
    { metric: p("metric_coverage"), rct: "100% (2,210/2,210)", industry: "70-80%", improvement: "Tier-1 quality" },
    { metric: p("metric_cost"), rct: "3.74x reduction", industry: "1x baseline", improvement: "274% savings" },
  ]

  const regionalMarkets = [
    { lang: locale === 'th' ? "อังกฤษ" : "English", region: "US", model: "Claude Opus 4.6", compliance: "—" },
    { lang: "ไทย", region: "TH", model: "DeepSeek V3.2", compliance: "PDPA" },
    { lang: "ญี่ปุ่น", region: "JP", model: "Claude 3.5 Sonnet", compliance: "APPI" },
    { lang: "เกาหลี", region: "KR", model: "GPT-4 Turbo", compliance: "PIPA" },
    { lang: locale === 'th' ? "จีน (ตัวย่อ)" : "Chinese (Simplified)", region: "CN", model: "Qwen 2.5 72B", compliance: "PIPL" },
    { lang: locale === 'th' ? "จีน (ตัวเต็ม)" : "Chinese (Traditional)", region: "TW", model: "Qwen 2.5 72B", compliance: "—" },
    { lang: "เวียดนาม", region: "VN", model: "Qwen 2.5 7B", compliance: "—" },
    { lang: "อินโดนีเซีย", region: "ID", model: "Qwen 2.5 7B", compliance: "—" },
  ]

  return (
    <main className="min-h-screen bg-background dark">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-background opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">{p("breadcrumb")}</p>
            <h1 className="text-foreground">{p("title")}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {p("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/docs">
                  {p("cta_primary")} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">{p("cta_secondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 10-Layer Architecture Visualization */}
      <section id="architecture-viz" className="mx-auto max-w-6xl px-4 py-24 border-y border-border bg-card/30">
        <TenLayerArchitecture locale={locale} />
      </section>

      {/* 10-Layer Architecture */}
      <section id="kernel" className="mx-auto max-w-6xl px-4 py-24">
        <div className="space-y-12">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">{locale === 'th' ? 'สถาปัตยกรรม' : 'Architecture'}</p>
            <h2 className="text-foreground">{p("architecture_title")}</h2>
            <p className="text-muted-foreground">
              {p("architecture_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {layers.map((item, i) => (
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
                <span className="text-xs font-mono text-success bg-success/10 px-2 py-1 rounded">{locale === 'th' ? 'ยืนยันแล้ว' : 'Verified'}</span>
              </div>
              <h2 className="text-foreground">{p("signedai_title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {p("signedai_desc")}
              </p>
              <ul className="space-y-3">
                {[p("signedai_feature_1"), p("signedai_feature_2"), p("signedai_feature_3"), p("signedai_feature_4")].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" asChild>
                <Link href="/docs/signedai">{p("signedai_learn_more")}</Link>
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
            <h2 className="text-foreground">{p("rctdb_title")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {p("rctdb_desc")}
            </p>
            <ul className="space-y-3">
              {[p("rctdb_feature_1"), p("rctdb_feature_2"), p("rctdb_feature_3"), p("rctdb_feature_4")].map((item, i) => (
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
              <h2 className="text-foreground">{p("studio_title")}</h2>
              <p className="text-muted-foreground">
                {p("studio_desc")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: p("studio_legal"), desc: p("studio_legal_desc"), icon: FileCode },
                { name: p("studio_medical"), desc: p("studio_medical_desc"), icon: Shield },
                { name: p("studio_finance"), desc: p("studio_finance_desc"), icon: Lock },
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
            <p className="text-sm font-mono text-accent uppercase tracking-wider">{locale === 'th' ? 'โครงสร้างพื้นฐาน' : 'Infrastructure'}</p>
            <h2 className="text-foreground">{p("infra_title")}</h2>
            <p className="text-muted-foreground">
              {p("infra_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {infraItems.map((item, i) => (
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

      {/* Enterprise Integrations (v3.3.1) */}}
      <section id="integrations" className="mx-auto max-w-6xl px-4 py-24">
        <div className="space-y-12">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-mono text-accent uppercase tracking-wider">v3.3.1 — {locale === 'th' ? 'ชุดการรวมระบบองค์กร' : 'Enterprise Integration Suite'}</p>
            <h2 className="text-foreground">{p("integrations_title")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {p("integrations_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4 hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">NEW v3.3.1</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{p("slack_title")}</h3>
              <p className="text-sm text-muted-foreground">{p("slack_desc")}</p>
              <ul className="space-y-2">
                {[p("slack_feature_1"), p("slack_feature_2"), p("slack_feature_3"), p("slack_feature_4")].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3 h-3 text-accent shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 space-y-4 hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Database className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">NEW v3.3.1</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{p("notion_title")}</h3>
              <p className="text-sm text-muted-foreground">{p("notion_desc")}</p>
              <ul className="space-y-2">
                {[p("notion_feature_1"), p("notion_feature_2"), p("notion_feature_3"), p("notion_feature_4")].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3 h-3 text-accent shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
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
                <span className="text-xs font-mono text-accent">{locale === 'th' ? '8 ตลาดที่ใช้งาน' : '8 Markets Active'}</span>
              </div>
              <h2 className="text-foreground">{p("regional_title")}</h2>
              <p className="text-muted-foreground">
                {p("regional_desc")}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">{locale === 'th' ? 'ภาษา' : 'Language'}</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">{locale === 'th' ? 'ภูมิภาค' : 'Region'}</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">{locale === 'th' ? 'Model เริ่มต้น' : 'Default Model'}</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">{locale === 'th' ? 'การปฏิบัติตาม' : 'Compliance'}</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalMarkets.map((row, i) => (
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
            <p className="text-sm font-mono text-accent uppercase tracking-wider">{locale === 'th' ? 'ประสิทธิภาพ' : 'Performance'}</p>
            <h2 className="text-foreground">{p("performance_title")}</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">{locale === 'th' ? 'ตัวชี้วัด' : 'Metric'}</th>
                  <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">RCT v2.5.0</th>
                  <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">{locale === 'th' ? 'ค่าเฉลี่ยอุตสาหกรรม' : 'Industry Avg'}</th>
                  <th className="text-left py-3 px-4 text-xs font-mono text-accent uppercase">{locale === 'th' ? 'การปรับปรุง' : 'Improvement'}</th>
                </tr>
              </thead>
              <tbody>
                {performanceMetrics.map((row, i) => (
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
          <h2 className="text-foreground">{p("cta_final_title")}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {p("cta_final_desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/docs">
                {p("cta_docs")} <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">{p("cta_contact")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
