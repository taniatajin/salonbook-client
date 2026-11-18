/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FiClock } from "react-icons/fi";
import type { Service } from "@/lib/types";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm transition hover:shadow-md">
      <img
        src={service.image}
        alt={service.serviceName}
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
          {service.category}
        </span>
        <h3 className="mt-3 text-lg font-semibold text-stone-800">
          {service.serviceName}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-stone-600">
          {service.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-lg font-bold text-rose-600">${service.price}</span>
          <span className="flex items-center gap-1 text-stone-500">
            <FiClock /> {service.duration} min
          </span>
        </div>
        <Link
          href={`/services/${service._id}`}
          className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-rose-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}