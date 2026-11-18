import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FiDroplet,
  FiFeather,
  FiHeart,
  FiScissors,
  FiSmile,
  FiStar,
  FiSun,
} from "react-icons/fi";
import { SERVICE_CATEGORIES } from "@/lib/categories";

const icons: Record<string, IconType> = {
  "Haircut & Styling": FiScissors,
  "Hair Coloring": FiDroplet,
  "Hair Treatment": FiHeart,
  "Facial & Skincare": FiSmile,
  Makeup: FiStar,
  "Manicure & Pedicure": FiFeather,
  "Spa & Massage": FiSun,
};

export default function Categories() {
  return (
    <section className="bg-rose-50/60 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-stone-800">Service Categories</h2>
          <p className="mt-2 text-stone-600">
            Pick a category to explore matching services.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = icons[category] ?? FiScissors;
            return (
              <Link
                key={category}
                href={`/services?category=${encodeURIComponent(category)}`}
                className="flex flex-col items-center gap-3 rounded-2xl border border-rose-100 bg-white p-6 text-center shadow-sm transition hover:border-rose-300 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-xl text-rose-600">
                  <Icon />
                </span>
                <span className="text-sm font-semibold text-stone-800">
                  {category}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}