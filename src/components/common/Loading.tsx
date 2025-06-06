export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-6 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-gray-200 rounded flex-1" />
          <div className="h-8 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-8" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}