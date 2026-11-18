import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import type { Service } from "@/lib/types";

export default function FeaturedServices({ services }: { services: Service[] }) {
  // shudhu active service dekhabe, minimum 6ta
  const featured = services.filter((s) => s.status === "active").slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-stone-800">Featured Services</h2>
        <p className="mt-2 text-stone-600">
          Our most loved treatments, picked just for you.
        </p>
      </div>

      {featured.length === 0 ? (
        <p className="text-center text-stone-500">No services available right now.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="inline-block rounded-full border border-rose-600 px-6 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"
        >
          View All Services
        </Link>
      </div>
    </section>
  );
}