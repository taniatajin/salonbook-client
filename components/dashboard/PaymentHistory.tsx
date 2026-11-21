"use client";

import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import StatusBadge from "@/components/ui/StatusBadge";
import { useFetch } from "@/hooks/useFetch";
import { formatAppointmentDate, formatDate, formatPrice, shortRef } from "@/lib/format";
import type { Transaction } from "@/lib/types";

export default function PaymentHistory() {
  const { data, loading, error, reload } = useFetch<Transaction[]>("/api/payments/my");

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-lg font-semibold text-stone-800">Payment History</h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : !data || data.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-rose-200 bg-white py-10 text-center text-sm text-stone-500">
          No payments yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-rose-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-rose-50 text-xs uppercase text-stone-600">
              <tr>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Appointment</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.map((t) => (
                <tr key={t._id}>
                  <td className="px-4 py-3 font-medium text-stone-800">
                    {t.service?.serviceName ?? "Deleted service"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {t.appointment
                      ? `${formatAppointmentDate(t.appointment.appointmentDate)}, ${t.appointment.timeSlot}`
                      : "-"}
                  </td>
                  <td className="px-4 py-3">{formatPrice(t.amount, t.currency)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge value={t.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{formatDate(t.createdAt)}</td>
                  <td className="px-4 py-3 font-mono text-xs">{shortRef(t.stripeSessionId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}