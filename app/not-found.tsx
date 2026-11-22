import Link from "next/link";
import { FiScissors } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-2xl text-rose-600">
        <FiScissors />
      </span>
      <h1 className="mt-4 text-5xl font-bold text-stone-800">404</h1>
      <p className="mt-2 text-lg font-semibold text-stone-800">Page not found</p>
      <p className="mt-1 text-sm text-stone-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
      >
        Back to Home
      </Link>
    </div>
  );
}