"use client";

import React from "react";

interface SubtitleBannerProps {
  subtitle: string | null;
  onClose: () => void;
}

/**
 * Visual Subtitle Banner component for deaf / hard-of-hearing learners.
 */
export function SubtitleBanner({ subtitle, onClose }: SubtitleBannerProps) {
  if (!subtitle) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[90vw] px-4 py-3 rounded-xl bg-neutral-900/95 border border-amber-400 text-amber-200 shadow-2xl backdrop-blur-md text-sm font-medium flex items-center gap-3 animate-fade-in"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
      <p className="flex-1">{subtitle}</p>
      <button
        type="button"
        onClick={onClose}
        className="text-xs px-2 py-1 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-300 transition"
        aria-label="Tutup takarir suara"
      >
        Tutup
      </button>
    </div>
  );
}
