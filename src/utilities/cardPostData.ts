import type { Media, Post } from '@/payload-types'

import { getReadingTimeEstimate } from './readingTime'

type CardCategoryData = {
  title?: string | null
}

type CardAuthorData = {
  id?: number | string | null
  name?: string | null
}

type CardMetaData = {
  description?: string | null
  image?: number | Media | null
}

export type CardPostData = {
  categories?: (CardCategoryData | number | null)[] | null
  meta?: CardMetaData | null
  populatedAuthors?: (CardAuthorData | null)[] | null
  publishedAt?: string | null
  readingTimeMinutes?: number | null
  slug?: string | null
  title?: string | null
}

export type CardPostSourceData = CardPostData & {
  content?: Post['content'] | null
}

export const toCardPostData = (doc?: CardPostSourceData | null): CardPostData | undefined => {
  if (!doc) return undefined

  const { content, readingTimeMinutes, ...cardData } = doc

  return {
    ...cardData,
    readingTimeMinutes: readingTimeMinutes ?? (content ? getReadingTimeEstimate(content).minutes : null),
  }
}
