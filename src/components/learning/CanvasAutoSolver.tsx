"use client";

import React, { useEffect, useRef, useState } from "react";
import { Wand2, Check } from "lucide-react";

export interface CanvasAutoSolverProps {
  isSolving: boolean;
  currentVariables: Record<string, number>;
  targetVariables: Record<string, number>;
  duration?: number;
  onUpdateVariables: (variables: Record<string, number>) => void;
  onComplete: () => void;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function CanvasAutoSolver({
  isSolving,
  currentVariables,
  targetVariables,
  duration = 1000,
  onUpdateVariables,
  onComplete,
}: CanvasAutoSolverProps) {
  const [progress, setProgress] = useState(0);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const startVarsRef = useRef<Record<string, number>>({});

  const activeKey = Object.keys(targetVariables).join(", ");

  useEffect(() => {
    if (!isSolving) return;

    startVarsRef.current = { ...currentVariables };
    const keys = Object.keys(targetVariables);

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(rawProgress);

      setProgress(Math.round(rawProgress * 100));

      const updated: Record<string, number> = { ...startVarsRef.current };
      for (const key of keys) {
        const startVal = startVarsRef.current[key] ?? 0;
        const targetVal = targetVariables[key] ?? 0;
        const currentInterp = startVal + (targetVal - startVal) * eased;
        // Round to 2 decimal places to avoid floating point jitter
        updated[key] = Math.round(currentInterp * 100) / 100;
      }

      onUpdateVariables(updated);

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Final exact snap
        onUpdateVariables({ ...targetVariables });
        setProgress(100);
        animFrameRef.current = null;
        onComplete();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      startTimeRef.current = null;
    };
  }, [isSolving, currentVariables, targetVariables, duration, onUpdateVariables, onComplete]);

  if (!isSolving && progress === 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="p-3 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-100 flex items-center justify-between gap-3 shadow-lg backdrop-blur-sm animate-fade-in text-xs"
    >
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 animate-spin-slow">
          <Wand2 className="w-4 h-4 text-indigo-300" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white flex items-center gap-1.5">
            Menggerakkan Kanvas Otomatis (Hint 4)
            {progress === 100 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </span>
          <span className="text-[11px] text-indigo-300/80">
            {progress < 100
              ? `Menyesuaikan nilai variabel [${activeKey}]... (${progress}%)`
              : "Solusi berhasil disetel ke kanvas!"}
          </span>
        </div>
      </div>

      <div className="w-24 bg-neutral-800 rounded-full h-2 overflow-hidden border border-indigo-500/20">
        <div
          className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-75 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
