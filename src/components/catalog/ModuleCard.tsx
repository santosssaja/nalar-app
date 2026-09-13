"use client";

import React from "react";
import Link from "next/link";
import { Play, Sparkles, Lock, CheckCircle2, Info, ArrowUpRight } from "lucide-react";
import { TopicCurriculumItem, TopicNodeStatus } from "@/lib/curriculum/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface ModuleCardProps {
  topic: TopicCurriculumItem;
  status: TopicNodeStatus;
  prerequisites: TopicCurriculumItem[];
  onOpenDetail: (topic: TopicCurriculumItem) => void;
}

const DOMAIN_ACCENTS: Record<TopicCurriculumItem["domain"], { border: string; glow: string; text: string }> = {
  math: {
    border: "border-indigo-500/30 hover:border-indigo-500/60",
    glow: "group-hover:shadow-indigo-500/10",
    text: "text-indigo-400",
  },
  physics: {
    border: "border-sky-500/30 hover:border-sky-500/60",
    glow: "group-hover:shadow-sky-500/10",
    text: "text-sky-400",
  },
  chemistry: {
    border: "border-emerald-500/30 hover:border-emerald-500/60",
    glow: "group-hover:shadow-emerald-500/10",
    text: "text-emerald-400",
  },
  biology: {
    border: "border-rose-500/30 hover:border-rose-500/60",
    glow: "group-hover:shadow-rose-500/10",
    text: "text-rose-400",
  },
  softskill: {
    border: "border-amber-500/30 hover:border-amber-500/60",
    glow: "group-hover:shadow-amber-500/10",
    text: "text-amber-400",
  },
};

export function ModuleCard({
  topic,
  status,
  prerequisites,
  onOpenDetail,
}: ModuleCardProps) {
  const accent = DOMAIN_ACCENTS[topic.domain] || DOMAIN_ACCENTS.math;
  const isPlayable = topic.isAvailable && !!topic.route;

  return (
    <article
      className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-neutral-900/90 border ${accent.border} shadow-lg ${accent.glow} transition-all duration-200 hover:-translate-y-0.5`}
    >
      <div className="space-y-3.5">
        {/* Card Header: Domain, Stage, Status Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={topic.domain} size="sm">
              {topic.domain}
            </Badge>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-semibold uppercase tracking-wider">
              {topic.stage}
            </span>
          </div>

          {/* Status Chip */}
          <div>
            {status === "done" ? (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Tuntas
              </span>
            ) : isPlayable ? (
              <span className="flex items-center gap-1 text-[10px] font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" /> Siap Main
              </span>
            ) : status === "locked" ? (
              <span className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full">
                <Lock className="w-3 h-3" /> Terkunci
              </span>
            ) : (
              <span className="text-[10px] font-medium text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded-full">
                Fase {topic.phase.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Title & Level */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-black text-white group-hover:text-indigo-300 transition line-clamp-1">
              {topic.title}
            </h3>
            <span className="text-[10px] font-mono text-neutral-500 shrink-0">
              Lv.{topic.level}
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mt-1.5">
            {topic.description}
          </p>
        </div>

        {/* Prerequisites Tags */}
        {prerequisites.length > 0 && (
          <div className="pt-2 border-t border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
              Prasyarat ({prerequisites.length}):
            </span>
            <div className="flex flex-wrap gap-1">
              {prerequisites.map((p) => (
                <span
                  key={p.id}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-400"
                >
                  {p.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: XP & Launch Button */}
      <div className="pt-4 mt-3 border-t border-neutral-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+{topic.xp} XP</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onOpenDetail(topic)}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
            aria-label={`Lihat detail ${topic.title}`}
          >
            <Info className="w-4 h-4" />
          </button>

          {isPlayable ? (
            <Link href={topic.route!} className="inline-flex">
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                Mulai Belajar
              </Button>
            </Link>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onOpenDetail(topic)}
            >
              Info Rencana
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
