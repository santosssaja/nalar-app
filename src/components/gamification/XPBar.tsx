"use client";

import React from "react";
import { useGamification } from "@/context/GamificationContext";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Sparkles, Compass } from "lucide-react";

export function XPBar({ className = "" }: { className?: string }) {
  const { rankInfo, progress } = useGamification();

  const xpInTier = progress.xp - rankInfo.minXp;
  const xpNeeded = rankInfo.nextXp - rankInfo.minXp;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-white">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Tingkat: {rankInfo.title}</span>
        </div>
        <span className="font-mono text-amber-300 font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {progress.xp} XP
        </span>
      </div>

      <ProgressBar
        value={xpInTier}
        max={xpNeeded}
        size="sm"
        variant="amber"
      />

      <div className="flex items-center justify-between text-[10px] text-neutral-400">
        <span>{rankInfo.minXp} XP</span>
        <span>{Math.max(0, rankInfo.nextXp - progress.xp)} XP lagi ke tingkat berikutnya</span>
        <span>{rankInfo.nextXp} XP</span>
      </div>
    </div>
  );
}
