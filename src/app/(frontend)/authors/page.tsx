import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { AuthorCard } from '@/components/Authors/Card'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const authors = await payload.find({
    collection: 'authors',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: 'name',
    select: {
      name: true,
      slug: true,
      role: true,
      bio: true,
      avatar: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container">
        <div className="prose dark:prose-invert max-w-none mb-12">
          <h1>Authors</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {authors.docs.map((author) => (
            <AuthorCard key={author.id} doc={author} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Pagbutlak Authors',
  }
}
