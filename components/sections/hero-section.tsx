// Reusable hero section component for consistency across pages

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  cta?: {
    label: string
    href: string
  }
  image?: string
  fullHeight?: boolean
}

export function HeroSection({ title, subtitle, description, cta, fullHeight = false }: HeroSectionProps) {
  return (
    <section
      className={`relative w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 ${fullHeight ? "min-h-screen" : "py-20 md:py-32"}`}
    >
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center">
        {subtitle && <p className="text-primary font-semibold mb-4">{subtitle}</p>}
        <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">{title}</h1>
        {description && <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">{description}</p>}
        {cta && (
          <a
            href={cta.href}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {cta.label}
          </a>
        )}
      </div>
    </section>
  )
}
