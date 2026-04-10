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

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(activate, { timeout: 3500 })
    } else {
      timeoutId = setTimeout(activate, 2600)
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
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {ga4Id ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4-init-deferred" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}',{page_path:window.location.pathname,send_page_view:true});`}
          </Script>
        </>
      ) : null}

      {gtmId ? (
        <Script id="gtm-head-deferred" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f)})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}
    </>
  )
}
