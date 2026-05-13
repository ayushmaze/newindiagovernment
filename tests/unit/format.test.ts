import { describe, it, expect } from 'vitest'
import { slugify, formatShortDate } from '../../src/lib/format'

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('removes special characters', () => {
    expect(slugify('India\'s GDP ₹500 crore!')).toBe('indias-gdp-500-crore')
  })

  it('collapses multiple hyphens', () => {
    expect(slugify('a  b  c')).toBe('a-b-c')
  })
})

describe('formatShortDate', () => {
  it('formats a date string', () => {
    const result = formatShortDate('2026-05-12T00:00:00.000Z')
    expect(result).toContain('2026')
    expect(result).toContain('May')
  })
})
