"use client";

import React from "react";

interface ControlsProps {
  state: { lengthMeters: number; timeSeconds: number; targetUnitCode: number };
  onChange: (newState: { lengthMeters: number; timeSeconds: number; targetUnitCode: number }) => void;
}

export function Controls({ state, onChange }: ControlsProps) {
  const update = (field: "lengthMeters" | "timeSeconds" | "targetUnitCode", val: number) => {
    onChange({ ...state, [field]: val });
  };

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Length Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-len" className="text-sky-400 font-semibold">
              Panjang s: {state.lengthMeters} meter
            </label>
            <span className="text-neutral-500 font-mono">[100, 5000]</span>
          </div>
          <input
            id="ctrl-len"
            type="range"
            min="100"
            max="5000"
            step="100"
            value={state.lengthMeters}
            onChange={(e) => update("lengthMeters", parseFloat(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Panjang dalam meter"
          />
        </div>

        {/* Time Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-time" className="text-amber-400 font-semibold">
              Waktu t: {state.timeSeconds} detik
            </label>
            <span className="text-neutral-500 font-mono">[10, 120]</span>
          </div>
          <input
            id="ctrl-time"
            type="range"
            min="10"
            max="120"
            step="5"
            value={state.timeSeconds}
            onChange={(e) => update("timeSeconds", parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Waktu dalam detik"
          />
        </div>

        {/* Target Unit Toggle */}
        <div className="space-y-1.5">
          <label className="text-emerald-400 font-semibold text-xs block">
            Pilihan Satuan Konversi:
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => update("targetUnitCode", 1)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                state.targetUnitCode === 1
                  ? "bg-emerald-600 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              Kilometer (km)
            </button>
            <button
              type="button"
              onClick={() => update("targetUnitCode", 2)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                state.targetUnitCode === 2
                  ? "bg-emerald-600 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              Sentimeter (cm)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
