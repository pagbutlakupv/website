'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import { Media } from '@/components/Media'
import type { CardPostData } from '@/utilities/cardPostData'
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatDateTime } from '@/utilities/formatDateTime'
import { formatReadingTime } from '@/utilities/readingTime'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, populatedAuthors, publishedAt, readingTimeMinutes, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const authorsLabel = populatedAuthors?.length
    ? formatAuthors(
        populatedAuthors.filter((author): author is NonNullable<typeof author> => Boolean(author)),
      )
    : ''
  const metaItems = [
    authorsLabel,
    publishedAt ? formatDateTime(publishedAt) : null,
    typeof readingTimeMinutes === 'number' ? formatReadingTime(readingTimeMinutes) : null,
  ].filter((item): item is string => Boolean(item))
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:bg-accent hover:text-accent-foreground hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object' && category !== null) {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {metaItems.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-y-1 text-sm text-muted-foreground">
            {metaItems.map((item, index) => {
              const isLast = index === metaItems.length - 1

              return (
                <Fragment key={`${item}-${index}`}>
                  <span>{item}</span>
                  {!isLast && <span aria-hidden="true" className="px-2">•</span>}
                </Fragment>
              )
            })}
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
