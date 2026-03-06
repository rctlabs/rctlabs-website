// Call-to-action section component

interface CTASectionProps {
  title: string
  description?: string
  primaryButton: {
    label: string
    href: string
  }
  secondaryButton?: {
    label: string
    href: string
  }
  background?: "light" | "dark" | "gradient"
}

export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  background = "light",
}: CTASectionProps) {
  const bgClass = {
    light: "bg-slate-50 dark:bg-slate-900",
    dark: "bg-slate-900 text-white",
    gradient: "bg-gradient-to-r from-primary to-accent",
  }

  return (
    <section className={`w-full py-16 md:py-24 ${bgClass[background]}`}>
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        {description && <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{description}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={primaryButton.href}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {primaryButton.label}
          </a>
          {secondaryButton && (
            <a
              href={secondaryButton.href}
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              {secondaryButton.label}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
