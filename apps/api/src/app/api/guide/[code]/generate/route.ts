import { NextRequest, NextResponse } from 'next/server'
import { PropertyCodeSchema } from '@seazone/shared'
import { getPropertyByCode } from '@/services/property.service'
import { startGeneration, saveGuide, saveGuideError, getGuideStatus } from '@/services/guide.service'
import { generateExperienceGuide } from '@/services/ai/guide-generator'
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
  if (!rateLimit(`guide:${ip}`, 5, 60_000)) {
    return NextResponse.json(
      { error: 'Muitas requisições. Tente novamente em breve.' },
      { status: 429, headers: corsHeaders() }
    )
  }

  try {
    const property = await getPropertyByCode(parsed.data)
    if (!property) {
      return NextResponse.json({ error: 'Imóvel não encontrado' }, { status: 404, headers: corsHeaders() })
    }

    // Check if already generated or generating
    const current = await getGuideStatus(parsed.data)
    if (current.status === 'ready') {
      return NextResponse.json(current, { headers: corsHeaders() })
    }
    if (current.status === 'generating') {
      return NextResponse.json(current, { status: 202, headers: corsHeaders() })
    }

    await startGeneration(parsed.data)

    try {
      const guide = await generateExperienceGuide(property)
      await saveGuide(parsed.data, guide)
      return NextResponse.json({ status: 'ready', guide }, { headers: corsHeaders() })
    } catch (aiError) {
      const message = aiError instanceof Error ? aiError.message : 'Falha na geração do guia'
      await saveGuideError(parsed.data, message)
      return NextResponse.json(
        { status: 'error', error: 'Não foi possível gerar o guia. Tente novamente.' },
        { status: 500, headers: corsHeaders() }
      )
    }
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500, headers: corsHeaders() })
  }
}
