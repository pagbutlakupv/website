'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Article, Category } from '@/payload-types'

import { Media } from '@/components/Media'
import { Badge } from '../ui/badge'
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatReadableDate } from '@/utilities/formatReadableDate'

export type CardArticleData = Pick<
  Article,
  'slug' | 'categories' | 'meta' | 'title' | 'populatedAuthors' | 'publishedAt'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardArticleData
  relationTo?: 'articles'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, populatedAuthors, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const titleToUse = titleFromProps || title
  const validCategories =
    categories?.filter(
      (category): category is Category =>
        typeof category === 'object' && category !== null && !!category.title,
    ) ?? []
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const author = populatedAuthors?.[0]
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group p-4 rounded-lg overflow-hidden bg-card transition-colors duration-300 hover:bg-accent hover:text-accent-foreground hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      {/* Meta image */}
      {metaImage && typeof metaImage !== 'string' && (
        <div className="mb-4 rounded-lg w-full aspect-[16/9] overflow-hidden">
          <Media
            resource={metaImage}
            size="33vw"
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
          />
        </div>
      )}
      <div>
        {/* Title */}
        {titleToUse && (
          <div className="prose">
            <h3 className="line-clamp-2">
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}

        {/* Categories */}
        {showCategories && validCategories.length > 0 && (
          <div className="flex flex-wrap gap-1 text-sm my-2">
            {validCategories.map((category) => (
              <Badge key={category.id} variant="outline">
                {category.title}
              </Badge>
            ))}
          </div>
        )}

        <div className="text-xs text-muted-foreground flex flex-wrap gap-3 my-2">
          {/* Author */}
          {author && <div className="font-medium">{formatAuthors(populatedAuthors)}</div>}
          {/* Date */}
          {publishedAt && <div>{formatReadableDate(publishedAt)}</div>}
        </div>

        {/* Description */}
        {sanitizedDescription && (
          <div className="line-clamp-3 mt-2">
            <p>{sanitizedDescription}</p>
          </div>
        )}
      </div>
    </article>
  )
}
