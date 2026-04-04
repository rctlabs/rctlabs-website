"use client"

import { lazy, Suspense, useEffect, useRef, useState, type ComponentType, type LazyExoticComponent, type ReactNode } from "react"

type LazyDiagramComponent = LazyExoticComponent<ComponentType<Record<string, unknown>>>

interface LazyDiagramWrapperProps {
  LazyComponent: LazyDiagramComponent
  preload?: () => Promise<unknown>
  componentProps?: Record<string, unknown>
  useIntersectionObserver?: boolean
  eager?: boolean
  rootMargin?: string
  preloadOnHover?: boolean
  fallback?: ReactNode
  className?: string
}

const EcosystemOverviewDiagram = lazy(() => import("@/components/diagrams/ecosystem-overview-diagram"))
const FDIAFlowchartDiagram = lazy(() => import("@/components/diagrams/fdia-flowchart"))
const FDIACalculatorPanelDiagram = lazy(() => import("@/components/sections/fdia-calculator-panel"))
const PerformanceRadarChartDiagram = lazy(() => import("@/components/diagrams/performance-radar-chart"))
const InteractiveArchDiagram = lazy(() => import("@/components/diagrams/interactive-arch-diagram"))
const InteractiveGenomeExplorerDiagram = lazy(() => import("@/components/diagrams/interactive-genome-explorer"))

function SkeletonDiagram() {
  return <div className="min-h-96 w-full animate-pulse rounded-xl border border-border bg-card/60" />
}

export default function LazyDiagramWrapper({
  LazyComponent,
  preload,
  componentProps = {},
  useIntersectionObserver = true,
  eager = false,
  rootMargin = "200px",
  preloadOnHover = true,
  fallback,
  className = "",
}: LazyDiagramWrapperProps) {
  const [shouldLoad, setShouldLoad] = useState(eager || !useIntersectionObserver)
  const [isPreloaded, setIsPreloaded] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

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
    if (preloadOnHover && preload && !isPreloaded && !shouldLoad) {
      void preload().then(() => {
        setIsPreloaded(true)
      })
    }
  }

  return (
    <div ref={wrapperRef} className={className} onMouseEnter={handleMouseEnter} onFocus={handleMouseEnter}>
      {shouldLoad ? (
        <Suspense fallback={fallback || <SkeletonDiagram />}>
          <LazyComponent {...componentProps} />
        </Suspense>
      ) : (
        fallback || <SkeletonDiagram />
      )}
    </div>
  )
}

export const LazyEcosystemOverview = (props: Record<string, unknown>) => (
  <LazyDiagramWrapper
    LazyComponent={EcosystemOverviewDiagram}
    preload={() => import("@/components/diagrams/ecosystem-overview-diagram")}
    componentProps={props}
    fallback={<div className="mx-auto aspect-500/420 w-full max-w-120 animate-pulse rounded-xl border border-border bg-card/60" />}
  />
)

export const LazyFDIAFlowchart = (props: Record<string, unknown>) => (
  <LazyDiagramWrapper
    LazyComponent={FDIAFlowchartDiagram}
    preload={() => import("@/components/diagrams/fdia-flowchart")}
    componentProps={props}
    eager
    useIntersectionObserver={false}
  />
)

export const LazyFDIACalculatorPanel = (props: Record<string, unknown>) => (
  <LazyDiagramWrapper
    LazyComponent={FDIACalculatorPanelDiagram}
    preload={() => import("@/components/sections/fdia-calculator-panel")}
    componentProps={props}
    rootMargin="120px"
    preloadOnHover={false}
    fallback={<div className="min-h-90 w-full animate-pulse rounded-xl border border-border bg-card/60" />}
  />
)

export const LazyPerformanceRadarChart = (props: Record<string, unknown>) => (
  <LazyDiagramWrapper
    LazyComponent={PerformanceRadarChartDiagram}
    preload={() => import("@/components/diagrams/performance-radar-chart")}
    componentProps={props}
    preloadOnHover={false}
  />
)

export const LazyInteractiveArchDiagram = (props: Record<string, unknown>) => (
  <LazyDiagramWrapper
    LazyComponent={InteractiveArchDiagram}
    preload={() => import("@/components/diagrams/interactive-arch-diagram")}
    componentProps={props}
    rootMargin="120px"
    preloadOnHover={false}
  />
)

export const LazyInteractiveGenomeExplorer = (props: Record<string, unknown>) => (
  <LazyDiagramWrapper
    LazyComponent={InteractiveGenomeExplorerDiagram}
    preload={() => import("@/components/diagrams/interactive-genome-explorer")}
    componentProps={props}
    rootMargin="120px"
    preloadOnHover={false}
  />
)
