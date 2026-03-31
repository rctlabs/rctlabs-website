"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion"

type MainPageSectionId = "hero" | "overview" | "core-pillars" | "fdia" | "evidence" | "cta"

interface PointerIntent {
  x: number
  y: number
}

interface MainPageOrchestrationValue {
  activeSection: MainPageSectionId
  activeSectionIndex: number
  pageProgress: number
  pointerIntent: PointerIntent
  reducedMotion: boolean
  isTouchInput: boolean
  scrollVelocity: number
  debugEnabled: boolean
}

const SECTION_ORDER: MainPageSectionId[] = ["hero", "overview", "core-pillars", "fdia", "evidence", "cta"]

const MainPageOrchestrationContext = createContext<MainPageOrchestrationValue | null>(null)

export function useMainPageOrchestration() {
  return useContext(MainPageOrchestrationContext)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function MainPageFieldOverlay() {
  const orchestration = useMainPageOrchestration()

  if (!orchestration) {
    return null
  }

  const {
    activeSection,
    activeSectionIndex,
    pageProgress,
    pointerIntent,
    reducedMotion,
    isTouchInput,
    scrollVelocity,
  } = orchestration

  const sectionProgress = activeSectionIndex / Math.max(SECTION_ORDER.length - 1, 1)
  const pointerShiftX = !reducedMotion && !isTouchInput ? pointerIntent.x * 14 : 0
  const pointerShiftY = !reducedMotion && !isTouchInput ? pointerIntent.y * 10 : 0
  const heroBoost = activeSection === "hero" ? 0.12 : 0
  const fdiaBoost = activeSection === "fdia" ? 0.08 : 0
  const settleBoost = activeSection === "cta" ? 0.16 : 0
  const motionSettling = clamp(1 - scrollVelocity * 1.35, 0.42, 1)
  const amberX = !reducedMotion ? -28 + pointerIntent.x * 18 : -20
  const amberY = !reducedMotion ? -14 + pageProgress * 22 + pointerIntent.y * 10 : -8
  const sageX = !reducedMotion ? 16 - pointerIntent.x * 16 : 12
  const sageY = !reducedMotion ? 18 + sectionProgress * 16 - pointerIntent.y * 8 : 20
  const terraX = !reducedMotion ? -8 + pointerIntent.x * 10 : -4
  const terraY = !reducedMotion ? 52 + pageProgress * 16 : 56

  return (
    <motion.div
      aria-hidden="true"
      className="main-page-orchestrated-field"
      animate={{
        x: pointerShiftX * motionSettling,
        y: pointerShiftY * motionSettling,
        scale: 1 + (1 - motionSettling) * 0.012,
      }}
      transition={{ type: "spring", stiffness: 42, damping: 24, mass: 1.05 }}
    >
      <motion.div
        className="main-page-orchestrated-field__veil"
        animate={{ opacity: clamp(0.2 + pageProgress * 0.08 + settleBoost * 0.2, 0.18, 0.34) }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.div
        className="main-page-orchestrated-field__spotlight main-page-orchestrated-field__spotlight--amber"
        animate={{ x: `${amberX}%`, y: `${amberY}%`, scale: 1 + heroBoost * 0.16 + (1 - motionSettling) * 0.03 }}
        transition={{ type: "spring", stiffness: 28, damping: 22, mass: 1.2 }}
      />
      <motion.div
        className="main-page-orchestrated-field__spotlight main-page-orchestrated-field__spotlight--sage"
        animate={{ x: `${sageX}%`, y: `${sageY}%`, scale: 1 + fdiaBoost * 0.18 + (1 - motionSettling) * 0.02 }}
        transition={{ type: "spring", stiffness: 26, damping: 24, mass: 1.25 }}
      />
      <motion.div
        className="main-page-orchestrated-field__spotlight main-page-orchestrated-field__spotlight--terra"
        animate={{ x: `${terraX}%`, y: `${terraY}%`, scale: 1 + settleBoost * 0.22 + pageProgress * 0.03 }}
        transition={{ type: "spring", stiffness: 24, damping: 24, mass: 1.3 }}
      />
      <div
        className="main-page-orchestrated-field__wash"
        style={{ opacity: clamp(0.44 + pageProgress * 0.14 + heroBoost - scrollVelocity * 0.06, 0.34, 0.78) }}
      />
      <div
        className="main-page-orchestrated-field__grid"
        style={{ opacity: clamp(0.032 + pageProgress * 0.016 + sectionProgress * 0.024 + heroBoost * 0.32, 0.024, 0.12) }}
      />

      <div
        className="main-page-orchestrated-field__rail main-page-orchestrated-field__rail--top"
        style={{ opacity: clamp(0.16 + heroBoost * 0.72 - scrollVelocity * 0.03, 0.12, 0.32) }}
      >
        <div className="main-page-orchestrated-field__beam" />
      </div>
      <div
        className="main-page-orchestrated-field__rail main-page-orchestrated-field__rail--middle"
        style={{ opacity: clamp(0.14 + sectionProgress * 0.12 + fdiaBoost * 0.55, 0.12, 0.34) }}
      >
        <div className="main-page-orchestrated-field__beam" />
      </div>
      <div
        className="main-page-orchestrated-field__rail main-page-orchestrated-field__rail--bottom"
        style={{ opacity: clamp(0.13 + settleBoost * 0.6 + pageProgress * 0.06, 0.11, 0.3) }}
      >
        <div className="main-page-orchestrated-field__beam" />
      </div>

      <div className="main-page-orchestrated-field__guide main-page-orchestrated-field__guide--vertical" />
      <div className="main-page-orchestrated-field__guide main-page-orchestrated-field__guide--horizontal" />

      <div
        className="main-page-orchestrated-field__node main-page-orchestrated-field__node--one"
        style={{ opacity: clamp(0.18 + heroBoost * 0.58, 0.16, 0.28) }}
      />
      <div
        className="main-page-orchestrated-field__node main-page-orchestrated-field__node--two"
        style={{ opacity: clamp(0.16 + sectionProgress * 0.1 + fdiaBoost * 0.18, 0.14, 0.28) }}
      />
      <div
        className="main-page-orchestrated-field__node main-page-orchestrated-field__node--three"
        style={{ opacity: clamp(0.14 + settleBoost * 0.42 + pageProgress * 0.04, 0.12, 0.28) }}
      />

      <div
        className="main-page-orchestrated-field__settle"
        style={{ opacity: clamp(Math.max(0, pageProgress - 0.52) * 1.25, 0, 0.3) }}
      />
    </motion.div>
  )
}

function MainPageMotionDebug() {
  const orchestration = useMainPageOrchestration()

  if (!orchestration?.debugEnabled) {
    return null
  }

  const {
    activeSection,
    activeSectionIndex,
    pageProgress,
    pointerIntent,
    scrollVelocity,
    reducedMotion,
    isTouchInput,
  } = orchestration

  return (
    <div className="main-page-debug-overlay">
      <div>section: {activeSection}</div>
      <div>index: {activeSectionIndex}</div>
      <div>page: {(pageProgress * 100).toFixed(1)}%</div>
      <div>velocity: {scrollVelocity.toFixed(2)}</div>
      <div>pointer: {pointerIntent.x.toFixed(2)}, {pointerIntent.y.toFixed(2)}</div>
      <div>reduced: {String(reducedMotion)}</div>
      <div>touch: {String(isTouchInput)}</div>
    </div>
  )
}

export function MainPageOrchestrator({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const pointerFrameRef = useRef<number | null>(null)
  const latestPointerRef = useRef<PointerIntent>({ x: 0, y: 0 })
  const activeFrameRef = useRef<number | null>(null)
  const lastScrollSampleRef = useRef({ value: 0, time: 0 })
  const reducedMotion = useReducedMotion() ?? false
  const { scrollY, scrollYProgress } = useScroll()

  const [pageProgress, setPageProgress] = useState(0)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [pointerIntent, setPointerIntent] = useState<PointerIntent>({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState<MainPageSectionId>("hero")
  const [isTouchInput, setIsTouchInput] = useState(() => {
    if (typeof window === "undefined") {
      return false
    }

    return window.matchMedia("(pointer: coarse)").matches
  })
  const [debugEnabled] = useState(() => {
    if (typeof window === "undefined") {
      return false
    }

    return window.location.search.includes("motionDebug=1")
  })

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const coarsePointer = window.matchMedia("(pointer: coarse)")
    const updatePointerMode = () => setIsTouchInput(coarsePointer.matches)

    coarsePointer.addEventListener("change", updatePointerMode)

    return () => coarsePointer.removeEventListener("change", updatePointerMode)
  }, [])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPageProgress(clamp(latest, 0, 1))
  })

  useMotionValueEvent(scrollY, "change", (latest) => {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now()
    const previous = lastScrollSampleRef.current

    if (previous.time > 0) {
      const deltaValue = Math.abs(latest - previous.value)
      const deltaTime = Math.max(now - previous.time, 16)
      setScrollVelocity(clamp(deltaValue / deltaTime / 1.5, 0, 1))
    }

    lastScrollSampleRef.current = { value: latest, time: now }
  })

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion || isTouchInput) {
      const resetFrame = window.requestAnimationFrame(() => {
        setPointerIntent({ x: 0, y: 0 })
      })

      return () => window.cancelAnimationFrame(resetFrame)
    }

    const commitPointer = () => {
      setPointerIntent(latestPointerRef.current)
      pointerFrameRef.current = null
    }

    const handleMouseMove = (event: MouseEvent) => {
      const centeredX = event.clientX / window.innerWidth * 2 - 1
      const centeredY = event.clientY / window.innerHeight * 2 - 1
      latestPointerRef.current = {
        x: clamp(centeredX, -1, 1),
        y: clamp(centeredY, -1, 1),
      }

      if (pointerFrameRef.current === null) {
        pointerFrameRef.current = window.requestAnimationFrame(commitPointer)
      }
    }

    const handleMouseLeave = () => {
      latestPointerRef.current = { x: 0, y: 0 }
      if (pointerFrameRef.current === null) {
        pointerFrameRef.current = window.requestAnimationFrame(commitPointer)
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
      if (pointerFrameRef.current !== null) {
        window.cancelAnimationFrame(pointerFrameRef.current)
      }
    }
  }, [isTouchInput, reducedMotion])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const updateActiveSection = () => {
      const sectionElements = Array.from(
        rootRef.current?.querySelectorAll<HTMLElement>("[data-main-section]") ?? []
      )

      if (sectionElements.length === 0) {
        activeFrameRef.current = null
        return
      }

      const focusLine = window.innerHeight * 0.38
      let nextSection: MainPageSectionId = activeSection
      let smallestDistance = Number.POSITIVE_INFINITY

      for (const sectionElement of sectionElements) {
        const rect = sectionElement.getBoundingClientRect()
        const sectionId = sectionElement.dataset.mainSection as MainPageSectionId | undefined

        if (!sectionId) {
          continue
        }

        const containsFocus = rect.top <= focusLine && rect.bottom >= focusLine
        const distance = containsFocus
          ? 0
          : Math.min(Math.abs(rect.top - focusLine), Math.abs(rect.bottom - focusLine))

        if (distance < smallestDistance) {
          smallestDistance = distance
          nextSection = sectionId
        }
      }

      setActiveSection(nextSection)
      activeFrameRef.current = null
    }

    const scheduleUpdate = () => {
      if (activeFrameRef.current !== null) {
        return
      }

      activeFrameRef.current = window.requestAnimationFrame(updateActiveSection)
    }

    scheduleUpdate()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    return () => {
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      if (activeFrameRef.current !== null) {
        window.cancelAnimationFrame(activeFrameRef.current)
      }
    }
  }, [activeSection])

  const value = useMemo<MainPageOrchestrationValue>(() => {
    const activeSectionIndex = Math.max(SECTION_ORDER.indexOf(activeSection), 0)

    return {
      activeSection,
      activeSectionIndex,
      pageProgress,
      pointerIntent,
      reducedMotion,
      isTouchInput,
      scrollVelocity,
      debugEnabled,
    }
  }, [activeSection, pageProgress, pointerIntent, reducedMotion, isTouchInput, scrollVelocity, debugEnabled])

  return (
    <MainPageOrchestrationContext.Provider value={value}>
      <div
        ref={rootRef}
        className="main-page-shell"
        style={{
          ["--main-pointer-x" as string]: `${((pointerIntent.x + 1) / 2 * 100).toFixed(1)}%`,
          ["--main-pointer-y" as string]: `${((pointerIntent.y + 1) / 2 * 100).toFixed(1)}%`,
          ["--main-page-progress" as string]: pageProgress.toFixed(3),
        }}
      >
        <MainPageFieldOverlay />
        <MainPageMotionDebug />
        {children}
      </div>
    </MainPageOrchestrationContext.Provider>
  )
}