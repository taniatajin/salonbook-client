"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GoogleButton from "@/components/GoogleButton";
import PasswordInput from "@/components/PasswordInput";
import { signIn, useSession } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500";

export default function SignInPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) router.replace("/dashboard");
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn.email({ email: email.trim(), password });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
      }

      toast.success("Logged in successfully");
      // /dashboard role onujayi user ke sothik dashboard-e pathabe (pore banabo)
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-2xl border border-rose-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-stone-800">Welcome back</h1>
        <p className="mt-1 text-sm text-stone-500">
          Sign in to manage your appointments.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <PasswordInput id="password" value={password} onChange={setPassword} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-stone-400">
          <span className="h-px flex-1 bg-stone-200" />
          OR
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        <GoogleButton label="Continue with Google" />

        <p className="mt-6 text-center text-sm text-stone-600">
          New to SalonBook?{" "}
          <Link href="/sign-up" className="font-semibold text-rose-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}