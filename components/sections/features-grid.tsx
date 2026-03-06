// Reusable features grid component

interface Feature {
  id: string
  icon?: string
  title: string
  description: string
  href?: string
}

interface FeaturesGridProps {
  title?: string
  features: Feature[]
  columns?: 2 | 3 | 4
}

export function FeaturesGrid({ title, features, columns = 3 }: FeaturesGridProps) {
  const gridClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {title && <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{title}</h2>}
        <div className={`grid ${gridClass[columns]} gap-6`}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
            >
              {feature.icon && <div className="text-2xl mb-4">{feature.icon}</div>}
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              {feature.href && (
                <a href={feature.href} className="text-primary hover:underline font-semibold">
                  Learn more →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
