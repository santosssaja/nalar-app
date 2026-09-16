"use client";

import React from "react";
import { Award, Sparkles } from "lucide-react";
import { Badge } from "@/lib/gamification";

interface BadgeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedBadgeList: Badge[];
}

export function BadgeDrawer({
  isOpen,
  onClose,
  unlockedBadgeList,
}: BadgeDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Koleksi Lencana"
      className="fixed top-14 right-4 z-50 w-72 p-4 rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl animate-fade-in text-neutral-200"
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-800">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-400" />
          Koleksi Lencana ({unlockedBadgeList.length})
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-neutral-400 hover:text-white"
          aria-label="Tutup jendela lencana"
        >
          Tutup
        </button>
      </div>

      {unlockedBadgeList.length === 0 ? (
        <p className="text-xs text-neutral-400 py-2">
          Selesaikan tantangan interaktif pertamamu untuk membuka lencana perdana!
        </p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {unlockedBadgeList.map((badge) => (
            <div
              key={badge.id}
              className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-2.5"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-100">{badge.title}</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
