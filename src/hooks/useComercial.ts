"use client";

import { useSyncExternalStore } from "react";

const DEFAULT_COMERCIAL = "Dani";
const MAX_LENGTH = 40;

function readComercial(): string {
  if (typeof window === "undefined") return DEFAULT_COMERCIAL;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get(
      "comercial",
    );
    if (!fromUrl) return DEFAULT_COMERCIAL;
    const clean = fromUrl.trim().slice(0, MAX_LENGTH);
    return clean || DEFAULT_COMERCIAL;
  } catch {
    return DEFAULT_COMERCIAL;
  }
}

/**
 * The URL is immutable during a session, so `subscribe` is a no-op —
 * React calls `getSnapshot` exactly once after hydration.
 */
const noopSubscribe = () => () => {};
const getServerSnapshot = () => DEFAULT_COMERCIAL;

/**
 * Reads `?comercial=` from the URL so the completion step can show the
 * salesperson's name personalised from the enrollment email
 * (e.g. `/?comercial=Sergio`). Falls back to the default "Dani" if
 * absent. Same SSR-safe pattern as `useName` — initial render matches
 * the default, then the real value is picked up post-hydration.
 */
export function useComercial(): string {
  return useSyncExternalStore(noopSubscribe, readComercial, getServerSnapshot);
}
