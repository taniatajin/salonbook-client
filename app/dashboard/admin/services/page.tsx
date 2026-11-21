/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import StatusBadge from "@/components/ui/StatusBadge";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch, ApiError } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import type { Service } from "@/lib/types";

export default function ManageServicesPage() {
  const { data, loading, error, reload } = useFetch<Service[]>("/api/admin/services");

  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const toggleStatus = async (service: Service) => {
    const next = service.status === "active" ? "inactive" : "active";
    setTogglingId(service._id);
    try {
      await apiFetch(`/api/admin/services/${service._id}/status`, {
        method: "PATCH",
        body: { status: next },
      });
      toast.success(`Service ${next === "active" ? "activated" : "deactivated"}`);
      reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not update status");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/admin/services/${deleteTarget._id}`, { method: "DELETE" });
      toast.success("Service deleted successfully");
      setDeleteTarget(null);
      reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not delete service");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Manage Services"
        description="View, update, activate, deactivate or delete salon services."
        action={
          <Link
            href="/dashboard/admin/services/add"
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Add Service
          </Link>
        }
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : !data || data.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-rose-200 bg-white py-14 text-center text-sm text-stone-500">
          No services yet. Add your first service.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-rose-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-rose-50 text-xs uppercase text-stone-600">
              <tr>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.map((s) => (
                <tr key={s._id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.image}
                        alt=""
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <span className="font-medium text-stone-800">{s.serviceName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{s.category}</td>
                  <td className="px-4 py-3">{formatPrice(s.price)}</td>
                  <td className="whitespace-nowrap px-4 py-3">{s.duration} min</td>
                  <td className="px-4 py-3">
                    <StatusBadge value={s.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/dashboard/admin/services/${s._id}`}
                        className="rounded-md border border-stone-300 px-3 py-1 text-xs font-medium hover:bg-stone-50"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => toggleStatus(s)}
                        disabled={togglingId === s._id}
                        className="rounded-md border border-stone-300 px-3 py-1 text-xs font-medium hover:bg-stone-50 disabled:opacity-60"
                      >
                        {s.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => setDeleteTarget(s)}
                        className="rounded-md border border-red-300 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this service?"
        message={`"${deleteTarget?.serviceName ?? ""}" will be permanently deleted. Existing appointments for it will show as a deleted service.`}
        confirmLabel="Yes, Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}