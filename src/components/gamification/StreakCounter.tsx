"use client";

import React from "react";
import { useGamification } from "@/context/GamificationContext";
import { Flame } from "lucide-react";

export function StreakCounter({ className = "" }: { className?: string }) {
  const { progress } = useGamification();

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 shadow-sm ${className}`}
      aria-label={`Streak belajar: ${progress.consecutiveDays} hari berturut-turut`}
    >
      <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
        <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-xs font-black leading-none font-mono">
          {progress.consecutiveDays} HARI
        </span>
        <span className="text-[9px] text-amber-400/80 font-semibold tracking-wide">
          Streak Belajar
        </span>
      </div>
    </div>
  );
}
