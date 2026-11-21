/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import PaymentHistory from "@/components/dashboard/PaymentHistory";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ErrorState from "@/components/ui/ErrorState";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import StatusBadge from "@/components/ui/StatusBadge";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch, ApiError } from "@/lib/api";
import { formatAppointmentDate, formatDate, formatPrice } from "@/lib/format";
import type { Appointment } from "@/lib/types";

export default function MyAppointmentsPage() {
  const { data, loading, error, reload } = useFetch<Appointment[]>("/api/appointments/my");

  const [details, setDetails] = useState<Appointment | null>(null);
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [payingId, setPayingId] = useState<string | null>(null);

  const handleCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await apiFetch(`/api/appointments/${cancelTarget._id}/cancel`, { method: "PATCH" });
      toast.success("Appointment request cancelled");
      setCancelTarget(null);
      reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not cancel appointment");
    } finally {
      setCancelling(false);
    }
  };

  const handlePay = async (appointment: Appointment) => {
    setPayingId(appointment._id);
    try {
      const { url } = await apiFetch<{ url: string }>("/api/payments/checkout-session", {
        method: "POST",
        body: { appointmentId: appointment._id },
      });
      window.location.href = url; // Stripe Checkout page-e jabe
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not start payment");
      setPayingId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="My Appointments"
        description="View your appointment requests, cancel pending ones and pay for confirmed ones."
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : !data || data.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-rose-200 bg-white py-14 text-center text-sm text-stone-500">
          You have not requested any appointments yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-rose-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-rose-50 text-xs uppercase text-stone-600">
              <tr>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Requested</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.map((a) => (
                <tr key={a._id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {a.service?.image && (
                        <img
                          src={a.service.image}
                          alt=""
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-stone-800">
                          {a.service?.serviceName ?? "Deleted service"}
                        </p>
                        <p className="text-xs text-stone-500">{a.service?.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {formatAppointmentDate(a.appointmentDate)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{a.timeSlot}</td>
                  <td className="px-4 py-3">{formatPrice(a.servicePrice)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge value={a.status} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge value={a.paymentStatus} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{formatDate(a.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setDetails(a)}
                        className="rounded-md border border-stone-300 px-3 py-1 text-xs font-medium hover:bg-stone-50"
                      >
                        Details
                      </button>
                      {a.status === "pending" && (
                        <button
                          onClick={() => setCancelTarget(a)}
                          className="rounded-md border border-red-300 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Cancel
                        </button>
                      )}
                      {a.status === "confirmed" && a.paymentStatus === "unpaid" && (
                        <button
                          onClick={() => handlePay(a)}
                          disabled={payingId === a._id}
                          className="rounded-md bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
                        >
                          {payingId === a._id ? "Redirecting..." : "Pay Now"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <PaymentHistory />

      <Modal
        open={!!details}
        title="Appointment Details"
        onClose={() => setDetails(null)}
      >
        {details && (
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Service</dt>
              <dd className="font-medium text-stone-800">{details.service?.serviceName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Category</dt>
              <dd>{details.service?.category}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Date and time</dt>
              <dd>
                {formatAppointmentDate(details.appointmentDate)}, {details.timeSlot}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Price</dt>
              <dd>{formatPrice(details.servicePrice)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Status</dt>
              <dd>
                <StatusBadge value={details.status} />
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Payment</dt>
              <dd>
                <StatusBadge value={details.paymentStatus} />
              </dd>
            </div>
            <div>
              <dt className="text-stone-500">Your message</dt>
              <dd className="mt-1 rounded-lg bg-stone-50 p-3">
                {details.message || "No message provided"}
              </dd>
            </div>
          </dl>
        )}
      </Modal>

      <ConfirmDialog
        open={!!cancelTarget}
        title="Cancel appointment request?"
        message="This pending appointment request will be cancelled. This cannot be undone."
        confirmLabel="Yes, Cancel"
        loading={cancelling}
        onConfirm={handleCancel}
        onCancel={() => setCancelTarget(null)}
      />
    </>
  );
}