import { describe, it, expect, beforeEach } from 'vitest'

// Re-import to reset the module's Map state between tests
let rateLimit: (key: string, max?: number, windowMs?: number) => boolean

beforeEach(async () => {
  // Clear module cache so the internal Map is reset
  const mod = await import('../lib/rate-limit?t=' + Date.now())
  rateLimit = mod.rateLimit
})

describe('rateLimit', () => {
  it('allows requests under the limit', () => {
    expect(rateLimit('test-key', 3, 60_000)).toBe(true)
    expect(rateLimit('test-key', 3, 60_000)).toBe(true)
    expect(rateLimit('test-key', 3, 60_000)).toBe(true)
  })

  it('blocks the request that exceeds the limit', () => {
    rateLimit('block-key', 2, 60_000)
    rateLimit('block-key', 2, 60_000)
    expect(rateLimit('block-key', 2, 60_000)).toBe(false)
  })

  it('uses separate counters per key', () => {
    rateLimit('key-a', 1, 60_000)
    expect(rateLimit('key-a', 1, 60_000)).toBe(false)
    expect(rateLimit('key-b', 1, 60_000)).toBe(true)
  })

  it('resets counter after window expires', async () => {
    const windowMs = 50
    rateLimit('expire-key', 1, windowMs)
    expect(rateLimit('expire-key', 1, windowMs)).toBe(false)

    await new Promise((r) => setTimeout(r, windowMs + 10))
    expect(rateLimit('expire-key', 1, windowMs)).toBe(true)
  })
})
