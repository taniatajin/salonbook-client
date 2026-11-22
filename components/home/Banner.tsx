import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br from-rose-900 via-rose-800 to-stone-900">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner.jpg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-stone-900/50" />

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            Look good, feel great. Book your salon visit in minutes.
          </h1>
          <p className="mt-5 text-lg text-rose-50">
            Explore hair, skin, makeup and spa services, request your preferred
            time slot and pay securely once your appointment is confirmed.
          </p>
          <Link
            href="/services"
            className="mt-8 inline-block rounded-full bg-rose-500 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-rose-600"
          >
            Explore Salon Services
          </Link>
        </div>
      </div>
    </section>
  );
}