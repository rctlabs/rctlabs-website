export default function AuthLoading() {
  return (
    <div className="min-h-screen bg-warm-cream dark:bg-dark-deep flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-warm-amber border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground">Signing you in…</p>
      </div>
    </div>
  )
}
