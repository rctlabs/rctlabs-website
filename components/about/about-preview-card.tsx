import Image from "next/image"

type AboutPreviewCardProps = {
  eyebrow: string
  title: string
  description: string
  footer: string
  iconSrc: string
  color: string
  bg: string
  iconPlacement?: "corner" | "inline" | "none"
}

export function AboutPreviewCard({ eyebrow, title, description, footer, iconSrc, color, bg, iconPlacement = "corner" }: AboutPreviewCardProps) {
  const showCornerIcon = iconPlacement === "corner"
  const showInlineIcon = iconPlacement === "inline"

  const iconBadge = (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: bg, borderColor: `${color}40` }}>
      <Image src={iconSrc} alt="" width={28} height={28} className="object-contain" style={{ imageRendering: "pixelated" }} />
    </div>
  )

  return (
    <div className="h-full">
      <div
        className="main-page-reactive-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e6ddd0] bg-white p-5 transition-[transform,border-color,box-shadow,background-color] duration-300 hover:border-warm-amber/40 hover:shadow-[0_14px_32px_rgba(84,61,31,0.07)] sm:p-6 dark:border-border dark:bg-card"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.14),transparent_40%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent_28%,rgba(212,168,83,0.02)_100%)]" />
        </div>

        {showCornerIcon ? <div className="absolute right-4 top-4 z-10 sm:right-5 sm:top-5">{iconBadge}</div> : null}

        <div className={`relative z-10 flex flex-1 flex-col ${showCornerIcon ? "pr-16 sm:pr-18" : ""}`}>
          {showInlineIcon ? (
            <div className="mb-4 flex items-start gap-4">
              {iconBadge}
              <div className="min-w-0 flex-1">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</span>
                <h3 className="text-base font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-warm-amber sm:text-lg">{title}</h3>
              </div>
            </div>
          ) : (
            <>
              <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</span>
              <h3 className="mb-3 text-base font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-warm-amber sm:text-lg">{title}</h3>
            </>
          )}
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{description}</p>
          <div className="mt-auto flex items-center gap-1 text-xs font-semibold transition-all duration-200 sm:opacity-80 sm:group-hover:translate-x-1 sm:group-hover:opacity-100" style={{ color }}>
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}