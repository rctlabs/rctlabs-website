"use client"

import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from "react"

interface LazyDiagramWrapperProps {
  importFunc: () => Promise<{ default: ComponentType<any> }>
  componentProps?: Record<string, unknown>
  useIntersectionObserver?: boolean
  rootMargin?: string
  preloadOnHover?: boolean
  fallback?: React.ReactNode
  className?: string
}

function SkeletonDiagram() {
  return <div className="min-h-70 w-full animate-pulse rounded-xl border border-border bg-card/60" />
}

export default function LazyDiagramWrapper({
  importFunc,
  componentProps = {},
  useIntersectionObserver = true,
  rootMargin = "200px",
  preloadOnHover = true,
  fallback,
  className = "",
}: LazyDiagramWrapperProps) {
  const [shouldLoad, setShouldLoad] = useState(!useIntersectionObserver)
  const [isPreloaded, setIsPreloaded] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const LazyComponent = useRef<ComponentType<any> | null>(null)

  useEffect(() => {
    if (!useIntersectionObserver || shouldLoad) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin, threshold: 0.01 }
    )
    if (wrapperRef.current) observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [useIntersectionObserver, shouldLoad, rootMargin])

  const handleMouseEnter = () => {
    if (preloadOnHover && !isPreloaded && !shouldLoad) {
      importFunc().then((module) => {
        LazyComponent.current = module.default
        setIsPreloaded(true)
      })
    }
  }

  if (!LazyComponent.current && shouldLoad) {
    LazyComponent.current = lazy(importFunc)
  }

  const LoadedComponent = LazyComponent.current

  return (
    <div ref={wrapperRef} className={className} onMouseEnter={handleMouseEnter} onFocus={handleMouseEnter}>
      {shouldLoad && LoadedComponent ? (
        <Suspense fallback={fallback || <SkeletonDiagram />}>
          <LoadedComponent {...componentProps} />
        </Suspense>
      ) : (
        fallback || <SkeletonDiagram />
      )}
    </div>
  )
}

export const LazyEcosystemOverview = (props: Record<string, unknown>) => (
  <LazyDiagramWrapper importFunc={() => import("@/components/diagrams/ecosystem-overview-diagram")} componentProps={props} />
)

export const LazyFDIAFlowchart = (props: Record<string, unknown>) => (
  <LazyDiagramWrapper importFunc={() => import("@/components/diagrams/fdia-flowchart")} componentProps={props} />
)

export const LazyFDIACalculatorPanel = (props: Record<string, unknown>) => (
  <LazyDiagramWrapper
    importFunc={() => import("@/components/sections/fdia-calculator-panel")}
    componentProps={props}
    rootMargin="120px"
    preloadOnHover={false}
    fallback={<div className="min-h-[360px] w-full animate-pulse rounded-xl border border-border bg-card/60" />}
  />
)

export const LazyPerformanceRadarChart = (props: Record<string, unknown>) => (
  <LazyDiagramWrapper
    importFunc={() => import("@/components/diagrams/performance-radar-chart")}
    componentProps={props}
    preloadOnHover={false}
  />
)

export const LazyInteractiveArchDiagram = (props: Record<string, unknown>) => (
  <LazyDiagramWrapper
    importFunc={() => import("@/components/diagrams/interactive-arch-diagram")}
    componentProps={props}
    rootMargin="120px"
    preloadOnHover={false}
  />
)

export const LazyInteractiveGenomeExplorer = (props: Record<string, unknown>) => (
  <LazyDiagramWrapper
    importFunc={() => import("@/components/diagrams/interactive-genome-explorer")}
    componentProps={props}
    rootMargin="120px"
    preloadOnHover={false}
  />
)
