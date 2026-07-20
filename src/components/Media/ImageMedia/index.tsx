'use client'

import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import type { Props as MediaProps } from '../types'
import { cssVariables } from '@/cssVariables'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const { breakpoints } = cssVariables

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props

  const [isLoading, setIsLoading] = useState(true)
  const imgRef = useRef<HTMLImageElement>(null)

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource
    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''
    const cacheTag = resource.updatedAt
    src = getMediaUrl(url, cacheTag)
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  // Handles images that load from cache before React attaches the onLoad listener
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoading(false)
    }
  }, [src])

  return (
    <picture
      className={cn(
        // Only constrain positioning for non-fill images.
        // With `fill`, the <img> is absolutely positioned relative to an
        // ancestor further up the tree, so <picture> must stay static/unsized
        // or it collapses to 0x0 and clips the image.
        !fill && 'relative block overflow-hidden',
        pictureClassName,
      )}
    >
      {isLoading && (
        <span
          className={cn(
            'z-10 animate-pulse bg-gray-200 dark:bg-gray-400',
            fill ? 'absolute inset-0' : 'absolute inset-0',
          )}
          aria-hidden="true"
        />
      )}
      <NextImage
        ref={imgRef}
        alt={alt || ''}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          imgClassName,
        )}
        fill={fill}
        height={!fill ? height : undefined}
        priority={priority}
        quality={100}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
        onLoad={() => setIsLoading(false)}
      />
    </picture>
  )
}
