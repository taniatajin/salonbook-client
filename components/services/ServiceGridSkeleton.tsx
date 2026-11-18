export default function ServiceGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-rose-100 bg-white"
        >
          <div className="h-48 bg-stone-200" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-24 rounded-full bg-stone-200" />
            <div className="h-5 w-3/4 rounded bg-stone-200" />
            <div className="h-4 w-full rounded bg-stone-200" />
            <div className="h-4 w-2/3 rounded bg-stone-200" />
            <div className="h-10 w-full rounded-lg bg-stone-200" />
          </div>
        </div>
      ))}
    </div>
  );
}