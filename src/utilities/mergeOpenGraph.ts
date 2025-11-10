import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Official website of Pagbutlak UPV',
  images: [
    {
      url: `${getServerSideURL()}/og.webp`,
    },
  ],
  siteName: 'Pagbutlak',
  title: 'Pagbutlak',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
