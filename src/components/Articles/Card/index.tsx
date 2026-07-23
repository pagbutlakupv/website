'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import { Badge } from '../../ui/badge'
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatReadableDate } from '@/utilities/formatReadableDate'
import { formatReadingTime } from '@/utilities/readingTime'
import type { Article, Search } from '@/payload-types'

type CardAuthorData = NonNullable<NonNullable<Article['authors']>[number]>

export type CardCategoryData = {
  id: string | number
  title: string
}

export type ArticleCardDoc = Pick<
  Article,
  'slug' | 'categories' | 'meta' | 'title' | 'authors' | 'publishedAt' | 'readingTimeMinutes'
>

export type SearchCardDoc = Pick<Search, 'slug' | 'categories' | 'meta' | 'title'> & {
  publishedAt?: string | null
  authors?: CardAuthorData[] | null
  readingTimeMinutes?: number | null
}

export type CardDoc = ArticleCardDoc | SearchCardDoc

const normalizeCategories = (
  categories: Article['categories'] | Search['categories'],
): CardCategoryData[] => {
  const normalizedCategories: CardCategoryData[] = []

  categories?.forEach((category) => {
    if (!category || typeof category !== 'object' || !category.title) {
      return
    }

    if ('categoryID' in category) {
      normalizedCategories.push({
        id: category.categoryID || category.id || category.title,
        title: category.title,
      })
      return
    }

    normalizedCategories.push({
      id: category.id ?? category.title,
      title: category.title,
    })
  })

  return normalizedCategories
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardDoc
  relationTo?: 'articles'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, meta, title, authors, publishedAt, readingTimeMinutes } = doc || {}

  const categories = doc ? normalizeCategories(doc.categories) : []
  const { description, image: metaImage } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const authorLabel = authors ? formatAuthors(authors) : ''
  const readingTimeLabel = formatReadingTime(readingTimeMinutes)
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
        {showCategories && categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-1 text-sm my-2">
            {categories.map((category) => (
              <Badge key={category.id} variant="outline">
                {category.title}
              </Badge>
            ))}
          </div>
        )}

        <div className="text-xs text-muted-foreground flex flex-wrap gap-3 my-2">
          {/* Author */}
          {authorLabel && <div className="font-medium">{authorLabel}</div>}
          {/* Date */}
          {publishedAt && <div>{formatReadableDate(publishedAt)}</div>}
          {/* Reading time */}
          {readingTimeLabel && <div>{readingTimeLabel}</div>}
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
