import { NextRequest, NextResponse } from 'next/server'
import { PropertyCodeSchema, ChatRequestSchema } from '@seazone/shared'
import { getPropertyByCode } from '@/services/property.service'
import { getGuideStatus } from '@/services/guide.service'
import { streamChatResponse } from '@/services/ai/chat-assistant'
import { corsHeaders, handleOptions } from '@/lib/cors'
import { rateLimit } from '@/lib/rate-limit'

export async function OPTIONS() {
  return handleOptions()
}

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const parsed = PropertyCodeSchema.safeParse(params.code.toUpperCase())
  if (!parsed.success) {
    return NextResponse.json({ error: 'Código inválido' }, { status: 400, headers: corsHeaders() })
  }

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!rateLimit(`chat:${ip}`, 20, 60_000)) {
    return NextResponse.json(
      { error: 'Muitas requisições. Tente novamente em breve.' },
      { status: 429, headers: corsHeaders() }
    )
  }

  try {
    const body = await req.json()
    const chatParsed = ChatRequestSchema.safeParse(body)
    if (!chatParsed.success) {
      return NextResponse.json(
        { error: 'Requisição inválida', details: chatParsed.error.flatten() },
        { status: 400, headers: corsHeaders() }
      )
    }

    const property = await getPropertyByCode(parsed.data)
    if (!property) {
      return NextResponse.json({ error: 'Imóvel não encontrado' }, { status: 404, headers: corsHeaders() })
    }

    const language = chatParsed.data.language ?? 'pt'
    const guideStatus = await getGuideStatus(parsed.data, language)
    const guide = guideStatus.status === 'ready' ? guideStatus.guide : null

    const stream = await streamChatResponse(property, guide, chatParsed.data.messages, language)

    return new NextResponse(stream, {
      headers: {
        ...corsHeaders(),
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500, headers: corsHeaders() })
  }
}
