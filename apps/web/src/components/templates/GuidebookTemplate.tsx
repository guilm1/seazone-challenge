import type { Property } from '@seazone/shared'
import PropertyHeader from '../organisms/PropertyHeader'
import AmenitiesSection from '../organisms/AmenitiesSection'
import AccessInfo from '../organisms/AccessInfo'
import StayRules from '../organisms/StayRules'
import ContactSection from '../organisms/ContactSection'
import ExperienceGuide from '../organisms/ExperienceGuide'
import ChatWidget from '../organisms/ChatWidget'

interface GuidebookTemplateProps {
  property: Property
}

export default function GuidebookTemplate({ property }: GuidebookTemplateProps) {
  return (
    <main>
      <PropertyHeader property={property} />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-24 md:pb-8">
        <AmenitiesSection amenities={property.amenities} />
        <AccessInfo property={property} />
        <StayRules property={property} />
        <ContactSection property={property} />
        <ExperienceGuide propertyCode={property.code} />
      </div>
      <ChatWidget propertyCode={property.code} />
    </main>
  )
}
