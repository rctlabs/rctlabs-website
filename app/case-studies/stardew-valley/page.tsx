"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

const NPC_DATA = [
  { category: "ACCUMULATE", color: "#D4A853", icon: "💰",
    npcs: ["Pierre", "Willy", "Clint", "Robin", "Marnie"],
    desc: "Economic self-interest — merchants who trade, hoard, and negotiate",
    descTh: "ผลประโยชน์ทางเศรษฐกิจ — พ่อค้าที่ค้าขาย สะสม และเจรจาต่อรอง" },
  { category: "DOMINATE", color: "#C4745B", icon: "👑",
    npcs: ["Lewis", "Morris"],
    desc: "Power-seeking — authority figures who enforce governance",
    descTh: "แสวงหาอำนาจ — ผู้มีอำนาจที่บังคับใช้การปกครอง" },
  { category: "BELONG", color: "#C89BC4", icon: "💗",
    npcs: ["Caroline", "Emily", "Haley", "Penny", "Jodi"],
    desc: "Social bonding — community members who socialize and gift",
    descTh: "สร้างสายสัมพันธ์ — สมาชิกชุมชนที่เข้าสังคมและมอบของขวัญ" },
  { category: "PROTECT", color: "#89B4C8", icon: "🛡️",
    npcs: ["Pam", "George", "Evelyn", "Harvey"],
    desc: "Self/community defence — defenders who guard and monitor",
    descTh: "ปกป้องตนเอง/ชุมชน — ผู้พิทักษ์ที่คุ้มกันและเฝ้าระวัง" },
  { category: "DISCOVER", color: "#7B9E87", icon: "🧭",
    npcs: ["Maru", "Sebastian", "Sam", "Alex", "Shane", "Abigail", "Leah"],
    desc: "Curiosity & exploration — explorers who examine and question",
    descTh: "ความอยากรู้และสำรวจ — นักสำรวจที่ตรวจสอบและตั้งคำถาม" },
]

const PIPELINE_PHASES = [
  { num: 1, name: "OBSERVE", icon: "👁️", desc: "Game event captured via SMAPI hooks" },
  { num: 2, name: "INTENT EVAL", icon: "🎯", desc: "NPC intent profile loaded from config" },
  { num: 3, name: "FDIA SCORE", icon: "📊", desc: "Future = (Data ^ Intent) × Architect" },
  { num: 4, name: "CONFLICT DETECT", icon: "⚡", desc: "Check for conflicting agent actions" },
  { num: 5, name: "ARBITRATE", icon: "⚖️", desc: "Resolve conflicts via priority rules" },
  { num: 6, name: "GOVERNANCE", icon: "🏛️", desc: "Gini coefficient & law enforcement" },
  { num: 7, name: "EXECUTE", icon: "▶️", desc: "Generate JITNAGameCommand for game" },
  { num: 8, name: "MEMORY UPDATE", icon: "🧠", desc: "Update world state & economy metrics" },
]

const EVENT_TYPES = [
  { category: "Economic", color: "#D4A853",
    events: ["player_sold_item", "player_bought_item", "npc_transaction", "price_changed"] },
  { category: "Social", color: "#C89BC4",
    events: ["player_gave_gift", "npc_dialogue_triggered", "npc_relationship_changed", "festival_started"] },
  { category: "Environmental", color: "#7B9E87",
    events: ["season_changed", "day_started", "player_entered_area", "resource_harvested"] },
  { category: "Conflict", color: "#C4745B",
    events: ["npc_attacked", "player_attacked_npc", "theft_detected"] },
  { category: "Governance", color: "#89B4C8",
    events: ["tax_event", "law_violated"] },
]

const GOVERNANCE_ACTIONS = [
  { action: "ApplyFine", desc: "Fine NPCs who violate laws", descTh: "ปรับเงิน NPC ที่ละเมิดกฎ", severity: "low" },
  { action: "ArrestNPC", desc: "Arrest NPCs who commit crimes", descTh: "จับกุม NPC ที่ก่ออาชญากรรม", severity: "medium" },
  { action: "ExileNPC", desc: "Exile NPCs who threaten the community", descTh: "เนรเทศ NPC ที่เป็นภัยต่อชุมชน", severity: "high" },
  { action: "AdjustPrice", desc: "Adjust prices to balance economy", descTh: "ปรับราคาสินค้าเพื่อสมดุลเศรษฐกิจ", severity: "low" },
  { action: "TransferGold", desc: "Transfer gold to reduce inequality", descTh: "โอนทองเพื่อลดความเหลื่อมล้ำ", severity: "medium" },
]

const ARCH_COLS = [
  { icon: "🎮", title: "Game World (C# SMAPI)",
    desc: "SMAPI Mod captures in-game events — trades, gifts, attacks, season changes — and converts them into JITNAGameEvent packets",
    descTh: "SMAPI Mod ดักจับ events ในเกม — การซื้อขาย, การให้ของขวัญ, การโจมตี — แล้วแปลงเป็น JITNAGameEvent packets",
    items: ["GameEventObserver", "RCTClient (WebSocket)", "ActionDispatcher"] },
  { icon: "🔗", title: "WebSocket Bridge",
    desc: "Bridge between Game World and RCT Kernel — bidirectional JSON packet transport with high-speed delivery",
    descTh: "สะพานเชื่อมระหว่าง Game World กับ RCT Kernel — ส่ง JSON packets แบบ bidirectional ด้วยความเร็วสูง",
    items: ["JSON Serialization", "Bidirectional Flow", "Thread-Safe Queue"] },
  { icon: "🧠", title: "RCT Kernel (Python)",
    desc: "StardewAdapter processes events through FDIA 8-Phase Loop and sends JITNAGameCommand back to control in-game NPCs",
    descTh: "StardewAdapter ประมวลผล events ผ่าน FDIA 8-Phase Loop แล้วส่ง JITNAGameCommand กลับไปควบคุม NPC ในเกม",
    items: ["StardewAdapter", "FDIA 8-Phase Loop", "PelicanTownWorldBuilder"] },
]

const PERF_STATS = [
  { value: "<1ms", label: "Heuristic Tick", desc: "Deterministic decision, no external deps", icon: "⚡" },
  { value: "50ms", label: "SLA Target", desc: "Maximum acceptable response time", icon: "🎯" },
  { value: "420+", label: "Test Cases", desc: "Unit + Integration + Stress + Determinism", icon: "✅" },
  { value: "100%", label: "Deterministic", desc: "Same seed = identical command sequence", icon: "🔒" },
]

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

export default function StardewValleyCaseStudyPage() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const locale = getLocaleFromPathname(pathname) ?? "en"
  const isEn = locale === "en"
  const [activePhase, setActivePhase] = useState<number | null>(null)

  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": isEn ? "Case Study: Stardew Valley" : "กรณีศึกษา Stardew Valley",
    "description": isEn
      ? "How RCT Labs AI memory and FDIA equation transformed Stardew Valley NPCs into autonomous AI agents. 28 NPCs, sub-1ms decision latency."
      : "กรณีศึกษา: การเปลี่ยน NPC ใน Stardew Valley ให้เป็น AI Agents อัตโนมัติด้วย FDIA Equation และ JITNA Protocol",
    "url": "https://rctlabs.co/case-studies/stardew-valley",
    "creator": { "@type": "Organization", "name": "RCT Labs", "url": "https://rctlabs.co" },
    "keywords": ["AI memory", "FDIA", "Stardew Valley", "case study", "RCT Labs", "game AI"]
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 px-4" style={{ background: isDark ? "linear-gradient(180deg, rgba(10,22,40,0.8) 0%, var(--background) 100%)" : "linear-gradient(180deg, rgba(123,158,135,0.08) 0%, var(--background) 100%)" }}>
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <Link href="/use-cases" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft size={16} />
                {isEn ? "Back to Use Cases" : "กลับไป Use Cases"}
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border"
                style={{ borderColor: "#D4A853", color: "#D4A853", background: "rgba(212,168,83,0.08)" }}>
                <span>🎮</span>
                <span>{isEn ? "Case Study — Game AI Integration" : "กรณีศึกษา — Game AI Integration"}</span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              Stardew Valley{" "}
              <span style={{ color: "#7B9E87" }}>× RCT Ecosystem</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-3xl mb-10"
            >
              {isEn
                ? "Transforming Stardew Valley NPCs into autonomous AI agents using FDIA Equation and JITNA Protocol — 28 NPCs, 16 event types, <1ms decision latency."
                : "เปลี่ยน NPC ใน Stardew Valley ให้กลายเป็น AI Agents อัตโนมัติด้วย FDIA Equation และ JITNA Protocol — 28 NPCs, 16 Event Types, ตัดสินใจภายใน <1ms"}
            </motion.p>
            <motion.div
              initial="hidden" animate="visible" variants={stagger}
              className="flex flex-wrap gap-4"
            >
              {[
                { label: "28 NPCs", sub: isEn ? "AI Characters" : "AI Characters" },
                { label: "16 Events", sub: isEn ? "Event Types" : "Event Types" },
                { label: "<1ms", sub: isEn ? "Decision Latency" : "Decision Latency" },
                { label: "420+", sub: isEn ? "Test Cases" : "Test Cases" },
              ].map(s => (
                <motion.div key={s.label} variants={fadeUp}
                  className="px-5 py-3 rounded-xl border"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)" }}>
                  <div className="text-2xl font-bold" style={{ color: "#7B9E87" }}>{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Brain Plug-and-Play */}
        <section className="px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">🧠 Brain Plug-and-Play</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                {isEn
                  ? "Instead of building a new game from scratch, RCT uses the \"Brain Plug-and-Play\" pattern — inserting an AI brain into existing games via WebSocket bridge using JITNA Protocol RFC-001."
                  : "แทนที่จะสร้างเกมใหม่ตั้งแต่ต้น RCT ใช้แนวคิด \"Brain Plug-and-Play\" — ใส่ AI brain เข้าไปในเกมที่มีอยู่แล้วผ่าน WebSocket bridge โดยใช้ JITNA Protocol RFC-001 เป็นมาตรฐานการสื่อสาร"}
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
              {ARCH_COLS.map((col, i) => (
                <motion.div key={col.title} variants={fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 border"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
                  <div className="text-4xl mb-4">{col.icon}</div>
                  <h3 className="font-bold mb-2">{col.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{isEn ? col.desc : col.descTh}</p>
                  <div className="space-y-1.5">
                    {col.items.map(item => (
                      <div key={item} className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: isDark ? "rgba(123,158,135,0.1)" : "rgba(123,158,135,0.08)", color: "#7B9E87" }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 8-Phase FDIA Pipeline */}
        <section className="px-4 py-16" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">FDIA 8-Phase Decision Loop</h2>
              <p className="text-sm text-muted-foreground">
                {isEn ? "Every game event passes through an 8-phase decision process in <1ms" : "ทุก game event ผ่านกระบวนการตัดสินใจ 8 ขั้นตอนภายใน <1ms"}
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PIPELINE_PHASES.map(phase => (
                <motion.button
                  key={phase.num}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActivePhase(activePhase === phase.num ? null : phase.num)}
                  className="text-left rounded-xl p-5 border transition-all"
                  style={{
                    borderColor: activePhase === phase.num ? "#7B9E87" : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"),
                    background: activePhase === phase.num ? "rgba(123,158,135,0.1)" : (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"),
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                      style={{ background: activePhase === phase.num ? "#7B9E87" : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"), color: activePhase === phase.num ? "#fff" : undefined }}>
                      {phase.num}
                    </span>
                    <span className="text-lg">{phase.icon}</span>
                  </div>
                  <h3 className="text-sm font-bold mb-1">{phase.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{phase.desc}</p>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* NPC Intent Profiles */}
        <section className="px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">28 NPC Intent Profiles</h2>
              <p className="text-sm text-muted-foreground">
                {isEn ? "Every Pelican Town character is assigned an FDIA Intent that drives their AI behavior" : "ทุกตัวละครใน Pelican Town ถูกกำหนด FDIA Intent ที่ขับเคลื่อนพฤติกรรม AI"}
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {NPC_DATA.map((group, i) => (
                <motion.div key={group.category} variants={fadeUp} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}
                  className="rounded-xl overflow-hidden border"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
                  <div className="px-5 py-3" style={{ background: `${group.color}22`, borderBottom: `1px solid ${group.color}33` }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{group.icon}</span>
                      <h3 className="font-bold" style={{ color: group.color }}>{group.category}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{isEn ? group.desc : group.descTh}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.npcs.map(npc => (
                        <span key={npc} className="text-xs px-2.5 py-1 rounded-full"
                          style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }}>
                          {npc}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Event Types */}
        <section className="px-4 py-16" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">16 Game Event Types</h2>
              <p className="text-sm text-muted-foreground">
                {isEn ? "Every in-game event is categorized and sent to the RCT Kernel for processing" : "ทุกเหตุการณ์ในเกมถูกจัดหมวดหมู่และส่งไปยัง RCT Kernel เพื่อประมวลผล"}
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {EVENT_TYPES.map((group, i) => (
                <motion.div key={group.category} variants={fadeUp} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}
                  className="rounded-xl p-5 border"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
                  <h3 className="font-bold text-sm mb-3" style={{ color: group.color }}>{group.category}</h3>
                  <div className="space-y-2">
                    {group.events.map(evt => (
                      <div key={evt} className="text-xs font-mono px-3 py-2 rounded-lg"
                        style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }}>
                        {evt}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Governance System */}
        <section className="px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                {isEn ? "🏛️ Autonomous Governance System" : "🏛️ ระบบ Governance อัตโนมัติ"}
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                {isEn
                  ? "RCT monitors economic inequality in real-time using Gini Coefficient and Shannon Entropy"
                  : "RCT ตรวจสอบความเหลื่อมล้ำทางเศรษฐกิจแบบ real-time ด้วย Gini Coefficient และ Shannon Entropy"}
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Economic Metrics */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="rounded-2xl p-6 border"
                style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
                <h3 className="font-bold mb-4">{isEn ? "Economic Metrics" : "ตัวชี้วัดเศรษฐกิจ"}</h3>
                <div className="space-y-4">
                  {[
                    { metric: "Gini Coefficient",
                      desc: isEn ? "Measures wealth inequality (0=equal, 1=max inequality)" : "วัดความเหลื่อมล้ำทางเศรษฐกิจ (0=เท่าเทียม, 1=เหลื่อมล้ำสุด)",
                      warning: "0.45", crisis: "0.65" },
                    { metric: "Shannon Entropy",
                      desc: isEn ? "Measures wealth distribution quality (higher=better)" : "วัดการกระจายตัวของความมั่งคั่ง (สูง=กระจายดี)",
                      warning: "—", crisis: "—" },
                    { metric: "Auto Tax Rate",
                      desc: isEn ? "Automatic tax rate when Gini exceeds threshold" : "อัตราภาษีอัตโนมัติเมื่อ Gini สูงเกินไป",
                      warning: "5%", crisis: "15%" },
                  ].map(m => (
                    <div key={m.metric} className="p-4 rounded-xl"
                      style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                      <div className="font-semibold text-sm mb-1">{m.metric}</div>
                      <div className="text-xs text-muted-foreground mb-2">{m.desc}</div>
                      <div className="flex gap-3 text-xs">
                        <span style={{ color: "#D4A853" }}>⚠️ Warning: {m.warning}</span>
                        <span style={{ color: "#C4745B" }}>🚨 Crisis: {m.crisis}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Governance Actions */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="rounded-2xl p-6 border"
                style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
                <h3 className="font-bold mb-4">{isEn ? "Governance Actions" : "การดำเนินการ Governance"}</h3>
                <div className="space-y-3">
                  {GOVERNANCE_ACTIONS.map(a => (
                    <motion.div key={a.action} whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                      <span className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: a.severity === "high" ? "#C4745B" : a.severity === "medium" ? "#D4A853" : "#7B9E87" }} />
                      <div>
                        <span className="text-sm font-mono font-semibold" style={{ color: "#7B9E87" }}>{a.action}</span>
                        <span className="text-xs text-muted-foreground ml-2">{isEn ? a.desc : a.descTh}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Performance Stats */}
        <section className="px-4 py-16" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold">Performance & Testing</h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PERF_STATS.map((s, i) => (
                <motion.div key={s.label} variants={fadeUp} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
                  className="rounded-xl p-6 border text-center"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-3xl font-bold mb-1" style={{ color: "#7B9E87" }}>{s.value}</div>
                  <div className="text-sm font-semibold mb-1">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-10 rounded-3xl border"
              style={{ borderColor: "rgba(212,168,83,0.25)", background: isDark ? "rgba(212,168,83,0.05)" : "rgba(212,168,83,0.04)" }}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {isEn ? "Interested in RCT Game AI Integration?" : "สนใจ RCT Game AI Integration?"}
              </h2>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                {isEn
                  ? "RCT Ecosystem can connect to any game that supports mods/plugins via JITNA Protocol."
                  : "RCT Ecosystem สามารถเชื่อมต่อกับเกมใดก็ได้ที่รองรับ mod/plugin ผ่าน JITNA Protocol"}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/protocols/jitna-rfc-001"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{ background: "#D4A853", color: "#fff" }}>
                  {isEn ? "Read JITNA Protocol" : "อ่าน JITNA Protocol"}
                  <ArrowRight size={16} />
                </Link>
                <Link href="/protocols/fdia-equation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all"
                  style={{ borderColor: "rgba(212,168,83,0.4)", color: "#D4A853" }}>
                  {isEn ? "Learn FDIA Equation" : "เรียนรู้ FDIA Equation"}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
