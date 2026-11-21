"use client";

import { useParams } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import ServiceForm from "@/components/dashboard/ServiceForm";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import { useFetch } from "@/hooks/useFetch";
import type { Service } from "@/lib/types";

export default function UpdateServicePage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, reload } = useFetch<Service>(
    id ? `/api/services/${id}` : null,
    false
  );

  return (
    <>
      <PageHeader title="Update Service" description="Edit the service information." />
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : error || !data ? (
        <ErrorState message={error ?? "Service not found"} onRetry={reload} />
      ) : (
        <ServiceForm service={data} />
      )}
    </>
  );
}