import { db } from '../db'
import { aiGuides } from '../db/schema'
import { eq } from 'drizzle-orm'
import type { ExperienceGuide } from '@seazone/shared'

export type GuideStatus =
  | { status: 'ready'; guide: ExperienceGuide }
  | { status: 'generating' }
  | { status: 'not_found' }
  | { status: 'error'; error: string }

const GENERATION_TIMEOUT_MS = 5 * 60 * 1000

export async function getGuideStatus(propertyCode: string): Promise<GuideStatus> {
  const rows = await db.select().from(aiGuides).where(eq(aiGuides.property_code, propertyCode)).limit(1)
  if (!rows.length) return { status: 'not_found' }

  const row = rows[0]

  if (row.content && !row.is_generating) {
    return { status: 'ready', guide: row.content as ExperienceGuide }
  }

  if (row.is_generating) {
    // Timeout check: reset if stuck
    const updatedAt = row.updated_at?.getTime() ?? 0
    if (Date.now() - updatedAt > GENERATION_TIMEOUT_MS) {
      await db
        .update(aiGuides)
        .set({ is_generating: false, error: 'Generation timed out' })
        .where(eq(aiGuides.property_code, propertyCode))
      return { status: 'error', error: 'Tempo limite de geração excedido. Tente novamente.' }
    }
    return { status: 'generating' }
  }

  if (row.error) return { status: 'error', error: row.error }
  return { status: 'not_found' }
}

export async function startGeneration(propertyCode: string): Promise<void> {
  await db
    .insert(aiGuides)
    .values({
      property_code: propertyCode,
      is_generating: true,
      updated_at: new Date(),
    })
    .onConflictDoUpdate({
      target: aiGuides.property_code,
      set: { is_generating: true, error: null, updated_at: new Date() },
    })
}

export async function saveGuide(propertyCode: string, guide: ExperienceGuide): Promise<void> {
  await db
    .update(aiGuides)
    .set({
      content: guide,
      is_generating: false,
      error: null,
      generated_at: new Date(),
      updated_at: new Date(),
    })
    .where(eq(aiGuides.property_code, propertyCode))
}

export async function saveGuideError(propertyCode: string, error: string): Promise<void> {
  await db
    .update(aiGuides)
    .set({
      is_generating: false,
      error,
      updated_at: new Date(),
    })
    .where(eq(aiGuides.property_code, propertyCode))
}
