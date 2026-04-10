"use client"

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react"
import { useEffect, useMemo, useState } from "react"

type SpotlightHandlers<T extends HTMLElement> = {
  onPointerMove: (event: ReactPointerEvent<T>) => void
  onPointerLeave: (event: ReactPointerEvent<T>) => void
  onFocus: (event: React.FocusEvent<T>) => void
  onBlur: (event: React.FocusEvent<T>) => void
  style: CSSProperties
}

function setSpotlightState(target: HTMLElement, x: string, y: string, opacity: string) {
  target.style.setProperty("--card-pointer-x", x)
  target.style.setProperty("--card-pointer-y", y)
  target.style.setProperty("--card-spotlight-opacity", opacity)
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updatePreference()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference)
      return () => mediaQuery.removeEventListener("change", updatePreference)
    }

    mediaQuery.addListener(updatePreference)
    return () => mediaQuery.removeListener(updatePreference)
  }, [])

  return prefersReducedMotion
}

export function useCardSpotlight<T extends HTMLElement>(): SpotlightHandlers<T> {
  const reducedMotion = usePrefersReducedMotion()

  return useMemo(
    () => ({
      onPointerMove: (event: ReactPointerEvent<T>) => {
        if (reducedMotion || event.pointerType === "touch") {
          return
        }

        const bounds = event.currentTarget.getBoundingClientRect()
        const x = `${(((event.clientX - bounds.left) / bounds.width) * 100).toFixed(2)}%`
        const y = `${(((event.clientY - bounds.top) / bounds.height) * 100).toFixed(2)}%`
        setSpotlightState(event.currentTarget, x, y, "0.12")
      },
      onPointerLeave: (event: ReactPointerEvent<T>) => {
        setSpotlightState(event.currentTarget, "74%", "18%", "0")
      },
      onFocus: (event) => {
        setSpotlightState(event.currentTarget, "50%", "28%", "0.1")
      },
      onBlur: (event) => {
        setSpotlightState(event.currentTarget, "74%", "18%", "0")
      },
      style: {
        ["--card-pointer-x" as string]: "74%",
        ["--card-pointer-y" as string]: "18%",
        ["--card-spotlight-opacity" as string]: 0,
      },
    }),
    [reducedMotion],
  )
}