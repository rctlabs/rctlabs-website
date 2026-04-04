"use client"

import { createContext, useContext, useCallback, useEffect, useMemo, useState, startTransition, type ReactNode } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { addLocaleToPathname, getLocaleFromPathname } from "@/lib/i18n"

export type Language = "en" | "th"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// ============================================================
// TRANSLATION DICTIONARY — EN / TH
// Matches manus-frontend-design LanguageContext.tsx
// ============================================================
const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.solutions":    { en: "Solutions",    th: "โซลูชัน" },
  "nav.products":     { en: "Products",     th: "ผลิตภัณฑ์" },
  "nav.technology":   { en: "Technology",   th: "เทคโนโลยี" },
  "nav.protocols":    { en: "Protocols",    th: "Protocols" },
  "nav.resources":    { en: "Resources",    th: "แหล่งข้อมูล" },
  "nav.whitepaper":   { en: "Whitepaper",   th: "Whitepaper" },
  "nav.blog":         { en: "Blog",         th: "บทความ" },
  "nav.benchmark":    { en: "Benchmark",    th: "Benchmark" },
  "nav.overview":     { en: "Overview",     th: "ภาพรวม" },
  "nav.philosophy":   { en: "Philosophy",   th: "ปรัชญา" },
  "nav.architecture": { en: "Architecture", th: "สถาปัตยกรรม" },
  "nav.genome":       { en: "Genome",       th: "Genome System" },
  "nav.protocol":     { en: "Protocol",     th: "Protocol" },
  "nav.algorithms":   { en: "Algorithms",   th: "Algorithms" },
  "nav.analysearch":  { en: "Analysearch",  th: "Analysearch" },
  "nav.integration":  { en: "Integration",  th: "การเชื่อมต่อ" },
  "nav.usecases":     { en: "Use Cases",    th: "กรณีศึกษา" },
  "nav.about":        { en: "About",        th: "เกี่ยวกับ" },
  "nav.metrics":      { en: "Metrics",      th: "ตัวชี้วัด" },
  "nav.faq":          { en: "FAQ",          th: "คำถาม" },
  "nav.roadmap":      { en: "Roadmap",      th: "แผนงาน" },

  // Hero Section
  "hero.badge":    { en: "Reverse Component Thinking", th: "Reverse Component Thinking" },
  "hero.title.line1": { en: "RCT: The World's 1st",   th: "RCT: ระบบปฏิบัติการ AI" },
  "hero.title.line2": { en: "Intent-Centric",          th: "Intent-Centric" },
  "hero.title.line3": { en: "AI Operating System",     th: "อันดับ 1 ของโลก" },
  "hero.subtitle": {
    en: "Enterprise AI architecture program built around a 10-layer model, a 41-algorithm framework, 7 Genome subsystems, the FDIA equation, and the JITNA Protocol.",
    th: "โครงการสถาปัตยกรรม AI ระดับองค์กรที่สร้างบนโมเดล 10 ชั้น กรอบอัลกอริทึม 41 รายการ 7 Genome Subsystems สมการ FDIA และ JITNA Protocol",
  },
  "hero.cta.explore": { en: "Explore Architecture", th: "สำรวจสถาปัตยกรรม" },
  "hero.cta.demo":    { en: "View Live Demo",        th: "ดู Live Demo" },
  "hero.stat.layers":     { en: "Layers",     th: "Layers" },
  "hero.stat.algorithms": { en: "Algorithms", th: "Algorithms" },
  "hero.stat.genomes":    { en: "Genomes",    th: "Genomes" },
  "hero.stat.uptime":     { en: "Uptime",     th: "Uptime" },

  // FDIA
  "fdia.tag":   { en: "Core Philosophy", th: "ปรัชญาหลัก" },
  "fdia.title": { en: "The FDIA Equation", th: "สมการ FDIA" },
  "fdia.subtitle": {
    en: "F = D^I × A — Future shaped by Data amplified by Intent, guided by the Architect (Human-in-the-Loop).",
    th: "F = D^I × A — Future ถูกสร้างจาก Data ที่ถูกขยายด้วย Intent โดยมี Architect (Human-in-the-Loop) เป็นผู้กำกับ",
  },
  "fdia.foundation": { en: "Future",     th: "Future (อนาคต/ผลลัพธ์)" },
  "fdia.data":       { en: "Data",       th: "Data (ข้อมูล)" },
  "fdia.intent":     { en: "Intent",     th: "Intent (เจตนา)" },
  "fdia.architect":  { en: "Architect",  th: "Architect (สถาปนิก)" },

  // Architecture
  "arch.tag":    { en: "System Architecture", th: "สถาปัตยกรรมระบบ" },
  "arch.title":  { en: "10-Layer Cognitive Stack", th: "โครงสร้าง 10 Layers" },

  // Genome
  "genome.tag":    { en: "Genome System", th: "ระบบ Genome" },
  "genome.title":  { en: "7 Genome Subsystems", th: "7 Genome Subsystems" },

  // JITNA
  "jitna.tag":   { en: "Protocol", th: "โปรโตคอล" },
  "jitna.title": { en: "JITNA Protocol", th: "JITNA Protocol" },

  // Algorithms
  "algo.tag":   { en: "Algorithm Engine", th: "เครื่องยนต์ Algorithm" },
  "algo.title": { en: "41-Algorithm Framework, 9 Tiers", th: "กรอบ 41 Algorithms, 9 Tiers" },

  // Analysearch
  "analysearch.tag":   { en: "Killer Feature", th: "Killer Feature" },
  "analysearch.title": { en: "Analysearch Intent", th: "Analysearch Intent" },

  // Metrics
  "metrics.tag":   { en: "Performance", th: "ประสิทธิภาพ" },
  "metrics.title": { en: "System Metrics", th: "ตัวชี้วัดระบบ" },

  // Roadmap
  "roadmap.tag":   { en: "Roadmap", th: "แผนงาน" },
  "roadmap.title": { en: "Development Roadmap", th: "แผนการพัฒนา" },

  // Footer
  "footer.tagline": {
    en: "Reverse Component Thinking — Engineering the future of cognitive AI infrastructure.",
    th: "Reverse Component Thinking — วิศวกรรมอนาคตของโครงสร้างพื้นฐาน Cognitive AI",
  },
  "footer.resources": { en: "Resources",     th: "แหล่งข้อมูล" },
  "footer.connect":   { en: "Connect",        th: "เชื่อมต่อ" },
  "footer.rights":    { en: "All rights reserved.", th: "สงวนลิขสิทธิ์" },

  // ── Blog Page ─────────────────────────────────────────────────────────────
  "blog.badge":          { en: "Research & Insights",    th: "งานวิจัยและข้อมูลเชิงลึก" },
  "blog.title":          { en: "RCT Labs AI Research & Insights", th: "บทความวิจัย AI และข้อมูลเชิงลึก" },
  "blog.subtitle":       { en: "Deep dives into constitutional AI, enterprise architecture, hallucination prevention, and the technology powering the future of AI.", th: "บทความเชิงลึกเกี่ยวกับ Constitutional AI, สถาปัตยกรรมระดับองค์กร, การป้องกัน AI Hallucination และเทคโนโลยีที่ขับเคลื่อนอนาคตของ AI" },
  "blog.stat.articles":  { en: "articles",               th: "บทความ" },
  "blog.stat.topics":    { en: "topics covered",         th: "หัวข้อที่ครอบคลุม" },
  "blog.stat.reading":   { en: "total content",          th: "เนื้อหาทั้งหมด" },
  "blog.stat.words":     { en: "words",                  th: "คำ" },
  "blog.filter.all":     { en: "All",                    th: "ทั้งหมด" },
  "blog.cat.release":    { en: "Release",                th: "รีลีส" },
  "blog.cat.research":   { en: "Research",               th: "งานวิจัย" },
  "blog.cat.news":       { en: "News",                   th: "ข่าวสาร" },
  "blog.cat.tutorial":   { en: "Tutorial",               th: "คู่มือ" },
  "blog.cat.philosophy": { en: "Philosophy",             th: "ปรัชญา" },
  "blog.cat.case_study": { en: "Case Study",             th: "กรณีศึกษา" },
  "blog.featured":       { en: "Featured",               th: "เด่น" },
  "blog.read.article":   { en: "Read article",           th: "อ่านบทความ" },
  "blog.search.placeholder": { en: "Search articles…",  th: "ค้นหาบทความ…" },
  "blog.noResults":      { en: "No results for",         th: "ไม่พบผลลัพธ์สำหรับ" },
  "blog.clearFilters":   { en: "Clear filters",          th: "ล้างตัวกรอง" },
  "blog.showing":        { en: "Showing",                th: "แสดง" },
  "blog.articles":       { en: "articles",               th: "บทความ" },
  "blog.in":             { en: "in",                     th: "ใน" },
  "blog.all.articles":   { en: "All Articles",           th: "บทความทั้งหมด" },
  "blog.cta.title":      { en: "Stay Informed on AI Research", th: "ติดตามงานวิจัย AI ล่าสุด" },
  "blog.cta.desc":       { en: "Get the latest deep-dives on constitutional AI, enterprise architecture, and the FDIA framework from RCT Labs.", th: "รับข้อมูลเชิงลึกล่าสุดเกี่ยวกับ Constitutional AI, สถาปัตยกรรมองค์กร และ FDIA Framework จาก RCT Labs" },
  "blog.cta.button":     { en: "Meet the Author",        th: "พบกับผู้เขียน" },
  "blog.share":          { en: "Share",                  th: "แชร์" },
  "blog.copy.link":      { en: "Copy link",              th: "คัดลอกลิงก์" },
  "blog.copied":         { en: "Copied!",                th: "คัดลอกแล้ว" },
  "blog.copy.citation":  { en: "Copy citation",          th: "คัดลอกการอ้างอิง" },
  "blog.citation.copied": { en: "Citation copied",       th: "คัดลอกการอ้างอิงแล้ว" },
  "blog.export.pdf":     { en: "Print or save PDF",      th: "พิมพ์หรือบันทึก PDF" },
  "blog.linkedin":       { en: "LinkedIn",               th: "LinkedIn" },
  "blog.toc":            { en: "Table of Contents",      th: "สารบัญ" },
  "blog.reading.progress": { en: "Reading progress",     th: "ความคืบหน้าในการอ่าน" },
  "blog.trust.author":   { en: "Author",                 th: "ผู้เขียน" },
  "blog.trust.reviewer": { en: "Reviewer",               th: "ผู้ตรวจทาน" },
  "blog.trust.reviewed": { en: "Last reviewed",          th: "ตรวจทานล่าสุด" },
  "blog.trust.references": { en: "Evidence references",  th: "แหล่งอ้างอิง" },
  "blog.view.reviewer":  { en: "View reviewer profile",  th: "ดูโปรไฟล์ผู้ตรวจทาน" },
  "blog.english.fallback": { en: "English fallback",     th: "ใช้เนื้อหาอังกฤษชั่วคราว" },
  "blog.english.fallback.desc": { en: "This article does not have a Thai source file yet, so the English body is shown as a fallback.", th: "บทความนี้ยังไม่มีไฟล์ต้นฉบับภาษาไทย จึงแสดงเนื้อหาภาษาอังกฤษเป็น fallback ชั่วคราว" },

  // ── Common ────────────────────────────────────────────────────────────────
  "common.min":          { en: "min read",               th: "นาทีอ่าน" },
  "common.prev.post":    { en: "Previous Post",          th: "บทความก่อนหน้า" },
  "common.next.post":    { en: "Next Post",              th: "บทความถัดไป" },
  "common.related":      { en: "Related Articles",       th: "บทความที่เกี่ยวข้อง" },
  "common.view.author":  { en: "View author profile",    th: "ดูโปรไฟล์ผู้เขียน" },
}

// ============================================================

interface LanguageProviderProps {
  children: ReactNode
  initialLocale?: Language
}

export function LanguageProvider({ children, initialLocale = "en" }: LanguageProviderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [languageState, setLanguageState] = useState<Language>(() => getLocaleFromPathname(pathname || "") ?? initialLocale)
  // Use languageState as the primary source so toggleLanguage updates the UI immediately.
  // Sync back from pathname changes (browser back/forward, external navigation).
  const language = languageState

  useEffect(() => {
    const pathLocale = getLocaleFromPathname(pathname || "")
    if (pathLocale && pathLocale !== languageState) {
      setLanguageState(pathLocale)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Sync document.lang attribute on every language change
  useEffect(() => {
    if (typeof document === "undefined") return
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((lang: Language) => {
    if (!pathname || lang === language) return

    const localizedPath = addLocaleToPathname(pathname, lang)
    const query = searchParams.toString()
    const hash = typeof window !== "undefined" ? window.location.hash : ""
    const nextHref = `${localizedPath}${query ? `?${query}` : ""}${hash}`

    setLanguageState(lang)

    startTransition(() => {
      router.push(nextHref)
    })
  }, [language, pathname, router, searchParams])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "th" : "en")
  }, [language, setLanguage])

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[language] ?? key
    },
    [language]
  )

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, setLanguage, toggleLanguage, t]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within LanguageProvider")
  return context
}
