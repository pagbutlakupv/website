'use client'

import React from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Props = {
  resource?: MediaType | number | null
  className?: string
  size?: string
  placeholderClassName?: string
  imgClassName?: string
}

export function Avatar({
  resource,
  className,
  size = '100vw',
  placeholderClassName,
  imgClassName,
}: Props) {
  return (
    <div className={cn('overflow-hidden rounded-full bg-muted', className)}>
      {resource && typeof resource !== 'string' ? (
        <Media
          resource={resource}
          size={size}
          className="h-full w-full"
          pictureClassName="h-full w-full"
          imgClassName={cn('block h-full w-full object-cover', imgClassName)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div
            className={cn('h-2/5 w-2/5 rounded-full bg-muted-foreground/20', placeholderClassName)}
          />
        </div>
      )}
    </div>
  )
}
