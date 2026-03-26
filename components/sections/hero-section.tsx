"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { ArrowRight, Layers, Brain, Dna, ArrowDown, Zap } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { usePathname } from "next/navigation"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"
import { LazyFDIAFlowchart } from "@/components/diagrams/lazy-diagram-wrapper"
import OptimizedImage from "@/components/ui/optimized-image"
import { useMounted } from "@/hooks/use-mounted"

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/rct-hero-human-v2-JuuABknjMqUydZ7t62H8ez.webp"
const LOGO_MARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/Logo-mark-256x256-transparent_27abc2a3.png"

export default function HeroSection() {
  const { language, t } = useLanguage()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const pathname = usePathname()
  const locale = resolveLocale(pathname, language)
  const localePrefix = getLocalePrefix(locale)
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
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className={`text-xs sm:text-sm font-medium mb-0.5 ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>FDIA Framework</div>
                  <div className={`text-sm font-bold font-mono ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                    F = D<sup className="text-warm-terracotta">I</sup> × A
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className={`rounded-full border px-2.5 py-1 ${isDark ? "border-border bg-card/80" : "border-warm-light-gray bg-white/90"}`}>
                    {language === "en" ? "Hover to preview" : "ชี้เพื่อพรีวิว"}
                  </span>
                  <span className={`rounded-full border px-2.5 py-1 ${isDark ? "border-border bg-card/80" : "border-warm-light-gray bg-white/90"}`}>
                    {language === "en" ? "Click to pin" : "คลิกเพื่อตรึง"}
                  </span>
                  <span className={`rounded-full border px-2.5 py-1 ${isDark ? "border-border bg-card/80" : "border-warm-light-gray bg-white/90"}`}>
                    {language === "en" ? "Esc to clear" : "กด Esc เพื่อล้าง"}
                  </span>
                </div>
              </div>
              <LazyFDIAFlowchart />
            </div>
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
