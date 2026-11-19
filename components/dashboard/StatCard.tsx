import type { IconType } from "react-icons";

type Props = { label: string; value: string | number; icon: IconType };

export default function StatCard({ label, value, icon: Icon }: Props) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xl text-rose-600">
        <Icon />
      </span>
      <div>
        <p className="text-2xl font-bold text-stone-800">{value}</p>
        <p className="text-sm text-stone-600">{label}</p>
      </div>
    </div>
  );
}