/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ErrorState from "@/components/ui/ErrorState";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import StatusBadge from "@/components/ui/StatusBadge";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch, ApiError } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Customer } from "@/lib/types";

function Avatar({ user }: { user: Customer }) {
  return user.image ? (
    <img
      src={user.image}
      alt=""
      referrerPolicy="no-referrer"
      className="h-9 w-9 rounded-full object-cover"
    />
  ) : (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-600 text-sm font-semibold text-white">
      {user.name.charAt(0).toUpperCase()}
    </span>
  );
}

export default function ManageUsersPage() {
  const { data, loading, error, reload } = useFetch<Customer[]>("/api/admin/users");

  const [details, setDetails] = useState<Customer | null>(null);
  const [target, setTarget] = useState<Customer | null>(null);
  const [working, setWorking] = useState(false);

  const openDetails = async (customer: Customer) => {
    setDetails(customer);
    try {
      // appointment count ashe ekhane
      const full = await apiFetch<Customer>(`/api/admin/users/${customer._id}`);
      setDetails(full);
    } catch {
      // list-er data-i dekhabe
    }
  };

  const toggleBlock = async () => {
    if (!target) return;
    const action = target.isBlocked ? "unblock" : "block";
    setWorking(true);
    try {
      await apiFetch(`/api/admin/users/${target._id}/${action}`, { method: "PATCH" });
      toast.success(action === "block" ? "User blocked" : "User unblocked");
      setTarget(null);
      reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not update user");
    } finally {
      setWorking(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Manage Users"
        description="View registered customers and block or unblock them."
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : !data || data.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-rose-200 bg-white py-14 text-center text-sm text-stone-500">
          No registered customers yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-rose-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-rose-50 text-xs uppercase text-stone-600">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.map((u) => (
                <tr key={u._id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar user={u} />
                      <span className="font-medium text-stone-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.phone || "-"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge value={u.isBlocked ? "blocked" : "active"} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{formatDate(u.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openDetails(u)}
                        className="rounded-md border border-stone-300 px-3 py-1 text-xs font-medium hover:bg-stone-50"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => setTarget(u)}
                        className={`rounded-md border px-3 py-1 text-xs font-medium ${
                          u.isBlocked
                            ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                            : "border-red-300 text-red-600 hover:bg-red-50"
                        }`}
                      >
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!details} title="User Details" onClose={() => setDetails(null)}>
        {details && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar user={details} />
              <p className="font-semibold text-stone-800">{details.name}</p>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Email</dt>
                <dd>{details.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Phone</dt>
                <dd>{details.phone || "Not provided"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Status</dt>
                <dd>
                  <StatusBadge value={details.isBlocked ? "blocked" : "active"} />
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Joined</dt>
                <dd>{formatDate(details.createdAt)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Appointment requests</dt>
                <dd>{details.appointmentCount ?? "..."}</dd>
              </div>
            </dl>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!target}
        title={target?.isBlocked ? "Unblock this user?" : "Block this user?"}
        message={
          target?.isBlocked
            ? `${target?.name} will be able to use the platform again.`
            : `${target?.name} will not be able to access protected features or book appointments.`
        }
        confirmLabel={target?.isBlocked ? "Yes, Unblock" : "Yes, Block"}
        danger={!target?.isBlocked}
        loading={working}
        onConfirm={toggleBlock}
        onCancel={() => setTarget(null)}
      />
    </>
  );
}