export const ARTICLE_SECTIONS = [
  { label: 'News', value: 'news' },
  { label: 'Opinion', value: 'opinion' },
  { label: 'Feature', value: 'feature' },
  { label: 'Kultura', value: 'kultura' },
] as const

export type ArticleSection = (typeof ARTICLE_SECTIONS)[number]['value']
