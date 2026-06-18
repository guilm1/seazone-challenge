import { pgTable, varchar, text, boolean, integer, jsonb, timestamp, primaryKey } from 'drizzle-orm/pg-core'

export const properties = pgTable('properties', {
  code: varchar('code', { length: 10 }).primaryKey(),
  name: text('name').notNull(),
  property_type: text('property_type').notNull(),
  bedroom_quantity: integer('bedroom_quantity').notNull(),
  bathroom_quantity: integer('bathroom_quantity').notNull(),
  guest_capacity: integer('guest_capacity').notNull(),
  address: jsonb('address').notNull(),
  operational: jsonb('operational').notNull(),
  rules: jsonb('rules').notNull(),
  amenities: jsonb('amenities').notNull(),
  images: jsonb('images').notNull().$type<string[]>(),
  host: jsonb('host').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
})

export const aiGuides = pgTable('ai_guides', {
  property_code: varchar('property_code', { length: 10 }).notNull(),
  language: varchar('language', { length: 2 }).notNull().default('pt'),
  content: jsonb('content'),
  is_generating: boolean('is_generating').default(false).notNull(),
  error: text('error'),
  generated_at: timestamp('generated_at'),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.property_code, t.language] }),
}))
