import { describe, it, expect } from 'vitest'
import { ExperienceGuideSchema, ChatRequestSchema } from '../index'

const validGuide = {
  welcome_message: 'Bem-vindo ao bairro!',
  restaurants: [
    { name: 'Box 32', distance: 'Aprox. 1,2 km', description: 'Boteco tradicional.' },
    { name: 'Armazém Vieira', distance: 'Aprox. 2,5 km', description: 'Frutos do mar.' },
    { name: 'Taco Bell', distance: 'Aprox. 3 km', description: 'Fast food.' },
    { name: 'Ostradamus', distance: 'Aprox. 4 km', description: 'Ostras frescas.' },
  ],
  attractions: [
    { name: 'Praia da Joaquina', distance: 'Aprox. 18 km', description: 'Dunas e surf.' },
    { name: 'Lagoa da Conceição', distance: 'Aprox. 12 km', description: 'Lagoa famosa.' },
    { name: 'Ponte Hercílio Luz', distance: 'Aprox. 5 km', description: 'Cartão postal.' },
  ],
  essentials: [
    { name: 'Farmácia Catarinense', type: 'pharmacy', distance: 'Aprox. 300 metros', description: 'Farmácia 24h.' },
    { name: 'Supermercado Imperatriz', type: 'supermarket', distance: 'Aprox. 1 km', description: 'Grande variedade.' },
  ],
  seasonal_tips: 'Em junho as temperaturas ficam entre 14°C e 20°C.',
}

describe('ExperienceGuideSchema', () => {
  it('parses a valid guide', () => {
    const result = ExperienceGuideSchema.parse(validGuide)
    expect(result.restaurants).toHaveLength(4)
    expect(result.essentials[0].type).toBe('pharmacy')
  })

  it('rejects fewer than 4 restaurants', () => {
    const guide = { ...validGuide, restaurants: validGuide.restaurants.slice(0, 3) }
    expect(() => ExperienceGuideSchema.parse(guide)).toThrow()
  })

  it('rejects more than 5 restaurants', () => {
    const guide = {
      ...validGuide,
      restaurants: [...validGuide.restaurants, ...validGuide.restaurants, { name: 'Extra', distance: '1km', description: 'desc' }],
    }
    expect(() => ExperienceGuideSchema.parse(guide)).toThrow()
  })

  it('rejects fewer than 3 attractions', () => {
    const guide = { ...validGuide, attractions: validGuide.attractions.slice(0, 2) }
    expect(() => ExperienceGuideSchema.parse(guide)).toThrow()
  })

  it('accepts any string as essential type', () => {
    const guide = {
      ...validGuide,
      essentials: [
        ...validGuide.essentials,
        { name: 'Hospital Regional', type: 'hospital', distance: 'Aprox. 5 km', description: 'Pronto-socorro.' },
      ],
    }
    expect(() => ExperienceGuideSchema.parse(guide)).not.toThrow()
  })
})

describe('ChatRequestSchema', () => {
  it('accepts valid messages', () => {
    const result = ChatRequestSchema.parse({
      messages: [{ role: 'user', content: 'Qual a senha do WiFi?' }],
    })
    expect(result.messages).toHaveLength(1)
  })

  it('rejects empty messages array', () => {
    expect(() => ChatRequestSchema.parse({ messages: [] })).toThrow()
  })

  it('rejects empty content', () => {
    expect(() =>
      ChatRequestSchema.parse({ messages: [{ role: 'user', content: '' }] })
    ).toThrow()
  })

  it('rejects content exceeding 2000 chars', () => {
    expect(() =>
      ChatRequestSchema.parse({ messages: [{ role: 'user', content: 'a'.repeat(2001) }] })
    ).toThrow()
  })

  it('rejects invalid role', () => {
    expect(() =>
      ChatRequestSchema.parse({ messages: [{ role: 'system', content: 'hi' }] })
    ).toThrow()
  })

  it('rejects more than 20 messages', () => {
    const messages = Array.from({ length: 21 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: 'msg',
    }))
    expect(() => ChatRequestSchema.parse({ messages })).toThrow()
  })
})
