import { describe, it, expect } from 'vitest'
import { PropertySchema, PropertyCodeSchema, OperationalSchema } from '../schemas/property'

const validFLN001 = {
  code: 'FLN001',
  name: 'Apartamento Beira-Mar Florianópolis',
  property_type: 'Apartamento',
  bedroom_quantity: 2,
  bathroom_quantity: 1,
  guest_capacity: 4,
  address: {
    street: 'Rua Lauro Linhares',
    number: '589',
    complement: 'Apto 301',
    neighborhood: 'Trindade',
    city: 'Florianópolis',
    state: 'SC',
    postal_code: '88036-001',
  },
  operational: {
    wifi_network: 'SeaHome_FLN001',
    wifi_password: 'floripa2024',
    is_self_checkin: true,
    property_access_type: 'smart_lock',
    property_access_instructions: 'Use o código 4521 na fechadura eletrônica',
    property_password: '4521',
    has_parking_spot: true,
    parking_spot_identifier: 'Vaga 12 — subsolo B1',
    parking_spot_instructions: 'Portão lateral, código 7890 no interfone',
  },
  rules: {
    check_in_time: '15:00',
    check_out_time: '11:00',
    allow_pet: false,
    smoking_permitted: false,
    suitable_for_children: true,
    suitable_for_babies: true,
    events_permitted: false,
  },
  amenities: { wifi: true, tv: true, air_conditioning: true, kitchen: true },
  images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
  host: { name: 'Ana Paula', phone: '+5548991234567' },
}

describe('PropertyCodeSchema', () => {
  it('accepts valid codes', () => {
    expect(() => PropertyCodeSchema.parse('FLN001')).not.toThrow()
    expect(() => PropertyCodeSchema.parse('GRM001')).not.toThrow()
    expect(() => PropertyCodeSchema.parse('SP010')).not.toThrow()
  })

  it('rejects lowercase codes', () => {
    expect(() => PropertyCodeSchema.parse('fln001')).toThrow()
  })

  it('rejects codes without digits', () => {
    expect(() => PropertyCodeSchema.parse('FLNABC')).toThrow()
  })

  it('rejects too-short prefixes', () => {
    expect(() => PropertyCodeSchema.parse('F001')).toThrow()
  })

  it('rejects empty string', () => {
    expect(() => PropertyCodeSchema.parse('')).toThrow()
  })
})

describe('PropertySchema', () => {
  it('parses a valid FLN001-like property', () => {
    const result = PropertySchema.parse(validFLN001)
    expect(result.code).toBe('FLN001')
    expect(result.address.complement).toBe('Apto 301')
  })

  it('accepts null complement', () => {
    const property = { ...validFLN001, address: { ...validFLN001.address, complement: null } }
    const result = PropertySchema.parse(property)
    expect(result.address.complement).toBeNull()
  })

  it('accepts missing parking_spot_identifier (GRM001 case)', () => {
    const grm = {
      ...validFLN001,
      code: 'GRM001',
      operational: {
        ...validFLN001.operational,
        parking_spot_identifier: undefined,
      },
    }
    const result = PropertySchema.parse(grm)
    expect(result.operational.parking_spot_identifier).toBeUndefined()
  })

  it('accepts varied amenity keys', () => {
    const property = { ...validFLN001, amenities: { bbq_grill: true, dishwasher: true, wifi: true } }
    const result = PropertySchema.parse(property)
    expect(result.amenities['bbq_grill']).toBe(true)
  })

  it('rejects negative bedroom count', () => {
    expect(() => PropertySchema.parse({ ...validFLN001, bedroom_quantity: -1 })).toThrow()
  })

  it('rejects invalid image URL', () => {
    expect(() => PropertySchema.parse({ ...validFLN001, images: ['not-a-url'] })).toThrow()
  })
})

describe('OperationalSchema', () => {
  it('accepts all valid property_access_type values', () => {
    const base = validFLN001.operational
    for (const type of ['smart_lock', 'keybox', 'key', 'other'] as const) {
      expect(() => OperationalSchema.parse({ ...base, property_access_type: type })).not.toThrow()
    }
  })

  it('rejects unknown access type', () => {
    expect(() =>
      OperationalSchema.parse({ ...validFLN001.operational, property_access_type: 'magic' })
    ).toThrow()
  })
})
