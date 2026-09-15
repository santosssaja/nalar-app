import { LocalGamificationState } from "./conflict-resolver";

export interface NalarExportBackup {
  version: "1.0";
  app: "nalar";
  exportedAt: string;
  data: LocalGamificationState;
}

const STORAGE_KEY = "nalar_gamification_state";

export function exportBackupToJson(): string | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const data = JSON.parse(raw);
    const backup: NalarExportBackup = {
      version: "1.0",
      app: "nalar",
      exportedAt: new Date().toISOString(),
      data,
    };
    return JSON.stringify(backup, null, 2);
  } catch (err) {
    console.error("[ExportBackup] Error parsing localStorage data:", err);
    return null;
  }
}

export function downloadBackupFile(): boolean {
  const json = exportBackupToJson();
  if (!json) return false;

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const dateStr = new Date().toISOString().split("T")[0];
  a.href = url;
  a.download = `nalar-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}

export function validateBackupJson(jsonString: string): { success: boolean; data?: LocalGamificationState; error?: string } {
  try {
    const parsed = JSON.parse(jsonString) as NalarExportBackup;
    if (parsed.app !== "nalar" || !parsed.data) {
      return { success: false, error: "Format berkas cadangan tidak valid" };
    }
    return { success: true, data: parsed.data };
  } catch {
    return { success: false, error: "Gagal memproses berkas JSON" };
  }
}

export function importBackupFromJson(jsonString: string): { success: boolean; error?: string } {
  const validation = validateBackupJson(jsonString);
  if (!validation.success || !validation.data) {
    return { success: false, error: validation.error };
  }

  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(validation.data));
  } else if (typeof globalThis !== "undefined" && (globalThis as any).localStorage) {
    try {
      (globalThis as any).localStorage.setItem(STORAGE_KEY, JSON.stringify(validation.data));
    } catch {
      // ignore in environments with read-only storage mock
    }
  }

  return { success: true };
}
