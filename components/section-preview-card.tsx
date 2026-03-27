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
        className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:shadow-md ${
          isDark
            ? "bg-card border-border hover:border-warm-amber/40"
            : "bg-card border-border hover:border-warm-amber/40"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.14),transparent_40%)]" />
        </div>
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110 sm:h-13 sm:w-13"
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
          <div className="min-w-0 flex-1">
            <h3
              className="mb-2 text-sm font-bold text-foreground transition-colors duration-200 group-hover:text-warm-amber sm:text-base"
            >
              {language === "th" ? titleTh : title}
            </h3>
            <p className={`text-xs leading-relaxed text-muted-foreground sm:text-sm ${language === "th" ? "subtitle-th" : ""}`}>
              {language === "th" ? descriptionTh : description}
            </p>
          </div>
        </div>
        <div
          className="mt-auto flex items-center gap-1 pt-1 text-xs font-semibold opacity-100 transition-all duration-200 sm:opacity-70 sm:group-hover:translate-x-1 sm:group-hover:opacity-100"
          style={{ color }}
        >
          {language === "th" ? "สำรวจ →" : "Explore →"}
        </div>
      </Link>
    </motion.div>
  )
}
