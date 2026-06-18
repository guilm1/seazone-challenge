'use client'

import { useState } from 'react'
import type { Property } from '@seazone/shared'
import SectionTitle from '../atoms/SectionTitle'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'

interface AccessInfoProps {
  property: Property
}

const accessTypeLabels: Record<string, string> = {
  smart_lock: 'Fechadura Inteligente',
  keybox: 'Cofre de Chaves',
  key: 'Chave Física',
  other: 'Outro',
}

export default function AccessInfo({ property }: AccessInfoProps) {
  const [showWifiPassword, setShowWifiPassword] = useState(false)
  const { operational } = property

  return (
    <section className="rounded-xl bg-white border border-gray-200 p-6 shadow-card">
      <SectionTitle title="Acesso e Informações" icon="key" />

      <div className="mt-4 space-y-5">
        {/* WiFi */}
        <div className="rounded-xl bg-sea-light p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="wifi" size={18} className="text-sea-medium" />
            <span className="font-semibold text-sea-deep text-sm">WiFi</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Rede</span>
              <span className="text-sm font-medium text-sea-deep">{operational.wifi_network}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Senha</span>
              {showWifiPassword ? (
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-mono font-medium text-sea-deep">
                    {operational.wifi_password}
                  </span>
                  <p className="text-xs text-gray-500 text-right max-w-[200px]">
                    Caso o assistente virtual solicite, informe seu número de reserva para confirmar.
                  </p>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowWifiPassword(true)}
                  className="text-sea-medium text-xs px-2 py-1"
                >
                  Ver senha do WiFi
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Access method */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-sea-deep text-sm">
              Tipo de Acesso: {accessTypeLabels[operational.property_access_type] ?? operational.property_access_type}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {operational.property_access_instructions}
          </p>
          {operational.property_password && (
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-sea-deep">Código de acesso: </span>
              {operational.property_password}
            </p>
          )}
        </div>

        {/* Parking */}
        {operational.has_parking_spot && (
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="car" size={16} className="text-sea-medium" />
              <span className="font-semibold text-sea-deep text-sm">Estacionamento</span>
            </div>
            {operational.parking_spot_identifier && (
              <p className="text-sm text-gray-600">
                <span className="font-medium text-sea-deep">Vaga: </span>
                {operational.parking_spot_identifier}
              </p>
            )}
            {operational.parking_spot_instructions && (
              <p className="text-sm text-gray-600 mt-1">{operational.parking_spot_instructions}</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
