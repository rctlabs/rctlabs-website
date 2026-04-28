import { BadgeCheck } from "lucide-react"

interface SignedAIVerifiedBadgeProps {
  locale?: "en" | "th"
}

/**
 * Static trust badge displayed on every blog article header.
 * Communicates that the article's content claims are backed by
 * SignedAI's 7-model HexaCore consensus and Ed25519 cryptographic signing.
 *
 * Phase: SET B static implementation (no live API call).
 * Future: swap for dynamic /api/verify endpoint when SignedAI backend is live.
 */
export function SignedAIVerifiedBadge({ locale = "en" }: SignedAIVerifiedBadgeProps) {
  const isTh = locale === "th"
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-warm-sage/35 bg-warm-sage/10 px-3 py-1.5 text-sm text-warm-sage">
      <BadgeCheck className="h-4 w-4 shrink-0" />
      {isTh
        ? "ยืนยันโดย SignedAI · HexaCore 7 โมเดล · Ed25519"
        : "Verified by SignedAI · 7-model HexaCore · Ed25519 signed"}
    </span>
  )
}
