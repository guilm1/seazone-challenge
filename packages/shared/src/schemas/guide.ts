import { z } from 'zod'

export const RestaurantSchema = z.object({
  name: z.string(),
  distance: z.string(),
  description: z.string(),
})

export const AttractionSchema = z.object({
  name: z.string(),
  distance: z.string(),
  description: z.string(),
})

export const EssentialSchema = z.object({
  name: z.string(),
  type: z.string(),
  distance: z.string(),
  description: z.string(),
})

export const ExperienceGuideSchema = z.object({
  welcome_message: z.string(),
  restaurants: z.array(RestaurantSchema).min(4).max(5),
  attractions: z.array(AttractionSchema).min(3).max(4),
  essentials: z.array(EssentialSchema).min(2),
  seasonal_tips: z.string(),
})

export type ExperienceGuide = z.infer<typeof ExperienceGuideSchema>
export type Restaurant = z.infer<typeof RestaurantSchema>
export type Attraction = z.infer<typeof AttractionSchema>
export type Essential = z.infer<typeof EssentialSchema>
