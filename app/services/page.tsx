import type { Metadata } from "next";
import { Suspense } from "react";
import ServiceGridSkeleton from "@/components/services/ServiceGridSkeleton";
import ServicesBrowser from "@/components/services/ServicesBrowser";

export const metadata: Metadata = {
  title: "Browse Services | SalonBook",
  description: "Explore salon services, compare prices and book your appointment.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-stone-800">Browse Services</h1>
        <p className="mt-2 text-stone-600">
          Find the perfect treatment and request your appointment online.
        </p>
      </div>

      <Suspense fallback={<ServiceGridSkeleton />}>
        <ServicesBrowser />
      </Suspense>
    </div>
  );
}