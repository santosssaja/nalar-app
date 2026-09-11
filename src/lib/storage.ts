/**
 * SSR-safe LocalStorage helper and useLocalStorage hook using useSyncExternalStore.
 * Completely eliminates React 19 hydration mismatches and cascading render warnings.
 */
import { useSyncExternalStore, useCallback } from "react";

const STORAGE_SYNC_EVENT = "nalar_storage_sync";
const storageCache = new Map<string, { raw: string | null; parsed: unknown }>();

function dispatchStorageSync() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORAGE_SYNC_EVENT));
  }
}

function subscribeToStorage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_SYNC_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_SYNC_EVENT, callback);
  };
}

export function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    const entry = storageCache.get(key);
    if (entry && entry.raw === raw) {
      return entry.parsed as T;
    }
    const parsed = raw ? (JSON.parse(raw) as T) : fallback;
    storageCache.set(key, { raw, parsed });
    return parsed;
  } catch (error) {
    console.warn(`[LocalStorage] Error reading key "${key}":`, error);
    return fallback;
  }
}

export function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    storageCache.set(key, { raw: serialized, parsed: value });
    dispatchStorageSync();
  } catch (error) {
    console.warn(`[LocalStorage] Error writing key "${key}":`, error);
  }
}

export function useLocalStorage<T>(
  key: string,
  fallback: T
): [T, (valOrFn: T | ((prev: T) => T)) => void] {
  const getSnapshot = useCallback((): T => {
    return getStoredItem<T>(key, fallback);
  }, [key, fallback]);

  const getServerSnapshot = useCallback((): T => {
    return fallback;
  }, [fallback]);

  const storeValue = useSyncExternalStore(
    subscribeToStorage,
    getSnapshot,
    getServerSnapshot
  );

  const setValue = useCallback(
    (valOrFn: T | ((prev: T) => T)) => {
      const current = getStoredItem<T>(key, fallback);
      const next =
        typeof valOrFn === "function"
          ? (valOrFn as (prev: T) => T)(current)
          : valOrFn;
      setStoredItem<T>(key, next);
    },
    [key, fallback]
  );

  return [storeValue, setValue];
}

const emptySubscribe = () => () => {};

export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export const STORAGE_KEYS = {
  A11Y_PREFERENCES: "nalar_a11y_prefs_v1",
  USER_PROGRESS: "nalar_progress_v1",
  CHAT_HISTORY_PREFIX: "nalar_chat_history_",
} as const;
