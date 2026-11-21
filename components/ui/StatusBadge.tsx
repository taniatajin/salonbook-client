const styles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-stone-200 text-stone-700",
  paid: "bg-emerald-100 text-emerald-800",
  unpaid: "bg-rose-100 text-rose-700",
  failed: "bg-red-100 text-red-700",
  active: "bg-emerald-100 text-emerald-800",
  inactive: "bg-stone-200 text-stone-700",
  blocked: "bg-red-100 text-red-700",
};

export default function StatusBadge({ value }: { value: string }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        styles[value] ?? "bg-stone-100 text-stone-700"
      }`}
    >
      {value}
    </span>
  );
}