"use client"

import Image from "next/image"
import { useMemo, useState } from "react"

interface ImageWithSkeletonProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  containerClassName?: string
  priority?: boolean
  sizes?: string
  quality?: number
  pixelated?: boolean
  rounded?: boolean
}

export default function ImageWithSkeleton({
  src,
  alt,
  width,
  height,
  className = "",
  containerClassName = "",
  priority = false,
  sizes,
  quality = 85,
  pixelated = false,
  rounded = true,
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const wrapperClassName = useMemo(() => {
    const radiusClass = rounded ? "rounded-xl" : ""
    return `relative overflow-hidden ${radiusClass} ${containerClassName}`.trim()
  }, [containerClassName, rounded])

  const imageClassName = useMemo(() => {
    const pixelClass = pixelated ? "pixel-icon" : ""
    const loadedClass = isLoaded ? "opacity-100" : "opacity-0"
    const radiusClass = rounded ? "rounded-xl" : ""
    return `transition-opacity duration-500 ease-out ${loadedClass} ${pixelClass} ${radiusClass} ${className}`.trim()
  }, [className, isLoaded, pixelated, rounded])

  return (
    <div className={wrapperClassName}>
      {!isLoaded ? <div aria-hidden="true" className="absolute inset-0 skeleton" /> : null}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        quality={quality}
        onLoad={() => setIsLoaded(true)}
        className={imageClassName}
        style={pixelated ? { imageRendering: "pixelated" } : undefined}
      />
    </div>
  )
}
