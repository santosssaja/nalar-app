"use client";

import React from "react";
import { Award, X } from "lucide-react";
import { Badge } from "@/types/gamification";

export interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedBadgeList: Badge[];
}

export function BadgesModal({ isOpen, onClose, unlockedBadgeList }: BadgesModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Koleksi Lencana Penghargaan"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white">Lencana Pencapaian</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition"
            aria-label="Tutup dialog lencana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {unlockedBadgeList.length === 0 ? (
            <div className="text-center py-6 text-neutral-400 text-sm">
              <p>Belum ada lencana yang terbuka.</p>
              <p className="text-xs text-neutral-500 mt-1">
                Selesaikan tantangan logika pertamamu untuk meraih lencana!
              </p>
            </div>
          ) : (
            unlockedBadgeList.map((badge) => (
              <div
                key={badge.id}
                className="p-3 rounded-xl bg-neutral-800/60 border border-emerald-500/30 flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{badge.title}</h4>
                  <p className="text-xs text-neutral-400">{badge.description}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
