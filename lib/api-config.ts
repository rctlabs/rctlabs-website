export function getServerApiBaseUrl(): string {
  return process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
}

export function getPublicApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
}

/**
 * Returns the assistant API path prefix.
 * Gateway serves all assistant routes under /api/v1/kernel/assistant.
 * Set API_BASE_URL = https://gateway.rctlabs.co (no trailing slash).
 * Locally this resolves to http://localhost:8000 which can run the gateway directly.
 */
export function getAssistantBasePath(): string {
  // Allow override via env for custom deployments
  return process.env.ASSISTANT_BASE_PATH || "/api/v1/kernel/assistant"
}
