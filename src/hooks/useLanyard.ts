"use client";

import { useEffect, useState } from "react";
import { fetchLanyard, LanyardData } from "@/lib/lanyard";

export type { DiscordStatus, DiscordUser, CustomStatus, LanyardSpotify, VSCodeActivity, LanyardData } from "@/lib/lanyard";

const POLL_INTERVAL = 30_000;

interface LanyardState {
  data: LanyardData | null;
  loading: boolean;
  error: boolean;
}

export function useLanyard(initialData?: LanyardData): LanyardState {
  const [state, setState] = useState<LanyardState>({
    data: initialData ?? null,
    loading: !initialData,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchLanyard();
        if (!cancelled) setState({ data, loading: false, error: false });
      } catch {
        if (!cancelled) setState((prev) => ({ ...prev, loading: false, error: true }));
      }
    }

    // If we already have initial data, skip the first fetch and just start polling
    const id = setInterval(load, POLL_INTERVAL);
    if (!initialData) load();

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [initialData]);

  return state;
}
