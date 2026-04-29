"use client"

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { getSupabaseBrowserClient } from "@/lib/auth/browser-client"

function getSafeNextPath(raw: string | null): string {
  if (!raw || !raw.startsWith("/")) return "/"
  return raw
}

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [nextPath, setNextPath] = useState("/")
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setNextPath(getSafeNextPath(params.get("next")))
    if (params.get("error") === "callback_failed") {
      setError("Sign-in link expired or already used. Please request a new one.")
    }
  }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setError(null)

    if (!email.trim()) {
      setError("Please enter your email address.")
      return
    }

    setSubmitting(true)

    try {
      const supabase = getSupabaseBrowserClient()
      const callbackUrl = new URL("/auth/callback", window.location.origin)
      callbackUrl.searchParams.set("next", nextPath)

      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: callbackUrl.toString(),
        },
      })

      if (signInError) {
        throw signInError
      }

      setMessage("Check your email for the sign-in link.")
    } catch (submitError) {
      const fallback = "Unable to send sign-in link. Please try again."
      setError(submitError instanceof Error ? submitError.message : fallback)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-warm-cream px-4 py-20 text-warm-charcoal dark:bg-dark-deep dark:text-white">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-border/60 bg-background/90 p-8 shadow-sm backdrop-blur-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in to RCT Labs</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use your email to receive a secure magic link.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-warm-amber"
              placeholder="you@company.com"
              required
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-xl bg-warm-amber px-4 py-2.5 text-sm font-semibold text-warm-charcoal transition hover:bg-warm-amber/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending link..." : "Send sign-in link"}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-emerald-700 dark:text-emerald-400">{message}</p> : null}
        {error ? <p className="mt-4 text-sm text-red-700 dark:text-red-400">{error}</p> : null}

        <p className="mt-6 text-xs text-muted-foreground">
          By continuing, you agree to the <Link className="underline" href="/terms">Terms</Link> and <Link className="underline" href="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  )
}
