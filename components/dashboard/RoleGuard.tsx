"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

type Props = { role: "admin" | "customer"; children: React.ReactNode };

export default function RoleGuard({ role, children }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user;
  const userRole = user?.role === "admin" ? "admin" : "customer";

  // onno role-er URL-e dhukle nijer dashboard-e pathiye dibe
  useEffect(() => {
    if (user && !user.isBlocked && userRole !== role) {
      toast.error("You do not have access to that page");
      router.replace(`/dashboard/${userRole}`);
    }
  }, [user, userRole, role, router]);

  if (user?.isBlocked) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-stone-800">Account blocked</h1>
        <p className="mt-2 text-sm text-stone-600">
          Your account has been blocked. Please contact the salon for help.
        </p>
        <button
          onClick={async () => {
            await signOut();
            router.push("/");
            router.refresh();
          }}
          className="mt-5 rounded-lg bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-700"
        >
          Logout
        </button>
      </div>
    );
  }

  if (!user || userRole !== role) return null;

  return <>{children}</>;
}