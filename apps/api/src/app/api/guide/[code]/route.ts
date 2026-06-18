import { NextRequest, NextResponse } from 'next/server'
import { PropertyCodeSchema } from '@seazone/shared'
import { getGuideStatus } from '@/services/guide.service'
import { getPropertyByCode } from '@/services/property.service'
import { corsHeaders, handleOptions } from '@/lib/cors'

export async function OPTIONS() {
  return handleOptions()
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  const parsed = PropertyCodeSchema.safeParse(params.code.toUpperCase())
  if (!parsed.success) {
    return NextResponse.json({ error: 'Código inválido' }, { status: 400, headers: corsHeaders() })
  }

  try {
    const property = await getPropertyByCode(parsed.data)
    if (!property) {
      return NextResponse.json({ error: 'Imóvel não encontrado' }, { status: 404, headers: corsHeaders() })
    }

    const result = await getGuideStatus(parsed.data)
    return NextResponse.json(result, { headers: corsHeaders() })
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500, headers: corsHeaders() })
  }
}
