"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ServiceCard";
import ServiceFilters, { type SortOption } from "@/components/services/ServiceFilters";
import ServiceGridSkeleton from "@/components/services/ServiceGridSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import { useFetch } from "@/hooks/useFetch";
import type { Service } from "@/lib/types";

export default function ServicesBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // category URL theke ashe, jate home page theke link kaj kore
  const category = searchParams.get("category") ?? "all";
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const params = new URLSearchParams();
  if (debouncedSearch) params.set("search", debouncedSearch);
  if (category !== "all") params.set("category", category);
  if (sort !== "default") params.set("sort", sort);
  const query = params.toString();

  const { data, loading, error, reload } = useFetch<Service[]>(
    `/api/services${query ? `?${query}` : ""}`,
    false
  );

  const handleCategoryChange = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value === "all") next.delete("category");
    else next.set("category", value);
    const q = next.toString();
    router.replace(q ? `${pathname}?${q}` : pathname);
  };

  const clearFilters = () => {
    setSearch("");
    setSort("default");
    handleCategoryChange("all");
  };

  const services = data ?? [];

  return (
    <>
      <ServiceFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={setSort}
      />

      {loading ? (
        <ServiceGridSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-rose-200 bg-white py-16 text-center">
          <p className="text-lg font-semibold text-stone-800">No services found</p>
          <p className="mt-1 text-sm text-stone-500">
            Try a different search term or category.
          </p>
          <button
            onClick={clearFilters}
            className="mt-5 rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-stone-500">
            Showing {services.length} {services.length === 1 ? "service" : "services"}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </>
      )}
    </>
  );
}