import { FiCalendar, FiCheckCircle, FiCreditCard, FiSearch } from "react-icons/fi";

const steps = [
  {
    icon: FiSearch,
    title: "Choose a Service",
    text: "Browse services, compare price and duration, and pick what you love.",
  },
  {
    icon: FiCalendar,
    title: "Request an Appointment",
    text: "Select your preferred date and time slot and send your request.",
  },
  {
    icon: FiCheckCircle,
    title: "Get Confirmation",
    text: "The salon reviews your request and confirms your appointment.",
  },
  {
    icon: FiCreditCard,
    title: "Pay Securely",
    text: "Pay online with Stripe once your appointment is confirmed.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-stone-800">How It Works</h2>
        <p className="mt-2 text-stone-600">Four simple steps to your next salon visit.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <div
            key={title}
            className="rounded-2xl border border-rose-100 bg-white p-6 text-center shadow-sm"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-600 text-xl text-white">
              <Icon />
            </span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-rose-500">
              Step {index + 1}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-stone-800">{title}</h3>
            <p className="mt-2 text-sm text-stone-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}