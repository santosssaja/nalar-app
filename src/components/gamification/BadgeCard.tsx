"use client";

import React from "react";
import { Badge } from "@/lib/gamification/types";
import { Award, Lock, Sparkles, Clock, Grid, ShieldAlert, Flame, Brain } from "lucide-react";
import { clsx } from "clsx";

export interface BadgeCardProps {
  badge: Badge;
  isUnlocked: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Clock,
  Grid,
  ShieldAlert,
  Flame,
  Brain,
  Award,
};

export function BadgeCard({ badge, isUnlocked }: BadgeCardProps) {
  const Icon = iconMap[badge.icon] || Award;

  return (
    <div
      className={clsx(
        "p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 select-none",
        isUnlocked
          ? "bg-neutral-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5 hover:border-emerald-500/60"
          : "bg-neutral-900/40 border-neutral-800 opacity-60"
      )}
    >
      <div
        className={clsx(
          "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border",
          isUnlocked
            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
            : "bg-neutral-800 border-neutral-700 text-neutral-500"
        )}
      >
        {isUnlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h4
            className={clsx(
              "font-bold text-sm leading-snug",
              isUnlocked ? "text-white" : "text-neutral-400"
            )}
          >
            {badge.title}
          </h4>
          {isUnlocked && (
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Terbuka
            </span>
          )}
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed">
          {badge.description}
        </p>
      </div>
    </div>
  );
}
