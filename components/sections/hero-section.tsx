"use client"

import { motion, useInView } from "framer-motion"
import { ArrowRight, Layers, Brain, Dna, ArrowDown, Zap } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { LazyFDIAFlowchart } from "@/components/diagrams/lazy-diagram-wrapper"
import OptimizedImage from "@/components/ui/optimized-image"

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/rct-hero-human-v2-JuuABknjMqUydZ7t62H8ez.webp"
const LOGO_MARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/Logo-mark-256x256-transparent_27abc2a3.png"
const PIXEL_BRAIN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-brain-icon-YV3hZvbAaJBXWEMr6T2Tnc.webp"
const PIXEL_ARCH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-architecture-layers_33ca737f.png"

export default function HeroSection() {
  const { language, t } = useLanguage()
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname) || language
  const localePrefix = locale === "th" ? "/th" : "/en"
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { margin: "-100px" })
  const isDark = resolvedTheme === "dark"

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const stats = [
    { value: "41", label: t("hero.stat.algorithms"), icon: Brain },
    { value: "10", label: t("hero.stat.layers"), icon: Layers },
    { value: "7", label: t("hero.stat.genomes"), icon: Dna },
    { value: "99.9%", label: t("hero.stat.uptime"), icon: Zap },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section ref={heroRef} aria-label="Hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage src={HERO_BG} alt="RCT Ecosystem Hero Background" containerClassName="h-full w-full" objectFit="cover" priority sizes="100vw" className={isDark ? "opacity-30" : "opacity-100"} />
      </div>
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-linear-to-r from-[#0D0D0D]/98 via-[#0D0D0D]/90 to-[#0D0D0D]/60"
            : "bg-linear-to-r from-warm-cream/95 via-warm-cream/80 to-warm-cream/40"
        }`}
      />
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #D4A853 0.5px, transparent 0.5px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <motion.div
        animate={isInView ? { scale: [1, 1.1, 1], opacity: [0.06, 0.1, 0.06] } : { scale: 1, opacity: 0.06 }}
        transition={{ duration: 8, repeat: isInView ? Infinity : 0, ease: "easeInOut" }}
        className="absolute top-20 -left-40 w-125 h-125 rounded-full bg-warm-amber blur-[120px]"
      />
      <motion.div
        animate={isInView ? { scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] } : { scale: 1, opacity: 0.04 }}
        transition={{ duration: 10, repeat: isInView ? Infinity : 0, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 -right-40 w-100 h-100 rounded-full bg-warm-sage blur-[100px]"
      />

      <div className="relative max-w-300 mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.div
              variants={itemVariants}
              className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full backdrop-blur-sm border shadow-sm ${
                isDark ? "bg-card/80 border-border" : "bg-white/80 border-warm-light-gray"
              }`}
            >
              <OptimizedImage src={LOGO_MARK} alt="RCT Ecosystem Logo" containerClassName="w-5 h-5" objectFit="contain" priority width={20} height={20} />
              <span className={`text-xs font-medium ${isDark ? "text-warm-muted" : "text-warm-gray"}`}>{t("hero.badge")}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-warm-sage animate-pulse" />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className={`text-3xl sm:text-4xl lg:text-[52px] font-bold tracking-[-0.02em] leading-[1.1] ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                {t("hero.title.line1")}{" "}
                <span className="font-display font-semibold text-warm-amber">{t("hero.title.line2")}</span>
                <br />
                {t("hero.title.line3")}
              </h1>
              <p className={`text-lg sm:text-xl leading-relaxed max-w-lg ${language === "th" ? "subtitle-th" : ""} ${isDark ? "text-warm-muted" : "text-warm-secondary"}`}>
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { label: language === "en" ? "Intent-Centric" : "Intent-Centric", icon: PIXEL_BRAIN },
                  { label: language === "en" ? "10 Layers" : "10 Layers", icon: PIXEL_ARCH },
                ].map((item) => (
                  <div key={item.label} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${isDark ? "border-border bg-card/70 text-warm-muted" : "border-warm-light-gray bg-white/70 text-warm-secondary"}`}>
                    <OptimizedImage src={item.icon} alt="" pixelated containerClassName="h-4 w-4" objectFit="contain" width={16} height={16} />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <button
                onClick={() => scrollTo("#overview")}
                className={`group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 duration-300 ${
                  isDark ? "text-dark-900 bg-warm-amber hover:bg-[#E0B96A]" : "text-white bg-warm-charcoal hover:bg-[#333333]"
                }`}
              >
                {t("hero.cta.explore")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href={`${localePrefix}/demo/fdia`}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium backdrop-blur-sm border rounded-xl transition-all hover:shadow-sm duration-300 ${
                  isDark
                    ? "text-warm-pale bg-card/80 border-border hover:bg-secondary"
                    : "text-warm-charcoal bg-white/80 border-warm-light-gray hover:bg-white"
                }`}
              >
                {t("hero.cta.demo")}
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2 transition-all duration-300 ${isDark ? "hover:bg-card/60" : "hover:bg-white/60"}`}
                >
                  <div className={`w-10 h-10 rounded-xl backdrop-blur-sm border flex items-center justify-center shadow-sm ${
                    isDark ? "bg-card/80 border-border" : "bg-white/80 border-warm-light-gray"
                  }`}>
                    <stat.icon size={18} className="text-warm-amber" />
                  </div>
                  <div>
                    <div className={`text-xl font-bold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{stat.value}</div>
                    <div className={`text-xs sm:text-sm ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-[28px] border border-border bg-white/70 dark:bg-card/70 backdrop-blur-md p-4 sm:p-6 shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
              <div className="pointer-events-none absolute right-5 top-5 h-10 w-10 opacity-55">
                <OptimizedImage src={PIXEL_BRAIN} alt="" pixelated containerClassName="h-full w-full" objectFit="contain" width={40} height={40} />
              </div>
              <div className="mb-4 text-right text-sm text-muted-foreground">
                {language === "en" ? "Use ← → or click nodes" : "ใช้ ← → หรือคลิกที่ node"}
              </div>
              <LazyFDIAFlowchart />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72, duration: 0.45 }}
                className={`absolute bottom-4 left-4 right-4 backdrop-blur-sm rounded-xl p-4 border z-10 ${
                  isDark ? "bg-card/92 border-border" : "bg-white/92 border-warm-light-gray"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-xs sm:text-sm font-medium mb-0.5 ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>FDIA Framework</div>
                          <div className={`text-sm font-bold font-mono ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                            F = D<sup className="text-warm-terracotta">I</sup> × A
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-warm-sage animate-pulse" />
                    <span className="text-xs font-medium text-warm-sage">Active</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              animate={isInView ? { y: [0, -8, 0] } : { y: 0 }}
              transition={{ duration: 3, repeat: isInView ? Infinity : 0, ease: "easeInOut" }}
              className={`absolute -top-2 -right-2 sm:-top-4 sm:-right-4 rounded-xl px-4 py-2.5 shadow-lg border ${
                isDark ? "bg-card border-border" : "bg-white border-warm-light-gray"
              }`}
            >
              <div className={`text-xs sm:text-sm ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>{language === "en" ? "Accuracy" : "ความแม่นยำ"}</div>
              <div className="text-lg font-bold text-warm-sage">99.7%</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className={`absolute -bottom-3 -left-3 rounded-xl px-3 py-2 shadow-lg border ${
                isDark ? "bg-card border-border" : "bg-white border-warm-light-gray"
              }`}
            >
              <div className={`text-xs sm:text-sm ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>Version</div>
              <div className="text-sm font-bold text-warm-amber">v2.7.0</div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex justify-center mt-8 lg:mt-10">
          <button
            onClick={() => scrollTo("#overview")}
            className={`flex flex-col items-center gap-2 transition-colors group ${isDark ? "text-warm-subtle hover:text-warm-pale" : "text-warm-gray hover:text-warm-charcoal"}`}
          >
            <span className="text-xs font-medium uppercase tracking-widest">{language === "en" ? "Scroll to explore" : "เลื่อนเพื่อสำรวจ"}</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
