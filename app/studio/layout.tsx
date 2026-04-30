import type React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/auth/server-client"

// Studio pages require authentication and live Supabase connection.
// Force dynamic rendering — never attempt to SSG/prerender studio routes.
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  // Server-side auth guard — runs before any studio page renders on the server.
  // Prevents SSR leak: unauthenticated requests are redirected before HTML is produced.
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin?next=/studio")
  }

  return children
}
