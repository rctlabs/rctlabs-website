"use client"

import { ChevronDown } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useMounted } from "@/hooks/use-mounted"

type FAQItem = { question: string; answer: string }

type FAQSectionProps = {
  items: FAQItem[]
  heading?: string
  headingTh?: string
  locale?: "en" | "th"
}

export function FAQSection({
  items,
  heading = "Frequently Asked Questions",
  headingTh = "คำถามที่พบบ่อย",
  locale = "en",
}: FAQSectionProps) {
  const { theme } = useTheme()
  const mounted = useMounted()
  const isDark = (mounted ? theme : "light") === "dark"
  const displayHeading = locale === "th" ? headingTh : heading

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2
        className={`text-2xl font-bold mb-8 ${
          isDark ? "text-warm-light-gray" : "text-warm-charcoal"
        }`}
      >
        {displayHeading}
      </h2>
      {items.map((faq, i) => (
        <details
          key={i}
          className={`group border-b py-4 ${
            isDark ? "border-dark-border" : "border-border"
          }`}
        >
          <summary
            className={`cursor-pointer font-medium transition-colors flex items-center justify-between list-none ${
              isDark
                ? "text-warm-light-gray group-open:text-warm-amber"
                : "text-foreground group-open:text-primary"
            }`}
          >
            {faq.question}
            <ChevronDown
              className="h-4 w-4 shrink-0 ml-4 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p
            className={`mt-3 leading-relaxed ${
              isDark ? "text-warm-dim" : "text-muted-foreground"
            }`}
          >
            {faq.answer}
          </p>
        </details>
      ))}
    </section>
  )
}
