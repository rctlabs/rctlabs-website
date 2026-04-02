"use client"

import { useEffect, useState } from "react"

type IdleHandle = number

type IdleCallbackWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => IdleHandle
  cancelIdleCallback?: (handle: IdleHandle) => void
}

interface UseIdleActivationOptions {
  enabled?: boolean
  timeoutMs?: number
}

export function useIdleActivation({ enabled = true, timeoutMs = 1200 }: UseIdleActivationOptions = {}) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!enabled || isActive || typeof window === "undefined") {
      return
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let idleId: IdleHandle | null = null
    const idleWindow = window as IdleCallbackWindow

    const activate = () => {
      setIsActive(true)

      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }

      if (idleId !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId)
      }
    }

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(activate, { timeout: timeoutMs })
    } else {
      timeoutId = setTimeout(activate, timeoutMs)
    }

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }

      if (idleId !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId)
      }
    }
  }, [enabled, isActive, timeoutMs])

  return isActive
}