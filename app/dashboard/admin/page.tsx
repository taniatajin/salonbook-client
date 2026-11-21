"use client";

import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiScissors,
  FiUsers,
} from "react-icons/fi";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import { useFetch } from "@/hooks/useFetch";
import type { AdminStats } from "@/lib/types";

export default function AdminOverviewPage() {
  const { data, loading, error, reload } = useFetch<AdminStats>("/api/admin/stats");

  return (
    <>
      <PageHeader title="Admin Overview" description="Salon activity at a glance." />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : error || !data ? (
        <ErrorState message={error ?? "Could not load stats"} onRetry={reload} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard label="Total Registered Customers" value={data.totalCustomers} icon={FiUsers} />
          <StatCard label="Total Active Services" value={data.activeServices} icon={FiScissors} />
          <StatCard
            label="Total Appointment Requests"
            value={data.totalAppointments}
            icon={FiCalendar}
          />
          <StatCard label="Pending Appointments" value={data.pendingAppointments} icon={FiClock} />
          <StatCard
            label="Confirmed Appointments"
            value={data.confirmedAppointments}
            icon={FiCheckCircle}
          />
          <StatCard
            label="Total Successful Payments"
            value={data.successfulPayments}
            icon={FiDollarSign}
          />
        </div>
      )}
    </>
  );
}