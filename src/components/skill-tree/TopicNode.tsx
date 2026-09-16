"use client";

import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Lock, CheckCircle2, Play, Sparkles, Compass, Atom, Calculator } from "lucide-react";
import { clsx } from "clsx";
import { CanonicalTopic, TopicNodeStatus } from "@/lib/curriculum/types";
import { Badge } from "@/components/ui/Badge";

export interface TopicNodeData extends Record<string, unknown> {
  topic: CanonicalTopic;
  status: TopicNodeStatus;
  masteryScore?: number;
  onSelectTopic?: (topic: CanonicalTopic) => void;
}

export function TopicNode({ data }: { data: TopicNodeData }) {
  const { topic, status, masteryScore = 0, onSelectTopic } = data;

  const isDone = status === "completed";
  const isActive = status === "active";
  const isFlagship = Boolean(topic.isMvpFlagship);
  const isMath = topic.subject === "math";

  // Dynamic visual borders based on status & flagship
  const statusClasses = isDone
    ? "border-emerald-500/70 shadow-lg shadow-emerald-500/10 bg-gradient-to-br from-neutral-900 to-emerald-950/30"
    : isActive
    ? isFlagship
      ? "border-amber-400 shadow-2xl shadow-amber-500/25 bg-gradient-to-br from-neutral-900 via-indigo-950/40 to-amber-950/30 ring-2 ring-amber-400/60 animate-pulse-subtle"
      : isMath
      ? "border-indigo-500/80 shadow-xl shadow-indigo-500/20 bg-gradient-to-br from-neutral-900 to-indigo-950/40 ring-1 ring-indigo-500/40"
      : "border-sky-500/80 shadow-xl shadow-sky-500/20 bg-gradient-to-br from-neutral-900 to-sky-950/40 ring-1 ring-sky-500/40"
    : "border-neutral-800 bg-neutral-900/60 opacity-60";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelectTopic?.(topic)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectTopic?.(topic);
        }
      }}
      className={clsx(
        "group relative w-[270px] p-4 rounded-2xl border transition-all duration-200 text-left select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo-400",
        statusClasses,
        isActive && "hover:scale-105",
        isDone && "hover:scale-102"
      )}
      aria-label={`${topic.title}. Bidang: ${isMath ? "Matematika" : "Sains"}. Status: ${
        isDone ? "Selesai" : isActive ? "Siap Dipelajari" : "Terkunci"
      }. ${topic.xpReward} XP.`}
    >
      {/* Top connection handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-indigo-400 !border-2 !border-neutral-950 shadow-md"
      />

      {/* Flagship Glow Ribbon */}
      {isFlagship && (
        <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300 text-neutral-950 font-black text-[9px] uppercase tracking-wider rounded-full shadow-lg shadow-amber-500/40 border border-amber-200 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 fill-current" />
          <span>Flagship MVP</span>
        </div>
      )}

      {/* Header with subject icon, domain, and status pill */}
      <div className="flex items-center justify-between gap-2 mb-2 pt-0.5">
        <div className="flex items-center gap-1.5">
          <span className="p-1 rounded-md bg-neutral-800 text-neutral-300">
            {isMath ? <Calculator className="w-3.5 h-3.5 text-indigo-400" /> : <Atom className="w-3.5 h-3.5 text-sky-400" />}
          </span>
          <Badge variant={topic.domain as any} size="sm">
            {topic.domain}
          </Badge>
        </div>

        <div className="flex items-center gap-1">
          {isDone ? (
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" /> Selesai
            </span>
          ) : isActive ? (
            <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-500/30">
              <Play className="w-2.5 h-2.5 fill-current" /> Aktif
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full border border-neutral-700">
              <Lock className="w-2.5 h-2.5" /> Terkunci
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h4 className="font-extrabold text-sm text-white leading-snug line-clamp-1 group-hover:text-indigo-300 transition">
        {topic.title}
      </h4>

      {/* Description */}
      <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
        {topic.summary || topic.description}
      </p>

      {/* Footer: Level, Stage, XP, Mastery */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-800/80 text-[10px] text-neutral-400 font-mono">
        <span className="uppercase tracking-wider">
          L{topic.level} • {topic.phase === "mvp" ? "🟢 MVP" : topic.phase}
        </span>
        <div className="flex items-center gap-2">
          {masteryScore > 0 && (
            <span className="text-emerald-400 font-bold">{masteryScore}%</span>
          )}
          <span className="flex items-center gap-1 text-amber-400 font-bold">
            <Sparkles className="w-3 h-3 text-amber-400" />+{topic.xpReward} XP
          </span>
        </div>
      </div>

      {/* Bottom connection handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-neutral-950 shadow-md"
      />
    </div>
  );
}
