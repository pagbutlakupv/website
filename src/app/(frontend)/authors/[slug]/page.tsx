import type { Metadata } from 'next'
import Link from 'next/link'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { Globe, LinkIcon } from 'lucide-react'
import { SiFacebook, SiInstagram, SiX } from '@icons-pack/react-simple-icons'

import { Avatar } from '@/components/Avatar'
import { Card } from '@/components/Articles/Card'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const authors = await payload.find({
    collection: 'authors',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return authors.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function AuthorPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/authors/${decodedSlug}`

  const author = await queryAuthorBySlug({ slug: decodedSlug })

  if (!author) {
    return <PayloadRedirects url={url} />
  }

  const payload = await getPayload({ config: configPromise })

  const articles = await payload.find({
    collection: 'articles',
    draft: false,
    pagination: false,
    sort: '-publishedAt',
    where: {
      authors: {
        in: [author.id],
      },
    },
  })

  const normalizeUrl = (url?: string | null) => {
    if (!url) return null

    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`
  }

  const links = [
    {
      href: normalizeUrl(author.socialLinks?.website),
      label: 'Website',
      icon: Globe,
    },
    {
      href: normalizeUrl(author.socialLinks?.facebook),
      label: 'Facebook',
      icon: SiFacebook,
    },
    {
      href: normalizeUrl(author.socialLinks?.x),
      label: 'X',
      icon: SiX,
    },
    {
      href: normalizeUrl(author.socialLinks?.instagram),
      label: 'Instagram',
      icon: SiInstagram,
    },
    {
      href: normalizeUrl(author.socialLinks?.linkedin),
      label: 'LinkedIn',
      icon: LinkIcon,
    },
  ].filter((link) => link.href)

  return (
    <div className="pt-12 pb-16">
      <PayloadRedirects disableNotFound url={url} />

      {/* Author profile */}
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <Avatar resource={author.avatar} className="h-32 w-32" size="128px" />
          </div>

          <h1 className="text-4xl font-bold">{author.name}</h1>

          <p className="mt-2 text-muted-foreground">{author.role}</p>

          {author.bio && <p className="mt-6 max-w-2xl">{author.bio}</p>}

          {links.length > 0 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              {links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Articles */}
      {articles.docs.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4 md:px-6">
          <div className="border-t pt-8">
            <h2 className="mb-6 text-xl font-semibold">Articles</h2>

            <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
              {articles.docs.map((article) => {
                if (typeof article === 'string') return null

                return <Card key={article.id} doc={article} relationTo="articles" />
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const author = await queryAuthorBySlug({ slug: decodedSlug })

  return {
    title: author?.name,
    description: author?.bio ?? undefined,
  }
}

const queryAuthorBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'authors',
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
