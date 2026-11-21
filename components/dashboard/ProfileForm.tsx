/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import { authClient, useSession } from "@/lib/auth-client";
import type { Session } from "@/lib/auth";
import { uploadImage } from "@/lib/upload-image";

type SessionUser = Session["user"];

const fieldClass =
  "w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500";

function ProfileFields({ user }: { user: SessionUser }) {
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Image must be 2MB or smaller");
      e.target.value = "";
      setImageFile(null);
      return;
    }
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("Please enter your full name");
      return;
    }
    if (phone.trim() && !/^\+?[0-9\s-]{7,15}$/.test(phone.trim())) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setSaving(true);
    try {
      let image: string | undefined;
      if (imageMode === "upload" && imageFile) {
        image = await uploadImage(imageFile);
      } else if (imageMode === "url" && imageUrl.trim()) {
        image = imageUrl.trim();
      }

      const { error } = await authClient.updateUser({
        name: name.trim(),
        phone: phone.trim(),
        ...(image ? { image } : {}),
      });

      if (error) {
        toast.error(error.message || "Could not update profile");
        return;
      }

      toast.success("Profile updated successfully");
      setImageFile(null);
      setImageUrl("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-5 rounded-2xl border border-rose-100 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-4">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-600 text-2xl font-semibold text-white">
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}
        <div>
          <p className="font-semibold text-stone-800">{user.name}</p>
          <span className="mt-1 inline-block rounded-full bg-rose-50 px-3 py-0.5 text-xs font-medium capitalize text-rose-600">
            {user.role}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Full Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+880 1XXX-XXXXXX"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          value={user.email}
          disabled
          className={`${fieldClass} cursor-not-allowed bg-stone-100 text-stone-500`}
        />
        <p className="mt-1 text-xs text-stone-500">Email cannot be changed.</p>
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium">Profile Image</span>
          <div className="flex rounded-full bg-stone-100 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setImageMode("upload")}
              className={`rounded-full px-3 py-1 ${
                imageMode === "upload" ? "bg-white shadow-sm" : "text-stone-500"
              }`}
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => setImageMode("url")}
              className={`rounded-full px-3 py-1 ${
                imageMode === "url" ? "bg-white shadow-sm" : "text-stone-500"
              }`}
            >
              URL
            </button>
          </div>
        </div>

        {imageMode === "upload" ? (
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-rose-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-rose-600 hover:file:bg-rose-100"
          />
        ) : (
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className={fieldClass}
          />
        )}
        <p className="mt-1 text-xs text-stone-500">
          Leave empty to keep your current image.
        </p>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

export default function ProfileForm() {
  const { data: session, isPending } = useSession();

  return (
    <>
      <PageHeader title="My Profile" description="Update your profile information." />
      {isPending || !session ? (
        <div className="h-64 max-w-2xl animate-pulse rounded-2xl bg-stone-200" />
      ) : (
        <ProfileFields user={session.user} />
      )}
    </>
  );
}