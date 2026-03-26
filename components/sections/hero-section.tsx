"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { ArrowRight, Layers, Brain, Dna, ArrowDown, Zap } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { LazyFDIAFlowchart } from "@/components/diagrams/lazy-diagram-wrapper"
import OptimizedImage from "@/components/ui/optimized-image"
import { useMounted } from "@/hooks/use-mounted"

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/rct-hero-human-v2-JuuABknjMqUydZ7t62H8ez.webp"
const LOGO_MARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/Logo-mark-256x256-transparent_27abc2a3.png"
const PIXEL_BRAIN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-brain-icon-YV3hZvbAaJBXWEMr6T2Tnc.webp"
const PIXEL_ARCH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-architecture-layers_33ca737f.png"

export default function HeroSection() {
  const { language, t } = useLanguage()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname) || language
  const localePrefix = locale === "th" ? "/th" : "/en"
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()
  const isDark = mounted && resolvedTheme === "dark"
  const shouldAnimate = !prefersReducedMotion

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
      transition: { staggerChildren: 0.05, delayChildren: 0.02 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
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

      <div className="absolute top-20 -left-32 h-104 w-104 rounded-full bg-warm-amber opacity-6 blur-[88px]" />
      <div className="absolute bottom-20 -right-28 h-84 w-84 rounded-full bg-warm-sage opacity-5 blur-[72px]" />

      <div className="relative max-w-300 mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            variants={shouldAnimate ? containerVariants : undefined}
            initial={shouldAnimate ? "hidden" : undefined}
            animate={shouldAnimate ? "visible" : undefined}
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border shadow-sm ${
                isDark ? "bg-card/80 border-border" : "bg-white/80 border-warm-light-gray"
              }`}
            >
              <OptimizedImage src={LOGO_MARK} alt="RCT Ecosystem Logo" containerClassName="w-5 h-5" objectFit="contain" priority width={20} height={20} />
              <span className={`text-xs font-medium ${isDark ? "text-warm-muted" : "text-warm-gray"}`}>{t("hero.badge")}</span>
              <div className={`w-1.5 h-1.5 rounded-full bg-warm-sage ${shouldAnimate ? "animate-pulse" : ""}`} />
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
                  <div key={item.label} className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${isDark ? "border-border bg-card/70 text-warm-muted hover:bg-card" : "border-warm-light-gray bg-white/70 text-warm-secondary hover:bg-white"}`}>
                    <OptimizedImage src={item.icon} alt="" pixelated showErrorFallback={false} containerClassName="h-4 w-4" objectFit="contain" width={16} height={16} className="transition duration-200 group-hover:brightness-75 group-hover:contrast-125" />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <button
                onClick={() => scrollTo("#overview")}
                className={`group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-[background-color,box-shadow,transform] shadow-sm hover:shadow-lg duration-200 ${
                  isDark ? "text-dark-900 bg-warm-amber hover:bg-[#E0B96A]" : "text-white bg-warm-charcoal hover:bg-[#333333]"
                }`}
              >
                {t("hero.cta.explore")}
                <ArrowRight size={16} className={shouldAnimate ? "transition-transform group-hover:translate-x-1" : ""} />
              </button>
              <Link
                href={`${localePrefix}/demo/fdia`}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border rounded-xl transition-[background-color,box-shadow] hover:shadow-sm duration-200 ${
                  isDark
                    ? "text-warm-pale bg-card/80 border-border hover:bg-secondary"
                    : "text-warm-charcoal bg-white/80 border-warm-light-gray hover:bg-white"
                }`}
              >
                {t("hero.cta.demo")}
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={shouldAnimate ? { opacity: 0, scale: 0.96 } : false}
                  animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
                  transition={shouldAnimate ? { duration: 0.28 } : undefined}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2 transition-all duration-300 ${isDark ? "hover:bg-card/60" : "hover:bg-white/60"}`}
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm ${
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
            initial={shouldAnimate ? { opacity: 0, x: 24 } : false}
            animate={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
            transition={shouldAnimate ? { duration: 0.34, delay: 0.08 } : undefined}
            className="group relative"
          >
            <div className="relative rounded-[28px] border border-border bg-white/84 p-4 shadow-[0_14px_32px_rgba(0,0,0,0.08)] sm:p-6 dark:bg-card/84">
              <div className="pointer-events-none absolute right-5 top-5 h-10 w-10 opacity-55">
                <OptimizedImage src={PIXEL_BRAIN} alt="" pixelated showErrorFallback={false} containerClassName="h-full w-full" objectFit="contain" width={40} height={40} className="transition duration-200 group-hover:brightness-75 group-hover:contrast-125" />
              </div>
              <div className="mb-4 text-right text-sm text-muted-foreground">
                {language === "en" ? "Use ← → or click nodes" : "ใช้ ← → หรือคลิกที่ node"}
              </div>
              <LazyFDIAFlowchart />
              <motion.div
                initial={shouldAnimate ? { opacity: 0, y: 12 } : false}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                transition={shouldAnimate ? { delay: 0.2, duration: 0.24 } : undefined}
                className={`absolute bottom-4 left-4 right-4 rounded-xl border p-4 z-10 ${
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
                    <div className="h-2 w-2 rounded-full bg-warm-sage" />
                    <span className="text-xs font-medium text-warm-sage">Active</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              animate={prefersReducedMotion || !isInView ? { y: 0 } : { y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: prefersReducedMotion || !isInView ? 0 : Infinity, ease: "easeInOut" }}
              className={`absolute -top-2 -right-2 sm:-top-4 sm:-right-4 rounded-xl px-4 py-2.5 shadow-md border ${
                isDark ? "bg-card border-border" : "bg-white border-warm-light-gray"
              }`}
            >
              <div className={`text-xs sm:text-sm ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>{language === "en" ? "Accuracy" : "ความแม่นยำ"}</div>
              <div className="text-lg font-bold text-warm-sage">99.7%</div>
            </motion.div>

            <motion.div
              animate={prefersReducedMotion || !isInView ? { y: 0 } : { y: [0, 3, 0] }}
              transition={{ duration: 6, repeat: prefersReducedMotion || !isInView ? 0 : Infinity, ease: "easeInOut", delay: 1 }}
              className={`absolute -bottom-3 -left-3 rounded-xl px-3 py-2 shadow-md border ${
                isDark ? "bg-card border-border" : "bg-white border-warm-light-gray"
              }`}
            >
              <div className={`text-xs sm:text-sm ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>Version</div>
              <div className="text-sm font-bold text-warm-amber">v2.7.0</div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={shouldAnimate ? { opacity: 0 } : false} animate={shouldAnimate ? { opacity: 1 } : undefined} transition={shouldAnimate ? { delay: 0.36 } : undefined} className="flex justify-center mt-8 lg:mt-10">
          <button
            onClick={() => scrollTo("#overview")}
            className={`flex flex-col items-center gap-2 transition-colors group ${isDark ? "text-warm-subtle hover:text-warm-pale" : "text-warm-gray hover:text-warm-charcoal"}`}
          >
            <span className="text-xs font-medium uppercase tracking-widest">{language === "en" ? "Scroll to explore" : "เลื่อนเพื่อสำรวจ"}</span>
            <motion.div animate={prefersReducedMotion ? { y: 0 } : { y: [0, 4, 0] }} transition={{ duration: 2.4, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
