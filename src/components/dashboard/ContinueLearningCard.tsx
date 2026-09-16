"use client";

import React from "react";
import Link from "next/link";
import { Play, ArrowRight, Sparkles, BookOpen, Compass, CheckCircle2 } from "lucide-react";
import { useLearnerModel } from "@/context/LearnerContext";
import { Button } from "@/components/ui/Button";

export function ContinueLearningCard() {
  const { learnerState, recommendedTopic } = useLearnerModel();
  const lastActivity = learnerState.lastActivity;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* 1. Continue Learning Card */}
      <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl flex flex-col justify-between space-y-4 hover:border-neutral-700 transition">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> Lanjutkan Belajar
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              Aktivitas Terakhir
            </span>
          </div>

          <h3 className="text-xl font-black text-white">
            {lastActivity?.topicTitle || "Operasi Bilangan Riil & Garis Bilangan"}
          </h3>

          <p className="text-xs text-neutral-400 leading-relaxed">
            Lanjutkan progres belajar konsep spasial, manipulasi simulasi kanvas, dan uji pemahaman lewat tantangan interaktif.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-neutral-800/80">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Sesi tersimpan lokal</span>
          </div>

          <Link href={lastActivity?.route || "/topics/math-real-numbers"}>
            <Button
              variant="primary"
              size="md"
              leftIcon={<Play className="w-4 h-4 fill-current" />}
            >
              Lanjutkan
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Recommended Next Card (Prerequisite DAG Powered) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 to-indigo-950/30 border border-indigo-500/30 shadow-xl flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Rekomendasi Alur
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
              Prasyarat Terpenuhi
            </span>
          </div>

          <h3 className="text-xl font-black text-white">
            {recommendedTopic?.title || "Kinematika"}
          </h3>

          <p className="text-xs text-neutral-300 leading-relaxed">
            {recommendedTopic?.summary ||
              "Langkah paling relevan berikutnya di alur kurikulum STEM berdasarkan prasyarat yang telah kamu kuasai."}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-neutral-800/80">
          <span className="text-xs font-mono text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />+{recommendedTopic?.xpReward || 100} XP
          </span>

          <Link href={recommendedTopic?.route || "/topics/math-real-numbers"}>
            <Button
              variant="secondary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Mulai Topik Ini
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
