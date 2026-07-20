'use client'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Author } from '@/payload-types'

import { Avatar } from '@/components/Avatar'

export type AuthorPreviewData = Pick<Author, 'slug' | 'name' | 'role' | 'bio' | 'avatar'>

export const AuthorPreviewCard: React.FC<{
  className?: string
  doc?: AuthorPreviewData
  relationTo?: 'authors'
}> = ({ className, doc, relationTo = 'authors' }) => {
  const { card, link } = useClickableCard({})

  const { slug, name, role, bio, avatar } = doc || {}

  const href = `/${relationTo}/${slug}`

  if (!doc) return null

  return (
    <article
      ref={card.ref}
      className={cn(
        'group flex w-full items-center gap-5 rounded-lg bg-card p-5 transition-colors duration-300 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground',
        className,
      )}
    >
      {/* Avatar */}
      <Avatar resource={avatar} className="h-20 w-20 shrink-0" size="80px" />

      {/* Details */}
      <div className="min-w-0 flex-1">
        {name && (
          <h3 className="text-lg font-semibold">
            <Link href={href} ref={link.ref} className="hover:underline">
              {name}
            </Link>
          </h3>
        )}

        {role && (
          <p className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-accent-foreground/80">
            {role}
          </p>
        )}

        {bio && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground transition-colors group-hover:text-accent-foreground/80">
            {bio}
          </p>
        )}
      </div>
    </article>
  )
}
