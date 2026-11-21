import { FiAlertCircle } from "react-icons/fi";

type Props = { message: string; onRetry?: () => void };

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm">
      <FiAlertCircle className="mx-auto text-3xl text-rose-500" />
      <p className="mt-2 font-semibold text-stone-800">Something went wrong</p>
      <p className="mt-1 text-sm text-stone-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
}