"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export function useFetch<T>(path: string | null, auth = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(path !== null);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!path) return;
    let cancelled = false;

    setLoading(true);
    setError(null);

    apiFetch<T>(path, { auth })
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [path, auth, tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);

  return { data, loading, error, reload };
}