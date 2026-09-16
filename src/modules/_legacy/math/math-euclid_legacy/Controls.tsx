"use client";

import React from "react";
import { RotateCcw, Sparkles } from "lucide-react";

export interface EuclidState {
  width: number;
  height: number;
}

export interface ControlsProps {
  state: EuclidState;
  onChange: (updater: (prev: EuclidState) => EuclidState) => void;
  onReset: () => void;
}

const PRESETS = [
  { label: "Bawaan (84, 52)", w: 84, h: 52 },
  { label: "Fibonacci (144, 89)", w: 144, h: 89 },
  { label: "Kelipatan 12 (120, 36)", w: 120, h: 36 },
  { label: "FPB 6 (48, 18)", w: 48, h: 18 },
];

export function Controls({ state, onChange, onReset }: ControlsProps) {
  const handleWidthChange = (val: number) => {
    onChange((prev) => ({ ...prev, width: val }));
  };

  const handleHeightChange = (val: number) => {
    onChange((prev) => ({ ...prev, height: val }));
  };

  return (
    <div
      role="region"
      aria-label="Panel Kontrol Dimensi Persegi Panjang Euclid"
      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-5"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-sm text-white">Parameter Pengubinan</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 transition"
          aria-label="Atur ulang ke dimensi awal"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        {/* Width Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="slider-width" className="font-semibold text-neutral-300">
              Sisi A (Lebar Persegi Panjang):
            </label>
            <span className="font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              {state.width}
            </span>
          </div>
          <input
            id="slider-width"
            type="range"
            min={4}
            max={160}
            step={1}
            value={state.width}
            onChange={(e) => handleWidthChange(Number(e.target.value))}
            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            aria-label={`Sisi A lebar bernilai ${state.width}`}
          />
        </div>

        {/* Height Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="slider-height" className="font-semibold text-neutral-300">
              Sisi B (Tinggi Persegi Panjang):
            </label>
            <span className="font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              {state.height}
            </span>
          </div>
          <input
            id="slider-height"
            type="range"
            min={4}
            max={160}
            step={1}
            value={state.height}
            onChange={(e) => handleHeightChange(Number(e.target.value))}
            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            aria-label={`Sisi B tinggi bernilai ${state.height}`}
          />
        </div>
      </div>

      {/* Quick Presets */}
      <div className="space-y-2 pt-2 border-t border-neutral-800">
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
          Preset Menarik:
        </span>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((preset) => {
            const isCurrent =
              state.width === preset.w && state.height === preset.h;

            return (
              <button
                key={preset.label}
                type="button"
                onClick={() =>
                  onChange(() => ({ width: preset.w, height: preset.h }))
                }
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition border ${
                  isCurrent
                    ? "bg-indigo-600/30 border-indigo-500 text-white shadow-sm"
                    : "bg-neutral-800/80 border-neutral-700/80 text-neutral-300 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
