export function getServerApiBaseUrl(): string {
  return process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
}

export function getPublicApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
}
