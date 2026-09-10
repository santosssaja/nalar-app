"use client";

import React, { useEffect } from "react";
import { X, Keyboard } from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { key: "Space", desc: "Mulai atau hentikan pembacaan narasi suara (audio)" },
  { key: "C", desc: "Beralih antara Mode Gelap Normal dan Mode Kontras Tinggi" },
  { key: "H", desc: "Minta petunjuk bertahap (AI Hint) pada tantangan aktif" },
  { key: "← / →", desc: "Menggeser nilai parameter slider (langkah 0.1)" },
  { key: "Tab", desc: "Navigasi antar elemen interaktif secara berurutan" },
  { key: "?", desc: "Membuka panduan tombol pintas keyboard ini" },
  { key: "Esc", desc: "Menutup jendela bantuan atau dialog terbuka" },
];

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl p-6 text-neutral-100">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <Keyboard className="w-5 h-5 text-indigo-400" />
            <h2 id="shortcuts-title" className="text-lg font-bold">
              Pintasan Keyboard (Aksesibilitas)
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog pintasan"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-2.5">
          {SHORTCUTS.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80"
            >
              <span className="text-sm text-neutral-300">{s.desc}</span>
              <kbd className="px-2.5 py-1 text-xs font-semibold rounded bg-neutral-800 text-amber-300 border border-neutral-700 shadow-sm whitespace-nowrap">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            Mengerti (Tutup)
          </button>
        </div>
      </div>
    </div>
  );
}
