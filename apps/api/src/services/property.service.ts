import { db } from '../db'
import { properties } from '../db/schema'
import { eq } from 'drizzle-orm'
import { PropertySchema, type Property } from '@seazone/shared'

export async function getPropertyByCode(code: string): Promise<Property | null> {
  const rows = await db.select().from(properties).where(eq(properties.code, code)).limit(1)
  if (!rows.length) return null
  return PropertySchema.parse(rows[0])
}
