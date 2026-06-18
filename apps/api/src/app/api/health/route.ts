import { NextResponse } from 'next/server'
import { corsHeaders } from '@/lib/cors'

export async function GET() {
  return NextResponse.json(
    { status: 'ok', timestamp: new Date().toISOString() },
    { headers: corsHeaders() }
  )
}
