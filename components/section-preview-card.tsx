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
      className="h-full"
    >
      <Link
        href={href}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 sm:p-6 transition-[transform,border-color,box-shadow] duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] ${
          isDark
            ? "bg-card border-border hover:border-warm-amber/40"
            : "bg-card border-border hover:border-warm-amber/40"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.14),transparent_40%)]" />
        </div>
        <div className="flex flex-col sm:flex-row gap-6 items-start h-full">
          {/* Left Side: Icon & Meta */}
          <div className="flex flex-col items-start shrink-0 sm:w-[35%]">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-2xl transition-transform duration-300 group-hover:scale-105 mb-3"
              style={{ backgroundColor: isDark ? `${color}20` : bg }}
            >
              {iconSrc ? (
                <OptimizedImage
                  src={iconSrc}
                  alt=""
                  pixelated
                  showErrorFallback={false}
                  containerClassName="h-8 w-8"
                  objectFit="contain"
                  width={32}
                  height={32}
                />
              ) : icon}
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground text-left">
              {language === "th" ? "Deep Dive" : "Deep Dive"}
            </span>
          </div>

          {/* Right Side: Content */}
          <div className="relative z-10 flex flex-1 h-full flex-col text-left">
            <h3 className="mb-2 text-base font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-warm-amber sm:text-lg">
              {language === "th" ? titleTh : title}
            </h3>
            <p className={`text-sm leading-relaxed text-muted-foreground sm:text-[15px] mb-4 ${language === "th" ? "subtitle-th" : ""}`}>
              {language === "th" ? descriptionTh : description}
            </p>
            <div
              className="relative z-10 mt-auto flex items-center gap-1 pt-1 text-xs font-semibold opacity-100 transition-all duration-200 sm:opacity-80 sm:group-hover:translate-x-1 sm:group-hover:opacity-100"
              style={{ color }}
            >
              {language === "th" ? "เปิดดูรายละเอียด →" : "Open the detail path →"}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
