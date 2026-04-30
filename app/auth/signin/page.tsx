"use client"

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react"
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
    <main className="min-h-screen bg-warm-cream px-4 py-20 text-warm-charcoal dark:bg-dark-deep dark:text-white flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-warm-amber/20 border border-warm-amber/30 mb-4">
            <span className="text-warm-amber font-bold text-lg">R</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">RCT Labs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Constitutional AI Operating System
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border/60 bg-background/90 p-8 shadow-sm backdrop-blur-sm">
          {message ? (
            /* Success state */
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-foreground">Check your email</h2>
              <p className="mt-2 text-sm text-muted-foreground">{message}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                Didn&apos;t receive it?{" "}
                <button
                  className="underline hover:text-foreground transition-colors"
                  onClick={() => setMessage(null)}
                >
                  Send again
                </button>
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold tracking-tight">Sign in</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  ลงชื่อเข้าใช้ด้วย Email · Receive a secure magic link
                </p>
              </div>

              <form className="space-y-4" onSubmit={onSubmit}>
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Email</span>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-xl border border-border bg-background pl-10 pr-3 py-2.5 text-sm outline-none ring-0 transition focus:border-warm-amber"
                      placeholder="you@company.com"
                      required
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-warm-amber px-4 py-2.5 text-sm font-semibold text-warm-charcoal transition hover:bg-warm-amber/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending link…
                    </>
                  ) : (
                    <>
                      Send sign-in link
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {error ? (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 dark:border-red-900/50 dark:bg-red-950/30">
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              ) : null}
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to the{" "}
          <Link className="underline hover:text-foreground transition-colors" href="/terms">Terms</Link>{" "}
          and{" "}
          <Link className="underline hover:text-foreground transition-colors" href="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  )
}
