"use client";

import React, { useEffect } from "react";
import { ReflectConfig } from "@/types/level";
import { Award, ArrowRight, CheckCircle2, Sparkles, Link2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useGamification } from "@/context/GamificationContext";
import { ConfettiCelebration } from "@/components/gamification/ConfettiCelebration";

export interface ReflectScreenProps {
  config: ReflectConfig;
  onNext: () => void;
  nextLevelToken?: string | null;
  isLastLevel?: boolean;
}

export function ReflectScreen({ config, onNext, isLastLevel }: ReflectScreenProps) {
  const { triggerCelebration } = useGamification();

  useEffect(() => {
    triggerCelebration();
  }, [triggerCelebration]);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-3 animate-fade-in overflow-y-auto md:overflow-hidden relative">
      <ConfettiCelebration mode="fireworks" duration={2200} />
      {/* Top Header */}
      <div className="shrink-0 flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Award className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-black text-white truncate leading-tight">
              {config.title}
            </h2>
            <p className="text-[11px] text-neutral-400 truncate leading-tight">
              Refleksi & Rangkuman Capaian Nalar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 font-mono text-xs font-bold text-amber-300">
            +{config.xpReward} XP
          </span>
        </div>
      </div>

      {/* Main Card */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-neutral-900/80 border border-neutral-800 rounded-3xl shadow-xl overflow-y-auto space-y-4 sm:space-y-5">
        <div className="text-center space-y-2 max-w-lg">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-500 p-0.5 mx-auto shadow-lg">
            <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-amber-400 animate-pulse" />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            Level Tuntas! 🎉
          </h3>
          <p className="text-xs text-neutral-400">
            Kamu telah berhasil menemukan konsep ini melalui penalaran mandiri.
          </p>
        </div>

        {/* Takeaways List */}
        <div className="w-full max-w-lg p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2.5 shadow-inner">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
            Poin Temuan Utama:
          </span>
          <div className="space-y-2">
            {config.takeaways.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Topic Connection */}
        {config.connectionText && (
          <div className="w-full max-w-lg p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2.5">
            <Link2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-indigo-300">Koneksi Topik Berikutnya: </span>
              <span className="text-neutral-300">{config.connectionText}</span>
            </div>
          </div>
        )}

        <div className="w-full max-w-sm pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={onNext}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full text-xs font-bold py-2.5 bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 shadow-lg"
          >
            {isLastLevel ? "Selesaikan Modul & Ambil Hadiah 🏆" : (config.nextLevelTitle ? `Lanjut ke ${config.nextLevelTitle} →` : "Lanjut ke Tingkat Berikutnya →")}
          </Button>
        </div>
      </div>
    </div>
  );
}
