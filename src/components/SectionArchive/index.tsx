import type { ArticleSection } from '@/constants/articleSections'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

type Props = {
  section: ArticleSection
  sectionLabel: string
  page?: number
}

export async function SectionArchive({ section, sectionLabel, page = 1 }: Props) {
  const payload = await getPayload({ config: configPromise })

  const articles = await payload.find({
    collection: 'articles',
    depth: 1,
    limit: 12,
    page,
    overrideAccess: false,
    where: {
      section: { equals: section },
      _status: { equals: 'published' },
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      content: true,
      meta: true,
      publishedAt: true,
      authors: true,
      populatedAuthors: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{sectionLabel}</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="articles"
          currentPage={articles.page}
          limit={12}
          totalDocs={articles.totalDocs}
        />
      </div>

      <CollectionArchive articles={articles.docs} />

      <div className="container">
        {articles.totalPages > 1 && articles.page && (
          <Pagination
            page={articles.page}
            totalPages={articles.totalPages}
            basePath={`${section}`}
          />
        )}
      </div>
    </div>
  )
}
