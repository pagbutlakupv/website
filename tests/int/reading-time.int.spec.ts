import { describe, expect, it } from 'vitest'

import { formatReadingTime, getReadingTimeEstimate } from '@/utilities/readingTime'

describe('reading time utilities', () => {
  it('counts readable text from Payload rich text content', () => {
    const content = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'one two three four five',
              },
            ],
          },
          {
            type: 'block',
            fields: {
              blockType: 'code',
              code: 'const total = 1 + 2',
            },
          },
        ],
      },
    }

    expect(getReadingTimeEstimate(content)).toMatchObject({
      label: '1 min read',
      minutes: 1,
      words: 9,
    })
  })

  it('rounds reading time up to the next minute', () => {
    const content = Array.from({ length: 201 }, (_, index) => `word${index}`).join(' ')

    expect(getReadingTimeEstimate(content)).toMatchObject({
      label: '2 min read',
      minutes: 2,
      words: 201,
    })
  })

  it('formats minutes defensively', () => {
    expect(formatReadingTime(0)).toBe('1 min read')
  })
})
