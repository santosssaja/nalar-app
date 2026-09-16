"use client";

import React from "react";
import { RealNumberState } from "./engine";

interface ControlsProps {
  state: RealNumberState;
  onChange: (newState: RealNumberState) => void;
}

export function Controls({ state, onChange }: ControlsProps) {
  const update = (field: keyof RealNumberState, value: number) => {
    onChange({ ...state, [field]: value });
  };

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Point 1 Control */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-p1" className="text-sky-400 font-semibold">
              Titik A: {state.point1}
            </label>
            <span className="text-neutral-500 font-mono">[-10, 10]</span>
          </div>
          <input
            id="ctrl-p1"
            type="range"
            min="-10"
            max="10"
            step="1"
            value={state.point1}
            onChange={(e) => update("point1", parseFloat(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Nilai Titik A"
          />
        </div>

        {/* Point 2 Control */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-p2" className="text-rose-400 font-semibold">
              Titik B: {state.point2}
            </label>
            <span className="text-neutral-500 font-mono">[-10, 10]</span>
          </div>
          <input
            id="ctrl-p2"
            type="range"
            min="-10"
            max="10"
            step="1"
            value={state.point2}
            onChange={(e) => update("point2", parseFloat(e.target.value))}
            className="w-full accent-rose-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Nilai Titik B"
          />
        </div>

        {/* Scale Factor Control */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-scale" className="text-amber-400 font-semibold">
              Faktor Dilatasi k: {state.scaleFactor}×
            </label>
            <span className="text-neutral-500 font-mono">[0.5, 3]</span>
          </div>
          <input
            id="ctrl-scale"
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={state.scaleFactor}
            onChange={(e) => update("scaleFactor", parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Faktor Skala Dilatasi"
          />
        </div>
      </div>

      {/* Preset Quick Actions */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800 text-xs">
        <span className="text-neutral-400 self-center font-medium">Preset:</span>
        <button
          type="button"
          onClick={() => onChange({ ...state, point1: 0, point2: 5, scaleFactor: 1 })}
          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
        >
          Dasar (0, 5)
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...state, point1: -4, point2: 6, scaleFactor: 2 })}
          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
        >
          Simetri (-4, 6)
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...state, point1: 3, point2: 7, scaleFactor: 1 })}
          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
        >
          Tantangan 7
        </button>
      </div>
    </div>
  );
}
