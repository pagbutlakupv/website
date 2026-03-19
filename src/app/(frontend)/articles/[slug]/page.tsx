import type { Metadata } from 'next'
import { RelatedArticles } from '@/blocks/RelatedArticles/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { ArticleHero } from '@/heros/ArticleHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const articles = await payload.find({
    collection: 'articles',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })
  const params = articles.docs.map(({ slug }) => {
    return { slug }
  })
  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ArticlePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/articles/${decodedSlug}`
  const article = await queryArticleBySlug({ slug: decodedSlug })

  if (!article) return <PayloadRedirects url={url} />

  return (
    <article className="pt-12 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Main content */}
      <div className="max-w-[48rem] mx-auto px-4 md:px-6">
        <ArticleHero article={article} />

        <RichText data={article.content} enableGutter={false} />
      </div>

      {/* Related articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <div className="mx-4 md:mx-8 lg:mx-12 my-16 py-8 border-t border-border">
          <h2 className="text-lg font-semibold mb-4">Related Articles</h2>
          <RelatedArticles
            docs={article.relatedArticles.filter(
              (relatedArticle) => typeof relatedArticle === 'object',
            )}
          />
        </div>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const article = await queryArticleBySlug({ slug: decodedSlug })
  return generateMeta({ doc: article })
}

const queryArticleBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'articles',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return result.docs?.[0] || null
})
