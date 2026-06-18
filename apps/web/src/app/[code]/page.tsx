import { notFound } from 'next/navigation'
import { fetchProperty } from '@/lib/api'
import GuidebookTemplate from '@/components/templates/GuidebookTemplate'

interface PageProps {
  params: { code: string }
}

export async function generateMetadata({ params }: PageProps) {
  const property = await fetchProperty(params.code.toUpperCase())
  if (!property) return { title: 'Imóvel não encontrado' }
  return {
    title: `${property.name} | Guia do Hóspede Seazone`,
    description: `Guia completo para sua estadia em ${property.address.city} - ${property.address.state}`,
  }
}

export default async function GuidebookPage({ params }: PageProps) {
  const property = await fetchProperty(params.code.toUpperCase())

  if (!property) {
    notFound()
  }

  return <GuidebookTemplate property={property} />
}
