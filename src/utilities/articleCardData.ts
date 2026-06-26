import type { Article, Search } from '@/payload-types'

import { getReadingTimeMinutes } from '@/utilities/readingTime'

type CardAuthorData = NonNullable<NonNullable<Article['populatedAuthors']>[number]>

export type CardCategoryData = {
  id: string | number
  title: string
}

export type CardArticleData = {
  slug?: string | null
  categories?: CardCategoryData[] | null
  meta?: Article['meta']
  title?: string | null
  populatedAuthors?: CardAuthorData[] | null
  publishedAt?: string | null
  readingTimeMinutes?: number | null
}

type ArticleCardSource = Pick<
  Article,
  'slug' | 'categories' | 'meta' | 'title' | 'populatedAuthors' | 'publishedAt' | 'content'
>

export type CardSearchSource = Pick<Search, 'slug' | 'categories' | 'meta' | 'title'> & {
  publishedAt?: string | null
  populatedAuthors?: CardAuthorData[] | null
  readingTimeMinutes?: number | null
}

export type CardSourceData = ArticleCardSource | CardSearchSource

const normalizeCategories = (
  categories: ArticleCardSource['categories'] | CardSearchSource['categories'],
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

export const toCardArticleData = (doc: CardSourceData): CardArticleData => {
  const baseCardData: CardArticleData = {
    slug: doc.slug,
    categories: normalizeCategories(doc.categories),
    meta: doc.meta,
    title: doc.title,
    populatedAuthors: doc.populatedAuthors,
    publishedAt: doc.publishedAt,
  }

  if ('content' in doc) {
    return {
      ...baseCardData,
      readingTimeMinutes: getReadingTimeMinutes(doc.content),
    }
  }

  return {
    ...baseCardData,
    readingTimeMinutes: doc.readingTimeMinutes ?? null,
  }
}
