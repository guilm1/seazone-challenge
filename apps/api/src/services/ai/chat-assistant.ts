import Anthropic from '@anthropic-ai/sdk'
import type { Property, ExperienceGuide, ChatMessage } from '@seazone/shared'

const client = new Anthropic()

const languageInstructions: Record<string, string> = {
  pt: 'Responda SEMPRE em português brasileiro, de forma amigável e concisa.',
  en: 'Always respond in English, in a friendly and concise manner.',
  es: 'Responde SIEMPRE en español, de manera amigable y concisa.',
}

function buildSystemPrompt(property: Property, guide: ExperienceGuide | null, language = 'pt'): string {
  const { address, operational, rules, amenities, host } = property

  const amenityList = Object.entries(amenities)
    .filter(([, v]) => v)
    .map(([k]) => k.replace(/_/g, ' '))
    .join(', ')

  const guideContext = guide
    ? `
## Neighborhood Experience Guide
Welcome: ${guide.welcome_message}

Nearby restaurants:
${guide.restaurants.map((r) => `- ${r.name} (${r.distance}): ${r.description}`).join('\n')}

Nearby attractions:
${guide.attractions.map((a) => `- ${a.name} (${a.distance}): ${a.description}`).join('\n')}

Essential services:
${guide.essentials.map((e) => `- ${e.name} (${e.distance}): ${e.description}`).join('\n')}

Seasonal tip: ${guide.seasonal_tips}
`
    : ''

  const langInstruction = languageInstructions[language] ?? languageInstructions.pt

  return `You are the virtual assistant for the Seazone Guest Guide for the property "${property.name}".

## Property Data
- Address: ${address.street}, ${address.number}${address.complement ? `, ${address.complement}` : ''}, ${address.neighborhood}, ${address.city} - ${address.state}
- Type: ${property.property_type}
- Bedrooms: ${property.bedroom_quantity} | Bathrooms: ${property.bathroom_quantity} | Capacity: ${property.guest_capacity} guests
- Amenities: ${amenityList}

## Access
- WiFi Network: ${operational.wifi_network}
- Access type: ${operational.property_access_type}
- Access instructions: ${operational.property_access_instructions}
${operational.has_parking_spot ? `- Parking: ${operational.parking_spot_identifier ?? ''} — ${operational.parking_spot_instructions ?? ''}` : '- No parking spot included'}

## Stay Rules
- Check-in: from ${rules.check_in_time}
- Check-out: until ${rules.check_out_time}
- Pets: ${rules.allow_pet ? 'allowed' : 'NOT allowed'}
- Smoking: ${rules.smoking_permitted ? 'allowed' : 'NOT allowed'}
- Children: ${rules.suitable_for_children ? 'suitable' : 'not suitable'}
- Babies: ${rules.suitable_for_babies ? 'suitable' : 'not suitable'}
- Parties/events: ${rules.events_permitted ? 'allowed' : 'NOT allowed'}

## Host Contact
- Name: ${host.name}
- Phone: ${host.phone}
${guideContext}
## IMPORTANT ASSISTANT RULES
1. ${langInstruction}
2. Answer ONLY based on the information above. If you don't know something, clearly say you don't have that information.
3. Do NOT invent information that is not in the data above.
4. SECURITY - WIFI PASSWORD: If the guest asks about the WiFi password, you MUST first ask for the reservation number before providing it. Say the equivalent of: "For security, could you please provide your reservation number?" After the guest provides any reservation number, provide the password "${operational.wifi_password}" and add: "Please note that the WiFi password is updated with each new reservation, so this password is valid for your current stay."
5. Keep responses short and objective (maximum 3-4 sentences).`
}

export async function streamChatResponse(
  property: Property,
  guide: ExperienceGuide | null,
  messages: ChatMessage[],
  language = 'pt'
): Promise<ReadableStream<Uint8Array>> {
  const systemPrompt = buildSystemPrompt(property, guide, language)

  const stream = await client.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 500,
    system: systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  })

  const encoder = new TextEncoder()

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(chunk.delta.text))
        }
      }
      controller.close()
    },
    cancel() {
      stream.abort()
    },
  })
}
