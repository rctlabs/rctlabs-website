import type { Metric } from "web-vitals"

export function reportWebVitals(metric: Metric) {
  // Send Web Vitals data to analytics
  if (typeof window !== "undefined") {
    const body = JSON.stringify(metric)

    // Use navigator.sendBeacon for reliable delivery
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", body)
    } else {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {
        // Silently fail analytics
      })
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log("[Web Vitals]", {
        name: metric.name,
        value: metric.value.toFixed(2),
        rating: metric.rating,
      })
    }
  }
}
