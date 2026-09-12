"use client";

import React, { useEffect } from "react";
import { useGamification } from "@/context/GamificationContext";
import { NaiExpressions } from "@/components/nai/NaiExpressions";
import { Button } from "@/components/ui/Button";
import { Compass, Sparkles, X } from "lucide-react";
import { useNai } from "@/components/nai/NaiContext";

export function LevelUpModal() {
  const { levelUpModalRank, closeLevelUpModal, triggerCelebration } = useGamification();
  const { say } = useNai();

  useEffect(() => {
    if (levelUpModalRank) {
      triggerCelebration();
      say(`Selamat! Tingkat kemampuanmu naik ke jenjang ${levelUpModalRank}!`, {
        expression: "celebrating",
        readAloud: true,
      });
    }
  }, [levelUpModalRank, triggerCelebration, say]);

  if (!levelUpModalRank) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Notifikasi Kenaikan Tingkat"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-amber-500/40 shadow-2xl text-center space-y-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeLevelUpModal}
            className="p-1 rounded-xl text-neutral-400 hover:text-white transition"
            aria-label="Tutup notifikasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mascot celebrating */}
        <div className="flex justify-center -mt-6">
          <div className="p-3 rounded-3xl bg-amber-500/10 border border-amber-500/30 shadow-lg animate-gentle-pulse">
            <NaiExpressions expression="celebrating" size={88} />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-black tracking-widest text-amber-400 uppercase">
            Pencapaian Baru!
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Naik ke Tingkat {levelUpModalRank}!
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm mx-auto">
            Dedikasi belajarmu membuahkan hasil. Tingkat pemahaman dan intuisi logikamu telah meningkat pesat!
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex items-center justify-center gap-2 text-amber-300 text-xs font-bold font-mono">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Status Jenjang: {levelUpModalRank.toUpperCase()}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={closeLevelUpModal}
            className="w-full bg-amber-600 hover:bg-amber-500 border-amber-500/30 shadow-lg shadow-amber-600/30"
          >
            Lanjutkan Petualangan
          </Button>
        </div>
      </div>
    </div>
  );
}
