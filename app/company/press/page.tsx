import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function CompanyPressRedirect() {
  const locale = (await headers()).get("x-locale") === "th" ? "th" : "en"
  redirect(`/${locale}/press`)
}
