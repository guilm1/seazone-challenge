export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-sea-foam px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-sea-medium mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-sea-deep mb-2">Imóvel não encontrado</h2>
        <p className="text-gray-500">
          O código do imóvel informado não existe. Verifique o link e tente novamente.
        </p>
      </div>
    </main>
  )
}
