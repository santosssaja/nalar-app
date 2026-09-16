"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Play, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useLearnerModel } from "@/context/LearnerContext";
import { CANONICAL_TOPICS } from "@/lib/curriculum/data/topics";
import { getTopicStatus } from "@/lib/curriculum/prerequisite-engine";

export function MvpPathwayTracker() {
  const { learnerState } = useLearnerModel();
  const mvpTopics = CANONICAL_TOPICS.filter((t) => t.phase === "mvp" && t.isAvailable);

  return (
    <section className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Jalur Utama Vertikal (Vertical Slice MVP)
          </span>
          <h3 className="text-lg font-black text-white">Perjalanan Fondasi 6 Modul Utama</h3>
        </div>
        <Link
          href="/skill-tree"
          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
        >
          Lihat Pohon Pengetahuan Penuh <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {mvpTopics.map((topic, index) => {
          const status = getTopicStatus(topic.id, learnerState.completedTopics, CANONICAL_TOPICS);
          const isDone = status === "completed";
          const isActive = status === "active";

          return (
            <Link
              key={topic.id}
              href={isActive || isDone ? topic.route : "#"}
              className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-2.5 transition ${
                isDone
                  ? "bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400"
                  : isActive
                  ? topic.isMvpFlagship
                    ? "bg-amber-950/30 border-amber-400 ring-1 ring-amber-400/50 hover:scale-102"
                    : "bg-indigo-950/30 border-indigo-500/50 hover:border-indigo-400 hover:scale-102"
                  : "bg-neutral-950/40 border-neutral-800 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400">0{index + 1}</span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isActive ? (
                  <Play className="w-3.5 h-3.5 text-indigo-400 fill-current" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-neutral-500" />
                )}
              </div>

              <div>
                <h5 className="font-bold text-xs text-white line-clamp-2 leading-tight">
                  {topic.title}
                </h5>
                <span className="text-[10px] text-neutral-400 mt-1 block capitalize">
                  {topic.subject === "math" ? "Matematika" : "Sains"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
