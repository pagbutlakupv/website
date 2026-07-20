import { Article, Author } from '@/payload-types'

/**
 * Formats an array of authors from Articles into a prettified string.
 * @param authors - The authors array from an Article.
 * @returns A prettified string of authors.
 * @example
 *
 * [Author1, Author2] becomes 'Author1 and Author2'
 * [Author1, Author2, Author3] becomes 'Author1, Author2, and Author3'
 *
 */
export const formatAuthors = (authors: NonNullable<Article['authors']>) => {
  const authorNames = authors
    .filter((author): author is Author => typeof author !== 'number')
    .map((author) => author.name)
    .filter(Boolean)

  if (authorNames.length === 0) return ''
  if (authorNames.length === 1) return authorNames[0]
  if (authorNames.length === 2) return `${authorNames[0]} and ${authorNames[1]}`

  return `${authorNames.slice(0, -1).join(', ')} and ${authorNames[authorNames.length - 1]}`
}
