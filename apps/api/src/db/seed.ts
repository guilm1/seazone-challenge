import { config } from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

// Must run before any module that reads DATABASE_URL
config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
  console.error(
    'Error: DATABASE_URL is not set.\n' +
      'Make sure apps/api/.env.local exists and contains:\n' +
      '  DATABASE_URL=postgresql://seazone:seazone@localhost:5432/seazone'
  )
  process.exit(1)
}

async function seed() {
  // Dynamic imports run after dotenv has populated process.env
  const { db } = await import('./index')
  const { properties } = await import('./schema')
  const { PropertySchema } = await import('@seazone/shared')

  const dataDir = path.resolve(process.cwd(), '../../data/properties')
  console.log(`Reading property files from: ${dataDir}`)

  let files: string[]
  try {
    files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json'))
  } catch (err) {
    console.error(`Failed to read directory ${dataDir}:`, err)
    process.exit(1)
  }

  if (files.length === 0) {
    console.warn('No JSON files found in data/properties/')
    process.exit(0)
  }

  console.log(`Found ${files.length} property file(s): ${files.join(', ')}`)

  for (const file of files) {
    const filePath = path.join(dataDir, file)
    try {
      const raw = fs.readFileSync(filePath, 'utf-8')
      const json = JSON.parse(raw)
      const property = PropertySchema.parse(json)

      await db
        .insert(properties)
        .values({
          code: property.code,
          name: property.name,
          property_type: property.property_type,
          bedroom_quantity: property.bedroom_quantity,
          bathroom_quantity: property.bathroom_quantity,
          guest_capacity: property.guest_capacity,
          address: property.address,
          operational: property.operational,
          rules: property.rules,
          amenities: property.amenities,
          images: property.images,
          host: property.host,
        })
        .onConflictDoUpdate({
          target: properties.code,
          set: {
            name: property.name,
            property_type: property.property_type,
            bedroom_quantity: property.bedroom_quantity,
            bathroom_quantity: property.bathroom_quantity,
            guest_capacity: property.guest_capacity,
            address: property.address,
            operational: property.operational,
            rules: property.rules,
            amenities: property.amenities,
            images: property.images,
            host: property.host,
          },
        })

      console.log(`✓ Upserted property: ${property.code} — ${property.name}`)
    } catch (err) {
      console.error(`✗ Failed to process ${file}:`, err)
    }
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed()
