"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { ArrowRight, ArrowDown } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { usePathname } from "next/navigation"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"
import HeroMetricsPanel from "@/components/sections/hero-metrics-panel"
import HeroAnimatedBackground from "@/components/ui/hero-animated-background"
import OptimizedImage from "@/components/ui/optimized-image"
import { useMounted } from "@/hooks/use-mounted"
import { pixelIcons } from "@/lib/pixel-icons"

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/rct-hero-human-v2-JuuABknjMqUydZ7t62H8ez.webp"
const LOGO_MARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/Logo-mark-256x256-transparent_27abc2a3.png"

export default function HeroSection() {
  const { language, t } = useLanguage()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const [heroBgError, setHeroBgError] = useState(false)
  const pathname = usePathname()
  const locale = resolveLocale(pathname, language)
  const localePrefix = getLocalePrefix(locale)
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()
  const isDark = mounted && resolvedTheme === "dark"
  const shouldAnimate = !prefersReducedMotion && isInView

  const scrollTo = (id: string) => {
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
  }

  const stats = [
    { value: "41", label: t("hero.stat.algorithms"), iconSrc: pixelIcons.brain },
    { value: "10", label: t("hero.stat.layers"), iconSrc: pixelIcons.layers },
    { value: "7", label: t("hero.stat.genomes"), iconSrc: pixelIcons.genome },
    { value: "99.9%", sublabel: "target", label: t("hero.stat.uptime"), iconSrc: pixelIcons.cpu },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.035, delayChildren: 0.01 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.24 } },
  }

  return (
    <section ref={heroRef} id="hero" data-main-section="hero" aria-label="Hero" className="relative min-h-screen flex items-center overflow-hidden bg-warm-cream dark:bg-[#0D0D0D]">
      {/* Hero image (hidden on CDN error) */}
      {!heroBgError && (
        <div className="absolute inset-0">
          <OptimizedImage
            src={HERO_BG}
            alt="RCT Ecosystem Hero Background"
            containerClassName="h-full w-full"
            objectFit="cover"
            priority
            sizes="100vw"
            className={isDark ? "scale-[1.03] opacity-[0.12]" : "scale-[1.02] opacity-[0.24]"}
            onError={() => setHeroBgError(true)}
          />
        </div>
      )}
      {/* Gradient overlay blends image into section background */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-linear-to-r from-[#0D0D0D]/94 via-[#0D0D0D]/82 to-[#0D0D0D]/54"
            : "bg-linear-to-r from-warm-cream/82 via-[#f8efe6]/66 to-[#f7ede3]/34"
        }`}
      />
      {/* Structured background layers rendered above the image blend and below the content */}
      <HeroAnimatedBackground variant="hero" />
      <div className="relative z-10 max-w-300 mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 w-full">
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
                isDark ? "bg-card/80 border-border" : "border-[#e6ddd0] bg-[#fff8f1]/92"
              }`}
            >
              <OptimizedImage src={LOGO_MARK} alt="RCT Ecosystem Logo" containerClassName="w-5 h-5" objectFit="contain" priority width={20} height={20} />
              <span className={`text-xs font-medium ${isDark ? "text-warm-muted" : "text-warm-gray"}`}>{t("hero.badge")}</span>
              <div className="h-1.5 w-1.5 rounded-full bg-warm-sage" />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className={`text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.03em] leading-[1.15] ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                {t("hero.title.line1")}
                <br />
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
                <ArrowRight size={16} className={shouldAnimate ? "transition-transform group-hover:translate-x-0.5" : ""} />
              </button>
              <Link
                href={`${localePrefix}/demo/fdia`}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border rounded-xl transition-[background-color,box-shadow] hover:shadow-sm duration-200 ${
                  isDark
                    ? "text-warm-pale bg-card/80 border-border hover:bg-secondary"
                    : "text-warm-charcoal border-[#e6ddd0] bg-[#fff8f1]/92 hover:bg-[#fffdf8]"
                }`}
              >
                {t("hero.cta.demo")}
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 pt-8 md:grid-cols-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={shouldAnimate ? { opacity: 0, scale: 0.96 } : false}
                  animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
                  transition={shouldAnimate ? { duration: 0.2 } : undefined}
                  className={`rounded-2xl border px-3 py-3 transition-all duration-300 ${isDark ? "border-border bg-card/72 hover:bg-card/82" : "border-[#e6ddd0] bg-[#fff7f0]/92 hover:bg-[#fffdf8]"}`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg border shadow-sm ${
                      isDark ? "bg-card/80 border-border" : "border-[#e6ddd0] bg-[#fffbf7]"
                    }`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={stat.iconSrc}
                        alt=""
                        width={18}
                        height={18}
                        className="object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold leading-none ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{stat.value}</div>
                      {"sublabel" in stat && stat.sublabel && (
                        <div className={`text-[9px] font-medium mt-0.5 ${isDark ? "text-warm-subtle" : "text-warm-gray"}`}>{stat.sublabel}</div>
                      )}
                    </div>
                  </div>
                  <div className={`text-[11px] font-medium leading-snug sm:text-xs ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={shouldAnimate ? { opacity: 0, x: 24 } : false}
            animate={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
            transition={shouldAnimate ? { duration: 0.26, delay: 0.04 } : undefined}
            className="group relative"
          >
            <HeroMetricsPanel />
          </motion.div>
        </div>

        <motion.div initial={shouldAnimate ? { opacity: 0 } : false} animate={shouldAnimate ? { opacity: 1 } : undefined} transition={shouldAnimate ? { delay: 0.2 } : undefined} className="mt-8 flex justify-center lg:mt-10">
          <button
            onClick={() => scrollTo("#overview")}
            className={`flex flex-col items-center gap-2 transition-colors group ${isDark ? "text-warm-subtle hover:text-warm-pale" : "text-warm-gray hover:text-warm-charcoal"}`}
          >
            <span className="text-xs font-medium uppercase tracking-widest">{language === "en" ? "Scroll to explore" : "เลื่อนเพื่อสำรวจ"}</span>
            <motion.div animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.8, 1, 0.8] }} transition={{ duration: 4.2, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
