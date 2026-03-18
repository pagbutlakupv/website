import type { Post } from '@/payload-types'

const WORDS_PER_MINUTE = 200
const COUNTED_TEXT_KEYS = new Set(['code', 'description', 'label', 'text', 'title'])
const IGNORED_KEYS = new Set([
  'appearance',
  'blockName',
  'blockType',
  'detail',
  'direction',
  'doc',
  'filename',
  'filesize',
  'format',
  'height',
  'id',
  'indent',
  'linkType',
  'media',
  'mimeType',
  'mode',
  'newTab',
  'relationTo',
  'size',
  'slug',
  'style',
  'tag',
  'type',
  'url',
  'value',
  'version',
  'width',
])

export type ReadingTimeEstimate = {
  label: string
  minutes: number
  words: number
}

export const countWords = (value: string): number => {
  return value.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length || 0
}

const countReadableWords = (value: unknown): number => {
  if (!value) return 0

  if (typeof value === 'string') {
    return countWords(value)
  }

  if (Array.isArray(value)) {
    return value.reduce((total, item) => total + countReadableWords(item), 0)
  }

  if (typeof value !== 'object') {
    return 0
  }

  let total = 0

  for (const [key, child] of Object.entries(value)) {
    if (child == null || IGNORED_KEYS.has(key)) {
      continue
    }

    if (typeof child === 'string') {
      if (COUNTED_TEXT_KEYS.has(key)) {
        total += countWords(child)
      }

      continue
    }

    total += countReadableWords(child)
  }

  return total
}

export const formatReadingTime = (minutes: number): string => {
  const safeMinutes = Number.isFinite(minutes) ? Math.max(1, Math.round(minutes)) : 1

  return `${safeMinutes} min read`
}

export const getReadingTimeEstimate = (content: Post['content'] | string | unknown): ReadingTimeEstimate => {
  const words = countReadableWords(content)
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))

  return {
    label: formatReadingTime(minutes),
    minutes,
    words,
  }
}
