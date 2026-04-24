"use client";

import { useCallback, useSyncExternalStore } from "react";

import type { GroupId } from "@/lib/onboarding-data";
import { GROUPS } from "@/lib/onboarding-data";

type JoinedMap = Partial<Record<GroupId, boolean>>;

type Persisted = {
  step: number;
  joined: JoinedMap;
  nameConfirmed: boolean;
  videoConfirmed: boolean;
};

const STORAGE_KEY = "adc_onboarding_v1";

const DEFAULT_STATE: Persisted = {
  step: 0,
  joined: {},
  nameConfirmed: false,
  videoConfirmed: false,
};

/* -- Module-level store --------------------------------------------------
 *
 * One shared store across the app (there's only ever one onboarding flow
 * in flight). This keeps `useSyncExternalStore`'s `getSnapshot` reference-
 * stable between calls — React bails out of re-renders when the snapshot
 * is === the previous one, which would not hold if each `useOnboardingState`
 * caller built its own object.
 * ------------------------------------------------------------------------ */
let state: Persisted = DEFAULT_STATE;
let bootstrapped = false;
const listeners = new Set<() => void>();

function readStorage(): Persisted {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

function writeStorage(next: Persisted) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* quota / private mode — silently drop */
  }
}

function bootstrap() {
  if (bootstrapped || typeof window === "undefined") return;
  state = readStorage();
  bootstrapped = true;
}

function commit(updater: (prev: Persisted) => Persisted) {
  const next = updater(state);
  if (next === state) return;
  state = next;
  writeStorage(next);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  // First subscription is the safe client-only moment to read storage —
  // `getServerSnapshot` returns the default during SSR so hydration matches.
  bootstrap();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => state;
const getServerSnapshot = () => DEFAULT_STATE;

/* -- Public API ---------------------------------------------------------- */

export type OnboardingState = {
  step: number;
  joined: JoinedMap;
  nameConfirmed: boolean;
  videoConfirmed: boolean;
  /** Number of groups the user has joined so far. */
  joinedCount: number;
  /** True once every group has been marked as joined. */
  allJoined: boolean;
  setStep: (next: number) => void;
  markGroupJoined: (id: GroupId) => void;
  setNameConfirmed: (value: boolean) => void;
  setVideoConfirmed: (value: boolean) => void;
};

/**
 * Persists onboarding progress to `localStorage`, keyed by `STORAGE_KEY`.
 *
 * Uses `useSyncExternalStore` so the SSR-to-client transition is handled
 * by React itself — the server snapshot is the default state, and the
 * real localStorage value is picked up post-hydration with no manual
 * `useEffect` gymnastics.
 */
export function useOnboardingState(): OnboardingState {
  const persisted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setStep = useCallback((next: number) => {
    commit((s) => ({ ...s, step: next }));
  }, []);

  const markGroupJoined = useCallback((id: GroupId) => {
    commit((s) => ({ ...s, joined: { ...s.joined, [id]: true } }));
  }, []);

  const setNameConfirmed = useCallback((value: boolean) => {
    commit((s) => ({ ...s, nameConfirmed: value }));
  }, []);

  const setVideoConfirmed = useCallback((value: boolean) => {
    commit((s) => ({ ...s, videoConfirmed: value }));
  }, []);

  const joinedCount = Object.values(persisted.joined).filter(Boolean).length;
  const allJoined = GROUPS.every((g) => persisted.joined[g.id]);

  return {
    ...persisted,
    joinedCount,
    allJoined,
    setStep,
    markGroupJoined,
    setNameConfirmed,
    setVideoConfirmed,
  };
}
