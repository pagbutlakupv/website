'use client'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Author } from '@/payload-types'

import { Avatar } from '@/components/Avatar'

export type CardAuthorData = Pick<Author, 'slug' | 'name' | 'role' | 'bio' | 'avatar'>

export const AuthorCard: React.FC<{
  className?: string
  doc?: CardAuthorData
  relationTo?: 'authors'
}> = ({ className, doc, relationTo = 'authors' }) => {
  const { card, link } = useClickableCard({})

  const { slug, name, role, bio, avatar } = doc || {}

  const href = `/${relationTo}/${slug}`

  return (
    <article
      ref={card.ref}
      className={cn(
        'group rounded-lg bg-card p-4 transition-colors duration-300 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground',
        className,
      )}
    >
      {/* Avatar */}
      <div className="mb-4 flex justify-center">
        <Avatar
          resource={avatar}
          className="h-28 w-28"
          size="112px"
          imgClassName="transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="text-center">
        {/* Name */}
        {name && (
          <div className="prose">
            <h3>
              <Link href={href} ref={link.ref} className="not-prose">
                {name}
              </Link>
            </h3>
          </div>
        )}

        {/* Role */}
        {role && <p className="mt-1 text-sm font-medium text-muted-foreground">{role}</p>}

        {/* Bio */}
        {bio && <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{bio}</p>}
      </div>
    </article>
  )
}
