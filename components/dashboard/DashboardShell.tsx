"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiHome, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import Sidebar from "@/components/dashboard/Sidebar";
import { signOut, useSession } from "@/lib/auth-client";
import { adminNav, customerNav } from "@/lib/dashboard-nav";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const isAdmin = session?.user.role === "admin";
  const items = isAdmin ? adminNav : customerNav;
  const title = isAdmin ? "Admin Dashboard" : "Customer Dashboard";

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const sidebarFooter = (
    <div className="mt-4 space-y-1 border-t border-stone-100 pt-4">
      <Link
        href="/"
        onClick={() => setOpen(false)}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-rose-50 hover:text-rose-600"
      >
        <FiHome className="text-lg" /> Back to Home
      </Link>
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-rose-50 hover:text-rose-600"
      >
        <FiLogOut className="text-lg" /> Logout
      </button>
    </div>
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-rose-50/30">
      {/* Desktop sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 self-start overflow-y-auto border-r border-rose-100 bg-white lg:block">
        <Sidebar title={title} items={items}>
          {sidebarFooter}
        </Sidebar>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-stone-900/50"
            onClick={() => setOpen(false)}
          />
          <aside className="relative h-full w-64 overflow-y-auto bg-white shadow-xl">
            <Sidebar title={title} items={items} onNavigate={() => setOpen(false)}>
              {sidebarFooter}
            </Sidebar>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 border-b border-rose-100 bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-md p-1.5 text-stone-700 hover:bg-rose-50"
            aria-label="Toggle dashboard menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
          <span className="text-sm font-semibold text-stone-800">{title}</span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}