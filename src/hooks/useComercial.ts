"use client";

import { useSyncExternalStore } from "react";

const MAX_LENGTH = 40;

function readComercial(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get(
      "comercial",
    );
    if (!fromUrl) return null;
    const clean = fromUrl.trim().slice(0, MAX_LENGTH);
    return clean.length > 0 ? clean : null;
  } catch {
    return null;
  }
}

/**
 * The URL is immutable during a session, so `subscribe` is a no-op —
 * React calls `getSnapshot` exactly once after hydration.
 */
const noopSubscribe = () => () => {};
const getServerSnapshot = (): string | null => null;

/**
 * Reads `?comercial=` from the URL so the completion step puede
 * mostrar el nombre del comercial personalizado desde el email de
 * inscripción (ej. `/?comercial=Sergio`).
 *
 * Si el parámetro no viene o está vacío, devuelve `null` — la
 * `CompletionStep` se encarga de ocultar la tarjeta entera. No hay
 * default hardcoded: si quieres mostrar un nombre concreto, tiene
 * que llegar siempre vía URL.
 *
 * Mismo patrón SSR-safe que `useName` — el primer render coincide
 * con el snapshot del servidor (`null`) y el valor real se pilla
 * post-hydration.
 */
export function useComercial(): string | null {
  return useSyncExternalStore(noopSubscribe, readComercial, getServerSnapshot);
}
