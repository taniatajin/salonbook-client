"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ServiceCard";
import ServiceFilters, { type SortOption } from "@/components/services/ServiceFilters";
import { dummyServices } from "@/lib/dummy-data";

export default function ServicesBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // category URL theke ashe, jate home page theke link kaj kore
  const category = searchParams.get("category") ?? "all";
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("category");
    else params.set("category", value);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const services = useMemo(() => {
    // shudhu active service dekhabe
    let result = dummyServices.filter((s) => s.status === "active");

    if (category !== "all") {
      result = result.filter((s) => s.category === category);
    }

    const term = search.trim().toLowerCase();
    if (term) {
      result = result.filter((s) => s.serviceName.toLowerCase().includes(term));
    }

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [category, search, sort]);

  const clearFilters = () => {
    setSearch("");
    setSort("default");
    handleCategoryChange("all");
  };

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

      {services.length === 0 ? (
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