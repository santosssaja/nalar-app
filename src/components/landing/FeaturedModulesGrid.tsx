"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FEATURED_LANDING_MODULES } from "./modulesData";

export function FeaturedModulesGrid() {
  const [activeTab, setActiveTab] = useState<"all" | "math" | "science">("all");

  const filtered = FEATURED_LANDING_MODULES.filter((m) => {
    if (activeTab === "math") return m.category === "math";
    if (activeTab === "science") return m.category === "science";
    return true;
  });

  return (
    <section
      id="katalog"
      role="region"
      aria-label="Katalog Modul Interaktif Pilihan"
      className="w-full max-w-6xl px-4 py-12 border-t border-neutral-800/80 space-y-8"
    >
      {/* Section Header with Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Kurikulum Terbimbing Siap Eksplorasi
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Pilih Modul Pembelajaran Mandiri
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Setiap modul dilengkapi kanvas manipulasi, KaTeX reaktif, dan asistensi AI ramah difabel.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-900 border border-neutral-800 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${activeTab === "all"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
              }`}
          >
            Semua Modul ({FEATURED_LANDING_MODULES.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("math")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${activeTab === "math"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
              }`}
          >
            Matematika
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("science")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${activeTab === "science"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
              }`}
          >
            Fisika
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.slug}
            className={`p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 ${item.accentBorder} shadow-xl flex flex-col justify-between space-y-4 hover:translate-y-[-2px] transition-all duration-200 group`}
          >
            <div className="space-y-3">
              {/* Card Meta Row */}
              <div className="flex items-center justify-between gap-2">
                <Badge variant={item.accentBadge}>{item.badgeLabel}</Badge>
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                  +{item.xpReward} XP
                </span>
              </div>

              {/* Title & Domain */}
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  {item.domain} • {item.levelCount} Tingkat Belajar
                </span>
                <h3 className="text-base font-black text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-300 leading-relaxed">
                {item.description}
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.highlights.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-950/80 border border-neutral-800 text-[10px] text-neutral-400 font-medium"
                  >
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 border-t border-neutral-800/80">
              <Link href={`/topics/${item.slug}`} className="w-full block">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="w-full text-xs font-bold py-2 justify-center"
                >
                  Eksplorasi Modul Ini
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Link to Skill Tree */}
      <div className="text-center pt-2">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-400 hover:text-indigo-300 transition underline underline-offset-4"
        >
          <span>Ingin melihat seluruh peta prasyarat keilmuan? Buka Pohon Keterampilan (Skill Tree)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
