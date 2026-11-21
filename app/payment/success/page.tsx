import type { Metadata } from "next";
import { Suspense } from "react";
import RequireAuth from "@/components/RequireAuth";
import PaymentResult from "@/components/payment/PaymentResult";
import Spinner from "@/components/ui/Spinner";

export const metadata: Metadata = { title: "Payment Successful | SalonBook" };

export default function PaymentSuccessPage() {
  return (
    <RequireAuth>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Spinner />
            </div>
          }
        >
          <PaymentResult />
        </Suspense>
      </div>
    </RequireAuth>
  );
}