interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

export default function ChatMessage({ role, content, isStreaming = false }: ChatMessageProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-sea-medium px-4 py-2.5 text-white text-sm leading-relaxed shadow-sm">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2.5">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-sea-deep flex items-center justify-center">
        <span className="text-white text-xs font-bold">S</span>
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-sea-deep text-sm leading-relaxed shadow-sm border border-gray-100">
        {content}
        {isStreaming && (
          <span className="inline-block ml-1 h-3 w-0.5 bg-sea-medium animate-pulse" />
        )}
      </div>
    </div>
  )
}
