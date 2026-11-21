"use client";

import { FiCalendar, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import { useFetch } from "@/hooks/useFetch";
import type { CustomerStats } from "@/lib/types";

export default function CustomerOverviewPage() {
  const { data, loading, error, reload } = useFetch<CustomerStats>("/api/appointments/my/stats");

  return (
    <>
      <PageHeader
        title="Dashboard Overview"
        description="A quick summary of your appointment requests."
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : error || !data ? (
        <ErrorState message={error ?? "Could not load stats"} onRetry={reload} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Appointment Requests" value={data.total} icon={FiCalendar} />
          <StatCard label="Pending Appointments" value={data.pending} icon={FiClock} />
          <StatCard label="Confirmed Appointments" value={data.confirmed} icon={FiCheckCircle} />
          <StatCard label="Cancelled Appointments" value={data.cancelled} icon={FiXCircle} />
        </div>
      )}
    </>
  );
}