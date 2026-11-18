"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function GoogleButton({ label }: { label: string }) {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await signIn.social({ provider: "google", callbackURL: "/dashboard" });
    } catch {
      toast.error("Google authentication failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogle}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-60"
    >
      <FcGoogle size={20} />
      {loading ? "Redirecting..." : label}
    </button>
  );
}