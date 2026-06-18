'use client'

import { useState, useRef, useEffect } from 'react'
import { streamChat } from '@/lib/api'
import ChatMessage from '../molecules/ChatMessage'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'

interface ChatWidgetProps {
  propertyCode: string
}

type Message = { role: 'user' | 'assistant'; content: string }

const SUGGESTED_QUESTIONS = [
  'Qual a senha do WiFi?',
  'Posso trazer meu cachorro?',
  'A que horas posso fazer check-in?',
  'Que restaurantes ficam perto?',
]

export default function ChatWidget({ propertyCode }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  async function handleSend(content: string) {
    if (!content.trim() || isLoading) return

    const newMessages: Message[] = [...messages, { role: 'user' as const, content: content.trim() }]
    setMessages(newMessages)
    setInputValue('')
    setIsLoading(true)

    try {
      const reader = await streamChat(propertyCode, newMessages)
      let assistantMessage = ''
      setMessages([...newMessages, { role: 'assistant', content: '' }])

      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        assistantMessage += decoder.decode(value, { stream: true })
        setMessages([...newMessages, { role: 'assistant', content: assistantMessage }])
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Desculpe, ocorreu um erro. Tente novamente.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(inputValue)
    }
  }

  const chatContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0 rounded-t-xl">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-sea-deep flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-sea-deep">Assistente Virtual</p>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
              Online
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Fechar chat"
        >
          <Icon name="x" size={18} />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center gap-4 pt-4">
            <div className="h-14 w-14 rounded-full bg-sea-deep flex items-center justify-center">
              <span className="text-white text-xl font-bold">S</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-sea-deep">Olá! Sou o assistente virtual</p>
              <p className="text-xs text-gray-500 mt-1">Posso responder suas dúvidas sobre a estadia</p>
            </div>
            <div className="w-full space-y-2 mt-2">
              <p className="text-xs text-gray-400 text-center font-medium">Perguntas frequentes:</p>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="w-full text-left text-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sea-deep hover:bg-sea-light hover:border-sea-medium/30 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                role={msg.role}
                content={msg.content}
                isStreaming={isLoading && i === messages.length - 1 && msg.role === 'assistant'}
              />
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 p-3 border-t border-gray-100 bg-white flex-shrink-0 rounded-b-xl">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua dúvida..."
          disabled={isLoading}
          className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sea-deep placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sea-medium/30 focus:border-sea-medium disabled:opacity-50"
        />
        <button
          onClick={() => handleSend(inputValue)}
          disabled={!inputValue.trim() || isLoading}
          className="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-b from-[hsl(220,100%,50%)] to-[hsl(220,100%,35%)] text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Enviar mensagem"
        >
          <Icon name="send" size={16} />
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile: full-screen drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col md:hidden bg-gray-50">
          {chatContent}
        </div>
      )}

      {/* Desktop: floating panel */}
      {isOpen && (
        <div
          className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col rounded-xl border border-gray-200 shadow-elevated overflow-hidden"
          style={{ width: '400px', height: '600px' }}
        >
          {chatContent}
        </div>
      )}

      {/* Trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto md:rounded-full z-40 bg-gradient-to-b from-[hsl(220,100%,50%)] to-[hsl(220,100%,35%)] text-white shadow-elevated transition-all hover:opacity-90 md:h-14 md:w-14 md:flex md:items-center md:justify-center"
          aria-label="Abrir assistente virtual"
        >
          {/* Mobile bar */}
          <div className="flex items-center justify-center gap-3 px-4 py-3 md:hidden">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="text-sm font-medium">Assistente Virtual — Tire suas dúvidas</span>
            <Icon name="chevron-down" size={16} className="rotate-180 flex-shrink-0" />
          </div>
          {/* Desktop icon */}
          <span className="hidden md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
        </button>
      )}
    </>
  )
}
