export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="max-w-3xl space-y-6 animate-pulse">
          <div className="h-7 w-40 rounded-full bg-muted" />
          <div className="space-y-3">
            <div className="h-12 w-3/4 rounded-lg bg-muted" />
            <div className="h-12 w-1/2 rounded-lg bg-muted" />
          </div>
          <div className="space-y-2">
            <div className="h-5 w-full rounded bg-muted" />
            <div className="h-5 w-5/6 rounded bg-muted" />
          </div>
          <div className="flex gap-6 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-5 w-28 rounded bg-muted" />
            ))}
          </div>
        </div>
      </section>

      {/* Filter bar skeleton */}
      <div className="border-y border-border px-4 py-3">
        <div className="mx-auto flex max-w-7xl gap-2 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-7 w-20 rounded-full bg-muted" />
          ))}
          <div className="ml-auto h-7 w-48 rounded-lg bg-muted" />
        </div>
      </div>

      {/* Cards skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-6 animate-pulse lg:grid-cols-5">
          {/* Featured card skeleton */}
          <div className="h-80 rounded-2xl border border-border bg-card p-8 lg:col-span-3" />
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="flex-1 rounded-xl border border-border bg-card p-6" />
            <div className="flex-1 rounded-xl border border-border bg-card p-6" />
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 animate-pulse sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-56 rounded-xl border border-border bg-card" />
          ))}
        </div>
      </section>
    </main>
  )
}
