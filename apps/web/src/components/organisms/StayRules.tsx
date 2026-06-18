'use client'

import type { Property } from '@seazone/shared'
import SectionTitle from '../atoms/SectionTitle'
import RuleItem from '../molecules/RuleItem'
import Icon from '../atoms/Icon'
import { useLanguage } from '@/contexts/LanguageContext'

interface StayRulesProps {
  property: Property
}

export default function StayRules({ property }: StayRulesProps) {
  const { t } = useLanguage()
  const { rules } = property

  return (
    <section className="rounded-xl bg-white border border-gray-200 p-6 shadow-card">
      <SectionTitle title={t('rules.title')} icon="clock" />

      <div className="mt-4">
        {/* Check-in/out times */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 rounded-xl bg-sea-light p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1 text-sea-medium">
              <Icon name="clock" size={16} />
              <span className="text-xs font-medium text-gray-500">Check-in</span>
            </div>
            <span className="text-lg font-bold text-sea-deep">{rules.check_in_time}</span>
          </div>
          <div className="flex-1 rounded-xl bg-sea-light p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1 text-sea-medium">
              <Icon name="clock" size={16} />
              <span className="text-xs font-medium text-gray-500">Check-out</span>
            </div>
            <span className="text-lg font-bold text-sea-deep">{rules.check_out_time}</span>
          </div>
        </div>

        {/* Rules list */}
        <div className="divide-y divide-gray-100">
          <RuleItem
            label={t('rules.pets')}
            value={rules.allow_pet}
            allowedText={t('rules.allowed')}
            notAllowedText={t('rules.notAllowed')}
          />
          <RuleItem
            label={t('rules.smoking')}
            value={rules.smoking_permitted}
            allowedText={t('rules.allowed')}
            notAllowedText={t('rules.notAllowed')}
          />
          <RuleItem
            label={t('rules.children')}
            value={rules.suitable_for_children}
            allowedText={t('rules.yes')}
            notAllowedText={t('rules.notRecommended')}
          />
          <RuleItem
            label={t('rules.babies')}
            value={rules.suitable_for_babies}
            allowedText={t('rules.yes')}
            notAllowedText={t('rules.notRecommended')}
          />
          <RuleItem
            label={t('rules.events')}
            value={rules.events_permitted}
            allowedText={t('rules.allowed')}
            notAllowedText={t('rules.notAllowed')}
          />
        </div>
      </div>
    </section>
  )
}
