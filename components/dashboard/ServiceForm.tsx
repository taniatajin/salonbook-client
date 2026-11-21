/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiFetch, ApiError } from "@/lib/api";
import { SERVICE_CATEGORIES } from "@/lib/categories";
import type { Service } from "@/lib/types";

const fieldClass =
  "w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500";

export default function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const isEdit = !!service;

  const [serviceName, setServiceName] = useState(service?.serviceName ?? "");
  const [category, setCategory] = useState(service?.category ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [price, setPrice] = useState(service ? String(service.price) : "");
  const [duration, setDuration] = useState(service ? String(service.duration) : "");
  const [status, setStatus] = useState<"active" | "inactive">(service?.status ?? "active");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Image must be 2MB or smaller");
      e.target.value = "";
      setImageFile(null);
      setPreview(null);
      return;
    }
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const priceNumber = Number(price);
    const durationNumber = Number(duration);

    if (serviceName.trim().length < 2) {
      toast.error("Service name must be at least 2 characters");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    if (description.trim().length < 10) {
      toast.error("Description must be at least 10 characters");
      return;
    }
    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
      toast.error("Price must be a positive number");
      return;
    }
    if (!Number.isFinite(durationNumber) || durationNumber <= 0) {
      toast.error("Duration must be a positive number");
      return;
    }
    if (!isEdit && !imageFile) {
      toast.error("Please upload a service image");
      return;
    }

    setSaving(true);
    try {
      let image: string | undefined;
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploaded = await apiFetch<{ url: string }>("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        image = uploaded.url;
      }

      const body = {
        serviceName: serviceName.trim(),
        category,
        description: description.trim(),
        price: priceNumber,
        duration: durationNumber,
        status,
        ...(image ? { image } : {}),
      };

      if (isEdit) {
        await apiFetch(`/api/admin/services/${service._id}`, { method: "PUT", body });
        toast.success("Service updated successfully");
      } else {
        await apiFetch("/api/admin/services", { method: "POST", body });
        toast.success("Service added successfully");
      }
      router.push("/dashboard/admin/services");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not save the service");
    } finally {
      setSaving(false);
    }
  };

  const shownImage = preview ?? service?.image ?? null;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-5 rounded-2xl border border-rose-100 bg-white p-6 shadow-sm"
    >
      <div>
        <label htmlFor="serviceName" className="mb-1 block text-sm font-medium">
          Service Name
        </label>
        <input
          id="serviceName"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          required
          className={fieldClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium">
            Service Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={fieldClass}
          >
            <option value="">Select a category</option>
            {SERVICE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium">
            Service Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
            className={fieldClass}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={fieldClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium">
            Price (USD)
          </label>
          <input
            id="price"
            type="number"
            min="0.01"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="duration" className="mb-1 block text-sm font-medium">
            Estimated Duration (minutes)
          </label>
          <input
            id="duration"
            type="number"
            min="1"
            step="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="mb-1 block text-sm font-medium">
          Service Image {isEdit && <span className="text-stone-500">(optional)</span>}
        </label>
        <input
          id="image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-rose-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-rose-600 hover:file:bg-rose-100"
        />
        <p className="mt-1 text-xs text-stone-500">JPG, PNG or WEBP, up to 2MB.</p>
        {shownImage && (
          <img
            src={shownImage}
            alt="Service preview"
            className="mt-3 h-40 w-full max-w-xs rounded-lg object-cover"
          />
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : isEdit ? "Update Service" : "Add Service"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/admin/services")}
          disabled={saving}
          className="rounded-lg border border-stone-300 px-6 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}