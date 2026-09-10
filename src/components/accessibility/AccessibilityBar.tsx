"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Volume2,
  VolumeX,
  Eye,
  Type,
  Keyboard,
  Award,
  Sparkles,
  Subtitles,
} from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useGamification } from "@/context/GamificationContext";
import { KeyboardShortcutsModal } from "@/components/accessibility/KeyboardShortcutsModal";

export function AccessibilityBar() {
  const {
    preferences,
    isSpeaking,
    toggleAudioNarration,
    toggleHighContrast,
    setFontScale,
    toggleSubtitles,
    stopSpeech,
  } = useAccessibility();

  const { progress, unlockedBadgeList } = useGamification();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showBadgeDrawer, setShowBadgeDrawer] = useState(false);

  // Global key listener for quick a11y shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when focused inside an input/textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }

      if (e.key === "c" || e.key === "C") {
        toggleHighContrast();
      } else if (e.key === "?") {
        setShowShortcuts((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [toggleHighContrast]);

  const cycleFontSize = () => {
    if (preferences.fontScale === "normal") setFontScale("large");
    else if (preferences.fontScale === "large") setFontScale("extra-large");
    else setFontScale("normal");
  };

  return (
    <>
      <header
        role="region"
        aria-label="Panel Aksesibilitas dan Status Pembelajaran"
        className="w-full bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md px-4 py-2.5 flex items-center justify-between text-neutral-200 text-sm z-40 sticky top-0"
      >
        {/* Left: Brand + SDG 4 badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-black tracking-tight text-white hover:text-indigo-400 transition"
            aria-label="Nalar Beranda"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-white text-xs font-black shadow-md shadow-indigo-500/20">
              N
            </div>
            <span className="text-base tracking-normal font-extrabold">NALAR</span>
          </Link>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            SDG 4: Edukasi Inklusif
          </span>
        </div>

        {/* Right: A11y Controls & XP Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio narration toggle */}
          <button
            type="button"
            onClick={preferences.audioNarrationEnabled ? stopSpeech : toggleAudioNarration}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition ${
              preferences.audioNarrationEnabled
                ? "bg-indigo-600/30 border-indigo-500 text-indigo-300"
                : "bg-neutral-800/80 border-neutral-700 text-neutral-300 hover:bg-neutral-700"
            }`}
            aria-label={
              preferences.audioNarrationEnabled
                ? "Matikan bantuan suara"
                : "Aktifkan bantuan suara"
            }
            aria-pressed={preferences.audioNarrationEnabled}
          >
            {preferences.audioNarrationEnabled ? (
              <>
                <Volume2 className={`w-4 h-4 ${isSpeaking ? "animate-pulse text-sky-400" : ""}`} />
                <span className="hidden md:inline">Suara: On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-neutral-400" />
                <span className="hidden md:inline">Suara: Off</span>
              </>
            )}
          </button>

          {/* Subtitles toggle */}
          <button
            type="button"
            onClick={toggleSubtitles}
            className={`p-1.5 rounded-lg border transition ${
              preferences.subtitlesEnabled
                ? "bg-neutral-800 border-neutral-600 text-amber-300"
                : "bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-neutral-300"
            }`}
            aria-label="Alihkan takarir teks visual (subtitles)"
            title="Takarir visual tunarungu"
          >
            <Subtitles className="w-4 h-4" />
          </button>

          {/* High contrast toggle */}
          <button
            type="button"
            onClick={toggleHighContrast}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-medium transition ${
              preferences.theme === "high-contrast"
                ? "bg-amber-400 text-black font-bold border-amber-300"
                : "bg-neutral-800/80 border-neutral-700 text-neutral-300 hover:bg-neutral-700"
            }`}
            aria-label="Alihkan mode kontras tinggi"
            title="Mode kontras tinggi (Shortcut: C)"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Kontras</span>
          </button>

          {/* Font scale cycle */}
          <button
            type="button"
            onClick={cycleFontSize}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-neutral-800/80 border border-neutral-700 text-xs font-medium text-neutral-300 hover:bg-neutral-700 transition"
            aria-label={`Ubah ukuran teks, saat ini: ${preferences.fontScale}`}
            title="Ubah ukuran teks"
          >
            <Type className="w-4 h-4" />
            <span className="uppercase text-[10px] font-bold">
              {preferences.fontScale === "normal"
                ? "1x"
                : preferences.fontScale === "large"
                ? "1.25x"
                : "1.5x"}
            </span>
          </button>

          {/* Keyboard shortcut help modal trigger */}
          <button
            type="button"
            onClick={() => setShowShortcuts(true)}
            className="p-1.5 rounded-lg bg-neutral-800/80 border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-700 transition"
            aria-label="Buka panduan tombol pintas keyboard (?)"
            title="Tombol Pintas (?)"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Vertical Divider */}
          <div className="h-5 w-px bg-neutral-800 mx-1" />

          {/* Gamification XP badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold"
            aria-label={`Skor XP kamu: ${progress.xp} XP`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{progress.xp} XP</span>
          </div>

          {/* Badge count indicator */}
          <button
            type="button"
            onClick={() => setShowBadgeDrawer((prev) => !prev)}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/20 transition"
            aria-label={`Lencana diperoleh: ${unlockedBadgeList.length}`}
            title="Lihat Lencana"
          >
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>{unlockedBadgeList.length}</span>
          </button>
        </div>
      </header>

      {/* Keyboard Modal */}
      <KeyboardShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />

      {/* Badges popup */}
      {showBadgeDrawer && (
        <div className="fixed top-14 right-4 z-50 w-72 p-4 rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl animate-fade-in text-neutral-200">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-800">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" />
              Koleksi Lencana ({unlockedBadgeList.length})
            </h3>
            <button
              type="button"
              onClick={() => setShowBadgeDrawer(false)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Tutup
            </button>
          </div>
          {unlockedBadgeList.length === 0 ? (
            <p className="text-xs text-neutral-400 py-2">
              Selesaikan tantangan interaktif pertamamu untuk membuka lencana perdana!
            </p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {unlockedBadgeList.map((badge) => (
                <div
                  key={badge.id}
                  className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-100">{badge.title}</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
