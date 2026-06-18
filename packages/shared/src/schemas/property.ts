import { z } from 'zod'

export const PropertyCodeSchema = z
  .string()
  .regex(/^[A-Z]{2,4}\d{3}$/, 'Invalid property code format')

export const AddressSchema = z.object({
  street: z.string(),
  number: z.string(),
  complement: z.string().nullable(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string().length(2),
  postal_code: z.string(),
})

export const OperationalSchema = z.object({
  wifi_network: z.string(),
  wifi_password: z.string(),
  is_self_checkin: z.boolean(),
  property_access_type: z.enum(['smart_lock', 'keybox', 'key', 'other']),
  property_access_instructions: z.string(),
  property_password: z.string(),
  has_parking_spot: z.boolean(),
  parking_spot_identifier: z.string().optional(),
  parking_spot_instructions: z.string().optional(),
})

export const RulesSchema = z.object({
  check_in_time: z.string(),
  check_out_time: z.string(),
  allow_pet: z.boolean(),
  smoking_permitted: z.boolean(),
  suitable_for_children: z.boolean(),
  suitable_for_babies: z.boolean(),
  events_permitted: z.boolean(),
})

export const HostSchema = z.object({
  name: z.string(),
  phone: z.string(),
})

export const PropertySchema = z.object({
  code: PropertyCodeSchema,
  name: z.string(),
  property_type: z.string(),
  bedroom_quantity: z.number().int().positive(),
  bathroom_quantity: z.number().int().positive(),
  guest_capacity: z.number().int().positive(),
  address: AddressSchema,
  operational: OperationalSchema,
  rules: RulesSchema,
  amenities: z.record(z.string(), z.boolean()),
  images: z.array(z.string().url()),
  host: HostSchema,
})

export type Property = z.infer<typeof PropertySchema>
export type Address = z.infer<typeof AddressSchema>
export type Operational = z.infer<typeof OperationalSchema>
export type Rules = z.infer<typeof RulesSchema>
export type Host = z.infer<typeof HostSchema>
