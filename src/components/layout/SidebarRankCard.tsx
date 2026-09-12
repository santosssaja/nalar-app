"use client";

import React from "react";
import { Compass } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { UserRankInfo } from "@/lib/gamification/types";

export function SidebarRankCard({
  rank,
  currentXp,
  isCollapsed,
}: {
  rank: UserRankInfo;
  currentXp: number;
  isCollapsed: boolean;
}) {
  const xpInRank = currentXp - rank.minXp;
  const xpToNext = rank.nextXp - rank.minXp;

  if (isCollapsed) {
    return (
      <Tooltip
        content={`Tingkat ${rank.title} • ${currentXp} XP (${Math.max(0, rank.nextXp - currentXp)} XP lagi)`}
        position="right"
      >
        <div className="w-full flex justify-center py-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Compass className="w-5 h-5" />
          </div>
        </div>
      </Tooltip>
    );
  }

  return (
    <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wide">
            Level {rank.title}
          </span>
        </div>
        <span className="text-[10px] text-amber-300 font-mono font-bold">
          {currentXp} XP
        </span>
      </div>

      <ProgressBar
        value={xpInRank}
        max={xpToNext}
        size="sm"
        variant="amber"
      />

      <p className="text-[11px] text-neutral-400 leading-tight">
        {Math.max(0, rank.nextXp - currentXp)} XP lagi menuju tingkatan berikutnya.
      </p>
    </div>
  );
}
