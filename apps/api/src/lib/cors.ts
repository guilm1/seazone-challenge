import { NextResponse } from 'next/server'

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? 'http://localhost:3000'

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export function handleOptions() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() })
}

export function withCors(response: NextResponse): NextResponse {
  Object.entries(corsHeaders()).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}
