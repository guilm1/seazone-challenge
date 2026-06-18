import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the DB module before importing the service
vi.mock('../db', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn(),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    onConflictDoUpdate: vi.fn().mockResolvedValue(undefined),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
  },
}))

vi.mock('../db/schema', () => ({
  aiGuides: {},
}))

vi.mock('drizzle-orm', () => ({
  eq: vi.fn(),
  and: vi.fn(),
}))

import { getGuideStatus, startGeneration, saveGuide, saveGuideError } from '../services/guide.service'
import { db } from '../db'

const mockDb = db as ReturnType<typeof vi.fn> & typeof db

describe('getGuideStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns not_found when no rows', async () => {
    ;(mockDb.limit as ReturnType<typeof vi.fn>).mockResolvedValueOnce([])
    const result = await getGuideStatus('FLN001')
    expect(result.status).toBe('not_found')
  })

  it('returns ready when content exists and not generating', async () => {
    const guide = { welcome_message: 'Olá!', restaurants: [], attractions: [], essentials: [], seasonal_tips: '' }
    ;(mockDb.limit as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { content: guide, is_generating: false, error: null, updated_at: new Date() },
    ])
    const result = await getGuideStatus('FLN001')
    expect(result.status).toBe('ready')
  })

  it('returns generating when is_generating is true and not timed out', async () => {
    ;(mockDb.limit as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { content: null, is_generating: true, error: null, updated_at: new Date() },
    ])
    const result = await getGuideStatus('FLN001')
    expect(result.status).toBe('generating')
  })

  it('returns error status when error field is set', async () => {
    ;(mockDb.limit as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { content: null, is_generating: false, error: 'Claude API timeout', updated_at: new Date() },
    ])
    const result = await getGuideStatus('FLN001')
    expect(result.status).toBe('error')
    if (result.status === 'error') {
      expect(result.error).toBe('Claude API timeout')
    }
  })

  it('resets timed-out generation and returns error', async () => {
    const staleDate = new Date(Date.now() - 6 * 60 * 1000) // 6 minutes ago
    // select chain: where returns this so limit can be called on it
    ;(mockDb.limit as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { content: null, is_generating: true, error: null, updated_at: staleDate },
    ])
    // update chain: update().set().where() all return this (from vi.mock defaults)
    // awaiting `this` (the mock object) doesn't throw — service proceeds normally

    const result = await getGuideStatus('FLN001')
    expect(result.status).toBe('error')
  })
})
