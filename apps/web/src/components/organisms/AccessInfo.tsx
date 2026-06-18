'use client'

import { useState } from 'react'
import type { Property } from '@seazone/shared'
import SectionTitle from '../atoms/SectionTitle'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import { useLanguage } from '@/contexts/LanguageContext'

interface AccessInfoProps {
  property: Property
}

export default function AccessInfo({ property }: AccessInfoProps) {
  const { t } = useLanguage()
  const [showWifiPassword, setShowWifiPassword] = useState(false)
  const { operational } = property

  const accessTypeLabels: Record<string, string> = {
    smart_lock: t('access.smartLock'),
    keybox: t('access.keybox'),
    key: t('access.key'),
    other: t('access.other'),
  }

  return (
    <section className="rounded-xl bg-white border border-gray-200 p-6 shadow-card">
      <SectionTitle title={t('access.title')} icon="key" />

      <div className="mt-4 space-y-5">
        {/* WiFi */}
        <div className="rounded-xl bg-sea-light p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="wifi" size={18} className="text-sea-medium" />
            <span className="font-semibold text-sea-deep text-sm">{t('access.wifi')}</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{t('access.network')}</span>
              <span className="text-sm font-medium text-sea-deep">{operational.wifi_network}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{t('access.password')}</span>
              {showWifiPassword ? (
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-mono font-medium text-sea-deep">
                    {operational.wifi_password}
                  </span>
                  <p className="text-xs text-gray-500 text-right max-w-[200px]">
                    {t('access.wifiNote')}
                  </p>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowWifiPassword(true)}
                  className="text-sea-medium text-xs px-2 py-1"
                >
                  {t('access.showPassword')}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Access method */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-sea-deep text-sm">
              {t('access.type')}: {accessTypeLabels[operational.property_access_type] ?? operational.property_access_type}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {operational.property_access_instructions}
          </p>
          {operational.property_password && (
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-sea-deep">{t('access.code')}: </span>
              {operational.property_password}
            </p>
          )}
        </div>

        {/* Parking */}
        {operational.has_parking_spot && (
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="car" size={16} className="text-sea-medium" />
              <span className="font-semibold text-sea-deep text-sm">{t('access.parking')}</span>
            </div>
            {operational.parking_spot_identifier && (
              <p className="text-sm text-gray-600">
                <span className="font-medium text-sea-deep">{t('access.spot')}: </span>
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
