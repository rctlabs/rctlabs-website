"use client"

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"

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
    en: "Enterprise-grade cognitive AI operating system with 10-layer architecture, 41 algorithms, 7 Genome subsystems, FDIA equation, and the JITNA Protocol.",
    th: "ระบบปฏิบัติการ AI เชิงปัญญาระดับ Enterprise พร้อมสถาปัตยกรรม 10 Layers, 41 Algorithms, 7 Genome Subsystems, สมการ FDIA และ JITNA Protocol",
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
  "algo.title": { en: "41 Algorithms, 9 Tiers", th: "41 Algorithms, 9 Tiers" },

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
}

// ============================================================

interface LanguageProviderProps {
  children: ReactNode
  initialLocale?: Language
}

export function LanguageProvider({ children, initialLocale = "en" }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLocale)

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => (prev === "en" ? "th" : "en"))
  }, [])

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
