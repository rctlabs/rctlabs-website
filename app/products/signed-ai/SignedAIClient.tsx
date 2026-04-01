"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { ShieldCheck, ArrowRight, Lock, Eye, BarChart3, Layers } from "lucide-react"
import { getBreadcrumbSchema } from "@/lib/schema"

const features = [
  { icon: Layers, color: "#7B9E87", titleEn: "Multi-LLM Consensus", titleTh: "Multi-LLM Consensus", descEn: "Query up to 8 LLMs simultaneously and achieve consensus through cross-verification algorithms.", descTh: "Query LLMs สูงสุด 8 ตัวพร้อมกันและบรรลุ Consensus ผ่าน Cross-Verification Algorithms" },
  { icon: Lock, color: "#D4A853", titleEn: "Cryptographic Signing", titleTh: "Cryptographic Signing", descEn: "Every verified response is cryptographically signed — tamper-proof and legally auditable.", descTh: "ทุกคำตอบที่ตรวจสอบแล้วถูก Cryptographically Signed — ป้องกันการแก้ไขและตรวจสอบทางกฎหมายได้" },
  { icon: Eye, color: "#C4745B", titleEn: "Complete Audit Trails", titleTh: "Complete Audit Trails", descEn: "Full transparency — every step from query to response is logged and traceable.", descTh: "ความโปร่งใสเต็มรูปแบบ — ทุกขั้นตอนจาก Query ถึง Response ถูกบันทึกและตรวจสอบย้อนหลังได้" },
  { icon: BarChart3, color: "#89B4C8", titleEn: "99.7% Accuracy", titleTh: "99.7% Accuracy", descEn: "Reduce hallucination from 15% to 0.3% — enterprise-grade accuracy for critical applications.", descTh: "ลด Hallucination จาก 15% เหลือ 0.3% — ความแม่นยำระดับ Enterprise สำหรับแอปพลิเคชันสำคัญ" },
]

const stats = [
  { value: "99.7%", label: "Accuracy" },
  { value: "0.3%", label: "Hallucination Rate" },
  { value: "8", label: "Max LLMs" },
  { value: "<50ms", label: "Verification Latency" },
]

export default function SignedAIPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"
  const localePrefix = locale === "th" ? "/th" : "/en"
  const localHref = (href: string) => `${localePrefix}${href}`

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
        { name: "Home", url: `https://rctlabs.co${localePrefix}` },
        { name: isTh ? "ผลิตภัณฑ์" : "Products", url: `https://rctlabs.co${localePrefix}/products` },
        { name: "SignedAI", url: `https://rctlabs.co${localePrefix}/products/signed-ai` },
      ])) }} />
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium" style={{ backgroundColor: "#7B9E8715", borderColor: "#7B9E8730", color: "#7B9E87" }}>
            <ShieldCheck className="w-4 h-4" /> Verification API
          </span>
          <h1 className="text-5xl font-bold text-foreground">SignedAI</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "Multi-LLM Verification Consensus API — Cryptographically Signed Responses จาก LLMs สูงสุด 8 ตัว ลด Hallucination เหลือ 0.3% พร้อม Audit Trails"
              : "Multi-LLM verification consensus API — cryptographically signed responses from up to 8 LLMs, reducing hallucination to 0.3% with complete audit trails."}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-5 rounded-2xl border border-border bg-card text-center"
            >
              <div className="text-3xl font-bold text-warm-amber">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
            {isTh ? "เหตุใดการตรวจสอบ AI จึงสำคัญ" : "Why AI Verification Matters"}
          </h2>
          <p>
            {isTh
              ? "LLMs แต่ละตัวมีข้อผิดพลาดเฉพาะ — ข้อจำกัดของ Training Data, Model Bias และ Hallucination Patterns SignedAI ใช้ Multi-LLM Consensus เพื่อ Cross-Verify Outputs ผ่าน LLMs สูงสุด 8 ตัว ลด Hallucination จาก 15% เหลือ 0.3%"
              : "Individual LLMs have unique failure modes — training data cutoffs, model bias, and hallucination patterns. SignedAI uses multi-LLM consensus to cross-verify outputs across up to 8 LLMs, reducing hallucination from 15% to 0.3%."}
          </p>
          <p>
            {isTh
              ? "ทุกคำตอบที่ตรวจสอบแล้วถูก Cryptographically Signed ด้วย ED25519 สร้าง Audit Trail ที่ไม่สามารถแก้ไข ทำให้เหมาะสำหรับ Regulated Industries ที่ต้อง Prove AI Decision Trail"
              : "Every verified response is cryptographically signed using ED25519, creating an immutable audit trail. This is essential for regulated industries that require proof of AI decision trails."}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "ความสามารถการตรวจสอบ" : "Verification Capabilities"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-card"
            >
              <feat.icon size={28} style={{ color: feat.color }} className="mb-4" />
              <h3 className="text-lg font-bold mb-2 text-foreground">{isTh ? feat.titleTh : feat.titleEn}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? feat.descTh : feat.descEn}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Code Example */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {isTh ? "เริ่มต้นใช้งาน" : "Quick Start"}
            </h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 overflow-x-auto">
            <pre className="text-xs font-mono text-muted-foreground">{`import { SignedAI } from '@rctlabs/signed-ai';

const verifier = new SignedAI({
  apiKey: process.env.SIGNED_AI_KEY
});

const result = await verifier.verify({
  prompt: "What is the capital of Thailand?",
  models: ["gpt-4", "claude-3", "gemini"],
  threshold: 0.95
});

console.log(result);
// { answer: "Bangkok", confidence: 0.997,
//   signature: "ED25519:...", consensus: 3/3 }`}</pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          {isTh ? "สำรวจผลิตภัณฑ์อื่น" : "Explore Other Products"}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={localHref("/products/rctlabs")} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-warm-amber text-white font-semibold text-sm hover:bg-[#C49A48] transition-colors">
            RCTLabs <ArrowRight size={16} />
          </Link>
          <Link href={localHref("/products/artent-ai")} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors">
            Artent AI
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
