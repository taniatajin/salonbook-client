import type { Service } from "./types";

export async function getFeaturedServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services?limit=6`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}