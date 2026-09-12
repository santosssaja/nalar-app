"use client";

import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Lock, CheckCircle2, Play, Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { TopicCurriculumItem, TopicNodeStatus } from "@/lib/curriculum/types";
import { Badge } from "@/components/ui/Badge";

export interface TopicNodeData extends Record<string, unknown> {
  topic: TopicCurriculumItem;
  status: TopicNodeStatus;
  onSelectTopic?: (topic: TopicCurriculumItem) => void;
}

export function TopicNode({ data }: { data: TopicNodeData }) {
  const { topic, status, onSelectTopic } = data;

  const isDone = status === "done";
  const isActive = status === "active";

  const statusBorderColor = isDone
    ? "border-emerald-500/60 shadow-lg shadow-emerald-500/10 bg-gradient-to-br from-neutral-900 to-emerald-950/20"
    : isActive
    ? "border-indigo-500/80 shadow-xl shadow-indigo-500/20 bg-gradient-to-br from-neutral-900 to-indigo-950/30 ring-2 ring-indigo-500/40"
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
        "group relative w-64 p-4 rounded-2xl border transition-all duration-200 text-left select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo-400",
        statusBorderColor,
        isActive && "hover:scale-105",
        isDone && "hover:scale-102"
      )}
      aria-label={`${topic.title}. Status: ${
        isDone ? "Selesai" : isActive ? "Siap Dipelajari" : "Terkunci"
      }. Domain: ${topic.domain}. ${topic.xp} XP.`}
    >
      {/* Target handle on top */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-neutral-600 !border-2 !border-neutral-900"
      />

      {/* Header with status icon and domain badge */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <Badge variant={topic.domain} size="sm">
          {topic.domain}
        </Badge>

        <div className="flex items-center gap-1">
          {isDone ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
            </span>
          ) : isActive ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-400 bg-indigo-500/15 px-2 py-0.5 rounded-full border border-indigo-500/30 animate-pulse">
              <Play className="w-3 h-3 fill-current" /> Aktif
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-bold text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full border border-neutral-700">
              <Lock className="w-3 h-3" /> Terkunci
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
        {topic.description}
      </p>

      {/* Footer details */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-800/80 text-[10px] text-neutral-400 font-mono">
        <span className="uppercase tracking-wider">Level {topic.level}</span>
        <span className="flex items-center gap-1 text-amber-400 font-bold">
          <Sparkles className="w-3 h-3 text-amber-400" />+{topic.xp} XP
        </span>
      </div>

      {/* Interactive Badge indicator */}
      {topic.isAvailable && (
        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-neutral-950 font-black text-[9px] uppercase tracking-wider rounded-full shadow-md">
          Demo Siap
        </span>
      )}

      {/* Source handle on bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !bg-indigo-500 !border-2 !border-neutral-900"
      />
    </div>
  );
}
