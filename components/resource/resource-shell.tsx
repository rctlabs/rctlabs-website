"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCardSpotlight } from "@/hooks/use-card-spotlight"

type AccentTone = "amber" | "sky" | "sage" | "terracotta" | "lavender"

interface ResourceAction {
  href: string
  label: string
  variant?: "primary" | "secondary" | "ghost"
  external?: boolean
}

interface ResourceStat {
  label: string
  value: string
  detail?: string
}

interface ResourceCard {
  title: string
  description: string
  href: string
  icon: LucideIcon
  badge?: string
  meta?: string
  tags?: string[]
  external?: boolean
}

interface ResourcePageShellProps {
  eyebrow: string
  title: string
  description: string
  taxonomy?: string[]
  actions?: ResourceAction[]
  stats?: ResourceStat[]
  accent?: AccentTone
  footerTitle?: string
  footerDescription?: string
  footerActions?: ResourceAction[]
  children: ReactNode
}

interface ResourceSectionProps {
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
}

function getAccentClasses(accent: AccentTone) {
  switch (accent) {
    case "sky":
      return {
        badge: "border-sky-400/30 bg-sky-400/10 text-sky-500",
        button: "bg-sky-500 text-white hover:bg-sky-600",
        border: "border-sky-400/25",
        glow: "from-sky-400/10 via-transparent to-transparent",
      }
    case "sage":
      return {
        badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        button: "bg-emerald-600 text-white hover:bg-emerald-700",
        border: "border-emerald-500/25",
        glow: "from-emerald-500/10 via-transparent to-transparent",
      }
    case "terracotta":
      return {
        badge: "border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400",
        button: "bg-orange-600 text-white hover:bg-orange-700",
        border: "border-orange-500/25",
        glow: "from-orange-500/10 via-transparent to-transparent",
      }
    case "lavender":
      return {
        badge: "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400",
        button: "bg-violet-600 text-white hover:bg-violet-700",
        border: "border-violet-500/25",
        glow: "from-violet-500/10 via-transparent to-transparent",
      }
    case "amber":
    default:
      return {
        badge: "border-warm-amber/30 bg-warm-amber/10 text-warm-amber",
        button: "bg-warm-amber text-white hover:bg-[#C49A48]",
        border: "border-warm-amber/25",
        glow: "from-warm-amber/10 via-transparent to-transparent",
      }
  }
}

function ActionLink({ action, primaryClass }: { action: ResourceAction; primaryClass: string }) {
  const className =
    action.variant === "primary"
      ? `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${primaryClass}`
      : action.variant === "ghost"
        ? "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        : "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/80 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/60"

  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>
        <span>{action.label}</span>
        <ExternalLink className="h-4 w-4" />
      </a>
    )
  }

  return (
    <Link href={action.href} className={className}>
      <span>{action.label}</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

export function ResourcePageShell({
  eyebrow,
  title,
  description,
  taxonomy = [],
  actions = [],
  stats = [],
  accent = "amber",
  footerTitle,
  footerDescription,
  footerActions = [],
  children,
}: ResourcePageShellProps) {
  const accentClasses = getAccentClasses(accent)
  const prefersReducedMotion = useReducedMotion()
  const statSpotlight = useCardSpotlight<HTMLDivElement>()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="article-safe-top relative overflow-hidden border-b border-border/70 bg-linear-to-b from-background via-background to-muted/30">
        <div className={`pointer-events-none absolute inset-0 bg-radial ${accentClasses.glow}`} />
        <div className="mx-auto max-w-7xl px-4 pb-12 md:pb-16">
          <div className="main-page-reactive-surface rounded-4xl border border-[#e6ddd0] bg-white/94 p-6 shadow-[0_24px_80px_rgba(84,61,31,0.06)] dark:border-border/70 dark:bg-card/88 md:p-10">
            <div className="max-w-4xl">
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${accentClasses.badge}`}>
                <span>{eyebrow}</span>
              </div>
              <h1 className="mt-5 text-4xl font-bold leading-[1.02] text-foreground sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                {description}
              </p>
            </div>

            {taxonomy.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {taxonomy.map((item) => (
                  <span key={item} className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${accentClasses.badge}`}>
                    {item}
                  </span>
                ))}
              </div>
            ) : null}

            {actions.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {actions.map((action) => (
                  <ActionLink key={`${action.href}-${action.label}`} action={action} primaryClass={accentClasses.button} />
                ))}
              </div>
            ) : null}

            {stats.length > 0 ? (
              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <motion.div
                    key={`${stat.label}-${stat.value}`}
                    {...statSpotlight}
                    whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.006 }}
                    className="main-page-reactive-card rounded-2xl border border-[#e6ddd0] bg-white p-4 shadow-[0_12px_28px_rgba(84,61,31,0.045)] dark:border-border/70 dark:bg-background/75"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</div>
                    <div className="mt-2 text-2xl font-bold text-foreground">{stat.value}</div>
                    {stat.detail ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.detail}</p> : null}
                  </motion.div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">{children}</div>

      {footerTitle && footerDescription ? (
        <section className="mx-auto max-w-7xl px-4 pb-16 md:pb-20">
          <div className="main-page-reactive-surface rounded-4xl border border-[#e6ddd0] bg-white/94 p-8 shadow-[0_24px_80px_rgba(84,61,31,0.06)] dark:border-border/70 dark:bg-card/88 md:p-10">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">{footerTitle}</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">{footerDescription}</p>
            </div>
            {footerActions.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {footerActions.map((action) => (
                  <ActionLink key={`${action.href}-${action.label}`} action={action} primaryClass={accentClasses.button} />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  )
}

export function ResourceSection({ eyebrow, title, description, children }: ResourceSectionProps) {
  return (
    <section className="mb-12 md:mb-16">
      <div className="max-w-3xl">
        {eyebrow ? <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</div> : null}
        <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
        {description ? <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">{description}</p> : null}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export function ResourceCardGrid({ cards, columns = "three" }: { cards: ResourceCard[]; columns?: "two" | "three" | "four" }) {
  const prefersReducedMotion = useReducedMotion()
  const cardSpotlight = useCardSpotlight<HTMLDivElement>()
  const gridClass =
    columns === "two"
      ? "grid gap-5 lg:grid-cols-2"
      : columns === "four"
        ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        : "grid gap-5 lg:grid-cols-3"

  return (
    <div className={gridClass}>
      {cards.map((card) => {
        const Icon = card.icon
        const content = (
          <motion.div
            {...cardSpotlight}
            whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.006 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.996 }}
            className="main-page-reactive-card group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#e6ddd0] bg-white p-6 shadow-[0_12px_32px_rgba(84,61,31,0.045)] transition hover:-translate-y-1 hover:border-warm-amber/35 hover:shadow-[0_22px_48px_rgba(84,61,31,0.08)] dark:border-border/70 dark:bg-card/90"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-warm-amber/30 to-transparent opacity-70" />
            <div className="pointer-events-none absolute inset-0 bg-radial from-warm-amber/6 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-[#eee2d6] bg-[#fffaf6] text-warm-amber shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-border dark:bg-background/75">
                <Icon className="h-5 w-5" />
              </div>
              {card.badge ? (
                <span className="rounded-full border border-[#eee2d6] bg-[#fffaf6] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground dark:border-border dark:bg-background/75">
                  {card.badge}
                </span>
              ) : null}
            </div>

            <div className="relative mt-5">
              {card.meta ? <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{card.meta}</div> : null}
              <h3 className="mt-2 text-xl font-bold leading-tight text-foreground transition group-hover:text-warm-amber">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.description}</p>
            </div>

            {card.tags && card.tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[#eee2d6] bg-[#fffaf6] px-3 py-1 text-[11px] font-medium text-muted-foreground dark:border-border dark:bg-background/75">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-auto pt-6">
              <div className="flex items-center justify-between border-t border-[#eee2d6] pt-4 text-sm font-semibold text-foreground dark:border-border/80">
                <span className="inline-flex items-center gap-2">
                  <span>Open resource</span>
                  {card.external ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Roadmap Pairing</span>
              </div>
            </div>
          </motion.div>
        )

        if (card.external) {
          return (
            <a key={`${card.href}-${card.title}`} href={card.href} target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          )
        }

        return (
          <Link key={`${card.href}-${card.title}`} href={card.href}>
            {content}
          </Link>
        )
      })}
    </div>
  )
}