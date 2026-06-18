import type { Property, ExperienceGuide } from '@seazone/shared'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export type GuideResponse =
  | { status: 'ready'; guide: ExperienceGuide }
  | { status: 'generating' }
  | { status: 'not_found' }
  | { status: 'error'; error: string }

export async function fetchProperty(code: string): Promise<Property | null> {
  const res = await fetch(`${API_URL}/api/properties/${code}`, { next: { revalidate: 300 } })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch property')
  return res.json()
}

export async function fetchGuide(code: string): Promise<GuideResponse> {
  const res = await fetch(`${API_URL}/api/guide/${code}`, { cache: 'no-store' })
  if (!res.ok) return { status: 'error', error: 'Falha ao buscar guia' }
  return res.json()
}

export async function generateGuide(code: string): Promise<GuideResponse> {
  const res = await fetch(`${API_URL}/api/guide/${code}/generate`, { method: 'POST', cache: 'no-store' })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return { status: 'error', error: (err as { error?: string }).error ?? 'Falha ao gerar guia' }
  }
  return res.json()
}

export async function streamChat(
  code: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<ReadableStreamDefaultReader<Uint8Array>> {
  const res = await fetch(`${API_URL}/api/chat/${code}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })
  if (!res.ok) throw new Error('Chat request failed')
  return res.body!.getReader()
}
