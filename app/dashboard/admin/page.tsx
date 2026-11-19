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

// Temporary dummy numbers: server API ready hole real data ashbe
export default function AdminOverviewPage() {
  return (
    <>
      <PageHeader
        title="Admin Overview"
        description="Salon activity at a glance."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Registered Customers" value={24} icon={FiUsers} />
        <StatCard label="Total Active Services" value={6} icon={FiScissors} />
        <StatCard label="Total Appointment Requests" value={40} icon={FiCalendar} />
        <StatCard label="Pending Appointments" value={8} icon={FiClock} />
        <StatCard label="Confirmed Appointments" value={22} icon={FiCheckCircle} />
        <StatCard label="Total Successful Payments" value={18} icon={FiDollarSign} />
      </div>
    </>
  );
}