import Link from "next/link"
import { Children, isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowUpRight, ChevronRight, ExternalLink, Quote, Sigma, Table2, Waypoints } from "lucide-react"
import { slugifyHeading, type BlogLocale } from "@/lib/blog"

function flattenText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child)
      }

      if (Array.isArray(child)) {
        return flattenText(child)
      }

      if (isValidElement<{ children?: ReactNode }>(child)) {
        return flattenText(child.props.children)
      }

      return ""
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}

function MdxHeading({
  as,
  children,
  className,
}: {
  as: "h1" | "h2" | "h3" | "h4"
  children: ReactNode
  className: string
}) {
  const id = slugifyHeading(flattenText(children))
  const Tag = as

  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  )
}

function SmartLink({ href = "", className = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#")
  const baseClassName = `font-medium text-foreground underline decoration-warm-amber/45 underline-offset-4 transition hover:text-warm-amber hover:decoration-warm-amber ${className}`.trim()

  if (href.startsWith("#")) {
    return (
      <a href={href} className={baseClassName} {...props}>
        {children}
      </a>
    )
  }

  if (isInternal) {
    return (
      <Link href={href} className={`${baseClassName} inline-flex items-center gap-1`}>
        <span>{children}</span>
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClassName} inline-flex items-center gap-1`} {...props}>
      <span>{children}</span>
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  )
}

export interface StatGridItem {
  label: string
  value: string
  detail?: string
  evidenceType?: "source" | "benchmark-assumption"
}

export function StatGrid({ items }: { items: StatGridItem[] }) {
  return (
    <section className="rounded-[1.75rem] border border-border/70 bg-card/90 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.04)] md:p-8">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={`${item.label}-${item.value}`} className="rounded-2xl border border-border/70 bg-background/75 p-4">
            <div className="text-3xl font-bold text-foreground">{item.value}</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{item.label}</div>
            {item.detail ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p> : null}
            {item.evidenceType ? (
              <div className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] ${
                item.evidenceType === "source"
                  ? "bg-warm-sage/15 text-warm-sage"
                  : "bg-warm-amber/15 text-warm-amber"
              }`}>
                {item.evidenceType === "source" ? "Source-backed" : "Benchmark assumption"}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

export function CalloutBlock({
  title,
  children,
  tone = "note",
}: {
  title?: string
  children: ReactNode
  tone?: "note" | "warning" | "decision"
}) {
  const toneClass = {
    note: "border-warm-amber/30 bg-warm-amber/10",
    warning: "border-destructive/30 bg-destructive/8",
    decision: "border-warm-sage/35 bg-warm-sage/10",
  }[tone]

  return (
    <aside className={`my-8 rounded-3xl border px-5 py-5 ${toneClass}`}>
      {title ? <div className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">{title}</div> : null}
      <div className="mt-3 space-y-3 text-[15px] leading-7 text-muted-foreground">{children}</div>
    </aside>
  )
}

export function EquationPanel({
  title,
  equation,
  description,
  interpretation,
}: {
  title: string
  equation: string
  description?: string
  interpretation?: string
}) {
  return (
    <section className="my-10 rounded-[1.75rem] border border-border/70 bg-card/90 p-6 md:p-8">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Sigma className="h-4 w-4 text-warm-amber" />
        {title}
      </div>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border/70 bg-background/80 px-5 py-6 text-center text-2xl font-semibold text-foreground md:text-4xl">
        {equation}
      </div>
      {description ? <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p> : null}
      {interpretation ? <p className="mt-3 text-sm font-medium leading-7 text-foreground">{interpretation}</p> : null}
    </section>
  )
}

export function BenchmarkTable({
  columns,
  rows,
  caption,
}: {
  columns: string[]
  rows: Array<Array<ReactNode>>
  caption?: string
}) {
  return (
    <section className="my-10 rounded-[1.75rem] border border-border/70 bg-card/90 p-4 md:p-6">
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Table2 className="h-4 w-4 text-warm-amber" />
        {caption ?? "Benchmark Table"}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border/70">
        <table className="min-w-180 w-full border-collapse text-left text-sm">
          <thead className="bg-muted/75 text-foreground">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="border-t border-border/70 bg-background/75 even:bg-muted/20">
                {row.map((cell, cellIndex) => (
                  <td key={`row-${rowIndex}-cell-${cellIndex}`} className="px-4 py-3 align-top leading-7 text-muted-foreground">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function ComparisonMatrix(props: { columns: string[]; rows: Array<Array<ReactNode>>; caption?: string }) {
  return <BenchmarkTable {...props} />
}

export function PipelineStepper({
  steps,
}: {
  steps: Array<{ title: string; detail: string }>
}) {
  return (
    <section className="my-10 rounded-[1.75rem] border border-border/70 bg-card/90 p-6 md:p-8">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Waypoints className="h-4 w-4 text-warm-amber" />
        Pipeline
      </div>
      <div className="mt-6 grid gap-4">
        {steps.map((step, index) => (
          <div key={step.title} className="grid gap-3 rounded-2xl border border-border/70 bg-background/75 p-4 md:grid-cols-[48px_minmax(0,1fr)] md:items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-amber/10 text-sm font-bold text-warm-amber">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="text-base font-semibold text-foreground">{step.title}</div>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function EvidenceList({
  items,
}: {
  items: Array<{ label: string; href: string; note?: string }>
}) {
  return (
    <section className="my-10 rounded-[1.75rem] border border-border/70 bg-card/90 p-6 md:p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Evidence Sources</div>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border/70 bg-background/75 p-4 transition hover:border-warm-amber/35"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-foreground">{item.label}</div>
                {item.note ? <div className="mt-1 text-sm text-muted-foreground">{item.note}</div> : null}
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export function KeyTakeaways({ title = "Key Takeaways", items }: { title?: string; items: string[] }) {
  return (
    <section className="my-10 rounded-[1.75rem] border border-border/70 bg-card/90 p-6 md:p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-border/70 bg-background/75 px-4 py-3 text-sm leading-7 text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function DeepDiveSection({
  title,
  summary,
  takeaway,
  children,
}: {
  title: string
  summary?: string
  takeaway?: string
  children: ReactNode
}) {
  return (
    <section className="my-12 rounded-[1.75rem] border border-border/70 bg-card/90 p-6 md:p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Deep Dive</div>
      <h3 className="mt-3 text-2xl font-bold text-foreground">{title}</h3>
      {summary ? <p className="mt-3 text-sm leading-7 text-muted-foreground">{summary}</p> : null}
      <div className="mt-5 space-y-5 text-[15px] leading-8 text-muted-foreground">{children}</div>
      {takeaway ? (
        <div className="mt-6 rounded-2xl border border-warm-amber/25 bg-warm-amber/10 px-4 py-3 text-sm font-medium leading-7 text-foreground">
          {takeaway}
        </div>
      ) : null}
    </section>
  )
}

export function RelatedResourceList({
  items,
}: {
  items: Array<{ title: string; href: string; description?: string }>
}) {
  return (
    <section className="my-10 rounded-[1.75rem] border border-border/70 bg-card/90 p-6 md:p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Related Resources</div>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <SmartLink key={item.href} href={item.href} className="rounded-2xl border border-border/70 bg-background/75 px-4 py-4 no-underline">
            <span className="block text-sm font-semibold text-foreground">{item.title}</span>
            {item.description ? <span className="mt-1 block text-sm leading-6 text-muted-foreground">{item.description}</span> : null}
          </SmartLink>
        ))}
      </div>
    </section>
  )
}

export function getMdxArticleComponents(locale: BlogLocale) {
  const paragraphClass = `text-[16px] leading-8 text-muted-foreground ${locale === "th" ? "subtitle-th" : ""}`

  return {
    CalloutBlock,
    StatGrid,
    ComparisonMatrix,
    EquationPanel,
    PipelineStepper,
    EvidenceList,
    BenchmarkTable,
    KeyTakeaways,
    DeepDiveSection,
    RelatedResourceList,
    h1: ({ children }: { children: ReactNode }) => (
      <MdxHeading as="h2" className="mt-14 text-3xl font-bold text-foreground scroll-mt-(--article-anchor-offset) md:text-[2rem]" >
        {children}
      </MdxHeading>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <MdxHeading as="h2" className="mt-14 text-3xl font-bold text-foreground scroll-mt-(--article-anchor-offset) md:text-[2rem]" >
        {children}
      </MdxHeading>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <MdxHeading as="h3" className="mt-10 text-2xl font-semibold text-foreground scroll-mt-(--article-anchor-offset) md:text-[1.65rem]" >
        {children}
      </MdxHeading>
    ),
    h4: ({ children }: { children: ReactNode }) => (
      <MdxHeading as="h4" className="mt-8 text-xl font-semibold text-foreground scroll-mt-(--article-anchor-offset)" >
        {children}
      </MdxHeading>
    ),
    p: ({ children }: { children: ReactNode }) => <p className={paragraphClass}>{children}</p>,
    hr: () => <div className="my-12 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" aria-hidden="true" />,
    ul: ({ children }: { children: ReactNode }) => <ul className="my-6 list-disc space-y-3 pl-6 marker:text-warm-amber">{children}</ul>,
    ol: ({ children }: { children: ReactNode }) => <ol className="my-6 list-decimal space-y-3 pl-6 marker:text-warm-amber">{children}</ol>,
    li: ({ children }: { children: ReactNode }) => (
      <li className="pl-1 text-[16px] leading-8 text-muted-foreground">
        {children}
      </li>
    ),
    blockquote: ({ children }: { children: ReactNode }) => (
      <blockquote className="my-8 rounded-3xl border border-warm-amber/25 bg-warm-amber/8 px-5 py-5 text-[15px] leading-7 text-foreground">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <Quote className="h-4 w-4 text-warm-amber" />
          Enterprise implication
        </div>
        <div className="space-y-3">{children}</div>
      </blockquote>
    ),
    pre: ({ children }: { children: ReactNode }) => (
      <pre className="my-8 overflow-x-auto rounded-3xl border border-border/70 bg-[#111111] p-5 text-sm leading-7 text-warm-light-gray shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        {children}
      </pre>
    ),
    code: ({ className, children, ...props }: ComponentPropsWithoutRef<"code">) => {
      if (className) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }

      return (
        <code className="rounded-md bg-muted px-1.5 py-0.5 text-[0.92em] font-medium text-foreground" {...props}>
          {children}
        </code>
      )
    },
    strong: ({ children }: { children: ReactNode }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }: { children: ReactNode }) => <em className="text-foreground/90">{children}</em>,
    a: SmartLink,
    table: ({ children }: { children: ReactNode }) => (
      <div className="my-8 overflow-x-auto rounded-3xl border border-border/70 bg-card/90">
        <table className="min-w-180 w-full border-collapse text-left text-sm [&_tbody_tr:nth-child(even)]:bg-muted/20 [&_tbody_tr]:border-t [&_tbody_tr]:border-border/70 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:leading-7 [&_td]:text-muted-foreground [&_th]:sticky [&_th]:top-0 [&_th]:bg-muted/80 [&_th]:px-4 [&_th]:py-3 [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.16em] [&_th]:text-muted-foreground">
          {children}
        </table>
      </div>
    ),
  }
}