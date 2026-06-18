export default function Loading() {
  return (
    <main>
      {/* Hero skeleton */}
      <div className="w-full h-72 md:h-96 bg-sea-deep animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        <div className="absolute bottom-6 left-5 md:left-10 right-5 md:right-10 space-y-3">
          <div className="h-5 w-24 bg-white/20 rounded-full" />
          <div className="h-8 w-3/4 bg-white/20 rounded-xl" />
          <div className="flex gap-4">
            <div className="h-4 w-20 bg-white/20 rounded-full" />
            <div className="h-4 w-20 bg-white/20 rounded-full" />
            <div className="h-4 w-20 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Amenities skeleton */}
        <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-card">
          <div className="h-6 w-40 bg-gray-200 rounded-lg animate-pulse mb-4" />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 bg-sea-light rounded-xl animate-pulse" />
            ))}
          </div>
        </div>

        {/* Access info skeleton */}
        <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-card">
          <div className="h-6 w-48 bg-gray-200 rounded-lg animate-pulse mb-4" />
          <div className="h-24 bg-sea-light rounded-xl animate-pulse mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>

        {/* Rules skeleton */}
        <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-card">
          <div className="h-6 w-44 bg-gray-200 rounded-lg animate-pulse mb-4" />
          <div className="flex gap-4 mb-4">
            <div className="flex-1 h-20 bg-sea-light rounded-xl animate-pulse" />
            <div className="flex-1 h-20 bg-sea-light rounded-xl animate-pulse" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-gray-100">
              <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Contact skeleton */}
        <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-card">
          <div className="h-6 w-48 bg-gray-200 rounded-lg animate-pulse mb-4" />
          <div className="h-16 bg-sea-light rounded-xl animate-pulse mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>

        {/* Guide skeleton */}
        <div className="rounded-xl bg-white border border-gray-200 p-8 shadow-card flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-36 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </main>
  )
}
