"use client"

/*
 * SectionHeading — Tech Authority Theme
 * Clean section heading with optional accent word highlight
 * Thai descriptions use Kanit ExtraLight for visual contrast
 * Migrated from manus-frontend-design: ThemeContext → next-themes, LanguageContext → language-provider
 */
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

interface SectionHeadingProps {
  tag?: string
  tagColor?: "amber" | "sage" | "terracotta" | "gold"
  title: string
  italicWord?: string
  description?: string
  align?: "left" | "center"
  /** Optional pixel art icon URL to display inline before the title */
  pixelIcon?: string
  label?: string
}

export default function SectionHeading({
  tag,
  tagColor = "amber",
  title,
  italicWord,
  description,
  align = "center",
  pixelIcon,
  label,
}: SectionHeadingProps) {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const isDark = resolvedTheme === "dark"
  const isThai = language === "th"
  const displayTag = tag || label

  const tagStyles: Record<string, string> = {
    amber: isDark ? "bg-dark-amber-bg text-warm-amber border-warm-amber/20" : "",
    sage: isDark ? "bg-dark-sage-bg text-warm-sage border-warm-sage/20" : "",
    terracotta: isDark ? "bg-dark-terra-bg text-warm-terracotta border-warm-terracotta/20" : "",
    gold: isDark ? "bg-dark-amber-bg text-warm-amber border-warm-amber/20" : "",
  }

  const tagClass = isDark
    ? `inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${tagStyles[tagColor]}`
    : tagColor === "sage" ? "tag-sage" : tagColor === "terracotta" ? "tag-terracotta" : "tag-amber"

  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start"

  const renderTitle = () => {
    if (!italicWord) return title
    const idx = title.indexOf(italicWord)
    if (idx === -1) return title
    return (
      <>
        {title.slice(0, idx)}
        <span className="font-display font-semibold text-warm-amber">{italicWord}</span>
        {title.slice(idx + italicWord.length)}
      </>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col gap-2 mb-6 md:mb-8 lg:mb-10 ${alignClass}`}
    >
      {displayTag && <span className={tagClass}>{displayTag}</span>}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight leading-tight ${
          pixelIcon ? "flex items-center justify-center gap-3 flex-nowrap" : ""
        } ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}
      >
        {pixelIcon && (
          <Image
            src={pixelIcon}
            alt=""
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 object-contain pixelated"
            style={{ imageRendering: "pixelated" }}
          />
        )}
        <span>{renderTitle()}</span>
      </h2>
      {description && (
        <p
          className={`text-sm sm:text-base md:text-lg leading-relaxed ${
            align === "center" ? "max-w-2xl" : "max-w-xl"
          } ${isThai ? "subtitle-th" : ""} ${isDark ? "text-warm-muted" : "text-warm-secondary"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
