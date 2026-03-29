"use client"

/*
 * SubPageHero — Compact hero for sub-pages
 * Provides consistent header with tag + title + description
 * Migrated from manus-frontend-design: ThemeContext → next-themes, LanguageContext → language-provider
 */
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"

interface SubPageHeroProps {
  tag: string
  tagColor?: "gold" | "terracotta" | "sage" | "blue" | "purple"
  title: string
  italicWord?: string
  description: string
  icon?: string
}

const tagColors: Record<string, { bg: string; text: string; border: string; darkBg: string }> = {
  gold:       { bg: "#FEF3C7", text: "#D4A853", border: "#D4A853", darkBg: "#3A2E15" },
  terracotta: { bg: "#FEE2E2", text: "#C4745B", border: "#C4745B", darkBg: "#3A1E15" },
  sage:       { bg: "#D1FAE5", text: "#7B9E87", border: "#7B9E87", darkBg: "#1E3A25" },
  blue:       { bg: "#DBEAFE", text: "#89B4C8", border: "#89B4C8", darkBg: "#152A3A" },
  purple:     { bg: "#EDE9FE", text: "#B8A9C9", border: "#B8A9C9", darkBg: "#2A1E3A" },
}

export default function SubPageHero({
  tag,
  tagColor = "gold",
  title,
  italicWord,
  description,
  icon,
}: SubPageHeroProps) {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const isDark = resolvedTheme === "dark"
  const isThai = language === "th"
  const colors = tagColors[tagColor] ?? tagColors.gold

  const renderTitle = () => {
    if (!italicWord) return title
    const parts = title.split(italicWord)
    return (
      <>
        {parts[0]}
        <span className="font-display font-semibold text-warm-amber">{italicWord}</span>
        {parts[1] ?? ""}
      </>
    )
  }

  return (
    <section
      className={`pt-6 pb-6 border-b transition-colors duration-300 ${
        isDark ? "bg-warm-charcoal border-dark-border" : "bg-warm-cream border-warm-light-gray/60"
      }`}
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border mb-4"
            style={{
              backgroundColor: isDark ? colors.darkBg : colors.bg,
              borderColor: `${colors.border}33`,
            }}
          >
            {icon && <span className="text-lg sm:text-xl leading-none">{icon}</span>}
            <span
              className="text-xs sm:text-sm font-semibold uppercase tracking-wider"
              style={{ color: colors.text }}
            >
              {tag}
            </span>
          </div>
          <h1
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 leading-tight ${
              isDark ? "text-warm-light-gray" : "text-warm-charcoal"
            }`}
          >
            {renderTitle()}
          </h1>
          <p
            className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
              isThai ? "subtitle-th" : ""
            } ${isDark ? "text-warm-muted" : "text-warm-secondary"}`}
          >
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
