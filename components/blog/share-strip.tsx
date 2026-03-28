"use client"

import { useState } from "react"
import { Link2, ExternalLink, Check } from "lucide-react"

interface ShareStripProps {
  title: string
  url: string
}

export function ShareStrip({ title, url }: ShareStripProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for environments where clipboard API is unavailable
    }
  }

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  return (
    <div className="flex flex-wrap items-center gap-3 py-6 border-y border-white/8 mb-12">
      <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Share</span>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm text-muted-foreground hover:text-foreground hover:border-warm-amber/30 hover:bg-warm-amber/5 transition-all duration-150"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-400" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            Copy link
          </>
        )}
      </button>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm text-muted-foreground hover:text-foreground hover:border-warm-amber/30 hover:bg-warm-amber/5 transition-all duration-150"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        LinkedIn
      </a>
    </div>
  )
}
