"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/dashboard-nav";

type Props = {
  title: string;
  items: NavItem[];
  onNavigate?: () => void;
  children?: React.ReactNode;
};

export default function Sidebar({ title, items, onNavigate, children }: Props) {
  const pathname = usePathname();

  // je href-gulo match kore tader moddhe shobcheye lomba ta active hobe
  const activeHref = items
    .filter((item) => pathname === item.href || pathname.startsWith(item.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <div className="flex h-full flex-col p-4">
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wide text-stone-400">
        {title}
      </p>

      <nav className="flex flex-1 flex-col gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === activeHref;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-rose-600 text-white"
                  : "text-stone-700 hover:bg-rose-50 hover:text-rose-600"
              }`}
            >
              <Icon className="text-lg" />
              {label}
            </Link>
          );
        })}
      </nav>

      {children}
    </div>
  );
}