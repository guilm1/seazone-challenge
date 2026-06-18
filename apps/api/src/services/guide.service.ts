import { db } from '../db'
import { aiGuides } from '../db/schema'
import { and, eq } from 'drizzle-orm'
import type { ExperienceGuide } from '@seazone/shared'

export type GuideStatus =
  | { status: 'ready'; guide: ExperienceGuide }
  | { status: 'generating' }
  | { status: 'not_found' }
  | { status: 'error'; error: string }

const GENERATION_TIMEOUT_MS = 5 * 60 * 1000

export async function getGuideStatus(propertyCode: string, language = 'pt'): Promise<GuideStatus> {
  const rows = await db
    .select()
    .from(aiGuides)
    .where(and(eq(aiGuides.property_code, propertyCode), eq(aiGuides.language, language)))
    .limit(1)

  if (!rows.length) return { status: 'not_found' }

  const row = rows[0]

  if (row.content && !row.is_generating) {
    return { status: 'ready', guide: row.content as ExperienceGuide }
  }

  if (row.is_generating) {
    const updatedAt = row.updated_at?.getTime() ?? 0
    if (Date.now() - updatedAt > GENERATION_TIMEOUT_MS) {
      await db
        .update(aiGuides)
        .set({ is_generating: false, error: 'Generation timed out' })
        .where(and(eq(aiGuides.property_code, propertyCode), eq(aiGuides.language, language)))
      return { status: 'error', error: 'Generation timed out. Please try again.' }
    }
    return { status: 'generating' }
  }

  if (row.error) return { status: 'error', error: row.error }
  return { status: 'not_found' }
}

export async function startGeneration(propertyCode: string, language = 'pt'): Promise<void> {
  await db
    .insert(aiGuides)
    .values({
      property_code: propertyCode,
      language,
      is_generating: true,
      updated_at: new Date(),
    })
    .onConflictDoUpdate({
      target: [aiGuides.property_code, aiGuides.language],
      set: { is_generating: true, error: null, updated_at: new Date() },
    })
}

export async function saveGuide(propertyCode: string, language: string, guide: ExperienceGuide): Promise<void> {
  await db
    .update(aiGuides)
    .set({
      content: guide,
      is_generating: false,
      error: null,
      generated_at: new Date(),
      updated_at: new Date(),
    })
    .where(and(eq(aiGuides.property_code, propertyCode), eq(aiGuides.language, language)))
}

export async function saveGuideError(propertyCode: string, language: string, error: string): Promise<void> {
  await db
    .update(aiGuides)
    .set({
      is_generating: false,
      error,
      updated_at: new Date(),
    })
    .where(and(eq(aiGuides.property_code, propertyCode), eq(aiGuides.language, language)))
}
