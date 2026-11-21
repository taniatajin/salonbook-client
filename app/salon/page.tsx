import type { Metadata } from "next";
import Link from "next/link";
import { FiAward, FiClock, FiHeart, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import RequireAuth from "@/components/RequireAuth";
import { salonInfo } from "@/lib/salon-info";

export const metadata: Metadata = {
  title: "Salon Details | SalonBook",
  description: "Address, contact information and opening hours of the salon.",
};

const highlights = [
  {
    icon: FiAward,
    title: "Experienced Stylists",
    text: "Trained professionals for hair, skin, makeup and spa treatments.",
  },
  {
    icon: FiHeart,
    title: "Quality Products",
    text: "We use trusted, skin-friendly products for every service.",
  },
  {
    icon: FiClock,
    title: "Easy Online Booking",
    text: "Request a time slot online and pay securely after confirmation.",
  },
];

export default function SalonPage() {
  return (
    <RequireAuth>
      <section className="relative isolate overflow-hidden bg-rose-900">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/banner.jpg')" }}
        />
        <div className="absolute inset-0 -z-10 bg-stone-900/60" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            About {salonInfo.name}
          </h1>
          <p className="mt-3 max-w-2xl text-rose-50">
            A welcoming salon for haircuts, colouring, skincare, makeup, nails and
            relaxing spa treatments, all in one place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-xl text-rose-600">
                <Icon />
              </span>
              <h2 className="mt-3 text-lg font-semibold text-stone-800">{title}</h2>
              <p className="mt-1 text-sm text-stone-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-800">Contact & Address</h2>
            <ul className="mt-4 space-y-4 text-sm text-stone-700">
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 shrink-0 text-rose-600" />
                {salonInfo.address}
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="shrink-0 text-rose-600" />
                {salonInfo.phone}
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="shrink-0 text-rose-600" />
                {salonInfo.email}
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-stone-800">
              <FiClock className="text-rose-600" /> Opening Hours
            </h2>
            <ul className="mt-4 divide-y divide-stone-100 text-sm">
              {salonInfo.hours.map(({ day, time }) => (
                <li key={day} className="flex justify-between py-3">
                  <span className="font-medium text-stone-700">{day}</span>
                  <span className="text-stone-600">{time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-block rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Explore Salon Services
          </Link>
        </div>
      </div>
    </RequireAuth>
  );
}