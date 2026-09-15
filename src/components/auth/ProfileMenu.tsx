import React, { useState, useEffect, useRef } from "react";
import { User, LogIn, LogOut, Download, Upload, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { syncEngine, SyncStatus } from "@/lib/sync/sync-engine";
import { downloadBackupFile, importBackupFromJson } from "@/lib/sync/export-import";

export function ProfileMenu() {
  const { user, isGuest, openLoginModal, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle");
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = syncEngine.subscribe((status, syncedTime) => {
      setSyncStatus(status);
      setLastSynced(syncedTime);
    });
    return () => unsubscribe();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleManualSync = async () => {
    await syncEngine.syncNow();
  };

  const handleExport = () => {
    downloadBackupFile();
    setIsOpen(false);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importBackupFromJson(content);
      if (res.success) {
        window.location.reload();
      } else {
        alert(res.error || "Gagal memulihkan cadangan data");
      }
    };
    reader.readAsText(file);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Hidden file input for import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportFile}
        accept=".json"
        className="hidden"
      />

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Menu profil dan status sinkronisasi"
        className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-bold transition text-neutral-200"
      >
        <div className="relative">
          <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300">
            <User className="w-3.5 h-3.5" />
          </div>
          {/* Sync status indicator dot */}
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-neutral-950 ${
              syncStatus === "synced"
                ? "bg-emerald-400"
                : syncStatus === "syncing"
                ? "bg-sky-400 animate-ping"
                : syncStatus === "offline"
                ? "bg-neutral-500"
                : "bg-amber-400"
            }`}
          />
        </div>

        <span className="hidden md:inline max-w-[100px] truncate">
          {user?.name || "Tamu"}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-24px)] p-2 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl z-50 space-y-2 animate-fade-in text-xs">
          {/* User Info Header */}
          <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm truncate">
                {user?.name || "Tamu Penjelajah"}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                {isGuest ? "Tamu" : "Akun Aktif"}
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 truncate">
              {user?.email || "Progres disimpan di peramban ini"}
            </p>

            {/* Sync status row */}
            <div className="flex items-center gap-1.5 pt-1 text-[10px] text-neutral-400">
              {syncStatus === "offline" ? (
                <>
                  <WifiOff className="w-3 h-3 text-neutral-500" />
                  <span>Mode Offline</span>
                </>
              ) : syncStatus === "syncing" ? (
                <>
                  <RefreshCw className="w-3 h-3 text-sky-400 animate-spin" />
                  <span className="text-sky-300">Menyinkronkan data...</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span>
                    {lastSynced ? `Tersinkron pukul ${lastSynced}` : "Tersinkron"}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Action Links */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={handleManualSync}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800 transition text-left"
            >
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sinkronkan Sekarang</span>
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800 transition text-left"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cadangkan Data (JSON Export)</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800 transition text-left"
            >
              <Upload className="w-3.5 h-3.5 text-sky-400" />
              <span>Pulihkan Data (JSON Import)</span>
            </button>
          </div>

          {/* Auth Button */}
          <div className="pt-1 border-t border-neutral-800/80">
            {isGuest ? (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openLoginModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk / Buat Akun</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={async () => {
                  setIsOpen(false);
                  await logout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Akun</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
