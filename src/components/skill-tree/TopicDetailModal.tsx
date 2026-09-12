"use client";

import React from "react";
import Link from "next/link";
import { X, Play, Sparkles, BookOpen } from "lucide-react";
import { TopicCurriculumItem, TopicNodeStatus } from "@/lib/curriculum/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface TopicDetailModalProps {
  topic: TopicCurriculumItem | null;
  status: TopicNodeStatus;
  onClose: () => void;
}

export function TopicDetailModal({
  topic,
  status,
  onClose,
}: TopicDetailModalProps) {
  if (!topic) return null;

  const isAvailable = topic.isAvailable && topic.route;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detail topik ${topic.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-neutral-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant={topic.domain} size="sm">
                {topic.domain}
              </Badge>
              <span className="text-[11px] font-mono text-neutral-400">
                LEVEL {topic.level} • {topic.stage.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl font-black text-white">{topic.title}</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white transition"
            aria-label="Tutup detail topik"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-sm text-neutral-300 leading-relaxed">
            {topic.description}
          </p>

          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-xs">
            <div>
              <span className="text-neutral-500 block">Hadiah XP</span>
              <span className="font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" /> +{topic.xp} XP
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block">Status Prasyarat</span>
              <span className="font-bold text-neutral-200 capitalize mt-0.5 block">
                {status === "done" ? "Selesai" : status === "active" ? "Terbuka" : "Terkunci"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <Button variant="ghost" size="md" onClick={onClose}>
            Tutup
          </Button>

          {isAvailable ? (
            <Link href={topic.route!} className="inline-flex">
              <Button
                variant="primary"
                size="md"
                leftIcon={<Play className="w-4 h-4 fill-current" />}
              >
                Mulai Eksplorasi
              </Button>
            </Link>
          ) : (
            <Button variant="secondary" size="md" disabled leftIcon={<BookOpen className="w-4 h-4" />}>
              Segera Hadir
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
