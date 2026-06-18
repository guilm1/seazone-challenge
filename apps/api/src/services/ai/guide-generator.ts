import Anthropic from '@anthropic-ai/sdk'
import { ExperienceGuideSchema, type ExperienceGuide, type Property } from '@seazone/shared'

const client = new Anthropic()

const localeMap: Record<string, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
}

const systemPrompts: Record<string, string> = {
  pt: `Você é um especialista local em turismo e gastronomia brasileiro.
Gera guias de experiências para hóspedes de temporada.
Responda SEMPRE em JSON válido, sem markdown, sem texto extra.
Use APENAS estabelecimentos e locais REAIS que existem ou existiram nessa cidade/bairro.
Responda em português brasileiro.`,

  en: `You are a local tourism and gastronomy expert.
You generate experience guides for short-term rental guests.
Respond ALWAYS in valid JSON, without markdown, without extra text.
Use ONLY REAL establishments and places that exist or have existed in this city/neighborhood.
Respond in English.`,

  es: `Eres un experto local en turismo y gastronomía.
Generas guías de experiencias para huéspedes de alquiler temporal.
Responde SIEMPRE en JSON válido, sin markdown, sin texto extra.
Usa SOLO establecimientos y lugares REALES que existen o han existido en esta ciudad/barrio.
Responde en español.`,
}

const userPromptTemplates: Record<string, (name: string, address: string, month: string) => string> = {
  pt: (name, address, month) => `Gere um guia de experiências para hóspedes do imóvel "${name}" localizado em:
${address}

O guia deve ser contextualizado para o mês de ${month}.

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
  "seasonal_tips": "dica sazonal relevante para ${month} nesta cidade"
}

Regras:
- restaurants: exatamente 4-5 itens, reais, próximos ao endereço
- attractions: exatamente 3-4 itens, reais
- essentials: mínimo 3 itens (pelo menos 1 pharmacy, 1 supermarket, 1 hospital)
- Distâncias aproximadas a partir do endereço fornecido
- Todos os estabelecimentos devem ser REAIS, verificáveis`,

  en: (name, address, month) => `Generate an experience guide for guests of the property "${name}" located at:
${address}

The guide should be contextualized for the month of ${month}.

Return a JSON with EXACTLY this structure (no extra fields):
{
  "welcome_message": "personalized welcome message for this property and neighborhood (2-3 sentences)",
  "restaurants": [
    { "name": "real name", "distance": "Approx. X km", "description": "description in 1 sentence" }
  ],
  "attractions": [
    { "name": "real name", "distance": "Approx. X km", "description": "description in 1 sentence" }
  ],
  "essentials": [
    { "name": "real name", "type": "pharmacy|supermarket|hospital", "distance": "Approx. X meters/km", "description": "description in 1 sentence" }
  ],
  "seasonal_tips": "seasonal tip relevant for ${month} in this city"
}

Rules:
- restaurants: exactly 4-5 items, real, close to the address
- attractions: exactly 3-4 items, real
- essentials: minimum 3 items (at least 1 pharmacy, 1 supermarket, 1 hospital)
- Approximate distances from the provided address
- All establishments must be REAL and verifiable`,

  es: (name, address, month) => `Genera una guía de experiencias para huéspedes de la propiedad "${name}" ubicada en:
${address}

La guía debe estar contextualizada para el mes de ${month}.

Devuelve un JSON con EXACTAMENTE esta estructura (sin campos adicionales):
{
  "welcome_message": "mensaje de bienvenida personalizado para esta propiedad y barrio (2-3 frases)",
  "restaurants": [
    { "name": "nombre real", "distance": "Aprox. X km", "description": "descripción en 1 frase" }
  ],
  "attractions": [
    { "name": "nombre real", "distance": "Aprox. X km", "description": "descripción en 1 frase" }
  ],
  "essentials": [
    { "name": "nombre real", "type": "pharmacy|supermarket|hospital", "distance": "Aprox. X metros/km", "description": "descripción en 1 frase" }
  ],
  "seasonal_tips": "consejo estacional relevante para ${month} en esta ciudad"
}

Reglas:
- restaurants: exactamente 4-5 elementos, reales, cercanos a la dirección
- attractions: exactamente 3-4 elementos, reales
- essentials: mínimo 3 elementos (al menos 1 pharmacy, 1 supermarket, 1 hospital)
- Distancias aproximadas desde la dirección proporcionada
- Todos los establecimientos deben ser REALES y verificables`,
}

export async function generateExperienceGuide(property: Property, language = 'pt'): Promise<ExperienceGuide> {
  const { address, name } = property
  const locale = localeMap[language] ?? 'pt-BR'
  const currentMonth = new Date().toLocaleString(locale, { month: 'long' })
  const fullAddress = `${address.street}, ${address.number}${address.complement ? `, ${address.complement}` : ''}, ${address.neighborhood}, ${address.city} - ${address.state}, CEP ${address.postal_code}`

  const systemPrompt = systemPrompts[language] ?? systemPrompts.pt
  const buildUserPrompt = userPromptTemplates[language] ?? userPromptTemplates.pt
  const userPrompt = buildUserPrompt(name, fullAddress, currentMonth)

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  const jsonText = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()

  const parsed = JSON.parse(jsonText)
  return ExperienceGuideSchema.parse(parsed)
}
