"use client"

// Pure CSS compositor-thread animations — no framer-motion JS overhead on main thread.
// Light/dark variants handled via .dark class in globals.css.
// prefers-reduced-motion: disable handled via @media query in globals.css.
export function AboutPageMotionBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="about-orb-1 absolute left-[8%] top-64 h-96 w-96" />
      <div className="about-orb-2 absolute right-[6%] top-112 h-104 w-104" />
      <div className="about-orb-3 absolute left-[34%] top-208 h-80 w-80" />
      <div className="about-line-1 absolute -left-24 top-104 h-px w-160" />
      <div className="about-line-2 absolute -right-28 top-232 h-px w-176" />
    </div>
  )
}
