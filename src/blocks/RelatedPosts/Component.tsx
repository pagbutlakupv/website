import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import { Card } from '../../components/Card'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { CardPostData, CardPostSourceData, toCardPostData } from '@/utilities/cardPostData'

export type RelatedPostsProps = {
  className?: string
  docs?: CardPostSourceData[]
  introContent?: DefaultTypedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          const cardDoc = toCardPostData(doc)

          if (!cardDoc) return null

          return <Card key={index} doc={cardDoc as CardPostData} relationTo="posts" showCategories />
        })}
      </div>
    </div>
  )
}
