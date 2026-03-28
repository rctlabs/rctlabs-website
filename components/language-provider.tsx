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
  "hero.title.line3": { en: "AI Operating System",     th: "แห่งอนาคต" },
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

  // Blog Page
  "blog.badge":       { en: "RCT Labs Research & Insights", th: "งานวิจัย & เชิงลึก RCT Labs" },
  "blog.title":       { en: "Deep-Dives in Constitutional AI", th: "เจาะลึก Constitutional AI" },
  "blog.subtitle":    {
    en: "Technical guides, research breakdowns, and verified insights on FDIA, JITNA, HexaCore, and enterprise AI governance — written by the founder.",
    th: "คู่มือเทคนิค การวิจัย และข้อมูลเชิงลึกที่ verified แล้ว เกี่ยวกับ FDIA, JITNA, HexaCore และ AI Governance ระดับองค์กร — เขียนโดยผู้ก่อตั้ง",
  },
  "blog.stat.articles":    { en: "Articles", th: "บทความ" },
  "blog.stat.topics":      { en: "Topics",   th: "หัวข้อ" },
  "blog.stat.reading":     { en: "Est. reading", th: "ประมาณเวลาอ่าน" },
  "blog.filter.all":       { en: "All Articles", th: "ทุกบทความ" },
  "blog.search.placeholder": { en: "Search articles...", th: "ค้นหาบทความ..." },
  "blog.showing":          { en: "Showing", th: "แสดง" },
  "blog.articles":         { en: "articles", th: "บทความ" },
  "blog.in":               { en: "in", th: "ใน" },
  "blog.featured":         { en: "Featured", th: "แนะนำ" },
  "blog.all.articles":     { en: "All Articles", th: "ทุกบทความ" },
  "blog.read.article":     { en: "Read article", th: "อ่านบทความ" },
  "blog.cta.title":        { en: "Explore the Research", th: "สำรวจงานวิจัย" },
  "blog.cta.desc":         {
    en: "Every article is written by the founder — with verified metrics, source code references, and full SEO/E-E-A-T compliance.",
    th: "ทุกบทความเขียนโดยผู้ก่อตั้ง — พร้อมตัวเลขที่ verified แล้ว, อ้างอิง source code และปฏิบัติตามมาตรฐาน SEO/E-E-A-T อย่างสมบูรณ์",
  },
  "blog.cta.button":       { en: "View Author Profile", th: "ดูโปรไฟล์ผู้เขียน" },
  "blog.cat.research":     { en: "Research",   th: "งานวิจัย" },
  "blog.cat.news":         { en: "News",       th: "ข่าว" },
  "blog.cat.tutorial":     { en: "Tutorial",   th: "บทเรียน" },
  "blog.cat.philosophy":   { en: "Philosophy", th: "ปรัชญา" },
  "blog.cat.case_study":   { en: "Case Study", th: "กรณีศึกษา" },
  "blog.noResults":        { en: "No articles found for", th: "ไม่พบบทความสำหรับ" },
  "blog.clearFilters":     { en: "Clear filters", th: "ล้างตัวกรอง" },

  // Common content labels
  "common.readMore":       { en: "Read article", th: "อ่านเพิ่มเติม" },
  "common.min":            { en: "min", th: "นาที" },
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
  const [language, setLanguageState] = useState<Language>(() => getLocaleFromPathname(pathname || "") ?? initialLocale)

  useEffect(() => {
    const localeFromPath = getLocaleFromPathname(pathname || "")
    if (localeFromPath && localeFromPath !== language) {
      setLanguageState(localeFromPath)
    }
  }, [language, pathname])

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
