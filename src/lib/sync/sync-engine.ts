import { resolveProgressConflict, LocalGamificationState } from "./conflict-resolver";

export type SyncStatus = "idle" | "syncing" | "synced" | "error" | "offline";

type SyncListener = (status: SyncStatus, lastSyncedAt: string | null) => void;

class SyncEngine {
  private status: SyncStatus = "idle";
  private lastSyncedAt: string | null = null;
  private listeners: Set<SyncListener> = new Set();
  private isInitialized = false;

  public init() {
    if (this.isInitialized || typeof window === "undefined") return;
    this.isInitialized = true;

    if (!navigator.onLine) {
      this.setStatus("offline");
    }

    window.addEventListener("online", () => {
      this.setStatus("idle");
      this.syncNow();
    });

    window.addEventListener("offline", () => {
      this.setStatus("offline");
    });
  }

  public subscribe(listener: SyncListener): () => void {
    this.listeners.add(listener);
    listener(this.status, this.lastSyncedAt);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private setStatus(status: SyncStatus) {
    this.status = status;
    this.listeners.forEach((l) => l(this.status, this.lastSyncedAt));
  }

  public getStatus(): SyncStatus {
    return this.status;
  }

  public getLastSyncedAt(): string | null {
    return this.lastSyncedAt;
  }

  public async syncNow(): Promise<boolean> {
    if (typeof window === "undefined") return false;
    if (!navigator.onLine) {
      this.setStatus("offline");
      return false;
    }

    const raw = localStorage.getItem("nalar_gamification_state");
    if (!raw) return false;

    let localState: LocalGamificationState;
    try {
      localState = JSON.parse(raw);
    } catch {
      return false;
    }

    this.setStatus("syncing");

    try {
      const token = localStorage.getItem("nalar_auth_token");
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("/api/sync", {
        method: "POST",
        headers,
        body: JSON.stringify({
          xp: localState.xp,
          completedLevels: localState.completedLevels,
          unlockedBadges: localState.unlockedBadges,
          streak: {
            current: localState.streak.currentStreak,
            longest: localState.streak.longestStreak,
            lastActiveDate: localState.streak.lastActiveDate,
          },
        }),
      });

      if (!res.ok) {
        this.setStatus("error");
        return false;
      }

      const resData = await res.json();
      if (resData.resolved) {
        const merged = resolveProgressConflict(localState, resData.resolved);
        localStorage.setItem("nalar_gamification_state", JSON.stringify(merged));
        window.dispatchEvent(new Event("nalar:gamification_state_changed"));
      }

      this.lastSyncedAt = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      this.setStatus("synced");
      return true;
    } catch (err) {
      console.warn("[SyncEngine] Sync failed:", err);
      this.setStatus("error");
      return false;
    }
  }
}

export const syncEngine = new SyncEngine();
