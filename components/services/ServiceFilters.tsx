"use client";

import { FiSearch } from "react-icons/fi";
import { SERVICE_CATEGORIES } from "@/lib/categories";

export type SortOption = "default" | "price-asc" | "price-desc";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
};

const selectClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500";

export default function ServiceFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: Props) {
  return (
    <div className="mb-8 grid gap-3 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm md:grid-cols-[2fr_1fr_1fr]">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search services by name"
          aria-label="Search services by name"
          className="w-full rounded-lg border border-stone-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
        />
      </div>

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter by category"
        className={selectClass}
      >
        <option value="all">All Categories</option>
        {SERVICE_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        aria-label="Sort by price"
        className={selectClass}
      >
        <option value="default">Sort by Price</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}