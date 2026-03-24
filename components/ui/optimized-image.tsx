"use client"

import { memo, useCallback, useEffect, useRef, useState } from "react"

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

function getAvifSrc(src: string): string | undefined {
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
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [currentSrc, setCurrentSrc] = useState(src)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentSrc(src)
    setHasError(false)
    setIsLoaded(false)
  }, [src])

  useEffect(() => {
    if (priority || isInView) return
    const element = imgRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [priority, isInView])

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
  const avifSrc = getAvifSrc(currentSrc)
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
      {!isLoaded && <div className="absolute inset-0 rounded-lg bg-secondary animate-pulse" aria-hidden="true" />}
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
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            className={`h-full w-full transition-opacity duration-500 ease-out ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
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
