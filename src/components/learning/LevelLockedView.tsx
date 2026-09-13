"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Lock, ArrowLeft, Play, ShieldAlert, Volume2 } from "lucide-react";
import { NaiExpressions } from "@/components/nai/NaiExpressions";
import { Button } from "@/components/ui/Button";
import { useAccessibility } from "@/context/AccessibilityContext";
import { getLevelToken } from "@/lib/curriculum/level-token";

export interface LevelLockedViewProps {
  topicSlug: string;
  topicTitle: string;
  targetLevelIndex?: number | null;
  highestUnlockedLevelIndex: number;
  reason?: "locked" | "invalid_token";
}

export function LevelLockedView({
  topicSlug,
  topicTitle,
  targetLevelIndex,
  highestUnlockedLevelIndex,
  reason = "locked",
}: LevelLockedViewProps) {
  const { speakText, isSpeaking } = useAccessibility();

  const isInvalid = reason === "invalid_token";
  const title = isInvalid
    ? "Tautan Tingkat Tidak Valid"
    : `Tingkat ${targetLevelIndex ?? ""} Masih Terkunci`;

  const description = isInvalid
    ? "Format tautan tingkat tidak dikenali atau menggunakan nomor mentah yang tidak diizinkan. Silakan pilih tingkat resmi dari Peta Level."
    : `Kamu harus menyelesaikan Tingkat ${(targetLevelIndex ?? 2) - 1} terlebih dahulu sebelum dapat membuka materi tingkat ini.`;

  useEffect(() => {
    speakText(description);
  }, [description, speakText]);

  const activeToken = getLevelToken(topicSlug, highestUnlockedLevelIndex);

  return (
    <div
      className="w-full h-full min-h-[460px] flex flex-col items-center justify-center p-6 text-center animate-fade-in select-none"
      role="alert"
      aria-label={title}
    >
      <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-900 to-amber-950/20 border border-amber-500/30 shadow-2xl space-y-4 flex flex-col items-center">
        {/* Animated Nai Avatar with Lock Badge */}
        <div className="relative">
          <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 shadow-md">
            <NaiExpressions expression="thinking" size={72} />
          </div>
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-amber-500 text-neutral-950 shadow-lg border border-amber-300 animate-bounce">
            {isInvalid ? <ShieldAlert className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            {isInvalid ? "Akses Dibatasi" : "Tingkat Terkunci"}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">{title}</h2>
          <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
            {description}
          </p>
        </div>

        {/* Audio Assistant */}
        <button
          type="button"
          onClick={() => speakText(description)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition"
          aria-label="Dengarkan penjelasan audio"
        >
          <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? "text-amber-400 animate-pulse" : ""}`} />
          <span>Dengarkan Penjelasan</span>
        </button>

        {/* Actions */}
        <div className="w-full pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Link href={`/topics/${topicSlug}/${activeToken}`} className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Play className="w-3.5 h-3.5" />}
              className="w-full text-xs font-bold px-4"
            >
              Buka Tingkat {highestUnlockedLevelIndex} yang Terbuka
            </Button>
          </Link>

          <Link href={`/topics/${topicSlug}`} className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              className="w-full text-xs font-bold px-4"
            >
              Peta Level
            </Button>
          </Link>
        </div>

        <div className="text-[11px] text-neutral-500 pt-1">
          Topik: <span className="text-neutral-400 font-medium">{topicTitle}</span>
        </div>
      </div>
    </div>
  );
}
