/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FiAlertCircle, FiArrowLeft, FiClock } from "react-icons/fi";
import AppointmentForm from "@/components/services/AppointmentForm";
import { useSession } from "@/lib/auth-client";
import { dummyServices } from "@/lib/dummy-data";

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState(false);

  const service = dummyServices.find((s) => s._id === id);
  const isAdmin = session?.user.role === "admin";

  // invalid service id
  if (!service) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm">
        <FiAlertCircle className="mx-auto text-4xl text-rose-500" />
        <h1 className="mt-3 text-xl font-semibold text-stone-800">Service not found</h1>
        <p className="mt-1 text-sm text-stone-600">
          The service you are looking for does not exist or the link is invalid.
        </p>
        <Link
          href="/services"
          className="mt-5 inline-block rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-700"
        >
          Browse Services
        </Link>
      </div>
    );
  }

  const isActive = service.status === "active";

  return (
    <div>
      <Link
        href="/services"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-rose-600"
      >
        <FiArrowLeft /> Back to services
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <img
          src={service.image}
          alt={service.serviceName}
          className="h-72 w-full rounded-2xl object-cover shadow-sm sm:h-96"
        />

        <div>
          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
            {service.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-stone-800">
            {service.serviceName}
          </h1>

          <div className="mt-4 flex items-center gap-6">
            <span className="text-2xl font-bold text-rose-600">${service.price}</span>
            <span className="flex items-center gap-1 text-stone-600">
              <FiClock /> {service.duration} minutes
            </span>
          </div>

          <p className="mt-5 leading-relaxed text-stone-600">{service.description}</p>

          {!isActive ? (
            <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
              This service is currently unavailable for booking.
            </p>
          ) : isAdmin ? (
            <p className="mt-6 rounded-lg bg-stone-100 p-4 text-sm text-stone-700">
              Admin accounts cannot submit customer appointment requests.
            </p>
          ) : (
            !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-6 rounded-lg bg-rose-600 px-6 py-3 text-sm font-semibold text-white hover:bg-rose-700"
              >
                Book Appointment
              </button>
            )
          )}

          {showForm && isActive && !isAdmin && (
            <AppointmentForm service={service} onClose={() => setShowForm(false)} />
          )}
        </div>
      </div>
    </div>
  );
}