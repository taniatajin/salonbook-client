import { FiCalendar, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";

// Temporary dummy numbers: server API ready hole real data ashbe
export default function CustomerOverviewPage() {
  return (
    <>
      <PageHeader
        title="Dashboard Overview"
        description="A quick summary of your appointment requests."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Appointment Requests" value={5} icon={FiCalendar} />
        <StatCard label="Pending Appointments" value={2} icon={FiClock} />
        <StatCard label="Confirmed Appointments" value={2} icon={FiCheckCircle} />
        <StatCard label="Cancelled Appointments" value={1} icon={FiXCircle} />
      </div>
    </>
  );
}