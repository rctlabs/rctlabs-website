"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useMounted } from "@/hooks/use-mounted"
import OptimizedImage from "@/components/ui/optimized-image"

interface SectionPreviewCardProps {
  icon?: string
  iconSrc?: string
  title: string
  titleTh: string
  description: string
  descriptionTh: string
  href: string
  color: string
  bg: string
  delay?: number
}

export default function SectionPreviewCard({
  icon,
  iconSrc,
  title,
  titleTh,
  description,
  descriptionTh,
  href,
  color,
  bg,
  delay = 0,
}: SectionPreviewCardProps) {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"
  const { language } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <Link
        href={href}
        className={`group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:shadow-md ${
          isDark
            ? "bg-card border-border hover:border-warm-amber/40"
            : "bg-card border-border hover:border-warm-amber/40"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.14),transparent_40%)]" />
        </div>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: isDark ? `${color}20` : bg }}
        >
          {iconSrc ? (
            <OptimizedImage
              src={iconSrc}
              alt=""
              pixelated
              showErrorFallback={false}
              containerClassName="h-7 w-7"
              objectFit="contain"
              width={28}
              height={28}
            />
          ) : icon}
        </div>
        <div className="flex-1">
          <h3
            className="text-sm font-bold mb-1.5 group-hover:text-warm-amber transition-colors duration-200 text-foreground"
          >
            {language === "th" ? titleTh : title}
          </h3>
          <p className={`text-xs leading-relaxed text-muted-foreground ${language === "th" ? "subtitle-th" : ""}`}>
            {language === "th" ? descriptionTh : description}
          </p>
        </div>
        <div
          className="mt-auto flex items-center gap-1 text-xs font-semibold opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
          style={{ color }}
        >
          {language === "th" ? "สำรวจ →" : "Explore →"}
        </div>
      </Link>
    </motion.div>
  )
}
