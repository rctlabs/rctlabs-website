// Statistics display component

interface Stat {
  number: string
  label: string
  icon?: string
}

interface StatsProps {
  stats: Stat[]
  title?: string
}

export function StatsSection({ stats, title }: StatsProps) {
  return (
    <section className="w-full py-12 md:py-16 bg-background border-t border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        {title && <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {stat.icon && <div className="text-4xl mb-4">{stat.icon}</div>}
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
