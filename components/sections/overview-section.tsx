"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { usePathname } from "next/navigation"
import { LazyEcosystemOverview } from "@/components/diagrams/lazy-diagram-wrapper"
import SectionHeading from "@/components/section-heading"
import OptimizedImage from "@/components/ui/optimized-image"
import { useMounted } from "@/hooks/use-mounted"
import { pixelIcons as pixelIconPaths } from "@/lib/pixel-icons"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

const PIXEL_ARCH = pixelIconPaths.architecture

const pixelIcons = [
  pixelIconPaths.brain,
  pixelIconPaths.architecture,
  pixelIconPaths.genome,
  pixelIconPaths.jitna,
  pixelIconPaths.algorithms,
  pixelIconPaths.shield,
]

const features = {
  en: [
    { title: "FDIA Equation", description: "A foundational equation that treats intent as an exponential multiplier over data, with human architectural oversight.", color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15", href: "/protocols/fdia-equation" },
    { title: "10-Layer Architecture", description: "A cognitive systems stack from perception and memory to orchestration, verification, and self-improvement.", color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", href: "/architecture" },
    { title: "7 Genome System", description: "Seven interlocking genomes that encode capability growth, adaptation, feedback, and enterprise resilience.", color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15", href: "/genome" },
    { title: "JITNA Protocol", description: "Just-In-Time Nodal Assembly allows agents, tools, and workflows to negotiate and assemble around intent.", color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A", href: "/protocols/jitna-rfc-001" },
    { title: "41 Algorithms", description: "A production algorithm engine spanning foundational reasoning, orchestration, verification, and applied intelligence tiers.", color: "#B8A9C9", bg: "#EDE9FE", darkBg: "#2A1E3A", href: "/algorithms" },
    { title: "Enterprise Grade", description: "Signed verification, low hallucination rates, multilingual support, and infrastructure designed for real operational trust.", color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15", href: "/solutions/ai-hallucination-prevention" },
  ],
  th: [
    { title: "สมการ FDIA", description: "สมการแกนกลางที่มอง Intent เป็นตัวคูณแบบยกกำลังของ Data โดยมีมนุษย์ในบทบาท Architect กำกับดูแล", color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15", href: "/protocols/fdia-equation" },
    { title: "สถาปัตยกรรม 10 ชั้น", description: "Cognitive stack ตั้งแต่ perception และ memory ไปจนถึง orchestration, verification และ self-improvement", color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", href: "/architecture" },
    { title: "ระบบ 7 Genome", description: "7 genomes ที่เชื่อมต่อกันเพื่อสร้างการเติบโตของความสามารถ การปรับตัว feedback และความทนทานระดับองค์กร", color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15", href: "/genome" },
    { title: "JITNA Protocol", description: "Just-In-Time Nodal Assembly ทำให้ agents, tools และ workflows ประกอบตัวอย่างยืดหยุ่นตาม intent ได้", color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A", href: "/protocols/jitna-rfc-001" },
    { title: "41 Algorithms", description: "เครื่องยนต์ algorithm สำหรับ production ครอบคลุม reasoning, orchestration, verification และ applied intelligence หลาย tier", color: "#B8A9C9", bg: "#EDE9FE", darkBg: "#2A1E3A", href: "/algorithms" },
    { title: "พร้อมใช้งานระดับองค์กร", description: "มี signed verification, hallucination ต่ำ, รองรับหลายภาษา และโครงสร้างพื้นฐานที่เน้นความน่าเชื่อถือจริง", color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15", href: "/solutions/ai-hallucination-prevention" },
  ],
}

export default function OverviewSection() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"
  const prefersReducedMotion = useReducedMotion()
  const cards = features[language as keyof typeof features] || features.en
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  return (
    <section id="overview" aria-label="System Overview" className={`py-16 md:py-24 transition-colors duration-300 ${isDark ? "bg-[#111111]" : "bg-white"}`}>
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={language === "en" ? "What Makes RCT Different" : "อะไรทำให้ RCT แตกต่าง"}
          tagColor="sage"
          title={language === "en" ? "The RCT Ecosystem at a Glance" : "ภาพรวมของ RCT Ecosystem"}
          italicWord={language === "en" ? "Ecosystem" : "RCT"}
          description={language === "en" ? "A unified operating model that connects architecture, protocol, algorithms, memory, and governance into a single intent-centric system." : "โมเดลการทำงานแบบรวมศูนย์ที่เชื่อม architecture, protocol, algorithms, memory และ governance เข้าด้วยกันเป็นระบบ intent-centric เดียว"}
          pixelIcon={PIXEL_ARCH}
        />

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? undefined : { duration: 0.4 }}
          className="mb-8"
        >
          <LazyEcosystemOverview />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((feature, index) => (
            <Link key={feature.title} href={`${localePrefix}${feature.href}`} className="block">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={prefersReducedMotion ? undefined : { duration: 0.35, delay: index * 0.04 }}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                className={`group relative overflow-hidden p-6 rounded-2xl border transition-[border-color,box-shadow,background-color,transform] duration-200 ${isDark ? "bg-warm-charcoal border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.22)]" : "bg-white border-warm-light-gray hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]"}`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.12),transparent_42%)]" />
                </div>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border transition-transform duration-200 group-hover:scale-105" style={{ backgroundColor: isDark ? feature.darkBg : feature.bg, borderColor: `${feature.color}30` }}>
                  <OptimizedImage src={pixelIcons[index]} alt="" pixelated showErrorFallback={false} containerClassName="h-10 w-10" objectFit="contain" width={40} height={40} className="transition duration-200 group-hover:brightness-95 group-hover:contrast-125" />
                </div>
                <h3 className={`mb-1.5 text-base font-bold sm:text-lg ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{feature.title}</h3>
                <p className={`text-sm sm:text-[15px] leading-relaxed ${language === "th" ? "subtitle-th" : ""} ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>{feature.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
