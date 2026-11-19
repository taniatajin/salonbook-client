"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const role = session?.user.role;

  useEffect(() => {
    if (!role) return;
    router.replace(role === "admin" ? "/dashboard/admin" : "/dashboard/customer");
  }, [role, router]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-rose-200 border-t-rose-600"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}