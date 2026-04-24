"use client";

import { useSyncExternalStore } from "react";

const DEFAULT_NAME = "Soldado";
const MAX_LENGTH = 40;

function readName(): string {
  if (typeof window === "undefined") return DEFAULT_NAME;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("nombre");
    if (!fromUrl) return DEFAULT_NAME;
    const clean = fromUrl.trim().slice(0, MAX_LENGTH);
    return clean || DEFAULT_NAME;
  } catch {
    return DEFAULT_NAME;
  }
}

/**
 * The URL is immutable during a session, so `subscribe` is a no-op —
 * React calls `getSnapshot` exactly once after hydration.
 */
const noopSubscribe = () => () => {};
const getServerSnapshot = () => DEFAULT_NAME;

/**
 * Reads `?nombre=` from the URL so the greeting can be personalised from
 * the enrollment email (e.g. `/?nombre=Daniel`). SSR-safe via
 * `useSyncExternalStore`'s server snapshot — initial render matches the
 * default, then the real value is picked up post-hydration.
 */
export function useName(): string {
  return useSyncExternalStore(noopSubscribe, readName, getServerSnapshot);
}
