"use client";

import React from "react";
import { RealNumberState } from "./engine";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

interface ControlsProps {
  state: RealNumberState;
  onChange: (next: RealNumberState) => void;
  onReset: () => void;
}

export function Controls({ state, onChange, onReset }: ControlsProps) {
  const handleSlider = (key: keyof RealNumberState, val: number) => {
    onChange({
      ...state,
      [key]: val,
    });
  };

  return (
    <div className="space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <h3 className="text-xs font-black uppercase tracking-wider text-neutral-300">
          Kontrol Garis Bilangan Riil
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition px-2 py-1 rounded bg-neutral-800 border border-neutral-700"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Point A Slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-blue-400">Titik A (Posisi Awal)</span>
          <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded text-white font-bold">
            {state.point1}
          </span>
        </div>
        <input
          type="range"
          min="-10"
          max="10"
          step="0.5"
          value={state.point1}
          onChange={(e) => handleSlider("point1", parseFloat(e.target.value))}
          className="w-full accent-blue-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
          aria-label="Atur Titik A"
        />
      </div>

      {/* Point B Slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-amber-400">Titik B (Posisi Target)</span>
          <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded text-white font-bold">
            {state.point2}
          </span>
        </div>
        <input
          type="range"
          min="-10"
          max="10"
          step="0.5"
          value={state.point2}
          onChange={(e) => handleSlider("point2", parseFloat(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
          aria-label="Atur Titik B"
        />
      </div>

      {/* Scale Factor k */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-cyan-400">Faktor Skala Pengali (k)</span>
          <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded text-cyan-300 font-bold">
            {state.scaleFactor}×
          </span>
        </div>
        <input
          type="range"
          min="-3"
          max="3"
          step="0.5"
          value={state.scaleFactor}
          onChange={(e) => handleSlider("scaleFactor", parseFloat(e.target.value))}
          className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
          aria-label="Atur Faktor Skala"
        />
      </div>

      {/* Square Root N */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-purple-400">Akar Kuadrat Geometris (√N)</span>
          <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded text-purple-300 font-bold">
            N = {state.sqrtN} (√{state.sqrtN} ≈ {Math.sqrt(state.sqrtN).toFixed(2)})
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="36"
          step="1"
          value={state.sqrtN}
          onChange={(e) => handleSlider("sqrtN", parseInt(e.target.value, 10))}
          className="w-full accent-purple-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
          aria-label="Atur Nilai N Akar Kuadrat"
        />
      </div>

      {/* Zoom Buttons */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <span className="text-neutral-400">Skala Tampilan:</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSlider("zoomLevel", Math.max(0.4, (state.zoomLevel || 1) - 0.2))}
            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-neutral-300 min-w-[36px] text-center">
            {(state.zoomLevel || 1).toFixed(1)}×
          </span>
          <button
            type="button"
            onClick={() => handleSlider("zoomLevel", Math.min(2.5, (state.zoomLevel || 1) + 0.2))}
            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
