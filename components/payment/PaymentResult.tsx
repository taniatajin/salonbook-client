"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";
import Spinner from "@/components/ui/Spinner";
import { apiFetch } from "@/lib/api";
import { formatAppointmentDate, formatPrice, shortRef } from "@/lib/format";
import type { Transaction } from "@/lib/types";

type State =
  | { kind: "loading" }
  | { kind: "paid"; transaction: Transaction }
  | { kind: "failed"; transaction: Transaction }
  | { kind: "processing" }
  | { kind: "error"; message: string };

export default function PaymentResult() {
  const sessionId = useSearchParams().get("session_id");
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;

    const check = async () => {
      try {
        const res = await apiFetch<Transaction | { status: "processing" }>(
          `/api/payments/session/${sessionId}`
        );
        if (cancelled) return;

        if ("stripeSessionId" in res) {
          setState(
            res.status === "paid"
              ? { kind: "paid", transaction: res }
              : { kind: "failed", transaction: res }
          );
          return;
        }

        attempts += 1;
        if (attempts >= 10) {
          setState({ kind: "processing" });
          return;
        }
        timer = setTimeout(check, 2000);
      } catch (err) {
        if (!cancelled) {
          setState({
            kind: "error",
            message: err instanceof Error ? err.message : "Could not verify payment",
          });
        }
      }
    };

    check();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [sessionId]);

  const effective: State = !sessionId
    ? { kind: "error", message: "No payment session found." }
    : state;

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm">
      {effective.kind === "loading" && (
        <>
          <div className="flex justify-center">
            <Spinner />
          </div>
          <h1 className="mt-4 text-xl font-semibold text-stone-800">Confirming your payment</h1>
          <p className="mt-1 text-sm text-stone-600">Please wait a moment...</p>
        </>
      )}

      {effective.kind === "paid" && (
        <>
          <FiCheckCircle className="mx-auto text-5xl text-emerald-500" />
          <h1 className="mt-3 text-2xl font-bold text-stone-800">Payment successful</h1>
          <p className="mt-1 text-sm text-stone-600">
            Your appointment is paid. Thank you for choosing SalonBook.
          </p>
          <dl className="mt-5 space-y-2 rounded-lg bg-stone-50 p-4 text-left text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Service</dt>
              <dd className="font-medium">{effective.transaction.service?.serviceName}</dd>
            </div>
            {effective.transaction.appointment && (
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Appointment</dt>
                <dd>
                  {formatAppointmentDate(effective.transaction.appointment.appointmentDate)},{" "}
                  {effective.transaction.appointment.timeSlot}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Amount</dt>
              <dd>
                {formatPrice(effective.transaction.amount, effective.transaction.currency)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Reference</dt>
              <dd className="font-mono text-xs">
                {shortRef(effective.transaction.stripeSessionId)}
              </dd>
            </div>
          </dl>
        </>
      )}

      {effective.kind === "failed" && (
        <>
          <FiAlertCircle className="mx-auto text-5xl text-red-500" />
          <h1 className="mt-3 text-xl font-semibold text-stone-800">Payment failed</h1>
          <p className="mt-1 text-sm text-stone-600">
            Your payment could not be completed. Please try again from My Appointments.
          </p>
        </>
      )}

      {effective.kind === "processing" && (
        <>
          <FiClock className="mx-auto text-5xl text-amber-500" />
          <h1 className="mt-3 text-xl font-semibold text-stone-800">Payment is processing</h1>
          <p className="mt-1 text-sm text-stone-600">
            We are still waiting for the payment confirmation. Check My Appointments in a
            moment.
          </p>
        </>
      )}

      {effective.kind === "error" && (
        <>
          <FiAlertCircle className="mx-auto text-5xl text-red-500" />
          <h1 className="mt-3 text-xl font-semibold text-stone-800">Something went wrong</h1>
          <p className="mt-1 text-sm text-stone-600">{effective.message}</p>
        </>
      )}

      <Link
        href="/dashboard/customer/appointments"
        className="mt-6 inline-block rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
      >
        Go to My Appointments
      </Link>
    </div>
  );
}