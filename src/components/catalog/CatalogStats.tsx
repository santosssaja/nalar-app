"use client";

import React from "react";
import { BookOpen, PlayCircle, CheckCircle2, Sparkles } from "lucide-react";

export interface CatalogStatsProps {
  totalCount: number;
  availableCount: number;
  completedCount: number;
  totalXp: number;
}

export function CatalogStats({
  totalCount,
  availableCount,
  completedCount,
  totalXp,
}: CatalogStatsProps) {
  const stats = [
    {
      label: "Total Topik STEM",
      value: totalCount,
      sub: "Matematika, Sains & Logika",
      icon: BookOpen,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      label: "Siap Dimainkan",
      value: availableCount,
      sub: "Kanvas Simulasi & Playground",
      icon: PlayCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Tuntas Selesai",
      value: completedCount,
      sub: "Progres Tantangan Kamu",
      icon: CheckCircle2,
      color: "text-sky-400",
      bg: "bg-sky-500/10 border-sky-500/20",
    },
    {
      label: "Potensi Pengalaman",
      value: `${totalXp.toLocaleString()} XP`,
      sub: "Hadiah Prestasi Belajar",
      icon: Sparkles,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className={`p-4 rounded-2xl border ${s.bg} bg-neutral-900/60 backdrop-blur-sm flex flex-col justify-between space-y-2`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                {s.label}
              </span>
              <Icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <div className={`text-xl sm:text-2xl font-black ${s.color} font-mono tracking-tight`}>
                {s.value}
              </div>
              <p className="text-[11px] text-neutral-500 truncate mt-0.5">{s.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
