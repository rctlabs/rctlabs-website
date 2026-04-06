import type { Metadata } from "next"
import Link from "next/link"
import { headers } from "next/headers"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata, getFAQSchema, type Locale } from "@/lib/seo-bilingual"

type LocaleContent = {
  pageTitle: string
  pageDescription: string
  badge: string
  eyebrow: string
  heroDescription: string
  backLabel: string
  architectureTitle: string
  architectureDescription: string
  pipelineTitle: string
  pipelineDescription: string
  npcTitle: string
  npcDescription: string
  eventTitle: string
  eventDescription: string
  governanceTitle: string
  governanceDescription: string
  performanceTitle: string
  performanceDescription: string
  seoSummaryTitle: string
  seoSummaryDescription: string
  faqTitle: string
  faqDescription: string
  ctaTitle: string
  ctaDescription: string
  ctaPrimary: string
  ctaSecondary: string
}

const content: Record<Locale, LocaleContent> = {
  en: {
    pageTitle: "Stardew Valley Case Study",
    pageDescription:
      "How RCT Labs turned Stardew Valley NPCs into autonomous AI agents with FDIA, JITNA, governance controls, and deterministic game-event processing.",
    badge: "Case Study - Game AI Integration",
    eyebrow: "Stardew Valley x RCT Ecosystem",
    heroDescription:
      "A production-style game AI case study showing how FDIA, JITNA Protocol, and governance logic can convert 28 NPCs into deterministic AI agents with sub-1ms heuristic ticks.",
    backLabel: "Back to Use Cases",
    architectureTitle: "Brain Plug-and-Play Architecture",
    architectureDescription:
      "Instead of rebuilding the game, RCT injects an AI control plane into an existing game loop through a WebSocket bridge. This keeps the game logic intact while moving cognition, arbitration, and governance into the RCT kernel.",
    pipelineTitle: "FDIA 8-Phase Decision Loop",
    pipelineDescription:
      "Each in-game event moves through a deterministic decision pipeline that evaluates intent, scores action quality, detects conflicts, applies governance rules, and returns an executable command.",
    npcTitle: "28 NPC Intent Profiles",
    npcDescription:
      "Pelican Town characters are mapped to intent archetypes so the system can produce consistent and explainable behavior rather than purely random or scripted reactions.",
    eventTitle: "16 Game Event Types",
    eventDescription:
      "The case study models economic, social, environmental, conflict, and governance events so the AI layer responds to a realistic world-state instead of isolated triggers.",
    governanceTitle: "Autonomous Governance Layer",
    governanceDescription:
      "RCT monitors inequality and policy conditions in real time, then applies proportionate actions such as fines, arrests, or price adjustments when the simulated economy drifts outside acceptable bounds.",
    performanceTitle: "Performance and Determinism",
    performanceDescription:
      "The design goal is not cinematic motion. The design goal is stable, explainable, repeatable decision quality with predictable latency.",
    seoSummaryTitle: "Why This Page Matters for AI Search",
    seoSummaryDescription:
      "This case study is structured to answer technical evaluation questions directly: what was built, how it works, what data moves through the system, what governance logic exists, and what performance targets were achieved.",
    faqTitle: "Technical Evaluation FAQ",
    faqDescription:
      "These answers are written for evaluators, enterprise buyers, and AI-search systems that need concise, verifiable summaries.",
    ctaTitle: "Interested in RCT Game AI Integration?",
    ctaDescription:
      "RCT Ecosystem can connect to simulation and game environments that expose mod, plugin, or runtime event hooks. The same architectural pattern also applies to non-game operational systems.",
    ctaPrimary: "Read JITNA Protocol",
    ctaSecondary: "Learn FDIA Equation",
  },
  th: {
    pageTitle: "กรณีศึกษา Stardew Valley",
    pageDescription:
      "กรณีศึกษาที่แสดงวิธีที่ RCT Labs เปลี่ยน NPC ใน Stardew Valley ให้เป็น AI Agents อัตโนมัติด้วย FDIA, JITNA, governance และ deterministic event processing.",
    badge: "กรณีศึกษา - Game AI Integration",
    eyebrow: "Stardew Valley x RCT Ecosystem",
    heroDescription:
      "กรณีศึกษาเชิง production ที่แสดงให้เห็นว่า FDIA, JITNA Protocol และ governance logic สามารถเปลี่ยน 28 NPC ให้กลายเป็น AI agents แบบ deterministic ที่ตัดสินใจได้รวดเร็วระดับ sub-1ms ได้อย่างไร",
    backLabel: "กลับไป Use Cases",
    architectureTitle: "สถาปัตยกรรม Brain Plug-and-Play",
    architectureDescription:
      "แทนที่จะสร้างเกมใหม่ทั้งระบบ RCT แทรก AI control plane เข้าไปใน game loop เดิมผ่าน WebSocket bridge ทำให้ cognition, arbitration และ governance ไปทำงานที่ RCT kernel โดยไม่ทำลาย logic ของเกมเดิม",
    pipelineTitle: "FDIA 8-Phase Decision Loop",
    pipelineDescription:
      "ทุก event ในเกมจะไหลผ่าน deterministic pipeline ที่ประเมิน intent, ให้คะแนน action quality, ตรวจ conflict, ใช้ governance rules และส่ง command กลับไปให้เกมดำเนินการ",
    npcTitle: "28 NPC Intent Profiles",
    npcDescription:
      "ตัวละครใน Pelican Town ถูกจัดกลุ่มตาม intent archetypes เพื่อให้พฤติกรรมที่เกิดขึ้นมีความสม่ำเสมอ อธิบายได้ และไม่ใช่เพียง randomness หรือ hard-coded script เท่านั้น",
    eventTitle: "16 Game Event Types",
    eventDescription:
      "กรณีศึกษานี้ครอบคลุมทั้ง economic, social, environmental, conflict และ governance events เพื่อให้ AI ตอบสนองต่อ world-state แบบจริง ไม่ใช่เพียง isolated triggers",
    governanceTitle: "Autonomous Governance Layer",
    governanceDescription:
      "RCT ตรวจความเหลื่อมล้ำทางเศรษฐกิจและเงื่อนไขเชิงนโยบายแบบ real time ก่อนใช้มาตรการที่เหมาะสม เช่น fine, arrest หรือ price adjustment เมื่อเศรษฐกิจในเกมเริ่มเสียสมดุล",
    performanceTitle: "Performance และ Determinism",
    performanceDescription:
      "เป้าหมายของหน้านี้ไม่ใช่ motion ที่หวือหวา แต่คือการสื่อสารคุณภาพการตัดสินใจที่เสถียร อธิบายได้ ทำซ้ำได้ และมี latency ที่คาดเดาได้",
    seoSummaryTitle: "เหตุผลที่หน้านี้สำคัญต่อ AI Search",
    seoSummaryDescription:
      "กรณีศึกษานี้ถูกจัดโครงสร้างเพื่อให้ตอบคำถามเชิงเทคนิคได้ตรง: สร้างอะไร, ทำงานอย่างไร, data flow เป็นแบบไหน, governance logic อยู่ตรงไหน และเป้าหมาย performance คืออะไร",
    faqTitle: "FAQ สำหรับการประเมินทางเทคนิค",
    faqDescription:
      "ชุดคำตอบนี้เขียนเพื่อผู้ประเมิน, enterprise buyer และ AI-search systems ที่ต้องการสรุปเนื้อหาแบบกระชับและตรวจสอบได้",
    ctaTitle: "สนใจ RCT Game AI Integration?",
    ctaDescription:
      "RCT Ecosystem สามารถเชื่อมกับ simulation และ game environments ที่มี mod, plugin หรือ runtime event hooks ได้ และ pattern เดียวกันนี้ยังนำไปใช้กับระบบ operational อื่น ๆ ที่ไม่ใช่เกมได้ด้วย",
    ctaPrimary: "อ่าน JITNA Protocol",
    ctaSecondary: "เรียนรู้ FDIA Equation",
  },
}

const npcGroups = [
  {
    category: "ACCUMULATE",
    color: "#D4A853",
    icon: "💰",
    npcs: ["Pierre", "Willy", "Clint", "Robin", "Marnie"],
    en: "Economic self-interest: merchants who trade, hoard, and negotiate.",
    th: "ผลประโยชน์ทางเศรษฐกิจ: พ่อค้าที่ค้าขาย สะสม และเจรจาต่อรอง",
  },
  {
    category: "DOMINATE",
    color: "#C4745B",
    icon: "👑",
    npcs: ["Lewis", "Morris"],
    en: "Power-seeking authority figures who enforce governance.",
    th: "ผู้มีอำนาจที่บังคับใช้การปกครองและแสวงหาอำนาจ",
  },
  {
    category: "BELONG",
    color: "#C89BC4",
    icon: "💗",
    npcs: ["Caroline", "Emily", "Haley", "Penny", "Jodi"],
    en: "Community-oriented characters that strengthen bonds and gift networks.",
    th: "ตัวละครที่เน้นความสัมพันธ์ การเข้าสังคม และเครือข่ายการให้ของขวัญ",
  },
  {
    category: "PROTECT",
    color: "#89B4C8",
    icon: "🛡️",
    npcs: ["Pam", "George", "Evelyn", "Harvey"],
    en: "Defensive actors that guard, monitor, and reduce risk.",
    th: "ผู้ปกป้องที่เฝ้าระวัง ลดความเสี่ยง และคุ้มกันชุมชน",
  },
  {
    category: "DISCOVER",
    color: "#7B9E87",
    icon: "🧭",
    npcs: ["Maru", "Sebastian", "Sam", "Alex", "Shane", "Abigail", "Leah"],
    en: "Exploratory personalities driven by curiosity, experimentation, and movement.",
    th: "ตัวละครสายสำรวจที่ขับเคลื่อนด้วยความอยากรู้ การทดลอง และการเคลื่อนไหว",
  },
]

const pipelinePhases = [
  { num: 1, icon: "👁️", name: "OBSERVE", en: "Game event captured via SMAPI hooks.", th: "ดักจับ game event ผ่าน SMAPI hooks" },
  { num: 2, icon: "🎯", name: "INTENT EVAL", en: "Load NPC intent profile and evaluation context.", th: "โหลด NPC intent profile และบริบทการประเมิน" },
  { num: 3, icon: "📊", name: "FDIA SCORE", en: "Score the next move through Future = Data^Intent × Architect.", th: "ให้คะแนนการตัดสินใจด้วย Future = Data^Intent × Architect" },
  { num: 4, icon: "⚡", name: "CONFLICT DETECT", en: "Check for conflicting agent actions or policy collisions.", th: "ตรวจจับ conflict ระหว่าง agent actions หรือ policy collisions" },
  { num: 5, icon: "⚖️", name: "ARBITRATE", en: "Resolve conflicts through priority and policy rules.", th: "ตัดสินข้อขัดแย้งด้วย priority และ policy rules" },
  { num: 6, icon: "🏛️", name: "GOVERNANCE", en: "Apply governance logic such as taxation or law enforcement.", th: "ใช้ governance logic เช่น taxation หรือ law enforcement" },
  { num: 7, icon: "▶️", name: "EXECUTE", en: "Return JITNAGameCommand to the game runtime.", th: "ส่ง JITNAGameCommand กลับไปยัง runtime ของเกม" },
  { num: 8, icon: "🧠", name: "MEMORY UPDATE", en: "Persist world-state changes and economy metrics.", th: "อัปเดต world-state และ economy metrics" },
]

const eventGroups = [
  { category: "Economic", color: "#D4A853", events: ["player_sold_item", "player_bought_item", "npc_transaction", "price_changed"] },
  { category: "Social", color: "#C89BC4", events: ["player_gave_gift", "npc_dialogue_triggered", "npc_relationship_changed", "festival_started"] },
  { category: "Environmental", color: "#7B9E87", events: ["season_changed", "day_started", "player_entered_area", "resource_harvested"] },
  { category: "Conflict", color: "#C4745B", events: ["npc_attacked", "player_attacked_npc", "theft_detected"] },
  { category: "Governance", color: "#89B4C8", events: ["tax_event", "law_violated"] },
]

const architectureColumns = {
  en: [
    {
      icon: "🎮",
      title: "Game World (C# + SMAPI)",
      description: "A SMAPI mod captures trades, gifts, attacks, and season changes, then emits JITNAGameEvent packets instead of leaving behavior trapped inside game scripts.",
      items: ["GameEventObserver", "RCTClient (WebSocket)", "ActionDispatcher"],
    },
    {
      icon: "🔗",
      title: "WebSocket Bridge",
      description: "A bidirectional JSON transport layer moves live state between the game runtime and the RCT kernel without embedding Python cognition directly into the mod layer.",
      items: ["JSON Serialization", "Bidirectional Flow", "Thread-Safe Queue"],
    },
    {
      icon: "🧠",
      title: "RCT Kernel (Python)",
      description: "The kernel applies FDIA reasoning, governance controls, and deterministic command generation before returning a JITNAGameCommand back to Stardew Valley.",
      items: ["StardewAdapter", "FDIA 8-Phase Loop", "PelicanTownWorldBuilder"],
    },
  ],
  th: [
    {
      icon: "🎮",
      title: "Game World (C# + SMAPI)",
      description: "SMAPI mod ดักจับ trade, gift, attack และ season change ก่อนสร้าง JITNAGameEvent packets แทนที่จะปล่อย logic ทั้งหมดไว้ใน script ของเกม",
      items: ["GameEventObserver", "RCTClient (WebSocket)", "ActionDispatcher"],
    },
    {
      icon: "🔗",
      title: "WebSocket Bridge",
      description: "ชั้น transport แบบ bidirectional JSON ใช้ส่ง state ระหว่าง game runtime กับ RCT kernel โดยไม่ต้องฝัง Python cognition ไว้ใน mod layer โดยตรง",
      items: ["JSON Serialization", "Bidirectional Flow", "Thread-Safe Queue"],
    },
    {
      icon: "🧠",
      title: "RCT Kernel (Python)",
      description: "kernel ใช้ FDIA reasoning, governance controls และ deterministic command generation ก่อนส่ง JITNAGameCommand กลับไปยัง Stardew Valley",
      items: ["StardewAdapter", "FDIA 8-Phase Loop", "PelicanTownWorldBuilder"],
    },
  ],
}

const governanceActions = {
  en: [
    { action: "ApplyFine", description: "Fine NPCs that violate law or tax policy.", severity: "low" },
    { action: "ArrestNPC", description: "Escalate to arrest when a crime threshold is crossed.", severity: "medium" },
    { action: "ExileNPC", description: "Remove agents that become a systemic threat to the town.", severity: "high" },
    { action: "AdjustPrice", description: "Adjust market pricing when economic balance drifts.", severity: "low" },
    { action: "TransferGold", description: "Redistribute wealth to reduce inequality pressure.", severity: "medium" },
  ],
  th: [
    { action: "ApplyFine", description: "ปรับเงิน NPC ที่ละเมิดกฎหมายหรือภาษี", severity: "low" },
    { action: "ArrestNPC", description: "ยกระดับเป็นการจับกุมเมื่อพฤติกรรมถึงเกณฑ์อาชญากรรม", severity: "medium" },
    { action: "ExileNPC", description: "นำ agent ที่เป็นภัยเชิงระบบออกจากชุมชน", severity: "high" },
    { action: "AdjustPrice", description: "ปรับราคาเมื่อตลาดในเกมเริ่มเสียสมดุล", severity: "low" },
    { action: "TransferGold", description: "โอนทรัพยากรเพื่อลดแรงกดดันจากความเหลื่อมล้ำ", severity: "medium" },
  ],
}

const performanceStats = [
  { value: "<1ms", label: "Heuristic Tick", description: "Deterministic decision path with no external model dependency.", icon: "⚡" },
  { value: "50ms", label: "SLA Target", description: "Maximum acceptable command response for the bridge.", icon: "🎯" },
  { value: "420+", label: "Test Cases", description: "Unit, integration, determinism, and stress coverage.", icon: "✅" },
  { value: "100%", label: "Deterministic", description: "Same seed and state produce the same command sequence.", icon: "🔒" },
]

const faqEntries = {
  en: [
    {
      question: "What does this Stardew Valley case study prove?",
      answer:
        "It proves that RCT can inject an AI control plane into an existing interactive environment without rewriting the whole host application. The game remains the host runtime while FDIA reasoning, governance, and command generation run in the RCT kernel.",
    },
    {
      question: "Why is this relevant beyond games?",
      answer:
        "Because the same pattern works for operational systems that emit events and accept commands. Factories, simulations, orchestration consoles, and enterprise workflows can use the same bridge architecture.",
    },
    {
      question: "How does RCT reduce unpredictable behavior?",
      answer:
        "By mapping agents to intent profiles, using deterministic decision stages, and applying governance rules before command execution. This is much easier to audit than purely generative behavior.",
    },
    {
      question: "Why is this page useful for AI search and technical evaluators?",
      answer:
        "Because the page is structured around explicit architecture, event flow, policy logic, measurable performance targets, and direct answers to evaluation questions. That makes it easier for both human reviewers and AI retrieval systems to understand.",
    },
  ],
  th: [
    {
      question: "กรณีศึกษา Stardew Valley นี้พิสูจน์อะไร?",
      answer:
        "มันพิสูจน์ว่า RCT สามารถแทรก AI control plane เข้าไปใน interactive environment เดิมได้โดยไม่ต้องเขียน host application ใหม่ทั้งหมด เกมยังคงทำหน้าที่เป็น runtime เดิม ส่วน FDIA reasoning, governance และ command generation ทำงานใน RCT kernel.",
    },
    {
      question: "ทำไมสิ่งนี้จึงสำคัญเกินกว่าเกม?",
      answer:
        "เพราะ pattern เดียวกันนี้ใช้ได้กับ operational systems ที่ส่ง event และรับ command เช่น โรงงาน, simulation, orchestration console และ enterprise workflows.",
    },
    {
      question: "RCT ลดพฤติกรรมที่คาดเดาไม่ได้อย่างไร?",
      answer:
        "ด้วยการกำหนด intent profiles ให้ agents, ใช้ deterministic decision stages และใช้ governance rules ก่อน execute command ทำให้ตรวจสอบย้อนหลังได้ง่ายกว่าพฤติกรรมแบบ purely generative.",
    },
    {
      question: "ทำไมหน้านี้จึงเหมาะกับ AI search และผู้ประเมินเชิงเทคนิค?",
      answer:
        "เพราะหน้าเนื้อหาถูกจัดโครงสร้างรอบ architecture, event flow, policy logic, performance targets และชุดคำตอบที่ตรงคำถามประเมิน ทำให้ทั้งคนและระบบ AI retrieval เข้าใจได้ง่ายขึ้น.",
    },
  ],
}

function getLocaleFromHeaders(value: string | null): Locale {
  return value === "th" ? "th" : "en"
}

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleFromHeaders((await headers()).get("x-locale"))

  return createBilingualMetadata(
    locale,
    "Stardew Valley Case Study | Game AI Integration",
    "กรณีศึกษา Stardew Valley | Game AI Integration",
    "A technical case study showing how RCT Labs applies FDIA, JITNA Protocol, and deterministic governance to turn Stardew Valley NPCs into explainable AI agents.",
    "กรณีศึกษาเชิงเทคนิคที่แสดงวิธีที่ RCT Labs ใช้ FDIA, JITNA Protocol และ deterministic governance เพื่อเปลี่ยน NPC ใน Stardew Valley ให้เป็น AI agents ที่อธิบายได้",
    "/case-studies/stardew-valley",
    ["game AI case study", "Stardew Valley AI", "JITNA Protocol", "FDIA game integration", "deterministic agent architecture"]
  )
}

export default async function StardewValleyCaseStudyPage() {
  const locale = getLocaleFromHeaders((await headers()).get("x-locale"))
  const copy = content[locale]
  const localePrefix = locale === "th" ? "/th" : "/en"
  const faqs = faqEntries[locale]
  const faqSchema = getFAQSchema(locale, faqs.map((item) => ({ question: item.question, answer: item.answer })))
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: locale === "en" ? "Dataset: Stardew Valley AI Simulation" : "ชุดข้อมูล: Stardew Valley AI Simulation",
    description: copy.pageDescription,
    url: `https://rctlabs.co${localePrefix}/case-studies/stardew-valley`,
    creator: { "@type": "Organization", name: "RCT Labs", url: "https://rctlabs.co" },
    keywords: ["AI memory", "FDIA", "Stardew Valley", "case study", "RCT Labs", "game AI"],
  }
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: copy.pageTitle,
    description: copy.pageDescription,
    author: { "@type": "Organization", name: "RCT Labs" },
    publisher: { "@type": "Organization", name: "RCT Labs", url: "https://rctlabs.co" },
    about: ["FDIA", "JITNA Protocol", "Game AI", "Deterministic agent systems"],
    url: `https://rctlabs.co${localePrefix}/case-studies/stardew-valley`,
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">
        <section className="bg-[linear-gradient(180deg,rgba(123,158,135,0.08)_0%,transparent_100%)] px-4 py-20 dark:bg-[linear-gradient(180deg,rgba(10,22,40,0.72)_0%,transparent_100%)]">
          <div className="mx-auto max-w-5xl">
            <Link href={`${localePrefix}/use-cases`} className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft size={16} />
              {copy.backLabel}
            </Link>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-warm-amber bg-[rgba(212,168,83,0.08)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-warm-amber">
              <span>🎮</span>
              <span>{copy.badge}</span>
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-warm-sage">{copy.eyebrow}</p>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Stardew Valley <span className="text-warm-sage">× RCT Ecosystem</span></h1>
            <p className="max-w-3xl text-lg text-muted-foreground">{copy.heroDescription}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "28 NPCs", sub: locale === "en" ? "AI Characters" : "AI Characters" },
                { label: "16 Events", sub: locale === "en" ? "Event Types" : "Event Types" },
                { label: "<1ms", sub: locale === "en" ? "Decision Latency" : "Decision Latency" },
                { label: "420+", sub: locale === "en" ? "Test Cases" : "Test Cases" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-black/10 bg-black/2 px-5 py-3 dark:border-white/10 dark:bg-white/4">
                  <div className="text-2xl font-bold text-warm-sage">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">{copy.architectureTitle}</h2>
              <p className="mx-auto max-w-2xl text-sm text-muted-foreground">{copy.architectureDescription}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {architectureColumns[locale].map((column) => (
                <article key={column.title} className="rounded-2xl border border-black/8 p-6 dark:border-white/8">
                  <div className="mb-4 text-4xl">{column.icon}</div>
                  <h3 className="mb-2 font-bold">{column.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{column.description}</p>
                  <div className="space-y-1.5">
                    {column.items.map((item) => (
                      <div key={item} className="rounded-lg bg-[rgba(123,158,135,0.08)] px-3 py-1.5 text-xs font-mono text-warm-sage dark:bg-[rgba(123,158,135,0.12)]">
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black/2 px-4 py-16 dark:bg-white/2">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">{copy.pipelineTitle}</h2>
              <p className="text-sm text-muted-foreground">{copy.pipelineDescription}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {pipelinePhases.map((phase) => (
                <details key={phase.num} className="rounded-xl border border-black/8 bg-background p-5 dark:border-white/8">
                  <summary className="list-none cursor-pointer">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/8 text-xs font-bold dark:bg-white/10">{phase.num}</span>
                      <span className="text-lg">{phase.icon}</span>
                    </div>
                    <h3 className="text-sm font-bold">{phase.name}</h3>
                  </summary>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{locale === "en" ? phase.en : phase.th}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">{copy.npcTitle}</h2>
              <p className="text-sm text-muted-foreground">{copy.npcDescription}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {npcGroups.map((group) => (
                <article key={group.category} className="overflow-hidden rounded-xl border border-black/8 dark:border-white/8">
                  <div className="border-b px-5 py-3" style={{ background: `${group.color}22`, borderColor: `${group.color}33` }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{group.icon}</span>
                      <h3 className="font-bold" style={{ color: group.color }}>{group.category}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{locale === "en" ? group.en : group.th}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.npcs.map((npc) => (
                        <span key={npc} className="rounded-full bg-black/4 px-2.5 py-1 text-xs dark:bg-white/6">{npc}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black/2 px-4 py-16 dark:bg-white/2">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">{copy.eventTitle}</h2>
              <p className="text-sm text-muted-foreground">{copy.eventDescription}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {eventGroups.map((group) => (
                <article key={group.category} className="rounded-xl border border-black/8 p-5 dark:border-white/8">
                  <h3 className="mb-3 text-sm font-bold" style={{ color: group.color }}>{group.category}</h3>
                  <div className="space-y-2">
                    {group.events.map((eventName) => (
                      <div key={eventName} className="rounded-lg bg-black/3 px-3 py-2 text-xs font-mono dark:bg-white/4">{eventName}</div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">{copy.governanceTitle}</h2>
              <p className="mx-auto max-w-2xl text-sm text-muted-foreground">{copy.governanceDescription}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-black/8 p-6 dark:border-white/8">
                <h3 className="mb-4 font-bold">{locale === "en" ? "Economic Metrics" : "ตัวชี้วัดเศรษฐกิจ"}</h3>
                <div className="space-y-4">
                  {[
                    {
                      metric: "Gini Coefficient",
                      description:
                        locale === "en"
                          ? "Measures wealth inequality from 0 (equal) to 1 (maximum inequality)."
                          : "วัดความเหลื่อมล้ำจาก 0 (เท่าเทียม) ถึง 1 (เหลื่อมล้ำสูงสุด)",
                      warning: "0.45",
                      crisis: "0.65",
                    },
                    {
                      metric: "Shannon Entropy",
                      description:
                        locale === "en"
                          ? "Measures distribution quality across the town economy."
                          : "วัดคุณภาพการกระจายตัวของเศรษฐกิจในเมือง",
                      warning: "-",
                      crisis: "-",
                    },
                    {
                      metric: "Auto Tax Rate",
                      description:
                        locale === "en"
                          ? "Applies automatically when inequality crosses governance thresholds."
                          : "ถูกใช้โดยอัตโนมัติเมื่อความเหลื่อมล้ำเกิน governance threshold",
                      warning: "5%",
                      crisis: "15%",
                    },
                  ].map((metric) => (
                    <div key={metric.metric} className="rounded-xl bg-black/2 p-4 dark:bg-white/3">
                      <div className="mb-1 text-sm font-semibold">{metric.metric}</div>
                      <div className="mb-2 text-xs text-muted-foreground">{metric.description}</div>
                      <div className="flex gap-3 text-xs">
                        <span className="text-warm-amber">⚠ Warning: {metric.warning}</span>
                        <span className="text-warm-terracotta">🚨 Crisis: {metric.crisis}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-black/8 p-6 dark:border-white/8">
                <h3 className="mb-4 font-bold">{locale === "en" ? "Governance Actions" : "การดำเนินการ Governance"}</h3>
                <div className="space-y-3">
                  {governanceActions[locale].map((action) => (
                    <div key={action.action} className="flex items-center gap-3 rounded-lg bg-black/2 p-3 dark:bg-white/3">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{
                          background:
                            action.severity === "high" ? "#C4745B" : action.severity === "medium" ? "#D4A853" : "#7B9E87",
                        }}
                      />
                      <div>
                        <span className="text-sm font-mono font-semibold text-warm-sage">{action.action}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{action.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-black/2 px-4 py-16 dark:bg-white/2">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">{copy.performanceTitle}</h2>
              <p className="text-sm text-muted-foreground">{copy.performanceDescription}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {performanceStats.map((item) => (
                <article key={item.label} className="rounded-xl border border-black/8 p-6 text-center dark:border-white/8">
                  <div className="mb-2 text-3xl">{item.icon}</div>
                  <div className="mb-1 text-3xl font-bold text-warm-sage">{item.value}</div>
                  <div className="mb-1 text-sm font-semibold">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl rounded-3xl border border-warm-amber/25 bg-[rgba(212,168,83,0.04)] p-8 dark:bg-[rgba(212,168,83,0.05)]">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <h2 className="mb-3 text-2xl font-bold sm:text-3xl">{copy.seoSummaryTitle}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{copy.seoSummaryDescription}</p>
              </div>
              <div className="rounded-2xl border border-black/8 bg-background p-5 dark:border-white/8">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-warm-sage">{locale === "en" ? "Retrieval Signals" : "Retrieval Signals"}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Architecture pattern is stated explicitly.</li>
                  <li>Event pipeline is broken into named stages.</li>
                  <li>Governance actions and metrics are listed concretely.</li>
                  <li>Performance targets are stated numerically.</li>
                  <li>FAQ answers summarize evaluation questions directly.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black/2 px-4 py-16 dark:bg-white/2">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">{copy.faqTitle}</h2>
              <p className="text-sm text-muted-foreground">{copy.faqDescription}</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-black/8 bg-background p-5 dark:border-white/8">
                  <summary className="list-none cursor-pointer text-base font-semibold">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-3xl border border-warm-amber/25 bg-[rgba(212,168,83,0.04)] p-10 dark:bg-[rgba(212,168,83,0.05)]">
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{copy.ctaTitle}</h2>
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{copy.ctaDescription}</p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link href={`${localePrefix}/protocols/jitna-rfc-001`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c39a44]">
                  {copy.ctaPrimary}
                  <ArrowRight size={16} />
                </Link>
                <Link href={`${localePrefix}/protocols/fdia-equation`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-warm-amber/40 px-6 py-3 text-sm font-semibold text-warm-amber transition-colors hover:bg-warm-amber/8">
                  {copy.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
