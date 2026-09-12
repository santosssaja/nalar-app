"use client";

import React, { useEffect, useRef } from "react";
import {
  TangentCanvasState,
  CalculusFunctionKey,
  CALCULUS_FUNCTIONS,
} from "./engine";

interface ControlsProps {
  state: TangentCanvasState;
  onChange: (patch: Partial<TangentCanvasState>) => void;
}

export function Controls({ state, onChange }: ControlsProps) {
  const animRef = useRef<number | null>(null);

  // Smooth animation for deltaX -> 0.01
  useEffect(() => {
    if (!state.isAnimatingLimit) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    const step = () => {
      onChange({
        deltaX: Math.max(0.01, state.deltaX * 0.92),
      });

      if (state.deltaX <= 0.02) {
        onChange({ deltaX: 0.01, isAnimatingLimit: false });
      } else {
        animRef.current = requestAnimationFrame(step);
      }
    };

    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [state.isAnimatingLimit, state.deltaX, onChange]);

  return (
    <div
      role="region"
      aria-label="Panel Kontrol Parameter Turunan Kalkulus"
      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-4 text-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-neutral-100">Kontrol Parameter Kurva & Sekan</h3>
        <button
          type="button"
          onClick={() => onChange({ isAnimatingLimit: true })}
          disabled={state.isAnimatingLimit || state.deltaX <= 0.02}
          className="px-3 py-1 text-xs rounded-lg font-semibold transition-all border bg-cyan-950/60 border-cyan-700 text-cyan-300 hover:bg-cyan-900 disabled:opacity-40 disabled:pointer-events-none"
        >
          <span>⚡ Animasi Δx → 0</span>
        </button>
      </div>

      {/* Function Preset Selector */}
      <div className="space-y-1.5">
        <label htmlFor="function-select" className="text-xs text-neutral-300 font-medium">
          Pilih Fungsi f(x):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {Object.values(CALCULUS_FUNCTIONS).map((func) => {
            const isSelected = state.funcKey === func.key;
            return (
              <button
                key={func.key}
                type="button"
                onClick={() =>
                  onChange({
                    funcKey: func.key as CalculusFunctionKey,
                    a: func.recommendedRange.defaultA,
                    deltaX: 1.0,
                  })
                }
                className={`px-2 py-1.5 text-xs rounded-lg font-mono transition-all border text-left truncate ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-400 font-bold shadow"
                    : "bg-neutral-800/80 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {func.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slider for Point a */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="a-slider" className="text-neutral-300 font-medium">
            Posisi Titik (a):
          </label>
          <span className="font-mono text-amber-400 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
            a = {state.a.toFixed(2)}
          </span>
        </div>
        <input
          id="a-slider"
          type="range"
          min={-2.5}
          max={2.5}
          step={0.1}
          value={state.a}
          onChange={(e) => onChange({ a: Number(e.target.value) })}
          className="w-full accent-amber-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
        />
      </div>

      {/* Slider for Delta X */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="deltax-slider" className="text-neutral-300 font-medium">
            Jarak Titik Kedua (Δx):
          </label>
          <span className="font-mono text-blue-400 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
            Δx = {state.deltaX.toFixed(2)}
          </span>
        </div>
        <input
          id="deltax-slider"
          type="range"
          min={0.01}
          max={2.5}
          step={0.01}
          value={state.deltaX}
          onChange={(e) => onChange({ deltaX: Number(e.target.value) })}
          className="w-full accent-blue-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
        />
      </div>

      {/* Visibility Toggles */}
      <div className="pt-2 border-t border-neutral-800/80 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onChange({ showSecant: !state.showSecant })}
          className={`px-2.5 py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
            state.showSecant
              ? "bg-blue-950/80 border-blue-600 text-blue-300"
              : "bg-neutral-800/60 border-neutral-700/60 text-neutral-500"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Garis Sekan</span>
        </button>

        <button
          type="button"
          onClick={() => onChange({ showTangent: !state.showTangent })}
          className={`px-2.5 py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
            state.showTangent
              ? "bg-amber-950/80 border-amber-600 text-amber-300"
              : "bg-neutral-800/60 border-neutral-700/60 text-neutral-500"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Garis Singgung</span>
        </button>
      </div>
    </div>
  );
}
