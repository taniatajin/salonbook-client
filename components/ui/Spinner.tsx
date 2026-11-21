export default function Spinner({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-rose-200 border-t-rose-600 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}