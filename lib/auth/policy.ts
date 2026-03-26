export type AuthRole = "public" | "member" | "admin" | "owner"

export const INTERNAL_ROUTE_PREFIXES = ["/admin", "/owner", "/monitor", "/analytics", "/test-console", "/websocket"] as const

export const PROTECTED_ROUTE_GROUPS: Array<{
  prefix: string
  requiredRole: Exclude<AuthRole, "public">
  fallbackHref: string
}> = [
  { prefix: "/admin", requiredRole: "admin", fallbackHref: "/not-found" },
  { prefix: "/owner", requiredRole: "owner", fallbackHref: "/not-found" },
  { prefix: "/monitor", requiredRole: "admin", fallbackHref: "/not-found" },
  { prefix: "/analytics", requiredRole: "admin", fallbackHref: "/not-found" },
  { prefix: "/test-console", requiredRole: "member", fallbackHref: "/not-found" },
  { prefix: "/websocket", requiredRole: "member", fallbackHref: "/not-found" },
]

export function stripLocalePrefix(pathname: string) {
  return pathname.replace(/^\/(en|th)(?=\/|$)/, "") || "/"
}

export function isProtectedInternalPath(pathname: string) {
  const stripped = stripLocalePrefix(pathname)
  return PROTECTED_ROUTE_GROUPS.find((group) => stripped === group.prefix || stripped.startsWith(`${group.prefix}/`))
}
