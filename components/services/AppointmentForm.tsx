"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiFetch, ApiError } from "@/lib/api";
import { TIME_SLOTS } from "@/lib/time-slots";
import type { Service } from "@/lib/types";

type Props = {
  service: Service;
  onClose: () => void;
};

const fieldClass =
  "w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500";

function todayString() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split("T")[0];
}

export default function AppointmentForm({ service, onClose }: Props) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date || !timeSlot) {
      toast.error("Please select a date and a time slot");
      return;
    }
    if (date < todayString()) {
      toast.error("Appointment date cannot be in the past");
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch("/api/appointments", {
        method: "POST",
        body: {
          serviceId: service._id,
          appointmentDate: date,
          timeSlot,
          message: message.trim(),
        },
      });

      toast.success("Appointment request submitted. Waiting for confirmation.");
      router.push("/dashboard/customer/appointments");
    } catch (err) {
      // 409 hole slot already booked, server-er message-i dekhabe
      toast.error(
        err instanceof ApiError ? err.message : "Could not submit your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 rounded-2xl border border-rose-100 bg-rose-50/40 p-5"
    >
      <h3 className="text-lg font-semibold text-stone-800">Request an appointment</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-medium">
            Appointment Date
          </label>
          <input
            id="date"
            type="date"
            min={todayString()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="timeSlot" className="mb-1 block text-sm font-medium">
            Available Time Slot
          </label>
          <select
            id="timeSlot"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
            className={fieldClass}
          >
            <option value="">Select a time slot</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Additional Message (optional)
        </label>
        <textarea
          id="message"
          rows={3}
          maxLength={300}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Anything the salon should know?"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-stone-600">
          {service.serviceName} · <span className="font-semibold">${service.price}</span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </form>
  );
}