"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useMounted } from "@/hooks/use-mounted"

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
      whileHover={{ y: -3, transition: { duration: 0.24 } }}
      className="h-full"
    >
      <Link
        href={href}
        className={`main-page-reactive-card group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 sm:p-6 transition-[transform,border-color,box-shadow,background-color] duration-300 hover:shadow-[0_14px_32px_rgba(84,61,31,0.07)] ${
          isDark
            ? "bg-card border-border hover:border-warm-amber/40"
            : "border-[#e6ddd0] bg-[#fff8f1] hover:border-warm-amber/40 hover:bg-[#fffdf8]"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.14),transparent_40%)]" />
        </div>

        {/* Icon — absolute top-right */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: isDark ? `${color}20` : bg }}
          >
            {iconSrc ? (
              <Image
                src={iconSrc}
                alt=""
                width={28}
                height={28}
                className="object-contain"
                style={{ imageRendering: "pixelated" }}
              />
            ) : icon}
          </div>
        </div>

        {/* Vertical content */}
        <div className="relative z-10 flex flex-1 flex-col pr-16 sm:pr-18">
          <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Deep Dive
          </span>
          <h3 className="mb-3 text-base font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-warm-amber sm:text-lg">
            {language === "th" ? titleTh : title}
          </h3>
          <p className={`text-sm leading-relaxed text-muted-foreground sm:text-[15px] mb-4 flex-1 ${language === "th" ? "subtitle-th" : ""}`}>
            {language === "th" ? descriptionTh : description}
          </p>
          <div
            className="mt-auto flex items-center gap-1 text-xs font-semibold transition-all duration-200 sm:opacity-80 sm:group-hover:translate-x-1 sm:group-hover:opacity-100"
            style={{ color }}
          >
            {language === "th" ? "เปิดดูรายละเอียด →" : "Open the detail path →"}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
