import { describe, it, expect } from 'vitest'
import { sha256 } from '../../src/lib/hash'

describe('sha256', () => {
  it('produces a 64-char hex string', () => {
    const result = sha256('test-input')
    expect(result).toHaveLength(64)
    expect(result).toMatch(/^[0-9a-f]+$/)
  })

  it('is deterministic', () => {
    expect(sha256('hello')).toBe(sha256('hello'))
  })

  it('produces different hashes for different inputs', () => {
    expect(sha256('alice')).not.toBe(sha256('bob'))
  })
})
