import PageHeader from "@/components/dashboard/PageHeader";
import ServiceForm from "@/components/dashboard/ServiceForm";

export default function AddServicePage() {
  return (
    <>
      <PageHeader title="Add Service" description="Create a new salon service." />
      <ServiceForm />
    </>
  );
}