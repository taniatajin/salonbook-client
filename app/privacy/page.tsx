import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SalonBook",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-stone-800">Privacy Policy</h1>
      <p className="mt-2 text-sm text-stone-500">Last updated: November 2026</p>

      <div className="mt-6 space-y-6 text-stone-700">
        <p>
          SalonBook is a salon appointment booking platform built as a learning project. This
          page explains what information we collect and how it is used.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-stone-800">Information we collect</h2>
          <p className="mt-2">
            When you create an account we store your name, email address, optional phone number
            and profile image. If you sign in with Google, we receive your name, email address
            and profile picture from your Google account. We also store the appointment
            requests you submit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-800">How we use it</h2>
          <p className="mt-2">
            We use your information only to sign you in, show your profile, manage your
            appointment requests and record payments. We do not sell or share your information
            with advertisers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-800">Payments</h2>
          <p className="mt-2">
            Payments are processed by Stripe. We never see or store your card details. We only
            keep the payment amount, status and a Stripe reference for your appointment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-800">Cookies</h2>
          <p className="mt-2">
            We use a session cookie to keep you signed in. We do not use advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-800">Contact</h2>
          <p className="mt-2">
            For questions about your data, contact us at hello@salonbook.com.
          </p>
        </section>
      </div>
    </div>
  );
}