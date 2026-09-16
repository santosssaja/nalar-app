"use client";

import React, { useState } from "react";
import { FourTierHint } from "@/lib/curriculum/pedagogy-types";
import { HelpCircle, ChevronDown, ChevronRight, Lock, Eye } from "lucide-react";

interface FourTierHintDrawerProps {
  hints: FourTierHint;
  onHintUnlocked?: (level: number) => void;
}

export function FourTierHintDrawer({ hints, onHintUnlocked }: FourTierHintDrawerProps) {
  const [unlockedLevel, setUnlockedLevel] = useState<number>(0);
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);

  const tiers = [
    { level: 1, title: "Hint 1: Arahkan Perhatian", content: hints.level1Attention, tag: "Observasi" },
    { level: 2, title: "Hint 2: Orientasi Konsep", content: hints.level2Concept, tag: "Konsep Dasar" },
    { level: 3, title: "Hint 3: Strategi & Rumus", content: hints.level3Strategy, tag: "Formula" },
    { level: 4, title: "Hint 4: Bantuan Penyelesaian", content: hints.level4Scaffold, tag: "Langkah Terakhir" },
  ];

  const handleUnlockNext = () => {
    const nextLevel = Math.min(4, unlockedLevel + 1);
    setUnlockedLevel(nextLevel);
    setExpandedLevel(nextLevel);
    onHintUnlocked?.(nextLevel);
  };

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-sky-400" />
          <h4 className="text-xs sm:text-sm font-bold text-white">
            Sistem Petunjuk Bertingkat (4 Tingkat)
          </h4>
        </div>
        <span className="text-[11px] font-mono text-neutral-400">
          {unlockedLevel}/4 Terbuka
        </span>
      </div>

      <div className="space-y-2">
        {tiers.map((t) => {
          const isUnlocked = t.level <= unlockedLevel;
          const isExpanded = expandedLevel === t.level;

          return (
            <div
              key={t.level}
              className={`rounded-xl border transition ${
                isUnlocked
                  ? "bg-neutral-950 border-neutral-800"
                  : "bg-neutral-900/40 border-neutral-800/40 opacity-70"
              }`}
            >
              <button
                type="button"
                disabled={!isUnlocked}
                onClick={() => setExpandedLevel(isExpanded ? null : t.level)}
                className="w-full flex items-center justify-between p-3 text-left text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  {isUnlocked ? (
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-neutral-500" />
                  )}
                  <span className={isUnlocked ? "text-neutral-200" : "text-neutral-500"}>
                    {t.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 font-mono">
                    {t.tag}
                  </span>
                  {isUnlocked && (
                    isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-neutral-400" /> : <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                  )}
                </div>
              </button>

              {isUnlocked && isExpanded && (
                <div className="px-3.5 pb-3 text-xs text-neutral-300 leading-relaxed border-t border-neutral-900 pt-2 animate-fade-in">
                  {t.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {unlockedLevel < 4 && (
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleUnlockNext}
            className="px-3 py-1.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>Buka Petunjuk Tingkat {unlockedLevel + 1}</span>
          </button>
        </div>
      )}
    </div>
  );
}
