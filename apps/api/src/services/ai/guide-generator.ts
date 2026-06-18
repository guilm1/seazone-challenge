import Anthropic from '@anthropic-ai/sdk'
import { ExperienceGuideSchema, type ExperienceGuide, type Property } from '@seazone/shared'

const client = new Anthropic()

export async function generateExperienceGuide(property: Property): Promise<ExperienceGuide> {
  const { address, name } = property
  const currentMonth = new Date().toLocaleString('pt-BR', { month: 'long' })
  const fullAddress = `${address.street}, ${address.number}${address.complement ? `, ${address.complement}` : ''}, ${address.neighborhood}, ${address.city} - ${address.state}, CEP ${address.postal_code}`

  const systemPrompt = `Você é um especialista local em turismo e gastronomia brasileiro.
Gera guias de experiências para hóspedes de temporada.
Responda SEMPRE em JSON válido, sem markdown, sem texto extra.
Use APENAS estabelecimentos e locais REAIS que existem ou existiram nessa cidade/bairro.
Responda em português brasileiro.`

  const userPrompt = `Gere um guia de experiências para hóspedes do imóvel "${name}" localizado em:
${fullAddress}

O guia deve ser contextualizado para o mês de ${currentMonth}.

Retorne um JSON com EXATAMENTE esta estrutura (sem campos extras):
{
  "welcome_message": "mensagem de boas-vindas personalizada para este imóvel e bairro (2-3 frases)",
  "restaurants": [
    { "name": "nome real", "distance": "Aprox. X km", "description": "descrição em 1 frase" }
  ],
  "attractions": [
    { "name": "nome real", "distance": "Aprox. X km", "description": "descrição em 1 frase" }
  ],
  "essentials": [
    { "name": "nome real", "type": "pharmacy|supermarket|hospital", "distance": "Aprox. X metros/km", "description": "descrição em 1 frase" }
  ],
  "seasonal_tips": "dica sazonal relevante para ${currentMonth} nesta cidade"
}

Regras:
- restaurants: exatamente 4-5 itens, reais, próximos ao endereço
- attractions: exatamente 3-4 itens, reais
- essentials: mínimo 3 itens (pelo menos 1 pharmacy, 1 supermarket, 1 hospital)
- Distâncias aproximadas a partir do endereço fornecido
- Todos os estabelecimentos devem ser REAIS, verificáveis`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  // Strip markdown code blocks if present
  const jsonText = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()

  const parsed = JSON.parse(jsonText)
  return ExperienceGuideSchema.parse(parsed)
}
