export function getServerApiBaseUrl(): string {
  return process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
}

export function getPublicApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
}

/**
 * Returns the assistant API path prefix.
 *
 * Two deployment architectures are supported via ASSISTANT_BASE_PATH env var:
 *
 * A) Direct to rctlabs_api_L3 (Render / Railway / local):
 *    API_BASE_URL = https://your-api.onrender.com
 *    ASSISTANT_BASE_PATH = /rctlabs/assistant   ← DEFAULT (no env var needed)
 *
 * B) Via Hono Gateway (production VPS):
 *    API_BASE_URL = https://gateway.rctlabs.co
 *    ASSISTANT_BASE_PATH = /api/v1/kernel/assistant  ← set in Vercel env vars
 */
export function getAssistantBasePath(): string {
  return process.env.ASSISTANT_BASE_PATH || "/rctlabs/assistant"
}
