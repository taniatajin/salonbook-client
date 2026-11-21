import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type Options = { method?: string; body?: unknown; auth?: boolean };

async function getToken() {
  const { data } = await authClient.token();
  return data?.token ?? null;
}

export async function apiFetch<T>(
  path: string,
  { method = "GET", body, auth = true }: Options = {}
): Promise<T> {
  const headers: Record<string, string> = {};

  if (auth) {
    const token = await getToken();
    if (!token) throw new ApiError("Please sign in to continue", 401);
    headers.Authorization = `Bearer ${token}`;
  }

  let payload: BodyInit | undefined;
  if (body instanceof FormData) {
    payload = body;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: payload,
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Cannot reach the server. Please try again.", 0);
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(data?.message || "Request failed", res.status);
  return data as T;
}