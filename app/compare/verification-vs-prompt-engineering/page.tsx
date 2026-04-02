import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowRight, CheckCircle, XCircle, MinusCircle, Lock, AlertTriangle } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Verification vs Prompt Engineering — Which Ensures AI Safety?",
    "Verification vs Prompt Engineering — อะไรทำให้ AI ปลอดภัยกว่า",
    "Prompt engineering tells models what to do. Constitutional AI verification ensures the system cannot violate constraints. Learn why verification is deterministic and why that matters for enterprise AI compliance.",
    "Prompt engineering คือการบอกโมเดลว่าควรทำอะไร ส่วน constitutional AI verification คือการทำให้ระบบไม่สามารถละเมิดข้อจำกัดได้ เรียนรู้ว่าทำไมแนวทาง verification จึง deterministic และสำคัญต่อ compliance ระดับองค์กร",
    "/compare/verification-vs-prompt-engineering",
    ["verification vs prompt engineering", "AI safety", "constitutional AI verification"]
  )
}

function CompareIcon({ value }: { value: "yes" | "no" | "partial" }) {
  if (value === "yes") return <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
  if (value === "no") return <XCircle className="w-5 h-5 text-red-400/70 mx-auto" />
  return <MinusCircle className="w-5 h-5 text-warm-amber/60 mx-auto" />
}

const rows = [
  { feature: "Prevents prompt injection", prompt: "no", verify: "yes" },
  { feature: "Deterministic output blocking", prompt: "no", verify: "yes" },
  { feature: "Works identically across all LLMs", prompt: "no", verify: "yes" },
  { feature: "Built-in audit trail", prompt: "no", verify: "yes" },
  { feature: "Scales with context window", prompt: "no", verify: "yes" },
  { feature: "Enables multi-model consensus", prompt: "no", verify: "yes" },
  { feature: "Quick iteration for task style/format", prompt: "yes", verify: "partial" },
  { feature: "No code changes needed", prompt: "yes", verify: "no" },
  { feature: "Compliance documentation", prompt: "no", verify: "yes" },
  { feature: "PDPA Section 33 explainability", prompt: "no", verify: "yes" },
]

export default async function VerificationVsPromptEngineering() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Compare", url: `https://rctlabs.co${localePrefix}/compare` },
    { name: "Verification vs Prompt Engineering", url: `https://rctlabs.co${localePrefix}/compare/verification-vs-prompt-engineering` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(191,160,110,0.07),transparent_60%)] pointer-events-none" />
          <div className="mx-auto max-w-4xl px-4 py-24 md:py-32 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-amber/30 bg-warm-amber/8 text-warm-amber text-sm font-medium mb-6">
              <Lock className="w-4 h-4" /> Safety Architecture
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-warm-light-gray leading-tight mb-4 text-balance">
              Verification vs Prompt Engineering
            </h1>
            <p className="text-xl text-warm-dim max-w-2xl mx-auto mb-8">
              Prompt engineering is probabilistic. Constitutional AI verification is deterministic. For enterprise compliance, the difference is not philosophical — it is legal.
            </p>
          </div>
        </section>

        {/* Key distinction callout */}
        <section className="mx-auto max-w-7xl px-4 py-8">
          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-warm-light-gray mb-1">The Critical Difference</p>
              <p className="text-warm-dim text-sm leading-relaxed">
                Prompt engineering adds tokens that make certain outputs <em>more probable</em>. A model can still ignore them — especially on long conversations, adversarial inputs, or after fine-tuning.
                Constitutional AI constraints are evaluated by the <strong className="text-warm-amber">system</strong>, not the model. When A=0 in the FDIA equation, <strong className="text-warm-light-gray">F=0 — always</strong>. No model can override this.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Prompt Engineering",
                subtitle: "Instructions to the model",
                color: "border-blue-400/30 from-blue-400/8",
                titleColor: "text-blue-400",
                points: [
                  "Works at the model level (text input)",
                  "Probabilistic — model may ignore",
                  "Different prompts needed per LLM",
                  "No audit trail built-in",
                  "Vulnerable to context dilution (long conversations)",
                  "Vulnerable to prompt injection attacks",
                ],
                verdict: "✓ Excellent for task formatting & style",
                verdictColor: "text-blue-400",
              },
              {
                title: "Constitutional AI Verification",
                subtitle: "Constraints on the system",
                color: "border-warm-amber/30 from-warm-amber/8",
                titleColor: "text-warm-amber",
                points: [
                  "Works at the system level (around the model)",
                  "Deterministic — mathematically guaranteed",
                  "One constraint set, works across all 7 HexaCore models",
                  "Full audit trail (RCTDB + JITNA packet log)",
                  "Per-packet validation — no context dilution",
                  "JITNA Normalizer strips injection attempts pre-LLM",
                ],
                verdict: "✓ Required for regulated industry compliance",
                verdictColor: "text-warm-amber",
              },
            ].map(({ title, subtitle, color, titleColor, points, verdict, verdictColor }) => (
              <div key={title} className={`rounded-2xl border bg-linear-to-br ${color} to-transparent p-6`}>
                <h2 className={`text-xl font-bold ${titleColor} mb-1`}>{title}</h2>
                <p className="text-warm-dim text-sm mb-5">{subtitle}</p>
                <ul className="space-y-2.5 mb-6">
                  {points.map((pt) => (
                    <li key={pt} className="text-sm text-warm-dim flex items-start gap-2">
                      <span className="mt-0.5 shrink-0">•</span>{pt}
                    </li>
                  ))}
                </ul>
                <p className={`text-sm font-semibold ${verdictColor}`}>{verdict}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8">
          <h2 className="text-2xl font-bold text-warm-light-gray mb-6">Capability Matrix</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-warm-dim font-semibold">Capability</th>
                  <th className="text-center px-4 py-4 text-blue-400 font-semibold">Prompt Engineering</th>
                  <th className="text-center px-4 py-4 text-warm-amber font-semibold">Constitutional Verification</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/2"}`}>
                    <td className="px-6 py-3 text-warm-light-gray">{row.feature}</td>
                    <td className="px-4 py-3"><CompareIcon value={row.prompt as "yes"|"no"|"partial"} /></td>
                    <td className="px-4 py-3"><CompareIcon value={row.verify as "yes"|"no"|"partial"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="rounded-2xl border border-warm-amber/20 bg-warm-amber/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-warm-light-gray mb-2">Read the Full Analysis</h2>
              <p className="text-warm-dim">Detailed explanation of 4 prompt engineering failure modes and FDIA's 3-level verification</p>
            </div>
            <Link
              href="/en/blog/verification-vs-prompt-engineering"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-warm-amber text-background font-semibold text-sm hover:bg-warm-amber/90 transition shrink-0"
            >
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
