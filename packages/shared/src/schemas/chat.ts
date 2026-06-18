import { z } from 'zod'

export const ChatRoleSchema = z.enum(['user', 'assistant'])

export const ChatMessageSchema = z.object({
  role: ChatRoleSchema,
  content: z.string().min(1).max(2000),
})

export const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1).max(20),
})

export type ChatRole = z.infer<typeof ChatRoleSchema>
export type ChatMessage = z.infer<typeof ChatMessageSchema>
export type ChatRequest = z.infer<typeof ChatRequestSchema>
