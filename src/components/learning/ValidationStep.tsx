"use client";

import React, { useEffect } from "react";
import { ValidationConfig } from "@/types/level";
import { KaTeXView } from "@/components/ui/KaTeXView";
import { Button } from "@/components/ui/Button";
import { NaiExpressions } from "@/components/nai/NaiExpressions";
import { Award, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { useNai } from "@/components/nai/NaiContext";
import { ConfettiCelebration } from "@/components/gamification/ConfettiCelebration";

export interface ValidationStepProps {
  config: ValidationConfig;
  topicSlug: string;
  onFinishLevel: () => void;
}

export function ValidationStep({
  config,
  onFinishLevel,
}: ValidationStepProps) {
  const { triggerCelebration } = useGamification();
  const { say } = useNai();

  useEffect(() => {
    triggerCelebration();
    say("Hebat! Kamu telah menuntaskan tingkat pembelajaran ini dengan sangat baik!", {
      expression: "celebrating",
      readAloud: true,
    });
  }, [triggerCelebration, say]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 text-center animate-fade-in">
      <ConfettiCelebration mode="fireworks" duration={2500} />

      {/* Celebration Header */}
      <div className="flex flex-col items-center p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-900 to-emerald-950/30 border border-emerald-500/30 shadow-2xl space-y-4">
        <div className="p-3 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 shadow-lg animate-gentle-pulse">
          <NaiExpressions expression="celebrating" size={88} />
        </div>

        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1 text-xs font-black tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Tingkat Selesai!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">{config.title}</h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
            {config.summaryText}
          </p>
        </div>

        {/* Key takeaway card */}
        <div className="w-full p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-left space-y-2">
          <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider block">
            Poin Pemahaman Utama
          </span>
          <p className="text-xs sm:text-sm font-semibold text-white">{config.keyTakeaway}</p>
          <div className="pt-2 text-center overflow-x-auto">
            <KaTeXView math={config.formulaKaTeX} displayMode />
          </div>
        </div>

        {/* Badge Unlocked Notification */}
        {config.badgeToUnlock && (
          <div className="w-full p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="font-bold">Lencana Baru Terbuka!</span>
            </div>
            <span className="font-mono font-bold text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Disimpan ke Profil
            </span>
          </div>
        )}

        <div className="pt-2 w-full">
          <Button
            variant="primary"
            size="lg"
            onClick={onFinishLevel}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto px-8 bg-emerald-600 hover:bg-emerald-500 border-emerald-500/40 shadow-lg shadow-emerald-600/20"
          >
            Lanjut ke Peta Level
          </Button>
        </div>
      </div>
    </div>
  );
}
