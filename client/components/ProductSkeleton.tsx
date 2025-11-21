export function ProductSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="relative rounded-[10px] overflow-hidden mb-3 bg-gray-200 aspect-[183/244] animate-pulse" />
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
