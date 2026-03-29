"use client"

import { useCallback } from "react"
import { track } from "@vercel/analytics"

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>

function report(eventName: string, payload: AnalyticsPayload) {
  try {
    const sanitizedPayload = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined)
    ) as Record<string, string | number | boolean | null>

    track(eventName, sanitizedPayload)
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.info("[nav-analytics]", eventName, payload)
    }
  }
}

export function useNavAnalytics() {
  const trackGroupOpen = useCallback((groupId: string, trigger: "hover" | "click" | "focus") => {
    report("nav_group_open", { groupId, trigger })
  }, [])

  const trackLeafClick = useCallback((label: string, href: string, groupId: string) => {
    report("nav_leaf_click", { label, href, groupId })
  }, [])

  const trackResourceTrack = useCallback((trackId: string, trigger: "hover" | "click" | "focus") => {
    report("nav_resource_track_select", { trackId, trigger })
  }, [])

  const trackUtility = useCallback((action: string, surface: "desktop" | "mobile") => {
    report("nav_utility_action", { action, surface })
  }, [])

  return {
    trackGroupOpen,
    trackLeafClick,
    trackResourceTrack,
    trackUtility,
  }
}