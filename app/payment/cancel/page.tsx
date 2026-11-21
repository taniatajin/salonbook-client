import type { Metadata } from "next";
import Link from "next/link";
import { FiXCircle } from "react-icons/fi";
import RequireAuth from "@/components/RequireAuth";

export const metadata: Metadata = { title: "Payment Cancelled | SalonBook" };

export default function PaymentCancelPage() {
  return (
    <RequireAuth>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm">
          <FiXCircle className="mx-auto text-5xl text-stone-400" />
          <h1 className="mt-3 text-2xl font-bold text-stone-800">Payment cancelled</h1>
          <p className="mt-1 text-sm text-stone-600">
            No money was taken. You can pay for your confirmed appointment anytime from My
            Appointments.
          </p>
          <Link
            href="/dashboard/customer/appointments"
            className="mt-6 inline-block rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Back to My Appointments
          </Link>
        </div>
      </div>
    </RequireAuth>
  );
}