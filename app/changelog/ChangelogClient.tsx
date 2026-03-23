"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { getLocaleFromPathname } from "@/lib/i18n"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Rocket, Zap, Shield, Brain, Globe, Layers,
  GitBranch, Sparkles, Code2, BarChart3,
} from "lucide-react"

interface ChangelogEntry {
  version: string
  date: string
  titleEn: string
  titleTh: string
  descEn: string
  descTh: string
  type: "major" | "feature" | "improvement" | "fix"
  icon: React.ComponentType<{ size?: number; className?: string }>
  highlights: { en: string; th: string }[]
}

const changelog: ChangelogEntry[] = [
  {
    version: "v3.1.0",
    date: "2026-03-14",
    titleEn: "8-bit Identity + Navigation Overhaul",
    titleTh: "8-bit Identity + ปรับปรุงระบบนำทาง",
    descEn: "Added 8-bit pixel art identity elements throughout the website for human warmth, reorganized navigation for better discoverability, keyboard shortcuts, and changelog timeline.",
    descTh: "เพิ่ม 8-bit pixel art identity ทั่วเว็บเพื่อความอบอุ่น, จัดระเบียบการนำทางใหม่, keyboard shortcuts, และ changelog timeline",
    type: "feature",
    icon: Sparkles,
    highlights: [
      { en: "8-bit pixel art robot mascot as AI Assistant avatar", th: "8-bit pixel art robot mascot เป็น avatar AI Assistant" },
      { en: "8-bit decorative accents on feature cards & pricing", th: "8-bit decorative accents บน feature cards & pricing" },
      { en: "Reorganized navbar with all pages accessible", th: "จัดระเบียบ navbar ใหม่เข้าถึงทุกหน้า" },
      { en: "Keyboard shortcuts: / (AI), T (theme), Esc (close)", th: "Keyboard shortcuts: / (AI), T (theme), Esc (ปิด)" },
      { en: "Changelog timeline page with visual version history", th: "Changelog timeline พร้อมประวัติเวอร์ชัน" },
      { en: "WCAG 2.1 AA accessibility improvements", th: "ปรับปรุง accessibility ตาม WCAG 2.1 AA" },
    ],
  },
  {
    version: "v3.0.0",
    date: "2026-03-14",
    titleEn: "AI Assistant v3 + Interactive FDIA Demo",
    titleTh: "AI Assistant v3 + FDIA Demo แบบ Interactive",
    descEn: "Major upgrade with site-aware AI assistant, interactive FDIA playground, research-backed evidence cards, and keyboard shortcuts.",
    descTh: "อัปเกรดครั้งใหญ่ด้วย AI Assistant ที่รู้จักโครงสร้างเว็บ, FDIA Playground แบบ Interactive, Evidence Cards จากงานวิจัยจริง, และ Keyboard Shortcuts",
    type: "major",
    icon: Brain,
    highlights: [
      { en: "AI Assistant with site structure knowledge (28 pages)", th: "AI Assistant รู้จักโครงสร้างเว็บ (28 หน้า)" },
      { en: "Interactive FDIA Demo with sliders & presets", th: "FDIA Demo แบบ Interactive พร้อม sliders & presets" },
      { en: "Research-backed evidence cards (arXiv, IEEE, McKinsey)", th: "Evidence Cards จากงานวิจัยจริง (arXiv, IEEE, McKinsey)" },
      { en: "Keyboard shortcuts: / (AI), T (theme), L (language)", th: "Keyboard shortcuts: / (AI), T (theme), L (language)" },
      { en: "Schema.org JSON-LD structured data for SEO", th: "Schema.org JSON-LD structured data สำหรับ SEO" },
    ],
  },
  {
    version: "v2.7.0",
    date: "2026-03-13",
    titleEn: "Font System Overhaul + Performance",
    titleTh: "ปรับปรุงระบบ Font + ประสิทธิภาพ",
    descEn: "Complete font system migration to Space Grotesk + Kanit with Thai subtitle optimization and font preloading.",
    descTh: "เปลี่ยนระบบ Font ทั้งหมดเป็น Space Grotesk + Kanit พร้อม Thai subtitle optimization และ font preloading",
    type: "feature",
    icon: Sparkles,
    highlights: [
      { en: "Space Grotesk (headings) + Inter (body EN) + Kanit (TH)", th: "Space Grotesk (headings) + Inter (body EN) + Kanit (TH)" },
      { en: "Kanit ExtraLight (200) for Thai subtitles", th: "Kanit ExtraLight (200) สำหรับ subtitle ภาษาไทย" },
      { en: "Font preloading to reduce FOIT", th: "Font preloading เพื่อลดการกระพริบตัวอักษร" },
      { en: "Scroll-triggered animations for all sections", th: "Scroll-triggered animations สำหรับทุก section" },
    ],
  },
  {
    version: "v2.5.0",
    date: "2026-03-12",
    titleEn: "Interactive Benchmark Dashboard",
    titleTh: "Benchmark Dashboard แบบ Interactive",
    descEn: "New benchmark page with Recharts radar/bar charts, animated counters, and performance comparison metrics.",
    descTh: "หน้า Benchmark ใหม่พร้อม Recharts radar/bar charts, animated counters, และ metrics เปรียบเทียบ",
    type: "feature",
    icon: BarChart3,
    highlights: [
      { en: "Radar Chart + Bar Chart with toggle view", th: "Radar Chart + Bar Chart สลับมุมมองได้" },
      { en: "Animated counter stats (99.7%, 0.3%, 60%, <200ms)", th: "Animated counter stats (99.7%, 0.3%, 60%, <200ms)" },
      { en: "Platform comparison: RCT vs LangChain vs AutoGPT", th: "เปรียบเทียบ Platform: RCT vs LangChain vs AutoGPT" },
    ],
  },
  {
    version: "v2.0.0",
    date: "2026-03-11",
    titleEn: "Multi-Page SEO Architecture",
    titleTh: "สถาปัตยกรรม SEO หลายหน้า",
    descEn: "Complete restructuring into SEO-optimized silo architecture with 28+ pages, solutions/products/protocols hubs.",
    descTh: "ปรับโครงสร้างทั้งหมดเป็น SEO-optimized silo architecture ด้วย 28+ หน้า, solutions/products/protocols hubs",
    type: "major",
    icon: Globe,
    highlights: [
      { en: "Solutions Silo: Hallucination, Memory, Routing", th: "Solutions Silo: Hallucination, Memory, Routing" },
      { en: "Products Silo: RCTLabs, Artent AI, SignedAI", th: "Products Silo: RCTLabs, Artent AI, SignedAI" },
      { en: "Protocols Silo: JITNA RFC, FDIA Equation, RCT-7", th: "Protocols Silo: JITNA RFC, FDIA Equation, RCT-7" },
      { en: "Stardew Valley AI Case Study", th: "กรณีศึกษา Stardew Valley AI" },
      { en: "Blog: How to Reduce AI Hallucination", th: "Blog: วิธีลด AI Hallucination" },
    ],
  },
  {
    version: "v1.5.0",
    date: "2026-03-10",
    titleEn: "Bilingual Support + Dark Mode",
    titleTh: "รองรับ 2 ภาษา + Dark Mode",
    descEn: "Full English/Thai bilingual support with language toggle and dark/light theme switching.",
    descTh: "รองรับภาษาอังกฤษ/ไทยเต็มรูปแบบ พร้อม language toggle และ dark/light theme",
    type: "feature",
    icon: Globe,
    highlights: [
      { en: "Complete EN/TH translation dictionary", th: "พจนานุกรมแปล EN/TH ครบถ้วน" },
      { en: "Dark Mode with smooth transitions", th: "Dark Mode พร้อม transitions ที่ลื่นไหล" },
      { en: "Persistent theme/language preferences", th: "จดจำ theme/language ที่เลือกไว้" },
    ],
  },
  {
    version: "v1.2.0",
    date: "2026-03-09",
    titleEn: "FDIA Equation + JITNA Protocol",
    titleTh: "สมการ FDIA + JITNA Protocol",
    descEn: "Core philosophy pages with interactive FDIA calculator and JITNA 5-step protocol visualization.",
    descTh: "หน้าปรัชญาหลักพร้อม FDIA calculator แบบ interactive และ JITNA 5-step protocol visualization",
    type: "feature",
    icon: Code2,
    highlights: [
      { en: "F = D^I × A interactive calculator", th: "F = D^I × A interactive calculator" },
      { en: "JITNA 5-step protocol flowchart", th: "JITNA 5-step protocol flowchart" },
      { en: "SVG animated diagrams", th: "SVG animated diagrams" },
    ],
  },
  {
    version: "v1.0.0",
    date: "2026-03-08",
    titleEn: "Initial Launch",
    titleTh: "เปิดตัวครั้งแรก",
    descEn: "RCT Ecosystem Hub launched with 10-Layer Architecture, 7 Genome System, 41 Algorithms, and Analysearch Intent.",
    descTh: "เปิดตัว RCT Ecosystem Hub พร้อม 10-Layer Architecture, 7 Genome System, 41 Algorithms, และ Analysearch Intent",
    type: "major",
    icon: Rocket,
    highlights: [
      { en: "10-Layer Cognitive Architecture visualization", th: "10-Layer Cognitive Architecture visualization" },
      { en: "7 Genome subsystem cards", th: "7 Genome subsystem cards" },
      { en: "41 Algorithms across 9 tiers", th: "41 Algorithms ใน 9 tiers" },
      { en: "Analysearch 4-mode intent engine", th: "Analysearch 4-mode intent engine" },
    ],
  },
]

const typeColors = {
  major: { bg: "bg-[#D4A853]/10", text: "text-[#D4A853]", border: "border-[#D4A853]", dot: "#D4A853" },
  feature: { bg: "bg-[#7B9E87]/10", text: "text-[#7B9E87]", border: "border-[#7B9E87]", dot: "#7B9E87" },
  improvement: { bg: "bg-[#89B4C8]/10", text: "text-[#89B4C8]", border: "border-[#89B4C8]", dot: "#89B4C8" },
  fix: { bg: "bg-[#C4745B]/10", text: "text-[#C4745B]", border: "border-[#C4745B]", dot: "#C4745B" },
}

const typeLabels = {
  major: { en: "Major Release", th: "เวอร์ชันหลัก" },
  feature: { en: "New Feature", th: "ฟีเจอร์ใหม่" },
  improvement: { en: "Improvement", th: "ปรับปรุง" },
  fix: { en: "Bug Fix", th: "แก้ไขบัก" },
}

export default function ChangelogPage() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const locale = getLocaleFromPathname(pathname) ?? "en"
  const isEn = locale === "en"

  return (
    <>
      <Navbar />
      <main id="main-content" className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#111]" : "bg-[#FAF6F0]"}`}>

        {/* Hero */}
        <section className={`py-20 px-4 text-center transition-colors duration-300 ${isDark ? "bg-[#0D0D0D]" : "bg-[#FAF6F0]"}`}>
          <div className="max-w-3xl mx-auto space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/30 text-[#D4A853] text-sm font-medium"
            >
              📋 {isEn ? "Version History" : "ประวัติเวอร์ชัน"}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl sm:text-5xl font-bold tracking-tight ${isDark ? "text-[#E8E3DC]" : "text-[#1A1A1A]"}`}
            >
              {isEn ? "Changelog" : "บันทึกการเปลี่ยนแปลง"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? "text-[#888]" : "text-[#6B6B6B]"}`}
            >
              {isEn
                ? "Track every update, new feature, and improvement to the RCT Ecosystem Hub."
                : "ติดตามทุกการอัปเดต ฟีเจอร์ใหม่ และการปรับปรุงของ RCT Ecosystem Hub"}
            </motion.p>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 lg:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className={`absolute left-6 md:left-8 top-0 bottom-0 w-px ${isDark ? "bg-[#333]" : "bg-[#E8E3DC]"}`} />

              <div className="space-y-12">
                {changelog.map((entry, i) => {
                  const colors = typeColors[entry.type]
                  const Icon = entry.icon
                  return (
                    <motion.div
                      key={entry.version}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="relative pl-16 md:pl-20"
                    >
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-4 md:left-6 w-5 h-5 rounded-full ring-4 ${isDark ? "ring-[#111]" : "ring-[#FAF6F0]"}`}
                        style={{ backgroundColor: colors.dot }}
                      />

                      {/* Card */}
                      <div className={`rounded-2xl border p-6 md:p-8 transition-all hover:shadow-lg ${
                        isDark
                          ? "bg-[#1E1E1E]/80 border-[#2A2A2A] hover:border-[#3A3A3A]"
                          : "bg-white/80 border-[#E8E3DC] hover:border-[#D4A853]/30"
                      }`}>
                        {/* Header */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${colors.bg} ${colors.text}`}>
                            {entry.version}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                            {isEn ? typeLabels[entry.type].en : typeLabels[entry.type].th}
                          </span>
                          <span className={`text-xs ${isDark ? "text-[#666]" : "text-[#999]"}`}>
                            {entry.date}
                          </span>
                        </div>

                        {/* Title */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colors.bg}`}>
                            <Icon size={20} className={colors.text} />
                          </div>
                          <h3 className={`text-lg md:text-xl font-bold ${isDark ? "text-[#E8E3DC]" : "text-[#1A1A1A]"}`}>
                            {isEn ? entry.titleEn : entry.titleTh}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className={`text-sm mb-4 leading-relaxed ${isDark ? "text-[#999]" : "text-[#6B6B6B]"}`}>
                          {isEn ? entry.descEn : entry.descTh}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-2">
                          {entry.highlights.map((h, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: colors.dot }} />
                              <span className={`text-sm ${isDark ? "text-[#BBB]" : "text-[#4A4A4A]"}`}>
                                {isEn ? h.en : h.th}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
