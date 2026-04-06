"use client"

import dynamic from "next/dynamic"
import { m, useInView, useReducedMotion } from "framer-motion"
import { ArrowRight, ArrowDown } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { getLocalePrefix } from "@/lib/i18n"
import OptimizedImage from "@/components/ui/optimized-image"
import { useMounted } from "@/hooks/use-mounted"
import { useIdleActivation } from "@/hooks/use-idle-activation"
import { pixelIcons } from "@/lib/pixel-icons"
import { useCardSpotlight } from "@/hooks/use-card-spotlight"
import { SITE_ALGORITHM_COUNT, SITE_LAYER_COUNT, SITE_HEXACORE_COUNT, SITE_UPTIME } from "@/lib/site-config"

const HeroArchitectureVisual = dynamic(() => import("@/components/sections/hero-architecture-visual"), {
  loading: () => (
    <div className="h-112 w-full rounded-4xl border border-[#e6ddd0] bg-white/50 shadow-[0_20px_48px_rgba(84,61,31,0.08)] dark:border-border dark:bg-card/45" />
  ),
})

const HeroAnimatedBackground = dynamic(() => import("@/components/ui/hero-animated-background"), {
  ssr: false,
  loading: () => null,
})

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/rct-hero-human-v2-JuuABknjMqUydZ7t62H8ez.webp"
const LOGO_MARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/Logo-mark-256x256-transparent_27abc2a3.png"

type HeroSectionProps = {
  locale: "en" | "th"
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const { language, t } = useLanguage()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const [heroBgError, setHeroBgError] = useState(false)
  const localePrefix = getLocalePrefix(locale)
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()
  const isDark = mounted && resolvedTheme === "dark"
  const deferredHeroAssetsReady = useIdleActivation({ timeoutMs: 1800 })
  const shouldAnimate = !prefersReducedMotion && isInView
  const statCardSpotlight = useCardSpotlight<HTMLDivElement>()

  const scrollTo = (id: string) => {
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
  }

  const stats = [
    { value: String(SITE_ALGORITHM_COUNT), label: t("hero.stat.algorithms"), iconSrc: pixelIcons.brain },
    { value: String(SITE_LAYER_COUNT), label: t("hero.stat.layers"), iconSrc: pixelIcons.layers },
    { value: String(SITE_HEXACORE_COUNT), label: t("hero.stat.genomes"), iconSrc: pixelIcons.genome },
    { value: SITE_UPTIME.replace(" SLA", ""), sublabel: "SLA", label: t("hero.stat.uptime"), iconSrc: pixelIcons.cpu },
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
    <section ref={heroRef} id="hero" data-main-section="hero" aria-label="Hero" className="relative flex min-h-[max(44rem,100svh)] items-center overflow-hidden bg-[#f7f1eb] dark:bg-[#0D0D0D]">
      {/* Hero image (hidden on CDN error) */}
      {!heroBgError && deferredHeroAssetsReady && (
        <div className="absolute inset-0">
          <OptimizedImage
            src={HERO_BG}
            alt="RCT Ecosystem Hero Background"
            containerClassName="h-full w-full"
            objectFit="cover"
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
            ? "bg-linear-to-r from-[#0D0D0D]/96 via-[#0D0D0D]/84 to-[#0D0D0D]/56"
            : "bg-linear-to-r from-[#f7f1eb]/88 via-[#f7f1eb]/74 to-[#f7f1eb]/42"
        }`}
      />
      <div className="homepage-ambient-layer absolute inset-0">
        <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute -left-24 top-[16%] h-72 w-72 rounded-full" />
        <div className="homepage-ambient-orb homepage-ambient-orb--sage homepage-ambient-orb--slow absolute -right-16 top-[34%] h-80 w-80 rounded-full" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent via-[#f7f1eb]/26 to-[#f7f1eb]/84 dark:via-[#121212]/16 dark:to-[#121212]/72" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,241,235,0.12),transparent_24%,rgba(212,168,83,0.04)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%,rgba(212,168,83,0.02)_100%)]" />
      </div>
      {/* Structured background layers rendered above the image blend and below the content */}
      {deferredHeroAssetsReady ? <HeroAnimatedBackground variant="hero" /> : null}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-3 h-56 bg-[linear-gradient(180deg,transparent_0%,rgba(247,241,235,0.18)_34%,rgba(247,241,235,0.78)_72%,#f7f1eb_100%)] dark:bg-[linear-gradient(180deg,transparent_0%,rgba(13,13,13,0.08)_30%,rgba(13,13,13,0.72)_72%,#0D0D0D_100%)]" />
      {deferredHeroAssetsReady ? (
        <m.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[18%] bottom-10 z-3 h-24 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.1),transparent_70%)]"
          animate={prefersReducedMotion ? { opacity: 0.45 } : { opacity: [0.32, 0.55, 0.32], x: [0, 12, 0] }}
          transition={{ duration: 9, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}
        />
      ) : null}
      <div className="relative z-10 mx-auto w-full max-w-300 px-4 pt-20 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pt-24 lg:pb-20">
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(374px,484px)] lg:gap-8 xl:grid-cols-[minmax(0,1.01fr)_minmax(394px,484px)]">
          <m.div
            variants={shouldAnimate ? containerVariants : undefined}
            initial={shouldAnimate ? "hidden" : undefined}
            animate={shouldAnimate ? "visible" : undefined}
            className="space-y-7 lg:space-y-8"
          >
            <m.div
              variants={itemVariants}
              className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border shadow-sm ${
                isDark ? "bg-card/80 border-border" : "border-[#e6ddd0] bg-white/96 shadow-[0_10px_24px_rgba(84,61,31,0.05)]"
              }`}
            >
              <OptimizedImage
                src={LOGO_MARK}
                alt="RCT Ecosystem Logo"
                containerClassName="w-5 h-5"
                className={isDark ? "brightness-0 invert" : ""}
                objectFit="contain"
                priority
                width={20}
                height={20}
              />
              <span className={`text-xs font-medium ${isDark ? "text-warm-muted" : "text-warm-gray"}`}>{t("hero.badge")}</span>
              <div className="h-1.5 w-1.5 rounded-full bg-warm-sage" />
            </m.div>

            <m.div variants={itemVariants} className="space-y-4 lg:space-y-5">
              <h1 className={`text-4xl font-bold tracking-[-0.03em] leading-[1.12] sm:text-5xl lg:text-[56px] xl:text-[58px] ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                {t("hero.title.line1")}
                <br />
                <span className="font-display font-semibold text-warm-amber">{t("hero.title.line2")}</span>
                <br />
                {t("hero.title.line3")}
              </h1>
              <p className={`max-w-xl text-lg leading-relaxed sm:text-xl ${language === "th" ? "subtitle-th" : ""} ${isDark ? "text-warm-pale/82" : "text-warm-charcoal/72"}`}>
                {t("hero.subtitle")}
              </p>
              <p className="sr-only">
                {language === "th"
                  ? "RCT Ecosystem คือระบบปฏิบัติการ AI แบบรัฐธรรมนูญ 10 ชั้น ใช้ FDIA gating, HexaCore 7 โมเดล และ SignedAI consensus เพื่อลด AI hallucination เหลือ 0.3%"
                  : "RCT Ecosystem is a 10-layer Constitutional AI Operating System — using FDIA gating, 7-model HexaCore routing, and SignedAI consensus to reduce AI hallucination to 0.3%."}
              </p>
            </m.div>

            <m.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <m.button
                onClick={() => scrollTo("#overview")}
                whileHover={prefersReducedMotion ? undefined : { y: -1.5, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                className={`group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-[background-color,box-shadow,transform] shadow-sm hover:shadow-lg duration-200 ${
                  isDark ? "text-dark-900 bg-warm-amber hover:bg-[#E0B96A]" : "text-white bg-warm-charcoal hover:bg-[#333333]"
                }`}
              >
                {t("hero.cta.explore")}
                <ArrowRight size={16} className={shouldAnimate ? "transition-transform group-hover:translate-x-0.5" : ""} />
              </m.button>
              <m.div whileHover={prefersReducedMotion ? undefined : { y: -1 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}>
                <Link
                href={`${localePrefix}/demo/fdia`}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border rounded-xl transition-[background-color,box-shadow] hover:shadow-sm duration-200 ${
                  isDark
                    ? "text-warm-pale bg-card/80 border-border hover:bg-secondary"
                    : "text-warm-charcoal border-[#e6ddd0] bg-white hover:bg-[#fffdfa]"
                }`}
                >
                  {t("hero.cta.demo")}
                </Link>
              </m.div>
            </m.div>

            <m.div variants={itemVariants} className="grid grid-cols-2 gap-3 pt-7 md:grid-cols-4">
              {stats.map((stat) => (
                <m.div
                  key={stat.label}
                  {...statCardSpotlight}
                  initial={shouldAnimate ? { opacity: 0, scale: 0.96 } : false}
                  animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
                  transition={shouldAnimate ? { duration: 0.2 } : undefined}
                  whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                  className={`main-page-reactive-card rounded-2xl border px-3 py-3 transition-all duration-300 ${isDark ? "border-border bg-card/72 hover:border-warm-amber/20 hover:bg-card/82" : "border-[#e6ddd0] bg-white hover:border-warm-amber/25 hover:bg-white"}`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg border shadow-sm ${
                      isDark ? "bg-card/80 border-border" : "border-[#e6ddd0] bg-white"
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
                </m.div>
              ))}
            </m.div>
          </m.div>

          <m.div
            initial={shouldAnimate ? { opacity: 0, x: 24 } : false}
            animate={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
            transition={shouldAnimate ? { duration: 0.26, delay: 0.04 } : undefined}
            className="group relative mx-auto w-full max-w-105 lg:-mr-2 lg:ml-0 lg:max-w-none"
          >
            {deferredHeroAssetsReady ? <HeroArchitectureVisual /> : <div className="h-112 w-full rounded-4xl border border-[#e6ddd0] bg-white/50 shadow-[0_20px_48px_rgba(84,61,31,0.08)] dark:border-border dark:bg-card/45" />}
          </m.div>
        </div>

        <m.div initial={shouldAnimate ? { opacity: 0 } : false} animate={shouldAnimate ? { opacity: 1 } : undefined} transition={shouldAnimate ? { delay: 0.2 } : undefined} className="mt-10 flex justify-center lg:mt-12">
          <button
            onClick={() => scrollTo("#overview")}
            className={`group rounded-full px-4 py-3 flex flex-col items-center gap-2 transition-colors ${isDark ? "text-warm-subtle hover:text-warm-pale" : "text-warm-gray hover:text-warm-charcoal"}`}
          >
            <span className="text-xs font-medium uppercase tracking-widest">{language === "en" ? "Scroll to explore" : "เลื่อนเพื่อสำรวจ"}</span>
            <m.div animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.8, 1, 0.8] }} transition={{ duration: 4.2, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}>
              <ArrowDown className="w-4 h-4" />
            </m.div>
          </button>
        </m.div>
      </div>
    </section>
  )
}
