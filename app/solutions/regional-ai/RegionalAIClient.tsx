"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { Globe, ArrowRight } from "lucide-react"

const regionalModels = [
  { region: "Thailand", flag: "🇹🇭", model: "Typhoon v2 70B", provider: "SCB10X", id: "G38", proficiency: "0.99", status: "Active", color: "#D4A853" },
  { region: "Japan", flag: "🇯🇵", model: "ELYZA / Rakuten AI", provider: "ELYZA / Rakuten", id: "Regional", proficiency: "0.97", status: "Pluggable", color: "#89B4C8" },
  { region: "Korea", flag: "🇰🇷", model: "HyperCLOVA X / EXAONE", provider: "NAVER / LG AI Research", id: "Regional", proficiency: "0.97", status: "Pluggable", color: "#7B9E87" },
  { region: "Vietnam", flag: "🇻🇳", model: "Vistral / VinaLLaMA", provider: "Open Source", id: "Regional", proficiency: "0.95", status: "Pluggable", color: "#C4745B" },
  { region: "Indonesia", flag: "🇮🇩", model: "SEA-LION", provider: "AI Singapore", id: "Regional", proficiency: "0.95", status: "Pluggable", color: "#B8A9C9" },
  { region: "India", flag: "🇮🇳", model: "Krutrim / Sarvam", provider: "Ola / Sarvam AI", id: "Regional", proficiency: "0.96", status: "Pluggable", color: "#9B7BB8" },
  { region: "Saudi Arabia", flag: "🇸🇦", model: "ALLaM / Jais", provider: "SDAIA / G42", id: "Regional", proficiency: "0.96", status: "Pluggable", color: "#D4A853" },
  { region: "China", flag: "🇨🇳", model: "Kimi K2.5 / MiniMax", provider: "Moonshot / MiniMax", id: "G2/G3", proficiency: "0.98", status: "Active", color: "#C4745B" },
]

const pluginSteps = [
  { step: "1", title: "Define ModelRole", descEn: "Add your regional model to the ModelRole enum in hexa_core_registry.py — e.g. ModelRole.REGIONAL_JP = \"regional_jp\".", descTh: "เพิ่มโมเดลภูมิภาคใน ModelRole enum ใน hexa_core_registry.py" },
  { step: "2", title: "Register Adapter", descEn: "Call AdapterRegistry.register(model_id, max_adapters=50) with your model's HuggingFace or API endpoint.", descTh: "เรียก AdapterRegistry.register() ด้วย model_id และ Endpoint ของโมเดล" },
  { step: "3", title: "Map TaskTypes", descEn: "Add routing rules to routing_map — JITNA automatically selects your model for tasks that match the configured task types.", descTh: "เพิ่ม routing rules ใน routing_map — JITNA จะเลือกโมเดลโดยอัตโนมัติ" },
]

export default function RegionalAIClient() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : ""

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium"
            style={{ backgroundColor: "#D4A85315", borderColor: "#D4A85330", color: "#D4A853" }}>
            <Globe className="w-4 h-4" /> {isTh ? "Regional AI" : "Regional AI"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            {isTh ? "Sovereign AI สำหรับทุกภูมิภาค" : "Sovereign AI for Every Region"}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "RCT Ecosystem รวม Typhoon (SCB10X) เป็น G38 Regional Thai Model และเปิดสถาปัตยกรรม Plug-in ให้นักพัฒนาสลับกับ LLM ภูมิภาคอื่นๆ ทั่วโลก"
              : "RCT Ecosystem integrates Typhoon (by SCB10X) as G38 — the Regional Thai model — and provides a plug-in architecture for developers to swap in any country's sovereign LLM."}
          </p>
        </div>
      </section>

      {/* Typhoon Spotlight */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🇹🇭</span>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold text-foreground">
                    {isTh ? "Typhoon G38 — Regional Thai Model" : "Typhoon G38 — Regional Thai Model"}
                  </h2>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-green-500/10 text-green-600">Active</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {isTh
                    ? "Typhoon v2 70B โดย SCB10X — Thailand's Frontier AI Research Lab — เป็น LLM ภาษาไทยที่เก่งที่สุด Typhoon-S (4B) พิสูจน์แล้วว่าความสามารถ 78.02% บน Thai Legal Tasks เทียบกับ GPT-5 ที่ 75.34% model_id: scb10x/typhoon-v2-70b-instruct, proficiency th=0.99"
                    : "Typhoon v2 70B by SCB10X (Thailand's Frontier AI Research Lab) is the most capable Thai LLM. Typhoon-S (4B) scored 78.02% on Thai legal tasks vs GPT-5's 75.34%. Integrated as model_id=\"scb10x/typhoon-v2-70b-instruct\" with proficiency th=0.99."}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Model ID", value: "G38" },
                    { label: "Provider", value: "SCB10X" },
                    { label: "Proficiency TH", value: "0.99" },
                    { label: "Task", value: "regional_thai" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-xl bg-muted text-center">
                      <div className="text-sm font-bold text-foreground">{item.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional LLM Map */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground text-center mb-4">
          {isTh ? "แผนที่ Regional LLMs ที่รองรับ" : "Supported Regional LLMs"}
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-10 max-w-xl mx-auto">
          {isTh
            ? "G38 Typhoon เป็น Active model ในระบบ ส่วน 'Pluggable' หมายความว่าสามารถเพิ่มเข้ามาด้วย 3 ขั้นตอน"
            : "G38 Typhoon is active. \"Pluggable\" models can be added in 3 steps using the open plug-in architecture."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regionalModels.map((_item, i) => (
            <m.div key={_item.region} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{_item.flag}</span>
                <div>
                  <div className="text-sm font-bold text-foreground">{_item.region}</div>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${_item.status === "Active" ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>
                    {_item.status}
                  </span>
                </div>
              </div>
              <div className="text-xs font-medium text-foreground mb-0.5">{_item.model}</div>
              <div className="text-xs text-muted-foreground mb-2">{_item.provider}</div>
              <div className="text-xs" style={{ color: _item.color }}>Proficiency: {_item.proficiency}</div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Plug-in Architecture */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-4">
            {isTh ? "Plug-in ใน 3 ขั้นตอน" : "How to Plug in Your Regional LLM"}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            {isTh
              ? "AdapterRegistry รองรับ max_adapters=50 สามารถ Register/Unregister ได้ Runtime"
              : "The AdapterRegistry supports max_adapters=50 with runtime register() / unregister() — no restart required."}
          </p>
          <div className="space-y-4">
            {pluginSteps.map((s, i) => (
              <m.div key={s.step} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-warm-amber/10 text-warm-amber">{s.step}</span>
                <div>
                  <div className="text-sm font-bold text-foreground mb-1 font-mono">{s.title}</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? s.descTh : s.descEn}</p>
                </div>
              </m.div>
            ))}
          </div>

          {/* Code snippet */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 overflow-x-auto">
            <pre className="text-xs font-mono text-muted-foreground">{`# hexa_core_registry.py — Add your regional model
class ModelRole(str, Enum):
    REGIONAL_THAI = "regional_thai"   # G38 — Already active
    REGIONAL_JP   = "regional_jp"    # Add this for Japan

# Register adapter at runtime (no restart needed)
AdapterRegistry.register(
    model_id="elyza/Llama-3-ELYZA-JP-8B",
    task_types=[TaskType.REGIONAL_JP],
    max_adapters=50
)`}</pre>
          </div>
        </div>
      </section>

      {/* Why Regional + RCT */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">
          {isTh ? "ทำไม Typhoon + RCT = ไม่ใช่คู่แข่ง?" : "Why Typhoon + RCT = Complementary, Not Competing"}
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-bold text-foreground mb-2">{isTh ? "Typhoon ฝึกโมเดล" : "Typhoon trains models"}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isTh
                ? "SCB10X ฝึก LLMs สำหรับภาษาไทยและบริบทท้องถิ่น — สร้างโมเดลที่เข้าใจภาษาไทยลึกกว่าโมเดลทั่วไป"
                : "SCB10X trains LLMs specifically for Thai language and local context — producing models that understand Thai nuances better than general-purpose models."}
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="text-2xl mb-3">🔗</div>
            <h3 className="font-bold text-foreground mb-2">{isTh ? "RCT ประสานโมเดล" : "RCT orchestrates models"}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isTh
                ? "RCT ใช้ JITNA + SignedAI + RCTDB ในการ Route, Verify และ Persist ผลลัพธ์จากโมเดล Typhoon — ทำให้ปัญญา AI ภาษาไทยอยู่ใน Enterprise-grade Infrastructure"
                : "RCT uses JITNA + SignedAI + RCTDB to route, verify, and persist results from Typhoon — putting Thai-language AI intelligence inside enterprise-grade infrastructure."}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            {isTh ? "พร้อม Deploy Regional AI?" : "Ready to Deploy Your Regional AI?"}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`${localePrefix}/contact`} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-warm-amber text-white font-medium text-sm hover:bg-[#C49A48] transition-colors">
              {isTh ? "ติดต่อเรา" : "Contact Us"} <ArrowRight size={16} />
            </Link>
            <Link href={`${localePrefix}/solutions/dynamic-ai-routing`} className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">
              {isTh ? "JITNA Dynamic Routing" : "JITNA Dynamic Routing"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
