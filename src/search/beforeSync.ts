import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'
import type { Post } from '@/payload-types'

import { getReadingTimeEstimate } from '@/utilities/readingTime'

const getSearchAuthors = async (post: Post, req: Parameters<BeforeSync>[0]['req']) => {
  if (post.populatedAuthors?.length) {
    return post.populatedAuthors
      .filter((author): author is NonNullable<typeof author> => Boolean(author))
      .map((author) => ({
        id: String(author.id),
        name: author.name,
      }))
  }

  if (!post.authors?.length) {
    return []
  }

  const authorDocs = await Promise.all(
    post.authors.map(async (author) => {
      const authorID = typeof author === 'object' ? author.id : author

      if (!authorID) return null

      const authorDoc = await req.payload.findByID({
        collection: 'users',
        id: authorID,
        depth: 0,
        disableErrors: true,
        overrideAccess: true,
        select: {
          name: true,
        },
        req,
      })

      if (!authorDoc) {
        return null
      }

      return {
        id: String(authorDoc.id),
        name: authorDoc.name,
      }
    }),
  )

  return authorDocs.filter((author): author is NonNullable<typeof author> => Boolean(author))
}

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const post = originalDoc as Post
  const { slug, id, categories, title, meta, publishedAt } = post
  const populatedAuthors = await getSearchAuthors(post, req)

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image && typeof meta.image === 'object' ? meta.image.id : meta?.image,
      description: meta?.description,
    },
    categories: [],
    populatedAuthors,
    publishedAt,
    readingTimeMinutes: getReadingTimeEstimate(post.content).minutes,
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    const populatedCategories: { id: string | number; title: string }[] = []
    for (const category of categories) {
      if (!category) {
        continue
      }

      if (typeof category === 'object') {
        populatedCategories.push(category)
        continue
      }

      const doc = await req.payload.findByID({
        collection: 'categories',
        id: category,
        disableErrors: true,
        depth: 0,
        select: { title: true },
        req,
      })

      if (doc !== null) {
        populatedCategories.push(doc)
      } else {
        console.error(
          `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
        )
      }
    }

    modifiedDoc.categories = populatedCategories.map((each) => ({
      relationTo: 'categories',
      categoryID: String(each.id),
      title: each.title,
    }))
  }

  return modifiedDoc
}
