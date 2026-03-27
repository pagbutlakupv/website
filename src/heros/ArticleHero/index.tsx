import React from 'react'
import type { Article } from '@/payload-types'
import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatReadableDate } from '@/utilities/formatReadableDate'
import { Badge } from '@/components/ui/badge'
import { SocialMediaShare } from '@/components/SocialMediaShare'
import { getServerSideURL } from '@/utilities/getURL'

export const ArticleHero: React.FC<{
  article: Article
}> = ({ article }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, slug, updatedAt, title } = article

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const publishedDate = publishedAt ? formatReadableDate(publishedAt) : null
  const updatedDate = updatedAt ? formatReadableDate(updatedAt) : null
  const showUpdated = updatedDate && updatedDate !== publishedDate
  const shareURL = `${getServerSideURL()}/articles/${slug}`

  return (
    <div className="w-full border-b border-border pb-8 mb-8 flex flex-col gap-6">
      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => {
            if (typeof category === 'object' && category !== null) {
              const { title: categoryTitle } = category
              const titleToUse = categoryTitle || 'Untitled category'
              return <Badge key={index}>{titleToUse}</Badge>
            }
            return null
          })}
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
        {title}
      </h1>

      <div className="flex flex-col gap-2">
        {/* Author */}
        {hasAuthors && (
          <p className="text-sm font-medium text-foreground">
            By {formatAuthors(populatedAuthors)}
          </p>
        )}

        {/* Dates */}
        {(publishedDate || showUpdated) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-sm text-muted-foreground">
            {publishedDate && <time dateTime={publishedAt!}>{publishedDate}</time>}
            {showUpdated && (
              <time dateTime={updatedAt} className="text-muted-foreground/70">
                Updated {updatedDate}
              </time>
            )}
          </div>
        )}

        <SocialMediaShare title={title} url={shareURL} />
      </div>

      {/* Hero image */}
      {heroImage && typeof heroImage !== 'string' && (
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md bg-muted">
          <Media fill priority imgClassName="object-cover" resource={heroImage} />
        </div>
      )}
    </div>
  )
}
