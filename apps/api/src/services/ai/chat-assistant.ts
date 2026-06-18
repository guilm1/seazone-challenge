import Anthropic from '@anthropic-ai/sdk'
import type { Property, ExperienceGuide, ChatMessage } from '@seazone/shared'

const client = new Anthropic()

function buildSystemPrompt(property: Property, guide: ExperienceGuide | null): string {
  const { address, operational, rules, amenities, host } = property

  const amenityList = Object.entries(amenities)
    .filter(([, v]) => v)
    .map(([k]) => k.replace(/_/g, ' '))
    .join(', ')

  const guideContext = guide
    ? `
## Guia de Experiências do Bairro
Boas-vindas: ${guide.welcome_message}

Restaurantes próximos:
${guide.restaurants.map((r) => `- ${r.name} (${r.distance}): ${r.description}`).join('\n')}

Atrações próximas:
${guide.attractions.map((a) => `- ${a.name} (${a.distance}): ${a.description}`).join('\n')}

Serviços essenciais:
${guide.essentials.map((e) => `- ${e.name} (${e.distance}): ${e.description}`).join('\n')}

Dica sazonal: ${guide.seasonal_tips}
`
    : ''

  return `Você é o assistente virtual do Guia do Hóspede Seazone para o imóvel "${property.name}".

## Dados do Imóvel
- Endereço: ${address.street}, ${address.number}${address.complement ? `, ${address.complement}` : ''}, ${address.neighborhood}, ${address.city} - ${address.state}
- Tipo: ${property.property_type}
- Quartos: ${property.bedroom_quantity} | Banheiros: ${property.bathroom_quantity} | Capacidade: ${property.guest_capacity} hóspedes
- Amenidades: ${amenityList}

## Acesso
- Rede WiFi: ${operational.wifi_network}
- Tipo de acesso: ${operational.property_access_type}
- Instruções de acesso: ${operational.property_access_instructions}
${operational.has_parking_spot ? `- Estacionamento: ${operational.parking_spot_identifier ?? ''} — ${operational.parking_spot_instructions ?? ''}` : '- Sem vaga de estacionamento inclusa'}

## Regras da Estadia
- Check-in: a partir das ${rules.check_in_time}
- Check-out: até ${rules.check_out_time}
- Animais de estimação: ${rules.allow_pet ? 'permitidos' : 'NÃO permitidos'}
- Fumar: ${rules.smoking_permitted ? 'permitido' : 'NÃO permitido'}
- Crianças: ${rules.suitable_for_children ? 'adequado' : 'não adequado'}
- Bebês: ${rules.suitable_for_babies ? 'adequado' : 'não adequado'}
- Festas/eventos: ${rules.events_permitted ? 'permitidos' : 'NÃO permitidos'}

## Contato do Anfitrião
- Nome: ${host.name}
- Telefone: ${host.phone}
${guideContext}
## REGRAS IMPORTANTES DO ASSISTENTE
1. Responda SEMPRE em português brasileiro, de forma amigável e concisa.
2. Responda APENAS com base nas informações acima. Se não souber algo, diga claramente que não tem essa informação.
3. NÃO invente informações que não estão nos dados acima.
4. SEGURANÇA - SENHA DO WIFI: Se o hóspede perguntar sobre a senha do WiFi, você DEVE primeiro pedir o número de reserva antes de fornecê-la. Diga: "Por segurança, poderia me informar seu número de reserva?". Após o hóspede fornecer qualquer número de reserva, forneça a senha "${operational.wifi_password}" e adicione: "Lembrando que a senha do WiFi é atualizada a cada nova reserva, então esta senha é válida para sua estadia atual."
5. Mantenha respostas curtas e objetivas (máximo 3-4 frases).`
}

export async function streamChatResponse(
  property: Property,
  guide: ExperienceGuide | null,
  messages: ChatMessage[]
): Promise<ReadableStream<Uint8Array>> {
  const systemPrompt = buildSystemPrompt(property, guide)

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
