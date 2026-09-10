/**
 * SSR-safe LocalStorage helper for zero-friction user state persistence.
 */

export function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
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
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[LocalStorage] Error writing key "${key}":`, error);
  }
}

export const STORAGE_KEYS = {
  A11Y_PREFERENCES: "nalar_a11y_prefs_v1",
  USER_PROGRESS: "nalar_progress_v1",
  CHAT_HISTORY_PREFIX: "nalar_chat_history_",
} as const;
