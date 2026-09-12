"use client";

import React, { useEffect, useRef } from "react";
import { TrigCanvasState } from "./engine";

interface ControlsProps {
  state: TrigCanvasState;
  onChange: (patch: Partial<TrigCanvasState>) => void;
}

const PRESETS = [
  { label: "0°", deg: 0 },
  { label: "30°", deg: 30 },
  { label: "45°", deg: 45 },
  { label: "60°", deg: 60 },
  { label: "90°", deg: 90 },
  { label: "180°", deg: 180 },
  { label: "270°", deg: 270 },
];

export function Controls({ state, onChange }: ControlsProps) {
  const animRef = useRef<number | null>(null);

  // Smooth rotation animation loop
  useEffect(() => {
    if (!state.isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      // Rotasi 30 derajat per detik
      onChange({
        angleDegrees: (state.angleDegrees + delta * 30) % 360,
      });
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [state.isPlaying, state.angleDegrees, onChange]);

  return (
    <div
      role="region"
      aria-label="Panel Kontrol Sudut dan Proyeksi Trigonometri"
      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-5 text-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-neutral-100 flex items-center gap-2">
          <span>Kontrol Parameter Sudut</span>
        </h3>
        <button
          type="button"
          onClick={() => onChange({ isPlaying: !state.isPlaying })}
          aria-label={state.isPlaying ? "Jeda Rotasi" : "Mulai Rotasi Otomatis"}
          className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors flex items-center gap-1.5 border ${
            state.isPlaying
              ? "bg-amber-950/60 border-amber-700 text-amber-300"
              : "bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700"
          }`}
        >
          <span>{state.isPlaying ? "⏸ Jeda" : "▶ Putar"}</span>
        </button>
      </div>

      {/* Main Angle Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="angle-slider" className="text-neutral-300 font-medium">
            Besar Sudut (θ):
          </label>
          <span className="font-mono text-cyan-400 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
            {Math.round(state.angleDegrees)}°
          </span>
        </div>
        <input
          id="angle-slider"
          type="range"
          min={0}
          max={360}
          step={1}
          value={Math.round(state.angleDegrees)}
          onChange={(e) => onChange({ angleDegrees: Number(e.target.value) })}
          className="w-full accent-cyan-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={Math.round(state.angleDegrees)}
        />
      </div>

      {/* Special Angles Preset Buttons */}
      <div className="space-y-2">
        <span className="text-xs text-neutral-400 font-medium block">
          Sudut Istimewa Cepat:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset) => {
            const isSelected = Math.round(state.angleDegrees) === preset.deg;
            return (
              <button
                key={preset.deg}
                type="button"
                onClick={() => onChange({ angleDegrees: preset.deg, isPlaying: false })}
                className={`px-2.5 py-1 text-xs rounded-md font-mono transition-all border ${
                  isSelected
                    ? "bg-cyan-600 text-white border-cyan-400 shadow-md font-bold"
                    : "bg-neutral-800/80 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projections Visibility Toggles */}
      <div className="pt-2 border-t border-neutral-800/80 space-y-2">
        <span className="text-xs text-neutral-400 font-medium block">
          Tampilkan Proyeksi Trigonometri:
        </span>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onChange({ showCos: !state.showCos })}
            className={`px-2.5 py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
              state.showCos
                ? "bg-blue-950/80 border-blue-600 text-blue-300"
                : "bg-neutral-800/60 border-neutral-700/60 text-neutral-500 hover:text-neutral-400"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Kosinus (x)</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ showSin: !state.showSin })}
            className={`px-2.5 py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
              state.showSin
                ? "bg-emerald-950/80 border-emerald-600 text-emerald-300"
                : "bg-neutral-800/60 border-neutral-700/60 text-neutral-500 hover:text-neutral-400"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Sinus (y)</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ showTan: !state.showTan })}
            className={`px-2.5 py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
              state.showTan
                ? "bg-amber-950/80 border-amber-600 text-amber-300"
                : "bg-neutral-800/60 border-neutral-700/60 text-neutral-500 hover:text-neutral-400"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Tangen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
