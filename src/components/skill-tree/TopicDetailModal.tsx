"use client";

import React from "react";
import Link from "next/link";
import { X, Play, Sparkles, BookOpen, Lock, CheckCircle2, ArrowRight, Link2, Calculator, Atom } from "lucide-react";
import { CanonicalTopic, TopicNodeStatus } from "@/lib/curriculum/types";
import { getTopicPrerequisites, getTopicConceptConnections } from "@/lib/curriculum/prerequisite-engine";
import { useLearnerModel } from "@/context/LearnerContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface TopicDetailModalProps {
  topic: CanonicalTopic | null;
  status: TopicNodeStatus;
  onClose: () => void;
}

export function TopicDetailModal({
  topic,
  status,
  onClose,
}: TopicDetailModalProps) {
  const { learnerState } = useLearnerModel();

  if (!topic) return null;

  const isDone = status === "completed";
  const isActive = status === "active";
  const isAvailable = topic.isAvailable && topic.route;
  const prereqTopics = getTopicPrerequisites(topic.id);
  const connections = getTopicConceptConnections(topic.id);
  const mastery = learnerState.topicMastery[topic.id];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detail topik ${topic.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-700/80 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-neutral-800 pb-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="p-1 rounded-md bg-neutral-800 text-neutral-300">
                {topic.subject === "math" ? (
                  <Calculator className="w-3.5 h-3.5 text-indigo-400" />
                ) : (
                  <Atom className="w-3.5 h-3.5 text-sky-400" />
                )}
              </span>
              <Badge variant={topic.domain as any} size="sm">
                {topic.domain}
              </Badge>
              <span className="text-[11px] font-mono text-neutral-400">
                LEVEL {topic.level} • {topic.phase.toUpperCase()}
              </span>
              {topic.isMvpFlagship && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  Flagship Experience
                </span>
              )}
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

        {/* Description */}
        <div className="space-y-4 text-xs sm:text-sm">
          <p className="text-neutral-300 leading-relaxed">
            {topic.description || topic.summary}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-2xl bg-neutral-950/70 border border-neutral-800 text-xs">
            <div>
              <span className="text-neutral-500 block">Reward XP</span>
              <span className="font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" /> +{topic.xpReward} XP
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block">Status Akses</span>
              <span className="font-bold text-neutral-200 capitalize mt-0.5 flex items-center gap-1">
                {isDone ? (
                  <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Selesai</>
                ) : isActive ? (
                  <><Play className="w-3.5 h-3.5 text-indigo-400" /> Terbuka</>
                ) : (
                  <><Lock className="w-3.5 h-3.5 text-neutral-500" /> Terkunci</>
                )}
              </span>
            </div>
            {mastery && (
              <div>
                <span className="text-neutral-500 block">Kemahiran</span>
                <span className="font-bold text-emerald-400 mt-0.5 block font-mono">
                  {mastery.overall}%
                </span>
              </div>
            )}
          </div>

          {/* Prerequisites Checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Prasyarat Materi ({prereqTopics.length})
            </h4>
            {prereqTopics.length === 0 ? (
              <p className="text-xs text-neutral-400 italic">
                Topik fondasi awal — tidak memerlukan prasyarat sebelumnya.
              </p>
            ) : (
              <div className="space-y-1.5">
                {prereqTopics.map((prereq) => {
                  const prereqDone = learnerState.completedTopics.includes(prereq.id) || learnerState.completedTopics.includes(prereq.slug);
                  return (
                    <div
                      key={prereq.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/40 border border-neutral-800/80 text-xs"
                    >
                      <span className="font-medium text-neutral-200">{prereq.title}</span>
                      {prereqDone ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Lolos
                        </span>
                      ) : (
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" /> Belum Selesai
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cross-Domain Connections (Math <-> Science) */}
          {connections.length > 0 && (
            <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                <Link2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Koneksi Matematika & Sains</span>
              </div>
              {connections.map((conn) => (
                <div key={conn.id} className="text-xs text-neutral-300 space-y-0.5">
                  <span className="font-bold text-white block">{conn.title}</span>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{conn.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Learning Objectives */}
          {topic.learningObjectives.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Tujuan Pembelajaran
              </h4>
              <ul className="space-y-1 text-xs text-neutral-400 list-disc list-inside">
                {topic.learningObjectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-3">
          <Button variant="ghost" size="md" onClick={onClose}>
            Kembali
          </Button>

          {isAvailable && isActive ? (
            <Link href={topic.route} className="inline-flex" onClick={onClose}>
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Mulai Pelajari Sekarang
              </Button>
            </Link>
          ) : isAvailable && !isActive ? (
            <Button variant="secondary" size="md" disabled leftIcon={<Lock className="w-4 h-4" />}>
              Selesaikan Prasyarat Dahulu
            </Button>
          ) : (
            <Button variant="secondary" size="md" disabled leftIcon={<BookOpen className="w-4 h-4" />}>
              Segera Hadir ({topic.phase})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
