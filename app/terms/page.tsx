import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SalonBook",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-stone-800">Terms of Service</h1>
      <p className="mt-2 text-sm text-stone-500">Last updated: November 2026</p>

      <div className="mt-6 space-y-6 text-stone-700">
        <p>
          By using SalonBook you agree to these terms. SalonBook is a learning project and a
          demonstration of an online salon booking platform.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-stone-800">Accounts</h2>
          <p className="mt-2">
            You are responsible for keeping your account details secure and for the accuracy of
            the information you provide.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-800">Appointments</h2>
          <p className="mt-2">
            Appointment requests are not guaranteed until the salon confirms them. You may
            cancel a pending request. Confirmed appointments can be paid online.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-800">Payments</h2>
          <p className="mt-2">
            Payments are handled by Stripe. This demonstration runs in test mode, so no real
            money is charged.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-800">Acceptable use</h2>
          <p className="mt-2">
            Do not misuse the platform or attempt to access other users&apos; data. Accounts
            may be blocked for misuse.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-800">Contact</h2>
          <p className="mt-2">Questions? Contact us at hello@salonbook.com.</p>
        </section>
      </div>
    </div>
  );
}