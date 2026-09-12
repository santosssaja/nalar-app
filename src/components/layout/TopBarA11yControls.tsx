"use client";

import React from "react";
import {
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Eye,
  Keyboard,
  Subtitles,
  Type,
} from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";

export interface TopBarA11yControlsProps {
  onOpenShortcuts: () => void;
}

export function TopBarA11yControls({ onOpenShortcuts }: TopBarA11yControlsProps) {
  const {
    preferences,
    isSpeaking,
    toggleAudioNarration,
    cycleTheme,
    toggleSubtitles,
    setFontScale,
  } = useAccessibility();

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {/* Audio narration toggle */}
      <button
        type="button"
        suppressHydrationWarning
        onClick={toggleAudioNarration}
        className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs font-semibold transition flex items-center gap-1.5 ${
          preferences.audioNarrationEnabled
            ? "bg-indigo-600/30 border-indigo-500 text-indigo-300"
            : "bg-neutral-800/80 border-neutral-700 text-neutral-400 hover:bg-neutral-700"
        }`}
        aria-label={
          preferences.audioNarrationEnabled ? "Matikan suara (Mute)" : "Aktifkan suara"
        }
        aria-pressed={preferences.audioNarrationEnabled}
      >
        {preferences.audioNarrationEnabled ? (
          <>
            <Volume2 className={`w-4 h-4 ${isSpeaking ? "animate-pulse text-sky-400" : ""}`} />
            <span className="hidden lg:inline">Suara</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="hidden lg:inline">Mute</span>
          </>
        )}
      </button>

      {/* Subtitles toggle */}
      <button
        type="button"
        suppressHydrationWarning
        onClick={toggleSubtitles}
        className={`p-1.5 rounded-lg border transition ${
          preferences.subtitlesEnabled
            ? "bg-neutral-800 border-neutral-600 text-amber-300"
            : "bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-neutral-300"
        }`}
        aria-label="Alihkan takarir teks visual (subtitles)"
        title="Takarir visual"
      >
        <Subtitles className="w-4 h-4" />
      </button>

      {/* Font scale cycle */}
      <button
        type="button"
        suppressHydrationWarning
        onClick={() => {
          if (preferences.fontScale === "normal") setFontScale("large");
          else if (preferences.fontScale === "large") setFontScale("extra-large");
          else setFontScale("normal");
        }}
        className="p-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 transition"
        aria-label={`Ubah ukuran teks, saat ini: ${preferences.fontScale}`}
        title="Ukuran teks (Normal/Besar/Ekstra)"
      >
        <Type className="w-4 h-4" />
      </button>

      {/* Theme mode toggle */}
      <button
        type="button"
        suppressHydrationWarning
        onClick={cycleTheme}
        className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 text-xs font-semibold transition flex items-center gap-1.5"
        aria-label="Ganti tema warna (Dark, Light, Kontras Tinggi)"
        title="Ganti tema (Shortcut: C)"
      >
        {preferences.theme === "dark" ? (
          <Moon className="w-4 h-4 text-sky-400" />
        ) : preferences.theme === "light" ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Eye className="w-4 h-4 text-yellow-400" />
        )}
        <span className="hidden xl:inline capitalize">{preferences.theme}</span>
      </button>

      {/* Keyboard shortcuts trigger */}
      <button
        type="button"
        onClick={onOpenShortcuts}
        className="hidden sm:flex p-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 transition"
        aria-label="Panduan tombol pintas keyboard"
        title="Tombol pintas (?)"
      >
        <Keyboard className="w-4 h-4" />
      </button>
    </div>
  );
}
