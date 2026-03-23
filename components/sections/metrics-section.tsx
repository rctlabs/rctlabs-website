"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import PerformanceRadarChart from "@/components/diagrams/performance-radar-chart"
import SectionHeading from "@/components/section-heading"
import OptimizedImage from "@/components/ui/optimized-image"

const PIXEL_METRICS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-network-icon-8aUM6KhHFxaYJMNCWLXw5c.webp"

const PIXEL_ICONS = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-network-icon-8aUM6KhHFxaYJMNCWLXw5c.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-algorithm-gears_dbfb4610.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-architecture-layers_33ca737f.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-genome-dna_90dc39e4.png",
]

const metrics = [
  { label: { en: "Overall Accuracy", th: "ความแม่นยำโดยรวม" }, value: "96.1%", bar: 96.1, color: "#7B9E87" },
  { label: { en: "Hallucination Rate", th: "อัตรา Hallucination" }, value: "0.3%", bar: 99.7, color: "#7B9E87" },
  { label: { en: "Response Latency", th: "Response Latency" }, value: "< 200ms", bar: 80, color: "#D4A853" },
  { label: { en: "Uptime SLA", th: "Uptime SLA" }, value: "99.9%", bar: 99.9, color: "#7B9E87" },
  { label: { en: "Data Quality Score", th: "คะแนน Data Quality" }, value: "85/100", bar: 85, color: "#89B4C8" },
  { label: { en: "Constitutional Compliance", th: "Constitutional Compliance" }, value: "100%", bar: 100, color: "#7B9E87" },
]

const highlightsData = {
  en: [
    { value: 52, suffix: "", label: "Microservices", desc: "Running in production" },
    { value: 41, suffix: "", label: "Algorithms", desc: "Across 9 tiers" },
    { value: 10, suffix: "", label: "Layers", desc: "Architecture stack" },
    { value: 7, suffix: "", label: "Genomes", desc: "Core DNA components" },
  ],
  th: [
    { value: 52, suffix: "", label: "Microservices", desc: "ทำงานใน Production" },
    { value: 41, suffix: "", label: "Algorithms", desc: "ใน 9 Tiers" },
    { value: 10, suffix: "", label: "Layers", desc: "Architecture Stack" },
    { value: 7, suffix: "", label: "Genomes", desc: "องค์ประกอบ DNA หลัก" },
  ],
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function MetricsSection() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const isDark = resolvedTheme === "dark"
  const highlights = highlightsData[language as keyof typeof highlightsData] || highlightsData.en

  return (
    <section id="metrics" aria-label="Performance Metrics" className={`py-16 md:py-24 transition-colors duration-300 ${isDark ? "bg-dark-900" : "bg-warm-cream"}`}>
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={language === "en" ? "Performance" : "ประสิทธิภาพ"}
          tagColor="sage"
          title="System Metrics"
          italicWord="Metrics"
          description={language === "en" ? "Real-time performance indicators demonstrating enterprise-grade reliability and capability." : "ตัวชี้วัดประสิทธิภาพแบบ real-time ที่แสดงความน่าเชื่อถือและความสามารถระดับองค์กร"}
          pixelIcon={PIXEL_METRICS}
        />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-8 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <motion.div key={highlight.label} whileHover={{ y: -5 }} className={`group relative overflow-hidden rounded-2xl border p-5 text-center transition-all duration-300 ${isDark ? "bg-warm-charcoal border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]" : "bg-white border-warm-light-gray hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"}`}>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,158,135,0.12),transparent_46%)]" />
              </div>
              <OptimizedImage src={PIXEL_ICONS[index]} alt="" pixelated containerClassName="mx-auto mb-1 h-8 w-8" objectFit="contain" width={32} height={32} />
              <div className={`text-3xl font-bold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}><AnimatedCounter target={highlight.value} suffix={highlight.suffix} /></div>
              <div className="mt-1 text-sm font-semibold text-warm-amber">{highlight.label}</div>
              <div className={`mt-0.5 text-xs sm:text-sm ${language === "th" ? "subtitle-th" : ""} ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>{highlight.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="md:col-span-2 lg:col-span-1">
            <PerformanceRadarChart />
          </motion.div>
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <motion.div key={metric.label.en} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.4, delay: index * 0.06 }} className={`rounded-2xl border p-5 transition-all duration-300 ${isDark ? "bg-warm-charcoal border-border hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]" : "bg-white border-warm-light-gray hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"}`}>
                <div className="mb-3 flex items-center justify-between">
                  <span className={`text-sm sm:text-base font-semibold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{metric.label[language as keyof typeof metric.label] || metric.label.en}</span>
                  <span className="font-mono text-sm font-bold" style={{ color: metric.color }}>{metric.value}</span>
                </div>
                <div className={`h-2 overflow-hidden rounded-full ${isDark ? "bg-[#2A2A2A]" : "bg-warm-sand"}`}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${metric.bar}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 + index * 0.1 }} className="h-full rounded-full" style={{ backgroundColor: metric.color }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
