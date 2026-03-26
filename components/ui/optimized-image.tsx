"use client"

import { memo, useCallback, useEffect, useRef, useState } from "react"

const imageObserverCallbacks = new WeakMap<Element, () => void>()
let sharedImageObserver: IntersectionObserver | null = null

function getSharedImageObserver() {
  if (typeof window === "undefined") {
    return null
  }

  if (!sharedImageObserver) {
    sharedImageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const callback = imageObserverCallbacks.get(entry.target)
          if (callback) {
            callback()
            imageObserverCallbacks.delete(entry.target)
          }
          sharedImageObserver?.unobserve(entry.target)
        })
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    )
  }

  return sharedImageObserver
}

interface OptimizedImageProps {
  src: string
  fallbackSrc?: string
  alt: string
  width?: number
  height?: number
  aspectRatio?: string
  className?: string
  containerClassName?: string
  priority?: boolean
  sizes?: string
  pixelated?: boolean
  objectFit?: "cover" | "contain" | "fill" | "none"
  showErrorFallback?: boolean
  errorLabel?: string
  onLoad?: () => void
  onError?: () => void
}

function getImageExtension(src: string): string | null {
  const cleanSrc = src.split("?")[0]?.split("#")[0] ?? src
  const match = cleanSrc.match(/\.([a-zA-Z0-9]+)$/)
  return match?.[1]?.toLowerCase() ?? null
}

function getAvifSrc(src: string, pixelated: boolean): string | undefined {
  if (pixelated || src.includes("/pixel-icons/") || src.includes("/images/pixel/")) {
    return undefined
  }
  if (src.endsWith(".webp")) return src.replace(/\.webp$/, ".avif")
  return undefined
}

const OptimizedImage = memo(function OptimizedImage({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  aspectRatio,
  className = "",
  containerClassName = "",
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  pixelated = false,
  objectFit = "cover",
  showErrorFallback = alt.trim().length > 0,
  errorLabel = "Image unavailable",
  onLoad,
  onError,
}: OptimizedImageProps) {
  const shouldLoadImmediately = priority || pixelated || Boolean(width && height && width <= 64 && height <= 64)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(shouldLoadImmediately)
  const [currentSrc, setCurrentSrc] = useState(src)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentSrc(src)
    setHasError(false)
    setIsLoaded(false)
    setIsInView(shouldLoadImmediately)
  }, [src, shouldLoadImmediately])

  useEffect(() => {
    if (shouldLoadImmediately || isInView) return
    const element = imgRef.current
    if (!element) return

    const observer = getSharedImageObserver()
    if (!observer) return

    imageObserverCallbacks.set(element, () => setIsInView(true))
    observer.observe(element)

    return () => {
      imageObserverCallbacks.delete(element)
      observer.unobserve(element)
    }
  }, [shouldLoadImmediately, isInView])

  // Catch images that loaded during SSR before React hydrated the onLoad handler
  useEffect(() => {
    if (!isInView) return
    const img = imgRef.current?.querySelector("img")
    if (img?.complete && img.naturalWidth > 0 && !isLoaded) {
      setIsLoaded(true)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(false)
      setIsLoaded(false)
      return
    }
    setHasError(true)
    onError?.()
  }, [currentSrc, fallbackSrc, onError])

  const extension = getImageExtension(currentSrc)
  const avifSrc = getAvifSrc(currentSrc, pixelated)
  const style: React.CSSProperties = {
    ...(aspectRatio ? { aspectRatio } : {}),
    ...(pixelated ? { imageRendering: "pixelated" as const } : {}),
  }

  if (hasError) {
    return (
      <div
        ref={imgRef}
        className={`flex items-center justify-center rounded-lg bg-warm-light-gray/30 dark:bg-white/10 ${containerClassName}`}
        style={style}
      >
        {showErrorFallback ? (
          <span className="text-sm text-warm-gray dark:text-white/60">{errorLabel}</span>
        ) : null}
      </div>
    )
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${containerClassName}`} style={style}>
      {!isLoaded && <div className="absolute inset-0 rounded-lg bg-secondary/55" aria-hidden="true" />}
      {isInView && (
        <picture style={{ display: "contents" }}>
          {avifSrc && <source type="image/avif" srcSet={avifSrc} sizes={sizes} />}
          {extension === "webp" && <source type="image/webp" srcSet={currentSrc} sizes={sizes} />}
          {extension === "png" && <source type="image/png" srcSet={currentSrc} sizes={sizes} />}
          {extension === "jpg" && <source type="image/jpeg" srcSet={currentSrc} sizes={sizes} />}
          {extension === "jpeg" && <source type="image/jpeg" srcSet={currentSrc} sizes={sizes} />}
          <img
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            fetchPriority={priority ? "high" : "auto"}
            loading={priority || shouldLoadImmediately ? "eager" : "lazy"}
            decoding="async"
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            className={`h-full w-full transition-opacity duration-300 ease-out ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
            style={{
              objectFit,
              ...(pixelated ? { imageRendering: "pixelated" as const } : {}),
            }}
          />
        </picture>
      )}
    </div>
  )
})

export default OptimizedImage
