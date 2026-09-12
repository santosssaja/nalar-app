"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Eye,
  Sparkles,
  Flame,
  Keyboard,
  Award,
  Menu,
  X,
  Subtitles,
  Type,
} from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useGamification } from "@/context/GamificationContext";
import { KeyboardShortcutsModal } from "@/components/accessibility/KeyboardShortcutsModal";
import { BadgesModal } from "./BadgesModal";
import { Tooltip } from "@/components/ui/Tooltip";

export interface TopBarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export function TopBar({ onToggleSidebar, isSidebarOpen }: TopBarProps) {
  const {
    preferences,
    isSpeaking,
    toggleAudioNarration,
    cycleTheme,
    stopSpeech,
    toggleSubtitles,
    setFontScale,
  } = useAccessibility();
  const { progress, unlockedBadgeList } = useGamification();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  return (
    <>
      <header
        role="banner"
        className="w-full bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md px-3 sm:px-6 py-2.5 flex items-center justify-between text-neutral-200 text-sm z-30 sticky top-0"
      >
        {/* Left: Brand and Mobile Sidebar Toggle */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <Tooltip content={isSidebarOpen ? "Tutup sidebar" : "Alihkan sidebar"}>
              <button
                type="button"
                onClick={onToggleSidebar}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                aria-label={isSidebarOpen ? "Tutup sidebar" : "Alihkan sidebar"}
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </Tooltip>
          )}

          <Link
            href="/"
            className="flex items-center gap-2.5 font-black tracking-tight text-white hover:text-indigo-400 transition"
            aria-label="Beranda Nalar"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 flex items-center justify-center text-white text-sm font-black shadow-md shadow-indigo-500/25">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-base tracking-tight font-black leading-none">NALAR</span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-normal hidden sm:inline">
                STEM Interaktif & Inklusif
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Gamification Stats (Streak & XP) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Counter */}
          <Tooltip content="Streak belajar berturut-turut">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold"
              aria-label={`Streak belajar: ${progress.consecutiveDays} hari`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{progress.consecutiveDays} hr</span>
            </div>
          </Tooltip>

          {/* XP Counter */}
          <Tooltip content="Total poin pengalaman (XP) yang diraih">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold font-mono"
              aria-label={`Poin pengalaman: ${progress.xp} XP`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{progress.xp} XP</span>
            </div>
          </Tooltip>

          {/* Badges Button */}
          <Tooltip content="Lihat lencana penghargaan kamu">
            <button
              type="button"
              onClick={() => setShowBadgeModal(true)}
              className="relative p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
              aria-label="Buka daftar lencana"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              {unlockedBadgeList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {unlockedBadgeList.length}
                </span>
              )}
            </button>
          </Tooltip>
        </div>

        {/* Right: Accessibility Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Audio narration toggle */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={preferences.audioNarrationEnabled ? stopSpeech : toggleAudioNarration}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs font-semibold transition flex items-center gap-1.5 ${
              preferences.audioNarrationEnabled
                ? "bg-indigo-600/30 border-indigo-500 text-indigo-300"
                : "bg-neutral-800/80 border-neutral-700 text-neutral-400 hover:bg-neutral-700"
            }`}
            aria-label={
              preferences.audioNarrationEnabled ? "Matikan suara" : "Aktifkan suara"
            }
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
            <span className="hidden md:inline capitalize">{preferences.theme}</span>
          </button>

          {/* Keyboard shortcuts trigger */}
          <button
            type="button"
            onClick={() => setShowShortcuts(true)}
            className="hidden sm:flex p-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 transition"
            aria-label="Panduan tombol pintas keyboard"
            title="Tombol pintas (?)"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      {/* Badges Modal */}
      <BadgesModal
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        unlockedBadgeList={unlockedBadgeList}
      />
    </>
  );
}
