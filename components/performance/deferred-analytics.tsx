"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

type DeferredAnalyticsProps = {
  ga4Id?: string
  gtmId?: string
}

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
  cancelIdleCallback?: (id: number) => void
}

export function DeferredAnalytics({ ga4Id, gtmId }: DeferredAnalyticsProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (enabled) return

    const idleWindow = window as IdleWindow
    let idleId: number | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const activate = () => {
      setEnabled(true)
      if (idleId !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId)
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      window.removeEventListener("pointerdown", activate)
      window.removeEventListener("keydown", activate)
      window.removeEventListener("touchstart", activate)
    }

    window.addEventListener("pointerdown", activate, { once: true, passive: true })
    window.addEventListener("keydown", activate, { once: true })
    window.addEventListener("touchstart", activate, { once: true, passive: true })
    // scroll: catches users who jump straight to scrolling without clicking
    window.addEventListener("scroll", activate, { once: true, passive: true })

    if (idleWindow.requestIdleCallback) {
      // timeout raised from 3500 → 6000 ms: ensures analytics does not load
      // during the LCP / TTI measurement window on throttled mobile Lighthouse runs,
      // improving the unused-JS score without sacrificing real-user analytics timing.
      idleId = idleWindow.requestIdleCallback(activate, { timeout: 6000 })
    } else {
      // fallback raised from 2600 → 5000 ms for same reason
      timeoutId = setTimeout(activate, 5000)
    }

    return () => {
      if (idleId !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId)
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      window.removeEventListener("pointerdown", activate)
      window.removeEventListener("keydown", activate)
      window.removeEventListener("touchstart", activate)
      window.removeEventListener("scroll", activate)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* Load GA4 directly ONLY when no GTM is configured.
          When GTM is present, the GTM container already injects its own GA4 tag
          (visible as gtag/js?id=...&gtm=<containerHash> in network requests).
          Loading GA4 directly on top of GTM causes two separate gtag/js downloads
          (~145 KB total, ~61 KB unused) and duplicate pageview events.
          strategy="lazyOnload" defers execution until after the page load event
          and the browser is idle, layering on top of our own idle-gate above. */}
      {ga4Id && !gtmId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="lazyOnload" />
          <Script id="ga4-init-deferred" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}',{page_path:window.location.pathname,send_page_view:true});`}
          </Script>
        </>
      ) : null}

      {gtmId ? (
        <Script id="gtm-head-deferred" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f)})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}
    </>
  )
}
