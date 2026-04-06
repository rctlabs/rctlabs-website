import { redirect } from "next/navigation"
import { headers } from "next/headers"

// This page handles bare "/" requests that bypass middleware (edge cases only).
// Middleware normally redirects "/" to "/en" or "/th" based on Accept-Language.
// Keeping this as force-dynamic is fine -- it's just a single redirect response.
export const dynamic = "force-dynamic"

export default async function RootPage() {
  const headerList = await headers()
  const locale = headerList.get("x-locale") === "th" ? "th" : "en"
  redirect(`/${locale}`)
}
