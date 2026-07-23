export const READING_TIME_WORDS_PER_MINUTE = 200

const READING_TIME_CONTENT_KEYS = new Set(['text', 'code'])

const collectReadingTimeText = (value: unknown, segments: string[]): void => {
  if (!value) {
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectReadingTimeText(item, segments))
    return
  }

  if (typeof value !== 'object') {
    return
  }

  Object.entries(value).forEach(([key, nestedValue]) => {
    if (typeof nestedValue === 'string') {
      if (READING_TIME_CONTENT_KEYS.has(key) && nestedValue.trim()) {
        segments.push(nestedValue.trim())
      }
      return
    }

    collectReadingTimeText(nestedValue, segments)
  })
}

export const extractReadingTimeText = (content: unknown): string => {
  if (!content) {
    return ''
  }

  const segments: string[] = []
  collectReadingTimeText(content, segments)

  return segments.join(' ').trim()
}

export const getWordCount = (text: string): number => {
  const normalizedText = text.replace(/\u00A0/g, ' ').trim()

  if (!normalizedText) {
    return 0
  }

  return normalizedText.split(/\s+/).length
}

export const getReadingTimeMinutes = (
  content: unknown,
  wordsPerMinute = READING_TIME_WORDS_PER_MINUTE,
): number => {
  if (!content || wordsPerMinute <= 0) {
    return 0
  }

  const wordCount = getWordCount(extractReadingTimeText(content))

  if (wordCount === 0) {
    return 0
  }

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export const formatReadingTime = (minutes?: number | null): string | null => {
  if (!minutes || minutes < 1) {
    return null
  }

  return `${minutes} min read`
}
