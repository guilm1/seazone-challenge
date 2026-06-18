import { NextRequest, NextResponse } from 'next/server'
import { PropertyCodeSchema } from '@seazone/shared'
import { getPropertyByCode } from '@/services/property.service'
import { startGeneration, saveGuide, saveGuideError, getGuideStatus } from '@/services/guide.service'
import { generateExperienceGuide } from '@/services/ai/guide-generator'
import { corsHeaders, handleOptions } from '@/lib/cors'
import { rateLimit } from '@/lib/rate-limit'

const VALID_LANGUAGES = new Set(['pt', 'en', 'es'])

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

  const lang = req.nextUrl.searchParams.get('lang') ?? 'pt'
  if (!VALID_LANGUAGES.has(lang)) {
    return NextResponse.json({ error: 'Idioma inválido' }, { status: 400, headers: corsHeaders() })
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

    const current = await getGuideStatus(parsed.data, lang)
    if (current.status === 'ready') {
      return NextResponse.json(current, { headers: corsHeaders() })
    }
    if (current.status === 'generating') {
      return NextResponse.json(current, { status: 202, headers: corsHeaders() })
    }

    await startGeneration(parsed.data, lang)

    try {
      const guide = await generateExperienceGuide(property, lang)
      await saveGuide(parsed.data, lang, guide)
      return NextResponse.json({ status: 'ready', guide }, { headers: corsHeaders() })
    } catch {
      await saveGuideError(parsed.data, lang, 'Não foi possível gerar o guia. Tente novamente.')
      return NextResponse.json(
        { status: 'error', error: 'Não foi possível gerar o guia. Tente novamente.' },
        { status: 500, headers: corsHeaders() }
      )
    }
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500, headers: corsHeaders() })
  }
}
