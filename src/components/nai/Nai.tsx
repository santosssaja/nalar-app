"use client";

import React, { useState } from "react";
import { EyeOff, Minus, ChevronUp, Sparkles } from "lucide-react";
import { useNai } from "./NaiContext";
import { NaiExpressions } from "./NaiExpressions";
import { NaiSpeechBubble } from "./NaiSpeechBubble";
import { NAI_EXPRESSIONS, NaiExpression } from "./nai-sprites";
import { usePathname } from "next/navigation";
import { useAccessibility } from "@/context/AccessibilityContext";

export function Nai() {
  const pathname = usePathname();
  const {
    expression,
    message,
    actionText,
    onAction,
    isMinimized,
    isHidden,
    setExpression,
    say,
    clearMessage,
    toggleMinimize,
    toggleHide,
  } = useNai();

  const { preferences } = useAccessibility();
  const isHighContrast = preferences.theme === "high-contrast";
  const [showMenu, setShowMenu] = useState(false);

  if (isHidden) {
    return (
      <button
        type="button"
        onClick={toggleHide}
        className="fixed bottom-20 md:bottom-6 right-4 z-40 px-3 py-1.5 rounded-full bg-neutral-900 border border-indigo-500/40 text-xs font-bold text-indigo-300 shadow-xl flex items-center gap-1.5 hover:bg-neutral-800 transition"
        aria-label="Tampilkan kembali maskot Nai"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Panggil Nai</span>
      </button>
    );
  }

  const expData = NAI_EXPRESSIONS[expression] || NAI_EXPRESSIONS.neutral;

  const handleNaiClick = () => {
    if (isMinimized) {
      toggleMinimize();
      return;
    }

    if (message) {
      clearMessage();
    } else {
      // Dynamic page-specific tip when clicked
      if (pathname === "/") {
        say(
          "Ingin rekomendasi? Coba mulai dari 'Operasi Bilangan Riil' atau 'Kanon Proyektil' untuk melihat simulasi visual seru!",
          { expression: "happy", autoDismissMs: 8000 }
        );
      } else if (pathname === "/explore") {
        say(
          "Tips: Gunakan filter kategori Matematika atau Fisika di atas untuk menyaring topik yang ingin kamu dalami!",
          { expression: "curious", autoDismissMs: 8000 }
        );
      } else if (pathname === "/skill-tree") {
        say(
          "Tips: Geser kanvas atau gunakan scroll mouse untuk menjelajahi peta. Simpul yang menyala hijau menandakan modul yang siap dipelajari!",
          { expression: "thinking", autoDismissMs: 8000 }
        );
      } else if (pathname.startsWith("/topics/")) {
        say(
          "Tips: Jangan terburu-buru mencari jawaban! Geser parameter simulasi perlahan dan perhatikan apa yang berubah di kanvas grafis.",
          { expression: "teaching", autoDismissMs: 8000 }
        );
      } else {
        say(expData.defaultMessage, { expression });
      }
    }
  };

  return (
    <aside
      aria-label="Teman Belajar AI Nai"
      className="fixed bottom-3 md:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end gap-1.5 pointer-events-none select-none"
    >
      {/* Speech Bubble */}
      {message && !isMinimized && (
        <div
          onClick={clearMessage}
          className="pointer-events-auto max-w-[230px] sm:max-w-xs mb-0.5 cursor-pointer"
          title="Klik untuk menutup pesan"
        >
          <NaiSpeechBubble
            message={message}
            onClose={clearMessage}
            actionText={actionText || undefined}
            onActionClick={onAction || undefined}
          />
        </div>
      )}

      {/* Floating Mascot Companion */}
      <div className="relative pointer-events-auto flex items-end gap-1.5">
        {/* Quick actions popup */}
        {showMenu && !isMinimized && (
          <div className="p-2 rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl text-xs space-y-1 mb-1 mr-2 animate-fade-in text-neutral-300">
            <p className="text-[10px] font-bold text-neutral-500 uppercase px-2 py-0.5">
              Opsi Nai
            </p>
            <button
              type="button"
              onClick={() => {
                const exps: NaiExpression[] = [
                  "happy",
                  "thinking",
                  "celebrating",
                  "curious",
                  "teaching",
                ];
                const next = exps[(exps.indexOf(expression) + 1) % exps.length];
                setExpression(next);
                setShowMenu(false);
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-800 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ganti Pose</span>
            </button>
            <button
              type="button"
              onClick={() => {
                toggleMinimize();
                setShowMenu(false);
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-800 flex items-center gap-2"
            >
              <Minus className="w-3.5 h-3.5 text-neutral-400" />
              <span>Kecilkan</span>
            </button>
            <button
              type="button"
              onClick={() => {
                toggleHide();
                setShowMenu(false);
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-800 flex items-center gap-2 text-rose-400"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Sembunyikan</span>
            </button>
          </div>
        )}

        {/* Mascot Avatar */}
        <div className="relative group">
          {/* Controls button toggle */}
          <button
            type="button"
            onClick={() => setShowMenu((p) => !p)}
            className="absolute -top-2 -left-2 z-10 w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition shadow"
            aria-label="Menu pengaturan maskot Nai"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleNaiClick}
            className={`relative rounded-3xl p-1 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 ${
              isMinimized
                ? "bg-neutral-900 border border-indigo-500/40 p-1 shadow-lg hover:scale-110"
                : "animate-float hover:scale-105 active:scale-95 drop-shadow-2xl"
            }`}
            aria-label={`${expData.ariaLabel}. Klik untuk berinteraksi dengan Nai.`}
            title={`${expData.name} - Klik untuk interaksi`}
          >
            <NaiExpressions
              expression={expression}
              size={isMinimized ? 36 : 72}
              className={isMinimized ? "w-7 h-7 sm:w-9 sm:h-9" : "w-11 h-11 sm:w-16 sm:h-16"}
              isHighContrast={isHighContrast}
            />

            {/* Status indicator dot */}
            <span
              className="absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-neutral-950"
              style={{ backgroundColor: expData.moodColor }}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
