"use client";

import React from "react";
import Link from "next/link";
import { Level } from "@/types/level";
import { CheckCircle2, Lock, Star, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";

export interface LevelMapProps {
  topicSlug: string;
  levels: Level[];
  completedLevelIndexes?: number[];
  currentLevelIndex?: number;
}

export function LevelMap({
  topicSlug,
  levels,
  completedLevelIndexes = [],
  currentLevelIndex = 1,
}: LevelMapProps) {
  return (
    <div className="w-full max-w-2xl mx-auto py-6 flex flex-col items-center space-y-8">
      <div className="text-center space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Alur Progresi Belajar
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Peta Level Duolingo-Style
        </h3>
        <p className="text-xs text-neutral-400">
          Selesaikan setiap tingkat bertahap untuk membuka materi dan tantangan berikutnya.
        </p>
      </div>

      {/* Stepping stones vertical track */}
      <div className="relative w-full flex flex-col items-center space-y-6">
        {levels.map((level, idx) => {
          const isCompleted = completedLevelIndexes.includes(level.index);
          const isActive = level.index === currentLevelIndex;
          const isLocked = level.index > currentLevelIndex && !isCompleted;

          // Alternate slightly left/right for Duolingo curve effect
          const offsetClass = idx % 2 === 0 ? "sm:-translate-x-6" : "sm:translate-x-6";

          return (
            <div
              key={level.id}
              className={clsx(
                "relative w-full max-w-md p-5 rounded-3xl border transition-all duration-200",
                offsetClass,
                isCompleted
                  ? "bg-neutral-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                  : isActive
                  ? "bg-gradient-to-br from-neutral-900 via-neutral-900 to-indigo-950/40 border-indigo-500/60 shadow-xl shadow-indigo-500/20 ring-2 ring-indigo-500/30"
                  : "bg-neutral-900/50 border-neutral-800 opacity-60"
              )}
            >
              {/* Connector line to next node */}
              {idx < levels.length - 1 && (
                <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-neutral-800"
                  aria-hidden="true"
                />
              )}

              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={clsx(
                      "w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-md",
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isActive
                        ? "bg-indigo-600 text-white animate-pulse"
                        : "bg-neutral-800 text-neutral-500"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <span>{level.index}</span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                      Tingkat {level.index}
                    </span>
                    <h4 className="font-bold text-base text-white">{level.title}</h4>
                  </div>
                </div>

                {/* Stars / Tier */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: level.tier }).map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className={clsx(
                        "w-3.5 h-3.5",
                        isCompleted || isActive
                          ? "text-amber-400 fill-amber-400"
                          : "text-neutral-700"
                      )}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-neutral-400 mb-4 line-clamp-2">
                {level.description}
              </p>

              {/* Action Button */}
              <div>
                {!isLocked ? (
                  <Link
                    href={`/topics/${topicSlug}/${level.index}`}
                    className="inline-block w-full"
                  >
                    <Button
                      variant={isCompleted ? "secondary" : "primary"}
                      size="sm"
                      className="w-full flex items-center justify-center gap-2"
                      rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                    >
                      {isCompleted ? "Pelajari Ulang" : "Mulai Level Ini"}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled
                    className="w-full text-neutral-500 cursor-not-allowed"
                    leftIcon={<Lock className="w-3.5 h-3.5" />}
                  >
                    Selesaikan Tingkat {level.index - 1} Dulu
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
