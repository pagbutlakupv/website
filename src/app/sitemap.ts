import type { MetadataRoute } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'

type SitemapEntry = MetadataRoute.Sitemap[number]

const staticRoutes: SitemapEntry[] = [
  {
    url: '/',
    changeFrequency: 'daily',
    priority: 1,
  },
  {
    url: '/articles',
    changeFrequency: 'daily',
    priority: 0.9,
  },
  {
    url: '/news',
    changeFrequency: 'daily',
    priority: 0.8,
  },
  {
    url: '/opinion',
    changeFrequency: 'daily',
    priority: 0.8,
  },
  {
    url: '/features',
    changeFrequency: 'daily',
    priority: 0.8,
  },
  {
    url: '/kultura',
    changeFrequency: 'daily',
    priority: 0.8,
  },
  {
    url: '/search',
    changeFrequency: 'weekly',
    priority: 0.5,
  },
]

const createUrl = (path: string) => new URL(path, getServerSideURL()).toString()

const getPublishedSitemapEntries = unstable_cache(
  async (): Promise<MetadataRoute.Sitemap> => {
    const payload = await getPayload({ config })

    const [pages, articles] = await Promise.all([
      payload.find({
        collection: 'pages',
        depth: 0,
        draft: false,
        limit: 0,
        overrideAccess: false,
        pagination: false,
        select: {
          slug: true,
          updatedAt: true,
        },
        where: {
          _status: {
            equals: 'published',
          },
        },
      }),
      payload.find({
        collection: 'articles',
        depth: 0,
        draft: false,
        limit: 0,
        overrideAccess: false,
        pagination: false,
        select: {
          slug: true,
          updatedAt: true,
        },
        where: {
          _status: {
            equals: 'published',
          },
        },
      }),
    ])

    const pageEntries = pages.docs
      .filter((page) => Boolean(page.slug))
      .map((page): SitemapEntry => {
        const path = page.slug === 'home' ? '/' : `/${page.slug}`

        return {
          url: path,
          lastModified: new Date(page.updatedAt),
          changeFrequency: 'weekly',
          priority: page.slug === 'home' ? 1 : 0.7,
        }
      })

    const articleEntries = articles.docs
      .filter((article) => Boolean(article.slug))
      .map((article): SitemapEntry => {
        return {
          url: `/articles/${article.slug}`,
          lastModified: new Date(article.updatedAt),
          changeFrequency: 'weekly',
          priority: 0.7,
        }
      })

    const entriesByUrl = new Map<string, SitemapEntry>()

    for (const entry of [...staticRoutes, ...pageEntries, ...articleEntries]) {
      const absoluteUrl = createUrl(entry.url)

      entriesByUrl.set(absoluteUrl, {
        ...entry,
        url: absoluteUrl,
      })
    }

    return Array.from(entriesByUrl.values())
  },
  ['sitemap'],
  {
    tags: ['sitemap', 'pages-sitemap', 'articles-sitemap'],
  },
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getPublishedSitemapEntries()
}
