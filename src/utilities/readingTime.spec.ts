import { describe, expect, it } from 'vitest'

import {
  READING_TIME_WORDS_PER_MINUTE,
  extractReadingTimeText,
  formatReadingTime,
  getReadingTimeMinutes,
} from './readingTime'

const createTextNode = (text: string) => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

const createParagraph = (text: string) => ({
  type: 'paragraph',
  children: [createTextNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const createContent = (...children: unknown[]) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

describe('readingTime', () => {
  it('extracts readable text and code from lexical content', () => {
    const content = createContent(
      createParagraph('Alpha beta gamma'),
      {
        type: 'block',
        fields: {
          blockType: 'code',
          code: 'const answer = 42',
        },
        format: '',
        version: 2,
      },
      {
        type: 'block',
        fields: {
          blockType: 'banner',
          content: createContent(createParagraph('Delta epsilon')),
        },
        format: '',
        version: 2,
      },
    )

    expect(extractReadingTimeText(content)).toBe('Alpha beta gamma const answer = 42 Delta epsilon')
  })

  it('rounds up using the 200 wpm baseline', () => {
    const words = Array.from(
      { length: READING_TIME_WORDS_PER_MINUTE + 1 },
      (_, index) => `word-${index + 1}`,
    ).join(' ')
    const content = createContent(createParagraph(words))

    expect(getReadingTimeMinutes(content)).toBe(2)
  })

  it('returns a minimum of one minute for non-empty content and null for empty formatting output', () => {
    const content = createContent(createParagraph('Pagbutlak'))

    expect(getReadingTimeMinutes(content)).toBe(1)
    expect(formatReadingTime(1)).toBe('1 min read')
    expect(formatReadingTime(0)).toBeNull()
  })
})
