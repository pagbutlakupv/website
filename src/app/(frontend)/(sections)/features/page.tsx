import type { Metadata } from 'next/types'
import { SectionArchive } from '@/components/SectionArchive'

export const dynamic = 'force-static'
export const revalidate = 600

export default function Page() {
  return <SectionArchive section="feature" sectionLabel="Features" />
}

export function generateMetadata(): Metadata {
  return { title: 'Features | Pagbutlak' }
}
