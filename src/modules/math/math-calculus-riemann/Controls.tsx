"use client";

import React, { useEffect, useRef } from "react";
import {
  RiemannCanvasState,
  RiemannFunctionKey,
  RiemannMethod,
  RIEMANN_FUNCTIONS,
} from "./engine";

interface ControlsProps {
  state: RiemannCanvasState;
  onChange: (patch: Partial<RiemannCanvasState>) => void;
}

const METHODS: { key: RiemannMethod; label: string }[] = [
  { key: "left", label: "Kiri" },
  { key: "right", label: "Kanan" },
  { key: "midpoint", label: "Titik Tengah" },
  { key: "trapezoid", label: "Trapesium" },
];

export function Controls({ state, onChange }: ControlsProps) {
  const animRef = useRef<number | null>(null);

  // Smooth animation for increasing n towards 60
  useEffect(() => {
    if (!state.isAnimatingN) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();
    const step = (time: number) => {
      if (time - lastTime > 60) {
        lastTime = time;
        if (state.n < 60) {
          onChange({ n: state.n + 1 });
        } else {
          onChange({ isAnimatingN: false });
          return;
        }
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [state.isAnimatingN, state.n, onChange]);

  return (
    <div
      role="region"
      aria-label="Panel Kontrol Partisi dan Integral Riemann"
      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-4 text-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-neutral-100">Kontrol Partisi & Batas Integrasi</h3>
        <button
          type="button"
          onClick={() => onChange({ isAnimatingN: true, n: 2 })}
          disabled={state.isAnimatingN}
          className="px-3 py-1 text-xs rounded-lg font-semibold transition-all border bg-emerald-950/60 border-emerald-700 text-emerald-300 hover:bg-emerald-900 disabled:opacity-40"
        >
          <span>⚡ Animasi n → ∞</span>
        </button>
      </div>

      {/* Function Preset Selector */}
      <div className="space-y-1.5">
        <span className="text-xs text-neutral-300 font-medium block">
          Pilih Fungsi f(x):
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {Object.values(RIEMANN_FUNCTIONS).map((func) => {
            const isSelected = state.funcKey === func.key;
            return (
              <button
                key={func.key}
                type="button"
                onClick={() =>
                  onChange({
                    funcKey: func.key as RiemannFunctionKey,
                    a: func.defaultA,
                    b: func.defaultB,
                  })
                }
                className={`px-2 py-1.5 text-xs rounded-lg font-mono transition-all border text-left truncate ${
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-400 font-bold shadow"
                    : "bg-neutral-800/80 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {func.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Riemann Method Selector */}
      <div className="space-y-1.5">
        <span className="text-xs text-neutral-300 font-medium block">
          Metode Partisi:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {METHODS.map((m) => {
            const isSelected = state.method === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => onChange({ method: m.key })}
                className={`px-2 py-1.5 text-xs rounded-lg font-semibold transition-all border text-center ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-400 font-bold shadow"
                    : "bg-neutral-800/80 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Partition Slider n */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="n-slider" className="text-neutral-300 font-medium">
            Jumlah Persegi Panjang (n):
          </label>
          <span className="font-mono text-emerald-400 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
            n = {state.n}
          </span>
        </div>
        <input
          id="n-slider"
          type="range"
          min={1}
          max={80}
          step={1}
          value={state.n}
          onChange={(e) => onChange({ n: Number(e.target.value) })}
          className="w-full accent-emerald-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
        />
      </div>

      {/* Boundaries Sliders a and b */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-800/80">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-400">Batas Bawah (a):</span>
            <span className="font-mono text-neutral-200 font-bold">{state.a.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={-1.0}
            max={2.0}
            step={0.2}
            value={state.a}
            onChange={(e) => onChange({ a: Math.min(state.b - 0.5, Number(e.target.value)) })}
            className="w-full accent-cyan-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-400">Batas Atas (b):</span>
            <span className="font-mono text-neutral-200 font-bold">{state.b.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={1.0}
            max={4.0}
            step={0.2}
            value={state.b}
            onChange={(e) => onChange({ b: Math.max(state.a + 0.5, Number(e.target.value)) })}
            className="w-full accent-cyan-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
