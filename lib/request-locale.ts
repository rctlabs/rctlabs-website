import { headers } from "next/headers"
import type { Locale } from "@/lib/seo-bilingual"

export async function getRequestLocale(): Promise<Locale> {
  return (await headers()).get("x-locale") === "th" ? "th" : "en"
}