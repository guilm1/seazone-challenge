'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-sea-foam px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-semibold text-sea-deep mb-2">Algo deu errado</h2>
        <p className="text-gray-500 mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-sea-medium text-white rounded-xl hover:bg-sea-deep transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </main>
  )
}
