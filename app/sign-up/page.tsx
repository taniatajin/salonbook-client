b"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GoogleButton from "@/components/GoogleButton";
import PasswordInput from "@/components/PasswordInput";
import { signUp, useSession } from "@/lib/auth-client";
import { uploadImage } from "@/lib/upload-image";
import { validatePassword } from "@/lib/validators";

const inputClass =
  "w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500";

export default function SignUpPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) router.replace("/dashboard");
  }, [session, router]);

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
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setLoading(true);
    try {
      let image: string | undefined;
      if (imageMode === "upload" && imageFile) {
        image = await uploadImage(imageFile);
      } else if (imageMode === "url" && imageUrl.trim()) {
        image = imageUrl.trim();
      }

      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image,
      });

      if (error) {
        toast.error(error.message || "Sign up failed");
        return;
      }

      toast.success("Account created successfully");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-2xl border border-rose-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-stone-800">Create your account</h1>
        <p className="mt-1 text-sm text-stone-500">
          Join SalonBook to book your favourite salon services.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <PasswordInput id="password" value={password} onChange={setPassword} />
            <p className="mt-1 text-xs text-stone-500">
              At least 6 characters with one uppercase and one lowercase letter.
            </p>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">Profile Image (optional)</span>
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
                className={inputClass}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-stone-400">
          <span className="h-px flex-1 bg-stone-200" />
          OR
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        <GoogleButton label="Continue with Google" />

        <p className="mt-6 text-center text-sm text-stone-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-rose-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}