"use client"

import { memo, useCallback, useEffect, useRef, useState } from "react"

interface OptimizedImageProps {
  src: string
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
  onLoad?: () => void
  onError?: () => void
}

function generateSrcSet(src: string): string | undefined {
  if (!src.includes("cloudfront.net")) return undefined
  return undefined
}

function getAvifSrc(src: string): string | undefined {
  if (src.endsWith(".webp")) return src.replace(/\.webp$/, ".avif")
  return undefined
}

const OptimizedImage = memo(function OptimizedImage({
  src,
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
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

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
    setHasError(true)
    onError?.()
  }, [onError])

  const srcSet = generateSrcSet(src)
  const avifSrc = getAvifSrc(src)
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
        <span className="text-sm text-warm-gray dark:text-white/60">Image unavailable</span>
      </div>
    )
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${containerClassName}`} style={style}>
      {!isLoaded && <div className="absolute inset-0 rounded-lg bg-secondary animate-pulse" aria-hidden="true" />}
      {isInView && (
        <picture style={{ display: "contents" }}>
          {avifSrc && <source type="image/avif" srcSet={avifSrc} sizes={sizes} />}
          <source type="image/webp" srcSet={srcSet || src} sizes={sizes} />
          <img
            src={src}
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
