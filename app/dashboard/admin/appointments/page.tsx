/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ErrorState from "@/components/ui/ErrorState";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import StatusBadge from "@/components/ui/StatusBadge";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch, ApiError } from "@/lib/api";
import { formatAppointmentDate, formatDate, formatPrice } from "@/lib/format";
import type { Appointment } from "@/lib/types";

type Filter = "all" | "pending" | "confirmed" | "cancelled";
type PendingAction = { type: "confirm" | "cancel"; appointment: Appointment };

const filters: Filter[] = ["all", "pending", "confirmed", "cancelled"];

export default function ManageAppointmentsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const { data, loading, error, reload } = useFetch<Appointment[]>(
    `/api/admin/appointments${filter === "all" ? "" : `?status=${filter}`}`
  );

  const [details, setDetails] = useState<Appointment | null>(null);
  const [action, setAction] = useState<PendingAction | null>(null);
  const [working, setWorking] = useState(false);

  const runAction = async () => {
    if (!action) return;
    setWorking(true);
    try {
      await apiFetch(`/api/admin/appointments/${action.appointment._id}/${action.type}`, {
        method: "PATCH",
      });
      toast.success(
        action.type === "confirm" ? "Appointment confirmed" : "Appointment cancelled"
      );
      setAction(null);
      reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not update appointment");
    } finally {
      setWorking(false);
    }
  };

  const isCancel = action?.type === "cancel";
  const paidWarning =
    isCancel && action?.appointment.paymentStatus === "paid"
      ? " This appointment is already paid. Refunds are not handled by this app, so refund it from the Stripe dashboard if needed."
      : "";

  return (
    <>
      <PageHeader
        title="Manage Appointments"
        description="Review, confirm or cancel appointment requests."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${
              filter === f
                ? "bg-rose-600 text-white"
                : "border border-stone-300 bg-white text-stone-700 hover:bg-rose-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : !data || data.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-rose-200 bg-white py-14 text-center text-sm text-stone-500">
          No appointments found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-rose-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-rose-50 text-xs uppercase text-stone-600">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Date and time</th>
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
                    <p className="font-medium text-stone-800">
                      {a.customer?.name ?? "Deleted user"}
                    </p>
                    <p className="text-xs text-stone-500">{a.customer?.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {a.service?.image && (
                        <img
                          src={a.service.image}
                          alt=""
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      )}
                      <span>{a.service?.serviceName ?? "Deleted service"}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {formatAppointmentDate(a.appointmentDate)}, {a.timeSlot}
                  </td>
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
                          onClick={() => setAction({ type: "confirm", appointment: a })}
                          className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                        >
                          Confirm
                        </button>
                      )}
                      {(a.status === "pending" || a.status === "confirmed") && (
                        <button
                          onClick={() => setAction({ type: "cancel", appointment: a })}
                          className="rounded-md border border-red-300 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Cancel
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

      <Modal open={!!details} title="Appointment Details" onClose={() => setDetails(null)}>
        {details && (
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Customer</dt>
              <dd className="text-right font-medium text-stone-800">
                {details.customer?.name}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Email</dt>
              <dd>{details.customer?.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Phone</dt>
              <dd>{details.customer?.phone || "Not provided"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Service</dt>
              <dd>
                {details.service?.serviceName} ({details.service?.category})
              </dd>
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
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Requested on</dt>
              <dd>{formatDate(details.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Customer message</dt>
              <dd className="mt-1 rounded-lg bg-stone-50 p-3">
                {details.message || "No message provided"}
              </dd>
            </div>
          </dl>
        )}
      </Modal>

      <ConfirmDialog
        open={!!action}
        title={isCancel ? "Cancel this appointment?" : "Confirm this appointment?"}
        message={
          isCancel
            ? `The appointment will be cancelled.${paidWarning}`
            : "The customer will be able to pay for this appointment."
        }
        confirmLabel={isCancel ? "Yes, Cancel" : "Yes, Confirm"}
        danger={isCancel}
        loading={working}
        onConfirm={runAction}
        onCancel={() => setAction(null)}
      />
    </>
  );
}