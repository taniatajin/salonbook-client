import type { Metadata } from "next";
import RequireAuth from "@/components/RequireAuth";
import ServiceDetails from "@/components/services/ServiceDetails";

export const metadata: Metadata = {
  title: "Service Details | SalonBook",
};

export default function ServiceDetailsPage() {
  return (
    <RequireAuth>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <ServiceDetails />
      </div>
    </RequireAuth>
  );
}